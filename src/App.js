import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startSetExpenses } from "./redux/actions/expenses"
import AppRouter, { history } from "./routers/AppRouter";
import LoadingPage from "./components/pages/LoadingPage/LoadingPage";
import { firebase } from "./firebase/firebase";
import { login, logout } from "./redux/actions/auth";

const App = () => {
  const dispatch = useDispatch();
  const [expensesFetching, setExpensesFetching] = useState(true);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user.uid))
        dispatch(startSetExpenses()).then(() => {
          setExpensesFetching(false);
        })
        if (history.location.pathname === "/") {
          history.push("/dashboard")
        }
      } else {
        dispatch(logout())
        setExpensesFetching(false);
        history.push("/")
      }
    })
  }, [dispatch])
  return (
    expensesFetching ? <LoadingPage /> : <AppRouter data-test="AppRouter" />
  )
};

export default App;
