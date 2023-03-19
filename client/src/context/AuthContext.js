import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    user: { 
            _id:"6414a8859f36c05899e692dd",
            username:"john",
            email:"john@gmail.com",
            password:"$2b$10$F2yG.LVc1TwscQlSMv/K9.ipX/dT69Ezs83UCzpZyHBE4IxR7Rqc6",
            profilePicture:"",
            coverPicture:"",
            followers:[],
            following:[],
            isAdmin:false,
    },
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}