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

    const itemToAdd = {
      size: selectedSize,
      quantity: 1,
      imageURL: product.imageURL,
      title: product.title,
      price: product.price,
    };

    handleAddToCart(itemToAdd);
    setSelectedSize("");
    setError("");
  };

  return (
    <div className="md:mx-24 mt-10 text-fontPrimary">
      {product && (
        <div className="bg-white overflow-hidden flex flex-col">
          <div className="flex flex-col sm:flex-row">
            <img
              src={product.imageURL}
              alt={product.title}
              className="w-full p-4 sm:w-1/2 sm:p-0 max-w-full h-auto sm:max-h-96 object-contain"
            />

            <div className="p-4 sm:pl-10 w-full sm:w-2/3">
              <h2 className="text-xl font-semibold text-gray-800">
                {product.title}
              </h2>
              <h3 className="font-bold">{`$${product.price}.00`}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <div className="mt-4">
                {error && <p className="text-requiredStar">{error}</p>}

                <label className="block text-sm ">SIZE:</label>

                {product.sizeOptions.map((sizeOption) => (
                  <button
                    key={sizeOption.id}
                    value={sizeOption.label}
                    onClick={() => setSelectedSize(sizeOption.label)}
                    className={`m-1 p-2 border-2 text-sm items-center w-10 h-10 ${
                      selectedSize === sizeOption.label
                        ? "border-borderDarkGrey"
                        : "border-borderLightGrey"
                    } hover:border-borderDarkGrey focus:outline-none focus:border-borderDarkGrey rounded-none`}
                  >
                    {sizeOption.label}
                  </button>
                ))}
              </div>

              <button
                onClick={addToCart}
                className="uppercase tracking-wide bg-white border-2 border-borderDarkGrey
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
