import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

const initialState = { 
    user: {},
    isAuthenticated: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case 'logout':
            return {
                ...state,
                user: {},
                isAuthenticated: false
            }
        default:
            throw new Error("invalid action type")
    }
}

function AuthProvider({children}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

    function Login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: 'login', payload: {...FAKE_USER}})
        }
    }

    function Logout() {
        dispatch({type: 'logout'})
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            Login,
            Logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}


function useAuthContext() {
    const context = useContext(AuthContext) 
    if (context === undefined) {
        throw new Error("AuthContext used outside provider")
    }
    return context        
}

export {AuthProvider, useAuthContext,}