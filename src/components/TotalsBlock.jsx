import React, { useMemo } from "react";

export default function TotalsBlock({ cartItems, shippingTotal, orderTotal, isCalculating, discountPercent }) {
  const productsTotal = useMemo(
    () => cartItems.reduce((acc, it) => acc + (Number(it.product_selling) || 0) * (it.quantity||1), 0),
    [cartItems]
  );

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-md">
      {isCalculating ? (
        <div className="flex justify-center items-center py-6">
          <svg className="animate-spin h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      ) : (
        <>
          <p className="text-gray-700">Productos: ${productsTotal.toFixed(2)}</p>
          <p className="text-gray-700">Envío: ${shippingTotal.toFixed(2)}</p>
          {discountPercent ? (
            <p className="text-sm text-gray-600">Cupon: {discountPercent}% aplicado</p>
          ) : null}
          <p className="text-lg font-bold text-gray-900">Total: ${orderTotal.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}
