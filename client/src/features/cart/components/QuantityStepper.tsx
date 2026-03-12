interface Props{
 quantity:number
 onIncrease:()=>void
 onDecrease:()=>void
}

export default function QuantityStepper({
 quantity,
 onIncrease,
 onDecrease
}:Props){

 return(
  <div className="flex items-center border rounded-md">

   <button
    onClick={onDecrease}
    className="px-3 py-1 hover:bg-gray-100"
   >
    -
   </button>

   <span className="px-4">{quantity}</span>

   <button
    onClick={onIncrease}
    className="px-3 py-1 hover:bg-gray-100"
   >
    +
   </button>

  </div>
 )
}