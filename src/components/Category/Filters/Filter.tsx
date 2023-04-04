import FilterPreloader from "@/components/Loaders/Category/Filter/FilterPreloader";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { type ActionCreatorWithPayload } from "@reduxjs/toolkit";
import * as React from "react";
import { type FC } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { getFilters } from "../../../store/selectors/filter";
import { type Sort } from "../../../store/slices/filterSlice";
import FilterCheckbox from "./FilterCheckbox";
import SortSelect from "./SortSelect";

interface Props {
    filterItems?: string[];
    selectMenuItems?: Sort[];
    title: "sizes" | "color" | "sort";
    addFilterProperty: ActionCreatorWithPayload<any>;
    removeFilterProperty?: ActionCreatorWithPayload<string>;
    filterType: "checkbox" | "select";
}

const Filter: FC<Props> = ({
    filterItems,
    title,
    addFilterProperty,
    removeFilterProperty,
    filterType,
    selectMenuItems
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const filtersFromState = useTypedSelector(getFilters);
    const checkBoxItems = React.useMemo(() => {
        const shouldRenderCheckbox = filterItems != null && filterType === "checkbox";
        if (shouldRenderCheckbox)
            return filterItems.map((checkBoxName) => {
                const targetFilter = filtersFromState[title] as string[] | undefined;
                const isCheckedByDefault = Boolean(
                    targetFilter?.find((filterName) => filterName === checkBoxName)
                );
                return (
                    <FilterCheckbox
                        key={checkBoxName}
                        checkBoxName={checkBoxName}
                        isCheckedByDefault={isCheckedByDefault}
                        addFilterProperty={addFilterProperty}
                        removeFilterProperty={removeFilterProperty}
                    />
                );
            });
        else return [];
    }, [filterItems]);
    const selectorItems = React.useMemo(() => {
        const shouldRenderSelect = filterType === "select" && selectMenuItems !== undefined;
        if (shouldRenderSelect !== undefined && shouldRenderSelect)
            return selectMenuItems.map((selectMenuItem) => (
                <SortSelect
                    key={String(selectMenuItem.property) + String(selectMenuItem.order)}
                    selectMenuItem={selectMenuItem}
                    addFilterProperty={addFilterProperty}
                />
            ));
        else return [];
    }, [selectMenuItems]);
    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="text"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {title}
            </Button>
            <Menu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button"
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {checkBoxItems}
                {selectorItems}
                {filterItems == null && filterType === "checkbox" && <FilterPreloader />}
                {selectMenuItems == null && filterType === "select" && <FilterPreloader />}
            </Menu>
        </div>
    );
};

export default Filter;
