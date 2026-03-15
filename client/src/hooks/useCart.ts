import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import { getCart,removeItem,updateQuantity } from "../services/cartApi"

export const useCart = ()=>{

 const queryClient = useQueryClient()

 const cartQuery = useQuery({
  queryKey:["cart"],
  queryFn:getCart
 })

 const removeMutation = useMutation({
  mutationFn:removeItem,
  onSuccess:()=>{
   queryClient.invalidateQueries({queryKey:["cart"]})
  }
 })

 const quantityMutation = useMutation({
  mutationFn:({id,quantity}:{id:number,quantity:number})=>
   updateQuantity(id,quantity),
  onSuccess:()=>{
   queryClient.invalidateQueries({queryKey:["cart"]})
  }
 })

 return{
  ...cartQuery,
  removeItem:removeMutation.mutate,
  updateQuantity:quantityMutation.mutate
 }
}