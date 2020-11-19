import moment from "moment"
import filtersReducer from "../../../redux/reducers/filters"

test("should setup default filter values", () => {
    const reducer = filtersReducer(undefined, { type: "@@INIT" });
    expect(reducer).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month"),
    })
})

test("should set sortBy to amount", () => {
    const reducer = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" })
    expect(reducer.sortBy).toBe("amount")
})

test("should set sortBy to date", () => {
    const currentState = {
        text: "",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined,
    }

    const action = { type: "SORT_BY_DATE" }

    const reducer = filtersReducer(currentState, action)
    expect(reducer.sortBy).toBe("date")
})

test("should set text filter", () => {
    const text = "Car";
    const action = {
        type: "SET_TEXT_FILTER",
        text
    }
    const reducer = filtersReducer(undefined, action);
    expect(reducer.text).toBe(text)
})

test("should set startDate filter", () => {
    const date = moment(1000);
    const action = {
        type: "SET_START_DATE",
        startDate: date
    }
    const reducer = filtersReducer(undefined, action);
    expect(reducer.startDate).toEqual(date)
})

test("shoud; set endDate filters", () => {
    const date = moment(1000);
    const action = {
        type: "SET_END_DATE",
        endDate: date
    }
    const reducer = filtersReducer(undefined, action);
    expect(reducer.endDate).toEqual(date)
})