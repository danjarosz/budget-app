import { LOGIN, LOGOUT } from "../action-types/auth";

const initialState = {};
const authReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case LOGIN: {
            return {
                uid: action.uid
            }
        }
        case LOGOUT: {
            return {}
        }
        default:
            return state
    }
}

export default authReducer;