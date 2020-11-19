export const selectExpensesTotal = (expenses = []) => {
    if (!expenses.length) {
        return 0;
    }

    const amounts = expenses.map(expense => expense.amount || 0);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return amounts.reduce(reducer, 0);
}