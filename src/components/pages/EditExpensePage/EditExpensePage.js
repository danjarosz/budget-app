import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../../../redux/actions/expenses";
import ExpenseForm from "../../ExpenseForm/ExpenseForm";

const EditExpensePage = () => {
  const history = useHistory();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const expense = useSelector((props) =>
    props.expenses.find((expense) => expense.id === id)
  );

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm
          expense={expense}
          onSubmit={(expense) => {
            dispatch(startEditExpense(id, expense));
            history.push({ pathname: "/dashboard" });
          }}
        />
        <button
          className="button button--secondary"
          onClick={() => {
            dispatch(startRemoveExpense({ id }));
            history.push({ pathname: "/dashboard" });
          }}
        >
          Remove expense
      </button>
      </div>

    </div>
  );
};

export default EditExpensePage;
