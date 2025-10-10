// Checkout.jsx
import { useTranslation } from 'react-i18next'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import emailjs from '@emailjs/browser'
import { useCart } from '../components/Checkout/CartContext'

// Subcomponentes
import OrderDetails from '../components/Checkout/OrderDetails'
import ShippingDetails from '../components/Checkout/ShippingDetails'
import Validations from '../components/Checkout/Validations'

const COUPON_MAP = {
  DISCOUNT10: 10,
  UWH15: 15,
}

// Env vars (Vite)
const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_USER = import.meta.env.VITE_EMAILJS_USER_ID

const Checkout = () => {
  const { t } = useTranslation('global')
  const navigate = useNavigate()
  const { cartItems, removeFromCart, clearCart } = useCart()
  const formRef = useRef(null)

  // Estados
  const [couponValue, setCouponValue] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)

  const [userCountry, setUserCountry] = useState('United States of America')
  const [zipCode, setZipCode] = useState('')

  const [shippingTotal, setShippingTotal] = useState(0)
  const [orderTotal, setOrderTotal] = useState(0)
  const [isCalculating, setIsCalculating] = useState(true)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formValid, setFormValid] = useState(false)

  // Notyf
  const notyf = new Notyf({
    types: [{ type: 'error', background: '#f44336', duration: 2000, dismissible: false }],
  })

  const handleRemoveFromCart = (index) => {
    removeFromCart(index)
    notyf.error(t('product.remove_from_cart'))
  }

  // check validity del form
  useEffect(() => {
    const check = () => setFormValid(formRef.current?.checkValidity() || false)
    check()
    const form = formRef.current
    if (!form) return
    form.addEventListener('input', check)
    return () => form.removeEventListener('input', check)
  }, [])

  // Callback que recibe OrderDetails cuando el usuario cambia el cupón
  const handleCouponUpdate = (code, percent) => {
    setCouponValue(code || '')
    setDiscountPercent(percent || 0)
  }

  // Callback que recibe totals desde OrderDetails
  const handleTotalsChange = ({ shipping, total, calculating }) => {
    setShippingTotal(shipping ?? 0)
    setOrderTotal(total ?? 0)
    setIsCalculating(Boolean(calculating))
  }

  // Generar texto para email
  const generateOrderDetailsText = () => {
    let counter = 1
    const lines = cartItems.flatMap((item) => {
      const unit = Number(item.product_selling) || 0
      return Array.from({ length: item.quantity || 1 }, () => {
        const block = [
          `Item ${counter++}:`,
          `Name: ${item.product_name}`,
          `Type: ${item.product_category || item.product_category_key || 'unknown'}`,
          `Unit Price: $${unit.toFixed(2)}`,
          `Size: ${item.selectedSize || '-'}`,
          ...(item.backNumber ? [`Number: ${item.backNumber}`] : []),
          `Total: $${unit.toFixed(2)}`,
        ].join('\n')
        return block
      })
    })

    const productsSubtotal = cartItems
      .reduce((s, it) => s + (Number(it.product_selling) || 0) * (it.quantity || 1), 0)
      .toFixed(2)

    const discountLine = discountPercent
      ? `Coupon: ${couponValue} (${discountPercent}% off)\nTotal after discount: $${orderTotal.toFixed(2)}`
      : `Total: $${orderTotal.toFixed(2)}`

    return [...lines, `Subtotal: $${productsSubtotal}`, discountLine].join('\n\n')
  }

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return
    if (!formRef.current.checkValidity() || isSubmitting) return
    setIsSubmitting(true)

    const formEl = formRef.current
    // eliminar previos hidden autogenerados
    Array.from(formEl.querySelectorAll('input[data-autogen="true"]')).forEach((n) => n.remove())

    const details = generateOrderDetailsText()
    const appendHidden = (name, value) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      input.setAttribute('data-autogen', 'true')
      formEl.appendChild(input)
    }

    appendHidden('order_details', details)
    appendHidden('coupon_code', couponValue || '')
    appendHidden('order_total', orderTotal.toFixed(2))
    appendHidden('shipping_total', shippingTotal.toFixed(2))
    appendHidden('country_label', userCountry)
    appendHidden('zip_code', zipCode || '')

    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formEl, EMAILJS_USER)
      clearCart && clearCart()
      navigate('/successfull')
    } catch (err) {
      console.error('EmailJS error:', err)
      setIsSubmitting(false)
    }
  }

  // Subtotal original (para mostrar tachado si hay cupón)
  const originalSubtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.product_selling) || 0) * (item.quantity || 1),
    0
  )

  return (
    <div className="container flex flex-col gap-12 mx-auto mt-12 sm:mt-20">

      {/* Formulario */}
      <div>
          <form ref={formRef} className="needs-validation grid gap-y-8" noValidate onSubmit={handleSubmit}>
            {/* Shipping details (controlados desde este parent) */}
            <ShippingDetails userCountry={userCountry} setUserCountry={setUserCountry} zipCode={zipCode} setZipCode={setZipCode} />

            {/* Order details*/}
            <OrderDetails
              onCouponUpdate={handleCouponUpdate}
              userCountry={userCountry}
              zipCode={zipCode}
              discountPercent={discountPercent}
              onTotalsChange={handleTotalsChange}
            />

            {/* Validations + submit */}
            <Validations isSubmitting={isSubmitting} formValid={formValid} />
          </form>
      </div>
    </div>
  )
}

export default Checkout
