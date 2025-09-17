import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BebidasPage from "./pages/BebidasPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BebidasPage />} />
        <Route path="/category/:slug" element={<BebidasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
