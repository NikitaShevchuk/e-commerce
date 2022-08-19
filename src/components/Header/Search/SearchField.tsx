import React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import {setSearchRequest} from "../../../store/slices/searchSlice";
import {useTypedDispatch} from "../../../hooks/redux";

const SearchField = () => {
    let [searchFiledValue, setSearchFieldValue] = React.useState('')
    const dispatch = useTypedDispatch()

    const updateSearchValue = React.useCallback(
        debounce((value) => dispatch(setSearchRequest(value)), 250),
    [])
    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setSearchFieldValue(e.target.value)
        updateSearchValue(e.target.value)
    }
    return (
        <TextField
            sx={{mb: 4}} fullWidth variant='standard'
            value={searchFiledValue}
            onChange={handleChange}
            placeholder='Search products'
            InputProps={{endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon fontSize='large'/>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default SearchField;