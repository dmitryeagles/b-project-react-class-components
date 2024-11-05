import React, {useEffect} from "react";
import styles from './pageContentContainerStyle.scss';

interface PageContentContainerProps {
    readonly children: React.ReactNode;
    readonly eventPageExit: () => void;
    readonly eventPageShown: () => void;
    readonly isLoading: boolean;
}

function PageContentContainer(props: PageContentContainerProps){
    useEffect(() => {
        props.eventPageShown();
        return (()=>{
            props.eventPageExit();
        });
    }, []);

    return (
        <div className={styles.pageContainer}>
            {props.children}
        </div>
    );
}

export default React.memo(PageContentContainer);
