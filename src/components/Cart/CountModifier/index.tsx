import React, {FC} from 'react';
import {useTypedDispatch, useTypedSelector} from "../../../hooks/redux";
import {modifyCartItemCount, removeCartItem} from "../../../store/slices/cartSlice/cart-thunks";
import {CountAction} from "../../../store/slices/cartSlice";
import {cartSelector} from "../../../store/selectors/cart";
import debounce from 'lodash.debounce'
import IncreaseCounter from "./IncreaseCounter";
import DecreaseCounter from "./DecreaseCounter";
import CounterInput from "./CounterInput";
import {CounterToChange} from "../../../store/slices/cartSlice/helpers";

interface Props {
    count: number
    id: string
    deleteInProgress: boolean
}

const CountModifier: FC<Props> = ({id, count, deleteInProgress}) => {
    const {itemsIsUpdating: loadingIDs} = useTypedSelector(cartSelector).status
    const [inputValue, setInputValue] = React.useState<string>(String(count))
    const [counterIsInactive, setIsCounterInactive] = React.useState<boolean>(false)
    const dispatch = useTypedDispatch()
    React.useEffect(
        // find out if current cart item id is in the array of items being loaded
        () => {
            let isLoading = loadingIDs && loadingIDs.find(loadingID => loadingID === id)
            isLoading ? setIsCounterInactive(true) : setIsCounterInactive(false)
        },
        [loadingIDs])
    const updateCounter = React.useCallback(
        debounce((value: string) => {
            const counterToChange: CounterToChange = {
                id,
                countAction: CountAction.replace,
                counterInputValue: value
            }
            dispatch(modifyCartItemCount(counterToChange))
        }, 250),
    [])
    const modifyCounter = React.useCallback(
        (countAction: CountAction, value: string | null = null) => {
            const canBeChanged = !counterIsInactive && !deleteInProgress
            if (canBeChanged) {
                if (value) {
                    setInputValue(value)
                    if (value.length > 0) updateCounter(value)
                    return
                }
                const counterToChange: CounterToChange = {id, countAction}
                dispatch(modifyCartItemCount(counterToChange))
            }
        },
        [counterIsInactive, deleteInProgress]
    )
    const handleItemRemove = () => {
        !deleteInProgress && !counterIsInactive && dispatch(removeCartItem(id))
    }
    const cartClassName = `flex ${counterIsInactive ? 'inactive' : '' }`
    return (<>
        <div className={cartClassName}>
            <div className="cart-features">
                <DecreaseCounter
                    modifyCounter={modifyCounter}
                    count={count}
                />
                <CounterInput
                    modifyCounter={modifyCounter}
                    count={count}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                />
                <IncreaseCounter
                    modifyCounter={modifyCounter}
                    count={count}
                />
            </div>
            <div
                className='link-style'
                onClick={handleItemRemove}
            >
                remove
            </div>
        </div>
    </>);
};

export default CountModifier;