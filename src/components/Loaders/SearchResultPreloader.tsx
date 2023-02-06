import React from "react";
import ContentLoader from "react-content-loader";
import { Stack } from "@mui/material";

const SearchResultPreloader = () => {
    return (
        <Stack>
            <ContentLoader
                speed={2}
                width={350}
                height={47}
                viewBox="0 0 350 47"
                backgroundColor="#d7d7d7"
                foregroundColor="#f6f6f6"
            >
                <rect x="10" y="10" rx="0" ry="0" width="200" height="27" />
                <rect x="222" y="19" rx="0" ry="0" width="20" height="10" />
                <rect x="255" y="10" rx="0" ry="0" width="50" height="27" />
            </ContentLoader>
        </Stack>
    );
};

export default SearchResultPreloader;
