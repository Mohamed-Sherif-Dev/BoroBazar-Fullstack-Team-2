import type { CartItemType } from "../types/cart.types"
import QuantityStepper from "./QuantityStepper"

interface Props{
item:CartItemType
 removeItem:(id:number)=>void
 updateQuantity:(data:{id:number,quantity:number})=>void
}

export default function CartItem({
 item,
 removeItem,
 updateQuantity
}:Props){

 return(

 <div className="relative flex gap-4 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition">

  <img
   src={item.image}
   className="w-[60px] h-[60px] object-cover rounded"
  />

  <div className="flex-1">

   <h3 className="font-semibold text-sm">
    {item.name}
   </h3>

   <div className="text-yellow-400 text-xs mt-1">
    ★★★★★
   </div>

   <div className="flex items-center gap-2 mt-2">

    <span className="text-green-600 font-bold">
     ${item.price}
    </span>

    <span className="line-through text-gray-400 text-sm">
     ${item.oldPrice}
    </span>

    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
     {item.discount}% OFF
    </span>

   </div>

   <p className="text-xs text-gray-500 mt-1">
    {item.shelf}
   </p>

   <div className="mt-3">
    <QuantityStepper
     quantity={item.quantity}
     onIncrease={()=>updateQuantity({
      id:item.id,
      quantity:item.quantity+1
     })}
     onDecrease={()=>updateQuantity({
      id:item.id,
      quantity:item.quantity-1
     })}
    />
   </div>

  </div>

  <button
   onClick={()=>removeItem(item.id)}
   className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
  >
   ✕
  </button>

 </div>

 )
}