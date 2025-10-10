import { forwardRef } from "react";
import { Icon } from "@iconify/react";
import { useCart } from "../Checkout/CartContext";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useTranslation } from "react-i18next";

const CartDropdown = forwardRef(({ isOpen, toggle, navigate }, ref) => {
  const { cartItems, removeFromCart } = useCart();
  const { t } = useTranslation("global");

  const notyf = new Notyf({ types: [{ type: "error", background: "#f44336", duration: 2000 }] });
  const totalQuantity = cartItems.reduce((a, b) => a + b.quantity, 0);

  const handleRemove = (index) => {
    removeFromCart(index);
    notyf.error(t("product.remove_from_cart"));
  };

  return (
    <div className="CartButton flex" ref={ref}>
      <button
        className="rounded-full w-10 h-10 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
        onClick={toggle}
      >
        <div className="relative">
          <span className="absolute -top-2 -right-2 bg-red-400 w-4 h-4 rounded-full text-xs text-white flex items-center justify-center">
            {totalQuantity}
          </span>
          <Icon icon="icon-park-twotone:shopping" className="text-pink-800 w-6 h-6" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-4 top-12 bg-white border border-gray-300 rounded-2xl z-50 p-2 min-w-[250px] max-h-[80vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <h6 className="text-gray-600 text-center text-sm">{t("cart.empty")}</h6>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4 m-2">
                <h6 className="text-gray-600 text-sm">
                  {t("cart.subtotal")} {cartItems.reduce((a, b) => a + b.product_selling * b.quantity, 0).toFixed(2)} USD
                </h6>
                {totalQuantity < 3 ? (
                  <p className="text-red-400 text-sm">{t("cart.minimum_order", { min: 3 })}</p>
                ) : (
                  <button
                    className="flex gap-2 rounded-lg border bg-green-500 text-white bg-green-100 px-3 py-2 text-sm cursor-pointer"
                    onClick={() => navigate("/checkout")}
                  >
                    {t("cart.checkout")}
                    <Icon icon="icon-park-twotone:shopping" className="w-5 h-5" />
                  </button>
                )}
              </div>

              <ul className="divide-y divide-gray-300">
                {cartItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 border-b p-3 last:border-b-0">
                    <img src={item.image} alt={item.product_name} className="w-16 object-cover rounded-2xl" />
                    <div className="flex flex-col flex-grow pr-4">
                      <h6 className="text-gray-600 font-medium text-sm">{item.product_name}</h6>
                      <p className="text-gray-400 text-sm">{item.product_category}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-gray-600 text-sm">
                        {(item.product_selling * item.quantity).toFixed(2)} USD
                      </span>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm"
                        onClick={() => handleRemove(i)}
                      >
                        {t("cart.remove")}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default CartDropdown;
