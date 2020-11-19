import React from "react";
import { useSelector } from "react-redux";
import { getVisibleExpenses } from "../../redux/selectors/expenses";
import ExpenseListItem from "./components/ExpenseListItem/ExpenseListItem";

const ExpenseList = () => {
  const expenses = useSelector((state) =>
    getVisibleExpenses(state.expenses, state.filters)
  );
  return (
    <div data-test="ExpenseList" className="content-container">
      <div className="list-header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
      </div>
      <div className="list-body">
        {expenses.length ? (
          expenses.map((expense) => {
            const { id, description, amount, createdAt } = expense;
            return (
              <ExpenseListItem
                data-test="ExpenseListItem"
                key={id}
                id={id}
                description={description}
                amount={amount}
                createdAt={createdAt}
              />
            );
          })
        ) : (
            <div>
              <span data-test="noExpensesInfo" className="list-item list-item--message">No expenses</span>
            </div>
          )}
      </div>
    </div>
  );
};

export default ExpenseList;
