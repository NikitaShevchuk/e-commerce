import React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import {setIsSearchActive, setSearchRequest} from "../../../store/slices/searchSlice";
import {useTypedDispatch, useTypedSelector} from "../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {getFilters} from "../../../store/selectors/filter";

const SearchField = () => {
    let {searchRequest, isSearchActive} = useTypedSelector(state => state.searchSlice)
    if (!searchRequest) searchRequest = ''
    let [searchFieldValue, setSearchFieldValue] = React.useState(searchRequest)
    const {currentPage, itemsLimit} = useTypedSelector(getFilters)
    React.useEffect(() => {
            if (searchFieldValue === '' && searchRequest) {
                setSearchFieldValue(searchRequest)
            }
        }, [searchRequest]
    )
    const textField = React.useRef<HTMLDivElement | null>(null)
    React.useEffect(
        () => {
            let input = textField.current && textField.current.querySelector('input')
            if (input) input.focus()
        }, [isSearchActive]
    )
    const dispatch = useTypedDispatch()
    const updateSearchValue = React.useCallback(
        debounce((value) => dispatch(setSearchRequest(value)), 250),
    [])

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        let value = e.target.value
        setSearchFieldValue(value)
        if (value.length > 1) updateSearchValue(value)
    }
    const navigate = useNavigate()
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchFieldValue.length > 2) {
            navigate(`/search/1/men?p=${currentPage}&${itemsLimit}&search=${searchRequest}`)
            dispatch(setIsSearchActive(false))
        }
    }
    return (
        <TextField
            sx={{mb: 4}} fullWidth variant='standard'
            value={searchFieldValue}
            onChange={handleChange}
            placeholder='Search products'
            onKeyDown={handleKeyDown}
            ref={textField}
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