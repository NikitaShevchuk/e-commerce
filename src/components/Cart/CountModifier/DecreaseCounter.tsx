import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import React, { FC } from "react";
import { CountAction } from "../../../store/slices/cartSlice/Types";

interface Props {
    modifyCounter: (countAction: CountAction) => void;
    count: number;
}

const DecreaseCounter: FC<Props> = ({ modifyCounter, count }) => {
    const handleDecrease = () => count > 1 && modifyCounter(CountAction.decrease);
    const btnOpacity = React.useMemo<0.4 | 1>(() => (count > 1 ? 1 : 0.4), [count]);
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
