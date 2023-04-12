import { AddBox } from "@mui/icons-material";
import React, { type FC } from "react";
import { CountAction } from "../../store/slices/cart/Types";

interface Props {
    modifyCounter: (countAction: CountAction) => void;
    quantity: number;
}

const IncreaseCounter: FC<Props> = ({ modifyCounter, quantity }) => {
    const handleIncrease = () => {
        quantity < 10 && modifyCounter(CountAction.increase);
    };
    const btnOpacity = React.useMemo<0.4 | 1>(() => (quantity < 10 ? 1 : 0.4), [quantity]);
    return (
        <AddBox
            onClick={handleIncrease}
            fontSize="small"
            className="count-modifier"
            fillOpacity={btnOpacity}
        />
    );
};

export default IncreaseCounter;
