import React from 'react';
import ContentLoader from "react-content-loader";

const CategoryLoader = () => {
    return (
        <ContentLoader
            speed={2}
            width={730}
            height={730}
            viewBox="0 0 730 730"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="0" ry="0" width="730" height="730" />
        </ContentLoader>
    );
};

export default CategoryLoader;