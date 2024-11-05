import React from "react";
import styles from './pageContainerStyle.scss';

interface PageContainerProps {
    children: React.ReactNode;
}

export default function PageContainer(props: PageContainerProps) {
    return (
        <div className={styles.pageContainer}>
            {props.children}
        </div>
    );
}

