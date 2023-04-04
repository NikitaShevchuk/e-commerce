import { Skeleton, Stack } from "@mui/material";
import React from "react";

const SearchResultPreloader = () => {
    return (
        <Stack sx={{ width: "100%", marginTop: "30px" }} alignItems="center" direction="row">
            <Skeleton variant="text" sx={{ fontSize: "16px", width: "100px" }} />
            <Skeleton
                variant="text"
                sx={{ fontSize: "10px", margin: "0 10px", width: "20px", height: "10px" }}
            />
            <Skeleton variant="text" sx={{ fontSize: "16px", width: "200px" }} />
        </Stack>
    );
};

export default SearchResultPreloader;
