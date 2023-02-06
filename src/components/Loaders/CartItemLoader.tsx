import React from "react";
import ContentLoader from "react-content-loader";

const CartItemLoader = () => {
    return (
        <ContentLoader
            speed={2}
            width={470}
            height={100}
            viewBox="0 0 470 100"
            backgroundColor="#d7d7d7"
            foregroundColor="#f6f6f6"
        >
            <rect x="0" y="0" rx="0" ry="0" width="80" height="100" />
            <rect x="100" y="0" rx="0" ry="0" width="160" height="20" />
            <rect x="420" y="0" rx="0" ry="0" width="50" height="20" />
            <rect x="101" y="30" rx="0" ry="0" width="50" height="20" />
            <rect x="100" y="55" rx="0" ry="0" width="90" height="20" />
            <rect x="100" y="84" rx="0" ry="0" width="113" height="16" />
            <rect x="405" y="90" rx="0" ry="0" width="65" height="10" />
        </ContentLoader>
    );
};

export default CartItemLoader;
