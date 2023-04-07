import debounce from "lodash.debounce";
import React, { type FC } from "react";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { cartSelector } from "@/store/selectors/cart";
import { modifyCartItemCount, removeCartItem } from "@/store/slices/cart/thunks";
import { type CounterToChange } from "@/store/slices/cart/helpers";
import { CountAction } from "@/store/slices/cart/Types";
import CounterInput from "@/features/CounterInput/CounterInput";
import DecreaseCounter from "@/features/CounterInput/DecreaseCounter";
import IncreaseCounter from "@/features/CounterInput/IncreaseCounter";

interface Props {
    count: number;
    _id: string;
    deleteInProgress: boolean;
}

const CountModifier: FC<Props> = ({ _id, count, deleteInProgress }) => {
    const { itemsIsUpdating: loadingIDs } = useTypedSelector(cartSelector).status;
    const [inputValue, setInputValue] = React.useState<string>(String(count));
    const [counterIsInactive, setIsCounterInactive] = React.useState<boolean>(false);
    const dispatch = useTypedDispatch();
    React.useEffect(
        // find out if current cart item id is in the array of items being loaded
        () => {
            const isLoading = loadingIDs?.find((loadingID) => loadingID === _id);
            isLoading !== undefined ? setIsCounterInactive(true) : setIsCounterInactive(false);
        },
        [loadingIDs]
    );
    const updateCounter = React.useCallback(
        debounce((value: string) => {
            const counterToChange: CounterToChange = {
                _id,
                countAction: CountAction.replace,
                counterInputValue: value
            };
            void dispatch(modifyCartItemCount(counterToChange));
        }, 250),
        []
    );
    const modifyCounter = React.useCallback(
        (countAction: CountAction, value: string | null = null) => {
            const canBeChanged = !counterIsInactive && !deleteInProgress;
            if (canBeChanged) {
                if (value !== null) {
                    setInputValue(value);
                    if (value.length > 0) updateCounter(value);
                    return;
                }
                const counterToChange: CounterToChange = { _id, countAction };
                void dispatch(modifyCartItemCount(counterToChange));
            }
        },
        [counterIsInactive, deleteInProgress]
    );
    const handleItemRemove = () => {
        void (!deleteInProgress && !counterIsInactive && dispatch(removeCartItem(_id)));
    };
    const cartClassName = `flex ${counterIsInactive ? "inactive" : ""}`;
    return (
        <>
            <div className={cartClassName}>
                <div className="cart-features">
                    <DecreaseCounter modifyCounter={modifyCounter} count={count} />
                    <CounterInput
                        modifyCounter={modifyCounter}
                        count={count}
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                    />
                    <IncreaseCounter modifyCounter={modifyCounter} count={count} />
                </div>
                <div className="link-style" onClick={handleItemRemove}>
                    remove
                </div>
            </div>
        </>
    );
};

export default CountModifier;
