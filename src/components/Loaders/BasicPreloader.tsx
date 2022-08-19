import React, {FC} from 'react';

interface Props {
    isLoading: boolean
    isFetching: boolean
    itemsToShow: number
    children: React.ReactNode
}

const BasicPreloader: FC<Props> = ({isLoading, isFetching, itemsToShow, ...props}) =>  {
    return (<>{isLoading || isFetching
        ? Array.from(Array(itemsToShow)).map(() => (props.children))
        : ''
    }</>);
};

export default BasicPreloader;