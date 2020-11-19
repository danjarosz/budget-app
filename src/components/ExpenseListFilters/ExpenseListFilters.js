import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from "../../redux/actions/filters";
import RangePicker from "../Pickers/RangePicker/RangePicker";

const ExpenseListFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((props) => props.filters);
  const { text: textFilter, sortBy, startDate, endDate } = filters;

  const onSearchInputChangeHandler = (e) => {
    const { value } = e.target;
    dispatch(setTextFilter(value));
  };

  const onSortSelectChangeHandler = (e) => {
    const { value } = e.target;
    switch (value) {
      case "date":
        dispatch(sortByDate());
        break;
      case "amount":
        dispatch(sortByAmount());
        break;
      default:
        dispatch(sortByDate());
    }
  };

  return (
    <div className="content-container">
      <div className="input-group">
        <div className="input-group__item">
          <input
            className="text-input"
            type="text"
            value={textFilter}
            placeholder="Search expenses"
            onChange={onSearchInputChangeHandler}
          />
        </div>
        <div className="input-group__item">
          <select className="select" value={sortBy} onChange={onSortSelectChangeHandler}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <div className="input-group__item">
          <RangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseListFilters;
