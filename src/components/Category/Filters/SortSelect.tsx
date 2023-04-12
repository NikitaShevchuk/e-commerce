import React, { type FC } from "react";
import { type ActionCreatorWithPayload } from "@reduxjs/toolkit";
import MenuItem from "@mui/material/MenuItem";
import { type Sort } from "../../../store/slices/filter";
import DoneIcon from "@mui/icons-material/Done";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";

interface Props {
    selectMenuItem: Sort;
    addFilterProperty: ActionCreatorWithPayload<any>;
}

const SortSelect: FC<Props> = ({ selectMenuItem, addFilterProperty }) => {
    const sort = useTypedSelector((state) => state.filterSlice.sort);
    const dispatch = useTypedDispatch();
    const handleClick = () => dispatch(addFilterProperty(selectMenuItem));
    return (
        <MenuItem sx={{ pr: 3, pl: 1 }} disableRipple onClick={handleClick}>
            {sort.property === selectMenuItem.property && sort.order === selectMenuItem.order && (
                <DoneIcon />
            )}
            {selectMenuItem.property !== null
                ? `${selectMenuItem.property} (${String(selectMenuItem.order)})`
                : "By default"}
        </MenuItem>
    );
};

export default SortSelect;
