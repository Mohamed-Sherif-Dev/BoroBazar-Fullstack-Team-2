import CartItem from "./CartItem"
import type { CartItemType } from "../types/cart.types"

interface Props{
 items:CartItemType[]
 removeItem:(id:number)=>void
 updateQuantity:(data:{id:number,quantity:number})=>void
}

export default function CartList({
 items,
 removeItem,
 updateQuantity
}:Props){

 return(

  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

   {items.map(item=>(
    <CartItem
     key={item.id}
     item={item}
     removeItem={removeItem}
     updateQuantity={updateQuantity}
    />
   ))}

  </div>

 )
}