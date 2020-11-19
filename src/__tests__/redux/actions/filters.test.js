import moment from "moment"
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../../../redux/actions/filters"

describe("should setup text filter action object", () => {
    test("with default values", () => {
        const action = setTextFilter();
        expect(action).toEqual({
            type: "SET_TEXT_FILTER",
            text: "",
        })
    })

    test("with provided values", () => {
        const action = setTextFilter("rent");
        expect(action).toEqual({
            type: "SET_TEXT_FILTER",
            text: "rent",
        })
    })
})

test("shoudl setup sort by date action object", () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: "SORT_BY_DATE",
    })
})

test("shoudl setup sort by amount action object", () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: "SORT_BY_AMOUNT",
    })
})

test("shoudl setup set start date action object", () => {
    const date = moment()
    const action = setStartDate(date);
    expect(action).toEqual({
        type: "SET_START_DATE",
        startDate: date
    })
})

test("shoudl setup set start date action object", () => {
    const date = moment()
    const action = setEndDate(date);
    expect(action).toEqual({
        type: "SET_END_DATE",
        endDate: date
    })
})