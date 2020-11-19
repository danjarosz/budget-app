import React from 'react';
import numeral from "numeral";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVisibleExpenses } from "../../redux/selectors/expenses";
import { selectExpensesTotal } from "../../redux/selectors/expenses-total"

const ExpensesSummary = () => {
    const expensesCount = useSelector(state => getVisibleExpenses(state.expenses, state.filters).length);
    const expensesTotal = useSelector(state => selectExpensesTotal(getVisibleExpenses(state.expenses, state.filters)));
    const expenseWord = `${expensesCount > 1 ? "expenses" : "expense"}`;
    const formatedExpensesTotal = numeral(expensesTotal / 100).format("$0,0.00")
    return (
        <div className="page-header">
            <div className="content-container">
                <h2 className="page-header__title">Viewing of <span>{expensesCount}</span> {expenseWord} totalling <span>{formatedExpensesTotal}</span></h2>
                <div className="page-header__actions">
                    <Link to="/create" className="button">Add Expense</Link>
                </div>
            </div>
        </div>
    )
}

export default ExpensesSummary