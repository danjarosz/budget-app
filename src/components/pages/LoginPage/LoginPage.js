import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from "../../../redux/actions/auth"

const LoginPage = () => {
    const dispatch = useDispatch();

    return (
        <div data-test="LoginPage" className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">Expensify</h1>
                <p className="box-layout__subtitle">It's time to get your expenses under control</p>
                <button data-test="LoginButton" className="button" onClick={() => dispatch(startLogin())}>Login with Google</button>
            </div>
        </div>
    )
}

export default LoginPage;