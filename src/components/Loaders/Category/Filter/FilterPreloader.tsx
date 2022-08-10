import React from "react"
import ContentLoader from "react-content-loader"

const FilterPreloader = () => (
  <ContentLoader 
    speed={2}
    width={110}
    height={200}
    viewBox="0 0 110 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="110" height="200" />
  </ContentLoader>
)

export default FilterPreloader