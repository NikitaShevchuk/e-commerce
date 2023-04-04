import { useTypedDispatch } from "@/hooks/redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import debounce from "lodash.debounce";
import React from "react";
import { type SearchFieldProps } from "../SearchField";

export const useInitializeSearchField = ({
    searchFieldTextInState,
    isSearchActive,
    updateSearchTextInState
}: SearchFieldProps) => {
    const [searchFieldValue, setSearchFieldValue] = React.useState(searchFieldTextInState);
    React.useEffect(() => {
        if (searchFieldValue === "" && searchFieldTextInState) {
            setSearchFieldValue(searchFieldTextInState);
        }
    }, [searchFieldTextInState]);
    const textFieldRef = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
        const input = textFieldRef.current != null && textFieldRef.current.querySelector("input");
        if (input != null) input.focus();
    }, [isSearchActive]);

    const dispatch = useTypedDispatch();
    const updateSearchValue = React.useCallback(
        debounce((value) => dispatch(updateSearchTextInState(value)), 250),
        []
    );

    return {
        searchFieldValue,
        setSearchFieldValue,
        textFieldRef,
        updateSearchValue
    };
};
