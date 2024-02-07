import React from "react";
import styles from "./Cart.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTotalPrice, removeItemFromCart, updateQuantity } from "./cartSlice";

export function Cart() {
  const products = useAppSelector((state) => state.productState.products);
  const cartItems = useAppSelector((state) => state.cartState.items);

  const totalPrice = useAppSelector(getTotalPrice);
  const dispatch = useAppDispatch();

  const onQuantityChanged = (
    e: React.FocusEvent<HTMLInputElement>,
    id: string
  ) => {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cartItems).map(([id, quantity]) => (
            <tr key={id}>
              <td>{products[id].name}</td>
              <td>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={quantity}
                  onBlur={(e) => onQuantityChanged(e, id)}
                />
              </td>
              <td>{products[id].price}</td>
              <td>
                <button
                  aria-label={`Remove ${products[id].name} from Shopping Cart`}
                  onClick={() => {
                    dispatch(removeItemFromCart(id));
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>{totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form>
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}
