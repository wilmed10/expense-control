/* eslint-disable react-refresh/only-export-components */
import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

//accion de tener el estado global (genera)
export const BudgetContext = createContext<BudgetContextProps>(null!)

//datos que va a tener el context
export const BudgetProvider = ({children}: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() =>
        state.expenses.reduce((total, expense) => expense.amount + total, 0)
    , [state.expenses])

    const remainingBudget = state.budget - totalExpenses

    return (
        //estado global (BudgetContext), mediante value states, actions
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}    
        >
            {children}
        </BudgetContext.Provider>
    )
}


/* export const aaaContext = createContext()
export const aaaProvider = ({children}) => {

    return (
        <aaaContext.Provider 
            value={{
                bbb,
                ccc
            }}
        >
            {children}
        </aaaContext.Provider>
    )
} */