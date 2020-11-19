import moment from "moment";
import { selectExpensesTotal } from "../../../redux/selectors/expenses-total";

const expenses = [{
    id: "1",
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: 0
}, {
    id: "2",
    description: "Rent",
    note: "",
    amount: 108500,
    createdAt: moment(0).subtract(4, "days").valueOf()
},
{
    id: "3",
    description: "Credit card",
    note: "",
    amount: 45000,
    createdAt: moment(0).add(4, "days").valueOf()
}]

test("should return 0 if no expenses", () => {
    const result = selectExpensesTotal();
    expect(result).toBe(0)
});

test("should correctly add up a single expense", () => {
    const result = selectExpensesTotal([expenses[1]]);
    expect(result).toBe(expenses[1].amount)
})

test("should correctly add up multuple expense", () => {
    const result = selectExpensesTotal(expenses);
    const total = expenses[0].amount + expenses[1].amount + expenses[2].amount
    expect(result).toBe(total)
})