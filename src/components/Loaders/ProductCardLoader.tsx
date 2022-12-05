import React from 'react'
import ContentLoader from 'react-content-loader'

const ProductCardLoader = () => (
    <ContentLoader
        speed={2}
        width={320}
        height={450}
        viewBox="0 0 320 450"
        backgroundColor="#d7d7d7"
        foregroundColor="#f6f6f6"
    >
        <rect x="0" y="0" rx="0" ry="0" width="320" height="400" />
        <rect x="1" y="415" rx="0" ry="0" width="320" height="15" />
        <rect x="0" y="437" rx="0" ry="0" width="35" height="18" />
    </ContentLoader>
)

export default ProductCardLoader