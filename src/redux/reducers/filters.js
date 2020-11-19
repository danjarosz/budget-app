import moment from "moment";
import {
  SET_TEXT_FILTER,
  SORT_BY_DATE,
  SORT_BY_AMOUNT,
  SET_START_DATE,
  SET_END_DATE,
} from "../action-types/filters";

const initialState = {
  text: "",
  sortBy: "date", //date or amount
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month"),
};
const filtersReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case SET_TEXT_FILTER:
      const { text } = action;
      return { ...state, text };
    case SORT_BY_DATE:
      return { ...state, sortBy: "date" };
    case SORT_BY_AMOUNT:
      return { ...state, sortBy: "amount" };
    case SET_START_DATE:
      const { startDate } = action;
      return { ...state, startDate };
    case SET_END_DATE:
      const { endDate } = action;
      return { ...state, endDate };
    default:
      return state;
  }
};

export default filtersReducer;
