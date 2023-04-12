import React, { type Dispatch, type FC, type SetStateAction } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { cartSelector } from "../../store/selectors/cart";
import { CountAction, ErrorsAlert } from "../../store/slices/cart/Types";

interface Props {
    quantity: number;
    modifyCounter: (countAction: CountAction, value: string) => void;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
}

const CounterInput: FC<Props> = ({ quantity, modifyCounter, setInputValue, inputValue }) => {
    const errors = useTypedSelector(cartSelector).errors;
    React.useEffect(() => {
        const counterThunkError = errors?.find((item) => item.body === ErrorsAlert.valueIsNotValid);
        if (counterThunkError != null) setInputValue(String(quantity));
    }, [errors]);
    React.useEffect(() => {
        setInputValue(String(quantity));
    }, [quantity]);
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        modifyCounter(CountAction.replace, e.target.value);
    };
    return <input className="cart-count" value={inputValue} onChange={inputHandler} />;
};

export default CounterInput;
