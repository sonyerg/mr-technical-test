import { useCart } from "../store/CartContext";

const MiniCart = () => {
  const { cart, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-50 w-3/4 max-w-md">
        <h2 className="text-xl font-semibold mb-4">My Cart</h2>

        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={item.imageURL}
                alt={item.title}
                className="w-20 h-20 object-cover mr-4"
              />
              <div>
                <p>{item.title}</p>
                <p>{`Size: ${item.size} | Quantity: ${item.quantity}`}</p>
                <p>{`Price: $${item.price}.00`}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}

        <button
          onClick={() => setIsCartOpen(false)}
          className="uppercase tracking-wide bg-white border-2 border-black hover:bg-black 
          hover:text-white text-black font-bold py-2 px-4 mt-2 transition duration-200"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default MiniCart;
