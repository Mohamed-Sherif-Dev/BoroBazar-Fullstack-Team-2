import axios from "axios"

const API = "http://localhost:5000"

export const getFProducts = async () => {
  const res = await axios.get(`${API}/products/featured`)
  return res.data
}

export const getPopularProducts = async () => {
  const res = await axios.get(`${API}/products/popular`)
  return res.data
}