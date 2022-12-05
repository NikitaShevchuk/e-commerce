import React from "react"
import ContentLoader from "react-content-loader"

const FilterPreloader = () => (
  <ContentLoader 
    speed={2}
    width={110}
    height={200}
    viewBox="0 0 110 200"
    backgroundColor="#d7d7d7"
    foregroundColor="#f6f6f6"
  >
    <rect x="0" y="0" rx="0" ry="0" width="110" height="200" />
  </ContentLoader>
)

export default FilterPreloader