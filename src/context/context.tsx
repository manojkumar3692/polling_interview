import { createContext, useContext, useReducer } from "react";
import { adminReducer } from "./reducer";

const Poll = createContext({});

const DEFAULT_CONTEXT = [
    {
        id: Date.now(),
        name: 'Should i buy biriyani',
        options: [
            {
                key: Date.now(),
                value: 'Yes',
                count: 60
            },
            {
                key: Date.now(),
                value: 'No',
                count: 30
            }
        ],
        isSubmit: false,
        endDate: new Date()
    }
]



export const GlobalContext = ({ children }:any) => {
    const [ adminState, adminDispatch] = useReducer(adminReducer, {
        polls: DEFAULT_CONTEXT
    })
    return (
        <Poll.Provider value={{adminState, adminDispatch}}>
            {children}
        </Poll.Provider>
    )
}

export const PollState = () => {
    return useContext(Poll);
}

