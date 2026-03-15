import axios from "axios"
import type { WishlistItemType } from "../types/wishlist.types"


export const getWishlist = async (): Promise<WishlistItemType[]> => {
  const res = await axios.get("/api/wishlist")
  return res.data
}

export const addWishlist = async (id:number)=>{
  return axios.post(`/api/wishlist`, { id })
}

// GET /wishlist
// POST /wishlist