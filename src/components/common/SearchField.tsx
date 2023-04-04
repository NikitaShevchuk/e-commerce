import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { type ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { type FC } from "react";
import { useInitializeSearchField } from "./hooks/useInitializeSearchField";

export interface SearchFieldProps {
    onEnterPress: () => void;
    searchFieldTextInState: string | null;
    isSearchActive: boolean;
    updateSearchTextInState: ActionCreatorWithPayload<string | null, string>;
}

const SearchField: FC<SearchFieldProps> = (props) => {
    const { searchFieldValue, setSearchFieldValue, textFieldRef, updateSearchValue } =
        useInitializeSearchField(props);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchFieldValue(value);
        if (value.length > 1) updateSearchValue(value);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const shouldMakeRequest =
            e.key === "Enter" && searchFieldValue && searchFieldValue.length > 1;
        if (shouldMakeRequest) props.onEnterPress();
    };
    const handleSearchClick = () => {
        if (searchFieldValue && searchFieldValue.length > 1) props.onEnterPress();
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
            ref={textFieldRef}
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
