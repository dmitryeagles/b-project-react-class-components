import React from "react";
import styles from './adminExamTestCategoryTitleStyle.scss';

interface AdminExamTestCategoryTitleProps {
    readonly categoryTitle: string;
}

function AdminExamTestCategoryTitle(props: AdminExamTestCategoryTitleProps) {
    return (
        <div className={styles.categoryTitle}>
            {props.categoryTitle}
        </div>
    );
}

export default React.memo(AdminExamTestCategoryTitle);