import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Fetch main product
        const res = await fetch(
          `https://shop.sprwforge.com/api/v1/product/${id}`
        );
        const data = await res.json();
        console.log("Product data:", data);
        setProduct(data?.data ?? null);

        // Fetch related products (same category)
        if (data?.data?.categories?.length > 0) {
          const catSlug = data.data.categories[0].slug;
          const relatedRes = await fetch(
            `https://shop.sprwforge.com/api/v1/all?category=${catSlug}&per_page=4`
          );
          const relatedData = await relatedRes.json();
          console.log("Related products:", relatedData);
          setRelatedProducts(
            relatedData?.data?.result?.data?.filter(
              (p) => p.id !== data.data.id
            ) ?? []
          );
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://shop.sprwforge.com/uploads/${product.image}`}
          alt={product.title}
          className="w-full md:w-96 h-96 object-contain rounded border p-2"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-blue-600 font-bold mb-4">€{product.selling}</p>
          {product.badge && (
            <p className="text-white bg-green-500 inline-block px-2 py-1 rounded mb-4">
              {product.badge}
            </p>
          )}
          <p className="text-gray-700">
            {product.description ?? "No description available."}
          </p>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <li
                key={item.id}
                className="border p-3 rounded shadow-sm hover:shadow-lg cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={`https://shop.sprwforge.com/uploads/${item.image}`}
                  alt={item.title}
                  className="w-full h-40 object-contain mb-2 rounded"
                />
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-blue-600 font-bold">€{item.selling}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
