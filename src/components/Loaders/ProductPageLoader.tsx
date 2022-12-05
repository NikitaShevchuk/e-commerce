import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductPageLoader = () => {
    return (
        <ContentLoader
            speed={2}
            width='100%'
            height='91vh'
            backgroundColor="#d7d7d7"
            foregroundColor="#f6f6f6"
        >
            <rect width="40%" height="100%" />
            <rect x="55%" y="37%" width="27%" height="30" />
            <rect x="85%" y="37%" width="5%" height="30" />
            <rect x="55%" y="45%" width="35%" height="12%" />
            <rect x="57%" y="60%" width="25%" height="40" />
            <rect x="83%" y="60%" width="4%" height="40" />
        </ContentLoader>
    );
};

export default ProductPageLoader;