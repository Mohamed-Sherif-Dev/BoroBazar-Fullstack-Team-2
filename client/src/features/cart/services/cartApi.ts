import axios from "axios"
import type { CartItemType } from './../types/cart.types';


export const getCart = async (): Promise<CartItemType[]> => {
  const res = await axios.get("/api/cart")
  return res.data
}

export const removeItem = async (id:number)=>{
  return axios.delete(`/api/cart/${id}`)
}

export const updateQuantity = async (id:number,quantity:number)=>{
  return axios.patch(`/api/cart/${id}`,{quantity})
}

// GET /cart
// POST /cart
// DELETE /cart/:id

// GET /wishlist
// POST /wishlist