import React from 'react';
import ContentLoader from "react-content-loader";

const CategoryLoader = () => {
    return (
        <ContentLoader
            speed={2}
            width={730}
            height={730}
            viewBox="0 0 730 730"
            backgroundColor="#d7d7d7"
            foregroundColor="#f6f6f6"
        >
            <rect x="0" y="0" rx="0" ry="0" width="730" height="730" />
        </ContentLoader>
    );
};

export default CategoryLoader;