import React, {useState} from "react";
import {dateFormatForView, fixedLengthString} from "ts-common-helpers/dist";
import {DropdownSelectItem} from "../dropdownSelect/dropdownSelect";
import {ItemShowHideDetailInfo} from "../itemContainer";
import styles from './commonCommentsItemsListStyle.scss';


interface CommentsItemsListProps {
    commentsList: DropdownSelectItem<number, string>[];
}

function CommentsItemsList(props: CommentsItemsListProps) {
    const [isOpenComments, setOpenComments] = useState(false);

    const eventComments = () => {
        setOpenComments(!isOpenComments);
    }

    if (!props.commentsList.length) {
        return (<span>{'Список комментариев пуст'}</span>)
    }
    props.commentsList.sort((a: DropdownSelectItem<number, string>, b: DropdownSelectItem<number, string>) => {
        const timestampA: number = a.other ? +a.other : 0;
        const timestampB: number = b.other ? +b.other : 0;
        return timestampB - timestampA
    });

    const commentsElementsList: React.ReactNode[] = [];

    for (let i = 1; i < props.commentsList.length; ++i) {
        let validDate: string = props.commentsList[i].other ?? ''
        commentsElementsList.push(
            <span
                key={props.commentsList[i].value}
                className={styles.simpleListItem}
                title={props.commentsList[i].label}
            >
                <div className={styles.commentText}>
                    {
                        fixedLengthString({
                            maxLength: 100,
                            stringToFixed: props.commentsList[i].label
                        })
                    }
                </div>
                <div className={styles.commentDate}>
                    {
                        dateFormatForView({
                            date: new Date(validDate),
                            format: 'DD.MM.YYYY HH:MM',
                            defaultValue: '-'
                        })
                    }
                </div>
            </span>
        );
    }

    return (
        <>
            <span
                key={props.commentsList[0].value}
                className={styles.simpleListItem}
                title={props.commentsList[0].label}
            >
                <div className={styles.commentText}>
                    {
                        fixedLengthString({
                            maxLength: 100,
                            stringToFixed: props.commentsList[0].label
                        })
                    }
                </div>
                <div className={styles.commentDate}>
                    {
                        dateFormatForView({
                            date: new Date(props.commentsList[0].other ?? ''),
                            format: 'DD.MM.YYYY HH:MM',
                            defaultValue: '-'
                        })
                    }
                </div>
            </span>
            
            { isOpenComments ? <div>{commentsElementsList}</div> : null }
            { props.commentsList[1] ?
            <ItemShowHideDetailInfo
                isOpen={isOpenComments}
                eventToggleOpenClose={eventComments}
                publicTextClose={'Показать комментарии'}
                publicTextOpen={'Скрыть комментарии'}
            /> : null}
        </>
    );
};

export default React.memo(CommentsItemsList);
