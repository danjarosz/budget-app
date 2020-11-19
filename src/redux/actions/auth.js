import { firebase, googleAuthProvider } from "../../firebase/firebase";
import { LOGIN, LOGOUT } from "../action-types/auth";

export const login = (uid) => {
    return {
        type: LOGIN,
        uid,
    }
}

export const startLogin = () => {
    return (dispatch) => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const startLogout = () => {
    return (dispatch) => {
        return firebase.auth().signOut();
    }
}