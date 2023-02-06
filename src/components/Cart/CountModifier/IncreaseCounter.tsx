import React, { FC } from "react";
import { AddBox } from "@mui/icons-material";
import { CountAction } from "../../../store/slices/cartSlice";

interface Props {
    modifyCounter: (countAction: CountAction) => void;
    count: number;
}

const IncreaseCounter: FC<Props> = ({ modifyCounter, count }) => {
    const handleIncrease = () => count < 10 && modifyCounter(CountAction.increase);
    const btnOpacity = React.useMemo<0.4 | 1>(() => (count < 10 ? 1 : 0.4), [count]);
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
