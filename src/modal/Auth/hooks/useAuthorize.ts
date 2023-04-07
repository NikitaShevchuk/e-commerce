import { useTypedDispatch } from "@/hooks/redux";
import { authThunk } from "@/store/slices/profile/thunks";
import React from "react";

export const useAuthorize = () => {
    const dispatch = useTypedDispatch();
    React.useEffect(() => {
        void dispatch(authThunk());
    }, []);
};
