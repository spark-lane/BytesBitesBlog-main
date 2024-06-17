import {createContext,useReducer} from "react";
import Reducer from "./Reducer";
import { useEffect } from "react";

// Inital state obj define the intial state of your application
const INITIAL_STATE ={
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching : false,
    error : false,
};

// Creation of Context for usage in entire application
export const Context = createContext(INITIAL_STATE);


export const ContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(Reducer,INITIAL_STATE);

    // User data is stored in localStorage
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user]);

    // This values will be made avialable to components wrapped by this provider
    return(
        <Context.Provider value={{
            user : state.user,
            isFetching : state.isFetching,
            error : state.error,
            dispatch,
        }}>
            {children}
        </Context.Provider>
    );
};


