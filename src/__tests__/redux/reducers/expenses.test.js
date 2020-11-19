import moment from "moment";
import expensesReducer from "../../../redux/reducers/expenses";

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

test("should setup default expenses", () => {
    const action = { type: "@@INIT" }
    const state = expensesReducer(undefined, action);
    expect(state).toEqual([])
})

describe("REMOVE_EXPENSE", () => {
    test("should remove an expense by id", () => {
        const action = { type: "REMOVE_EXPENSE", id: expenses[1].id }
        const state = expensesReducer(expenses, action)
        expect(state).toEqual([
            expenses[0],
            expenses[2]
        ])
    })
    test("shouldn't remove any expense, because the provided id doens't exist in any expense", () => {
        const action = { type: "REMOVE_EXPENSE", id: "-1" }
        const state = expensesReducer(expenses, action)
        expect(state).toEqual(expenses)
    })
})

describe("EDIT_EXPENSE", () => {
    test("should edit an expense", () => {
        const note = "this is a new note"
        const action = {
            type: "EDIT_EXPENSE",
            id: expenses[0].id,
            updates: {
                note
            }
        }
        const state = expensesReducer(expenses, action);
        expect(state).toEqual([
            {
                ...expenses[0],
                note
            },
            expenses[1],
            expenses[2]
        ])
    })
    test("should not edit an expense if expense doesn't found", () => {
        const action = {
            type: "EDIT_EXPENSE", id: "notFound", updates: {
                amount: 10000000000
            }
        }
        const state = expensesReducer(expenses, action)
        expect(state).toEqual(expenses)
    })
})

describe("ADD_EXPENSE", () => {
    test("should add an expense", () => {
        const expense = {
            id: "111",
            description: "Laptop",
            note: "",
            amount: 19500,
            createdAt: 0
        }
        const action = {
            type: "ADD_EXPENSE",
            expense
        }
        const state = expensesReducer(expenses, action)
        expect(state).toEqual([
            ...expenses,
            expense
        ])
    })
}) 