import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import React, { type FC } from "react";
import { CountAction } from "../../store/slices/cart/Types";

interface Props {
    modifyCounter: (countAction: CountAction) => void;
    quantity: number;
}

const DecreaseCounter: FC<Props> = ({ modifyCounter, quantity }) => {
    const handleDecrease = () => {
        quantity > 1 && modifyCounter(CountAction.decrease);
    };
    const btnOpacity = React.useMemo<0.4 | 1>(() => (quantity > 1 ? 1 : 0.4), [quantity]);
    return (
        <IndeterminateCheckBoxIcon
            fontSize="small"
            onClick={handleDecrease}
            className="count-modifier"
            fillOpacity={btnOpacity}
        />
    );
};

export default DecreaseCounter;
