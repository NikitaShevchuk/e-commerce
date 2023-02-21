import React, { Dispatch, FC, SetStateAction } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { cartSelector } from "../../../store/selectors/cart";
import { CountAction, ErrorsAlert } from "../../../store/slices/cartSlice/Types";

interface Props {
    count: number;
    modifyCounter: (countAction: CountAction, value: string) => void;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
}

const CounterInput: FC<Props> = ({ count, modifyCounter, setInputValue, inputValue }) => {
    const errors = useTypedSelector(cartSelector).errors;
    React.useEffect(() => {
        const counterThunkError =
            errors && errors.find((item) => item.body === ErrorsAlert.valueIsNotValid);
        if (counterThunkError) setInputValue(String(count));
    }, [errors]);
    React.useEffect(() => {
        setInputValue(String(count));
    }, [count]);
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        modifyCounter(CountAction.replace, e.target.value);
    };
    return <input className="cart-count" value={inputValue} onChange={inputHandler} />;
};

export default CounterInput;
