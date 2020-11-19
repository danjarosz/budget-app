import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, amount, createdAt }) => {
  return (
    <Link to={`/edit/${id}`} data-test="ExpenseListItem" className="list-item">
      <div>
        <h3 className="list-item__title">{description}</h3>
        <span className="list-item__subtitle">{moment(createdAt).format("DD.MM.YYYY")}</span>
      </div>
      <h3 className="list-item__data">
        {numeral(amount / 100).format("$0,0.00")}
      </h3>
    </Link>
  );
};

export default ExpenseListItem;
