export default function CartSkeleton(){

 return(

 <div className="space-y-4">

  {[1,2,3,4].map(i=>(
   <div
    key={i}
    className="animate-pulse h-24 bg-gray-200 rounded"
   />
  ))}

 </div>

 )
}