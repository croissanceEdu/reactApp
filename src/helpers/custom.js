
export const getFormattedDate=(date)=>{
   var dt=new Date(date)
   var dd=dt.getDate()
   var MM=dt.getMonth()
   var yyyy=dt.getFullYear()
   const months=["Jan","Feb","Mar","Apr","may","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
   const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
   var MMM=months[MM]

   return `${dd} ${MMM} ${yyyy}`

}
