import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import database from "../../../firebase/firebase";
import { addExpense, startAddExpense, startRemoveExpense, removeExpense, startEditExpense, editExpense, setExpenses, startSetExpenses } from "../../../redux/actions/expenses"
import moment from 'moment';

const uid = "thisistestuid";
const createMockStore = configureMockStore([thunk]);

describe("should setup add expense action object", () => {

    test("with provided values", () => {
        const expenseData = {
            description: "Rent",
            amount: 1024,
            createdAt: 1000,
            note: "this was last month"
        }
        const action = addExpense(expenseData)
        expect(action).toEqual({
            type: "ADD_EXPENSE",
            expense: expenseData
        })
    })

    //asyncronic test
    test("should add expense to database and store", (done) => {
        const store = createMockStore({
            auth: {
                uid
            }
        });
        const expenseData = {
            description: "Rent",
            amount: 1024,
            createdAt: 1000,
            note: "this was last month"
        }
        store.dispatch(startAddExpense(expenseData)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    })

    test("should add expense with defaults to database and store", (done) => {
        const store = createMockStore({
            auth: {
                uid
            }
        });
        const defaultExpenseData = {
            description: "",
            note: "",
            amount: 0,
            createdAt: 0,
        }
        store.dispatch(startAddExpense()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...defaultExpenseData
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(defaultExpenseData);
            done();
        });
    })
})

describe("fetching data", () => {
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

    beforeEach((done) => {
        const expensesData = {};
        expenses.forEach(({ id, description, note, amount, createdAt }) => {
            expensesData[id] = { description, note, amount, createdAt };
        });
        database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
    });


    test('should setup set expense action object with data', () => {
        const action = setExpenses(expenses);
        expect(action).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
    });

    test('should fetch the expenses from firebase', (done) => {
        const store = createMockStore({
            auth: {
                uid
            }
        });
        store.dispatch(startSetExpenses()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses
            });
            done();
        });
    });

})

describe("removing data", () => {
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

    beforeEach((done) => {
        const expensesData = {};
        expenses.forEach(({ id, description, note, amount, createdAt }) => {
            expensesData[id] = { description, note, amount, createdAt };
        });
        database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
    });

    test("should setup remove expense action object", () => {
        const result = removeExpense({ id: "1234" })
        expect(result).toEqual({ type: "REMOVE_EXPENSE", id: "1234" })
    })

    test("should remove expenses fromd database", (done) => {
        const store = createMockStore({
            expenses, auth: {
                uid
            }
        });
        store.dispatch(startRemoveExpense({ id: "2" })).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "REMOVE_EXPENSE",
                id: "2"
            })
            return database.ref(`users/${uid}/expenses`).once('value')
        }).then(snapshot => {
            const fetchedExpenses = [];
            snapshot.forEach(childSnapshot => {
                fetchedExpenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            expect(fetchedExpenses).toEqual([
                expenses[0], expenses[2]
            ])
            done();
        })
    })
})


describe("editing expense", () => {
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

    beforeEach((done) => {
        const expensesData = {};
        expenses.forEach(({ id, description, note, amount, createdAt }) => {
            expensesData[id] = { description, note, amount, createdAt };
        });
        database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
    });

    test("should edit expense in the database", (done) => {
        const store = createMockStore({
            expenses, auth: {
                uid
            }
        });
        const id = "3"
        const updates = { amount: 100, note: "lalala" };
        store.dispatch(startEditExpense("3", updates)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "EDIT_EXPENSE",
                id,
                updates
            })
            return database.ref(`users/${uid}/expenses/${id}`).once('value');
        }).then((snapshot) => {
            expect({
                id: snapshot.key,
                ...snapshot.val()
            }).toEqual({
                ...expenses[2],
                ...updates
            })
            done()
        })
    })

    test("should setup edit expense action object", () => {
        const id = "1234"
        const updates = {
            note: "new note",
        }
        const result = editExpense(id, updates);
        expect(result).toEqual({
            type: "EDIT_EXPENSE",
            id: "1234",
            updates: {
                note: "new note"
            }
        })
    })
})



