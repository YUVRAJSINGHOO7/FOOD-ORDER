import { currencyFormatter } from "../../util/formatting";

// we can use useContext here. there will be no problem using it here
// we are using an alternate way by accepting "onIcrease", "onDecrease" props.
// concept will be the same
export default function CartItem({ name, quantity, price, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} X {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
