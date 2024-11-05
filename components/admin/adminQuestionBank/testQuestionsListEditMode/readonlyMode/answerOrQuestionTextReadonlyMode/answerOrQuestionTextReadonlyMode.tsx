import React from 'react';
import styles from './answerOrQuestionTextReadonlyModeStyle.scss';

interface AnswerOrQuestionReadonlyStatusProps {
    readonly htmlText: string;
    readonly placeholder?: string;
}

function AnswerOrQuestionTextReadonlyMode(props: AnswerOrQuestionReadonlyStatusProps){

    if (!props.htmlText) {
        if(props.placeholder) {
            return (
                <div className={styles.placeholderText}>
                    {props.placeholder}
                </div>
            );
        }
    }

    return(
        <div
            className={styles.containerReadonlyText}
            dangerouslySetInnerHTML={{
                __html: props.htmlText
            }}
        />
    );
}

export default React.memo(AnswerOrQuestionTextReadonlyMode);
