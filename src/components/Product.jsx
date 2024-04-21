import { useState, useEffect } from "react";
import { useCart } from "../store/CartContext";

export default function Product() {
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);

  const { handleAddToCart } = useCart();

  useEffect(() => {
    fetch(
      "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
    )
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, []);

  const addToCart = () => {
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }
    handleAddToCart({ size: selectedSize, quantity: 1 });
    setSelectedSize("");
    setError("");
  };

  return (
    <div className="md:mx-24 mt-10">
      {product && (
        <div className="bg-white overflow-hidden flex flex-col">
          <div className="flex flex-col sm:flex-row">
            <img
              src={product.imageURL}
              alt={product.title}
              className="w-full p-4 sm:w-1/3 sm:p-0"
            />
            <div className="p-4 sm:pl-10 w-full sm:w-2/3">
              <h2 className="text-xl font-semibold text-gray-800">
                {product.title}
              </h2>
              <h3 className="font-bold">{`$${product.price}.00`}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <div className="mt-4">
                {error && <p className="text-red-500">{error}</p>}

                <label className="block">Select Size:</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select Size</option>
                  {product.sizeOptions.map((sizeOption) => (
                    <option key={sizeOption.id} value={sizeOption.label}>
                      {sizeOption.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={addToCart}
                className="uppercase tracking-wide bg-white border-2 border-black
                 hover:bg-black hover:text-white text-black font-bold py-2 px-4 
                 mt-2 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
