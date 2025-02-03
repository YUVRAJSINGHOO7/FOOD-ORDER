import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumverOfItems, item) => {
    // .reduce() method is a built-in method that allows us to reduce an array to a single value. it takes 2 arguments. 1st is a function and 2nd is the starting value
    return totalNumverOfItems + item.quantity; // function itself accepts 2 arguments passed in automatically by JS. 1st is the new value, which we wanna derive. 2nd is the every item of the array
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }


  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>videshi's FOOD</h1>
      </div>

      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
