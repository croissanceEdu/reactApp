import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeDateArrays } from "../../helpers/custom";

const DateSelectorItem = (props) => {
  const [arrays, setArrays] = useState({
    yearArray: [],
    monthArray: [],
    dateArray: [],
  });

  useEffect(() => {
    setArrays(
      makeDateArrays(
        Number(props.startDate.getFullYear()),
        Number(props.endDate.getFullYear())
      )
    );
  }, [makeDateArrays, props]);
  const updateDate = () => {
    props.setSelectedDateObject({
      DD: Number(props.selectedDate.getDate()),
      MMM: Number(props.selectedDate.getMonth() + 1),
      YYYY: Number(props.selectedDate.getFullYear()),
    });
  };
  const bindYear = () => {
    return arrays.yearArray.map((item) => {
      return (
        <option key={uuidv4()} value={item.value} disabled={item.disabled}>
          {item.content}
        </option>
      );
    });
  };
  const bindMonth = () => {
    return arrays.monthArray.map((item) => {
      return (
        <option key={uuidv4()} value={item.value} disabled={item.disabled}>
          {item.content}
        </option>
      );
    });
  };
  const bindDate = () => {
    return arrays.dateArray.map((item) => {
      // console.log(item);
      if (item.disabled) return null;
      else
        return (
          <option key={uuidv4()} value={item.value} disabled={item.disabled}>
            {item.content}
            {item.disabled ? "Yes" : "No"}
          </option>
        );
    });
  };

  //handle input changes
  const handleChange = (text) => (e) => {
    let selectedDateDay = props.selectedDateObject.DD;
    let selectedMonth = props.selectedDateObject.MMM;
    let selectedYear = props.selectedDateObject.YYYY;
    if (text == "DD") {
      selectedDateDay = Number(e.target.value);
    } else if (text == "MMM" || text == "YYYY") {
      if (text == "MMM") {
        selectedMonth = Number(e.target.value);
      } else {
        selectedYear = Number(e.target.value);
      }

      arrays.dateArray.forEach((i) => {
        i.disabled = false;
      });
      if ([4, 6, 9, 11].includes(selectedMonth)) {
        if (props.selectedDateObject.DD > 30) props.selectedDateObject.DD = 30;
        arrays.dateArray
          .filter((item) => item.value > 30)
          .forEach((i) => {
            i.disabled = true;
            console.log(i);
          });
      } else if (selectedMonth === 2) {
        if (selectedYear % 4 === 0) {
          if (props.selectedDateObject.DD > 29)
            props.selectedDateObject.DD = 29;
          arrays.dateArray
            .filter((item) => item.value > 29)
            .forEach((i) => {
              i.disabled = true;
              console.log(i);
            });
        } else {
          if (props.selectedDateObject.DD > 28)
            props.selectedDateObject.DD = 28;
          arrays.dateArray
            .filter((item) => item.value > 28)
            .forEach((i) => {
              i.disabled = true;
              console.log(i);
            });
        }
      }
    }

    props.setSelectedDateObject({
      ...props.selectedDateObject,
      [text]: Number(e.target.value),
    });
    // props.setSelectedDate(
    //   new Date(selectedYear, selectedMonth - 1, selectedDateDay)
    // );
  };

  return (
    <div className="form-group">
      <div className="sub-form-group">
        <label htmlFor="inputDateYYYY"></label>
        <select
          className="form-control form-control-sm"
          id="inputDateYYYY"
          value={props.selectedDateObject.YYYY}
          onChange={handleChange("YYYY")}
        >
          {bindYear()}
        </select>
      </div>
      <div className="sub-form-group">
        <label htmlFor="inputDateYYYY"></label>
        <select
          className="form-control form-control-sm"
          id="inputDateYYYY"
          value={props.selectedDateObject.MMM}
          onChange={handleChange("MMM")}
        >
          {bindMonth()}
        </select>
      </div>
      <div className="sub-form-group">
        <label htmlFor="inputDateYYYY"></label>
        <select
          className="form-control form-control-sm"
          id="inputDateYYYY"
          value={props.selectedDateObject.DD}
          onChange={handleChange("DD")}
        >
          {bindDate()}
        </select>
      </div>
    </div>
  );
};

export default DateSelectorItem;
