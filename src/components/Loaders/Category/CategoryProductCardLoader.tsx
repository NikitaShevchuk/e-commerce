import React from 'react';
import ContentLoader from "react-content-loader";
import {Grid} from "@mui/material";


const CategoryProductCardLoader = () => {
    return (
        <Grid item xs={2} sm={3} md={3}>
            <ContentLoader
                speed={2}
                width={370}
                height={575}
                viewBox="0 0 370 575"
                backgroundColor="#d7d7d7"
                foregroundColor="#f6f6f6"
            >
                <rect x="0" y="0" rx="0" ry="0" width="370" height="525"/>
                <rect x="2" y="532" rx="0" ry="0" width="370" height="15"/>
                <rect x="3" y="552" rx="0" ry="0" width="50" height="21"/>
            </ContentLoader>
        </Grid>);
};

export default CategoryProductCardLoader;