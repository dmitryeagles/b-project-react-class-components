import React from "react";
import styles from "./filtersContainerStyle.scss";

interface FiltersContainerProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}

function FiltersContainer(props: FiltersContainerProps) {
    return (<div
        className={props.className ? `${props.className} ${styles.componentContainer}` : styles.componentContainer}>{props.children}</div>);
}

export default React.memo(FiltersContainer);
