import React from "react";
import SkeletonItem from "./skeletonItem";

interface SkeletonItemsListProps {
    readonly itemsCount: number;
}

function SkeletonItemsList(props: SkeletonItemsListProps) {
    let itemsCount = 0;

    if (typeof props.itemsCount === 'number') {
        if (props.itemsCount > 0) {
            itemsCount = props.itemsCount;
        }
    }

    const itemsElements: JSX.Element[] = [];

    for (let i = 0; i < itemsCount; ++i) {
        itemsElements.push(<SkeletonItem key={i}/>);
    }

    return (
        <>
            {itemsElements}
        </>
    );
}

export default React.memo(SkeletonItemsList);
