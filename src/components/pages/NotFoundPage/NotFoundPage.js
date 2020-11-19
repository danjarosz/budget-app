import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div data-test="NotFoundPage">
      404! - <Link to="/">Go home</Link>
    </div>
  );
};

export default NotFoundPage;
