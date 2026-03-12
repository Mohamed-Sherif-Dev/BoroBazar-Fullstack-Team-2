interface Props{
 subtotal:number
}

export default function CartTotals({subtotal}:Props){

 return(

 <div className="border rounded-lg p-6 bg-white shadow sticky top-24">

  <h2 className="text-lg font-semibold mb-4">
   Cart Totals
  </h2>

  <div className="flex justify-between mb-2">
   <span>Subtotal</span>
   <span className="text-red-500 font-semibold">
    ${subtotal}
   </span>
  </div>

  <div className="flex justify-between mb-4">
   <span>Shipping</span>
   <span className="text-green-600">
    Free
   </span>
  </div>

  <div className="flex justify-between font-bold text-lg mb-6">
   <span>Total</span>
   <span>${subtotal}</span>
  </div>

  <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
   Next
  </button>

 </div>

 )
}