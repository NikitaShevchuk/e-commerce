import {CountAction, ErrorsAlert, ThunkError} from "./index";

export interface CounterToChange {
    id: string,
    countAction: CountAction,
    counterInputValue?: string
}

export const findByErrorBody = (item: ThunkError, errorBody: ErrorsAlert) => item.body === errorBody
export const filterByErrorBody = (item: ThunkError, errorBody: ErrorsAlert) => item.body !== errorBody

export const changeCounter = (count: number, counterToChange: CounterToChange): number => {
    let itemCount = count
    if (counterToChange.countAction === CountAction.increase) return ++itemCount
    else if (counterToChange.countAction === CountAction.decrease) return --itemCount
    else if (counterToChange.countAction === CountAction.replace) {
        const value = counterToChange.counterInputValue
        if (value) {
            const isValueNumeric = /^\d+$/.test(value)
            if (!isValueNumeric) return 0
            const numericValue = Number(value)
            if (numericValue > 10) return 0
            else return numericValue
        }
        else return 0
    }
    else return 0
}