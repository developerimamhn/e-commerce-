import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Ourallproduct = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500">
        <img
          src="https://i.pinimg.com/originals/66/17/f4/6617f447369d9c9491b67bb82766110e.gif"
          alt="loading..."
        />
      </p>
    );
  }

  return (
    <ul className="grid relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[13px] sm:gap-[14px] md:gap-[15px] lg:gap-[16px] xl:gap-[20px] 2xl:gap-[24px] text-center">
      {products.map((product, index) => (
        <li
          key={product.id}
          // ref={(el) => (itemRefs.current[index] = el)}
          className="border relative group bg-slate-200 p-[15px] sm:p-[16px] md:p-[20px] lg:p-[24px] xl:p-[28px] 2xl:p-[32px] rounded shadow-sm product-item hover:shadow-lg transition cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="overflow-hidden rounded">
            <img
              src={`https://shop.sprwforge.com/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-[220px] object-contain mb-2 transform transition duration-300 ease-in-out group-hover:scale-[1.1]"
            />
          </div>
          <h2 className="font-semibold text-sm mb-1 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
            {product.title}
          </h2>
          <p className="text-blue-600 font-bold text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[20px]">
            €{product.selling}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Ourallproduct;
