import axios from "axios"

export const getFProducts = async () => {
  const res = await axios.get("/api/products/featured")
  return res.data
}

export const getPopularProducts = async () => {
  const res = await axios.get("/api/products/popular")
  return res.data
}