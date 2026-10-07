import { useState } from "react";
import { formatMoney, type Item } from "../api";
import { CartLine } from "./CartLine";

type CartProps = { items: Item[]; freeFrom?: number };

/** Shows the cart total and a free-shipping hint. */
export function Cart({ items, freeFrom = 250 }: CartProps) {
  const [open, setOpen] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const shipping = total >= freeFrom ? 0 : 19.9;

  if (items.length === 0) return <p className="hint">No items</p>;

  return (
    <section aria-label="Cart">
      <button onClick={() => setOpen(!open)}>
        {items.length} items · {formatMoney(total + shipping)}
      </button>
      {open &&
        items.map((item) => <CartLine key={item.id} item={item} />)}
    </section>
  );
}
