export const getFormattedDate = (date) => {
   var dt = new Date(date);
   var dd = dt.getDate();
   var MM = dt.getMonth();
   var yyyy = dt.getFullYear();
   const monthsObject = [
      { value: 1, content: "Jan" },
      { value: 2, content: "Feb" },
      { value: 3, content: "Mar" },
      { value: 4, content: "Apr" },
      { value: 5, content: "may" },
      { value: 6, content: "Jun" },
      { value: 7, content: "Jul" },
      { value: 8, content: "Aug" },
      { value: 9, content: "Sep" },
      { value: 10, content: "Oct" },
      { value: 11, content: "Nov" },
      { value: 12, content: "Dec" },
   ];
   // const months = ["Jan", "Feb", "Mar", "Apr", "may", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   // const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   var MMM = monthsObject.filter((item) => item.value === MM + 1)[0].content;
   // var MMM = months[MM];

   return `${dd} ${MMM} ${yyyy}`;
};
export const makeDateArrays = (startYear, endYear) => {
   const yearArray = [];
   const monthArray = [
      { value: 1, content: "Jan", disabled: false },
      { value: 2, content: "Feb", disabled: false },
      { value: 3, content: "Mar", disabled: false },
      { value: 4, content: "Apr", disabled: false },
      { value: 5, content: "may", disabled: false },
      { value: 6, content: "Jun", disabled: false },
      { value: 7, content: "Jul", disabled: false },
      { value: 8, content: "Aug", disabled: false },
      { value: 9, content: "Sep", disabled: false },
      { value: 10, content: "Oct", disabled: false },
      { value: 11, content: "Nov", disabled: false },
      { value: 12, content: "Dec", disabled: false },
   ];
   const dateArray = [];
   for (let y = startYear; y <= endYear; y++) {
      yearArray.push({ value: y, content: y, disabled: false });
   }
   for (let d = 1; d <= 31; d++) {
      dateArray.push({ value: d, content: d, disabled: false });
   }
   return { yearArray, monthArray, dateArray };
};
