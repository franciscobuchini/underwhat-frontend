// OrderDetails.jsx
import React, { useState, useMemo, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useCart } from './CartContext'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import { useTranslation } from 'react-i18next'

export default function OrderDetails({ onCouponUpdate, userCountry, zipCode, discountPercent = 0, onTotalsChange }) {
  const { t } = useTranslation('global')
  const { cartItems, removeFromCart } = useCart()
  const notyf = new Notyf()

  const [couponValue, setCouponValue] = useState('')
  const [couponValid, setCouponValid] = useState(null)

  const [isCalculating, setIsCalculating] = useState(true)
  const [shippingTotal, setShippingTotal] = useState(0)
  const [orderTotal, setOrderTotal] = useState(0)

  // Mapa simple de cupones (si quieres mantener local)
  const COUPON_MAP = { DISCOUNT10: 10, UWH15: 15 }

  const validateCoupon = (value) => {
    const code = (value || '').trim().toUpperCase()
    return COUPON_MAP[code] || null
  }

  const handleCouponChange = (e) => {
    const v = e.target.value
    setCouponValue(v)
    const percent = validateCoupon(v)
    if (v.trim() === '') {
      setCouponValid(null)
      onCouponUpdate && onCouponUpdate('', 0)
    } else if (percent) {
      setCouponValid(percent)
      onCouponUpdate && onCouponUpdate(v.trim().toUpperCase(), percent)
    } else {
      setCouponValid(false)
      onCouponUpdate && onCouponUpdate(v.trim().toUpperCase(), 0)
    }
  }

  const handleRemove = (idx) => {
    removeFromCart(idx)
    notyf.error(t('product.remove_from_cart') || 'Removed')
  }

  const productsTotal = useMemo(
    () => cartItems.reduce((sum, it) => sum + (Number(it.product_selling) || 0) * (it.quantity || 1), 0),
    [cartItems]
  )

  // recalcular totales y avisar al parent
  useEffect(() => {
    // sólo calcular si hay country y zip
    if (!userCountry || !zipCode) {
      setIsCalculating(true)
      // reportar al padre que está calculando
      onTotalsChange && onTotalsChange({ shipping: 0, total: 0, calculating: true })
      return
    }

    const shipping = cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0) * 9.9
    const subtotal = productsTotal + shipping
    const totalAfterDiscount = discountPercent ? +(subtotal * (1 - discountPercent / 100)).toFixed(2) : subtotal

    setShippingTotal(shipping)
    setOrderTotal(totalAfterDiscount)
    setIsCalculating(false)

    // reportar al parent
    onTotalsChange && onTotalsChange({ shipping, total: totalAfterDiscount, calculating: false })
  }, [userCountry, zipCode, cartItems, discountPercent, productsTotal, onTotalsChange])

  return (
    <div className="p-4 sm:p-6 border border-gray-300 rounded-2xl bg-white flex flex-col gap-y-4 sm:gap-y-6">
      <div className="w-full mt-2">
        <h6 className="text-base sm:text-lg font-bold text-gray-600 flex items-center gap-2 sm:gap-4">
          <Icon icon="icon-park-twotone:shopping" className="w-6 h-6 text-pink-800" />
          {t('checkout.order_details')}
        </h6>
        <hr className="mt-2" />
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-sm sm:text-base">{t('cart.empty')}</p>
      ) : (
        <ul className="space-y-4 sm:space-y-6">
          {cartItems.map((item, idx) => (
            <li key={idx} className="flex items-center gap-4 sm:gap-6 border-b border-gray-300 pb-4 sm:pb-6 last:border-b-0">
              <img src={item.image} alt={item.product_name} className="w-16 sm:w-20 rounded-2xl object-cover" />
              <div className="flex flex-col flex-grow">
                <h6 className="text-gray-600 font-medium text-sm sm:text-base">{item.product_name}</h6>
                <p className="text-gray-400 text-xs sm:text-sm">{item.product_category}</p>
                <p className="text-gray-400 text-xs sm:text-sm">{t('cart.size')}: {item.selectedSize}</p>
                {item.backNumber && <p className="text-gray-400 text-xs sm:text-sm">{t('product.number')} {item.backNumber}</p>}
                <p className="text-gray-400 text-xs sm:text-sm">{t('cart.pieces')}: {item.quantity}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-gray-600 text-xs sm:text-sm">${((item.product_selling || 0) * (item.quantity || 1)).toFixed(2)} USD</span>
                <button onClick={() => handleRemove(idx)} className="text-red-500 hover:text-red-700 text-xs sm:text-sm mt-2">{t('cart.remove')}</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr className="mt-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div>
          <input
            id="discountCode"
            type="text"
            value={couponValue}
            onChange={handleCouponChange}
            placeholder={t('checkout.discount_code')}
            className={`mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-600 focus:border-pink-800 ${
              couponValid === false ? 'outline outline-2 outline-red-500' : couponValid ? 'outline outline-2 outline-green-500' : ''
            }`}
          />
        </div>

        <div className="text-right">
          <div>{t('cart.subtotal')}</div>
          <div className="flex justify-end gap-2">
            <span className="text-gray-600 font-semibold">{productsTotal.toFixed(2)} USD</span>
            {discountPercent ? (
              <span className="text-gray-600 font-semibold"> {(productsTotal * (1 - discountPercent / 100)).toFixed(2)} USD </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
