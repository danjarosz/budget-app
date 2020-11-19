import authReducer from "../../../redux/reducers/auth";

test('should setup correct state (uid) after login', () => {
    const uid = "1234"
    const action = {
        type: "LOGIN",
        uid
    }
    const state = authReducer({}, action);
    expect(state).toEqual({
        uid
    });
})

test('should setup correct state (empty object) after logout', () => {

    const action = {
        type: "LOGOUT",

    }
    const state = authReducer({ uid: "1234" }, action);
    expect(state).toEqual({});
})