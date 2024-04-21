import { useCart } from "../store/CartContext";

const Header = () => {
  const { cart, setIsCartOpen } = useCart();

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="text-fontPrimary flex justify-between bg-headerBackground">
      <p>{/**Header */}</p>
      <div>
        <button
          onClick={() => setIsCartOpen(true)}
          className=" text-black font-bold py-2 px-4 rounded"
        >
          My Cart ({totalQuantity})
        </button>
      </div>
    </header>
  );
};

export default Header;
