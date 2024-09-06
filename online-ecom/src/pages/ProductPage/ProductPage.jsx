import React from 'react'
import { useParams } from 'react-router-dom'
export default function ProductPage() {
    const {product_id} = useParams();
  return (
    <div>Product id = {product_id}</div>
  )
}
