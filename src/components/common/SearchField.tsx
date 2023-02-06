import React, { FC } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTypedDispatch } from "../../hooks/redux";
import debounce from "lodash.debounce";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Props {
    onEnterPress: () => void;
    searchFieldTextInState: string | null;
    isSearchActive: boolean;
    updateSearchTextInState: ActionCreatorWithPayload<string | null, string>;
}

const SearchField: FC<Props> = ({
    onEnterPress,
    searchFieldTextInState,
    isSearchActive,
    updateSearchTextInState
}) => {
    const [searchFieldValue, setSearchFieldValue] = React.useState(searchFieldTextInState);
    React.useEffect(() => {
        if (searchFieldValue === "" && searchFieldTextInState) {
            setSearchFieldValue(searchFieldTextInState);
        }
    }, [searchFieldTextInState]);
    const textField = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
        const input = textField.current && textField.current.querySelector("input");
        if (input) input.focus();
    }, [isSearchActive]);

    const dispatch = useTypedDispatch();
    const updateSearchValue = React.useCallback(
        debounce((value) => dispatch(updateSearchTextInState(value)), 250),
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchFieldValue(value);
        if (value.length > 1) updateSearchValue(value);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const shouldMakeRequest =
            e.key === "Enter" && searchFieldValue && searchFieldValue.length > 1;
        if (shouldMakeRequest) onEnterPress();
    };
    const handleSearchClick = () => {
        if (searchFieldValue && searchFieldValue.length > 1) onEnterPress();
    };
    return (
        <TextField
            sx={{ mb: 1, ml: 1 }}
            fullWidth
            variant="standard"
            value={searchFieldValue}
            onChange={handleChange}
            placeholder="Search products"
            onKeyDown={handleKeyDown}
            ref={textField}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon fontSize="large" onClick={handleSearchClick} cursor="pointer" />
                    </InputAdornment>
                )
            }}
        />
    );
};

export default SearchField;
