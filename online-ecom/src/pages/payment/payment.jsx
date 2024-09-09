import React from 'react'
import { useParams } from 'react-router-dom'
import PaymentSuccess from "../../components/paymentSuccess/paymentSuccess"
export default function Payment() {
    const {amount} = useParams()
  return (
    <div><PaymentSuccess amount={amount} /></div>
  )
}
