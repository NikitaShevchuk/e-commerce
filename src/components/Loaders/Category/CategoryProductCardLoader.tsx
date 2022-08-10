import React from 'react';
import ContentLoader from "react-content-loader";

const CategoryProductCardLoader = () => {
    return (
        <ContentLoader
            speed={2}
            width={370}
            height={575}
            viewBox="0 0 370 575"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="0" ry="0" width="370" height="525" />
            <rect x="2" y="532" rx="0" ry="0" width="370" height="15" />
            <rect x="3" y="552" rx="0" ry="0" width="50" height="21" />
        </ContentLoader>
    );
};

export default CategoryProductCardLoader;