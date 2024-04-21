import Header from "./components/Header";
import MiniCart from "./components/MiniCart";
import Product from "./components/Product";
import { CartProvider } from "./store/CartContext";

function App() {
  return (
    <CartProvider>
      <Header />
      <Product />
      <MiniCart />
    </CartProvider>
  );
}

export default App;
