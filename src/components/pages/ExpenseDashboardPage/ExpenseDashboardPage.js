import React from "react";
import ExpenseList from "../../ExpenseList/ExpenseList";
import ExpenseListFilters from "../../ExpenseListFilters/ExpenseListFilters";
import ExpensesSummary from "../../ExpensesSummary/ExpensesSummary"

const ExpenseDashboardPage = () => {
  return (
    <div data-test="ExpenseDashboardPage">
      <ExpensesSummary />
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  );
};

export default ExpenseDashboardPage;
