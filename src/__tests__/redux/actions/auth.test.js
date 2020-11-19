import { login, logout } from "../../../redux/actions/auth";

test("should setup correct uid login action object", () => {
    const uid = "1234";
    const result = login(uid);
    expect(result).toEqual({
        type: "LOGIN",
        uid,
    })
})

test("should setup correct logout action object (empty object)", () => {
    const result = logout();
    expect(result).toEqual({
        type: "LOGOUT",

    })
})