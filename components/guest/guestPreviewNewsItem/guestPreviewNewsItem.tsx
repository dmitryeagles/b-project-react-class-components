import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {GuestNewsPreview} from "../../../interfaces/api/guestNewsModel";
import {EditableItemLargeButton, ItemContainer, ItemContentContainer, ItemTitle} from "../../common/itemContainer";
import styles from './guestPreviewNewsItemStyle.scss';

interface guestPreviewNewsItemProps {
    readonly news: GuestNewsPreview;
    readonly linkDetail: string;
}

function GuestPreviewNewsItem(props: guestPreviewNewsItemProps){

    const dateCreated: string = dateFormatForView({
        date: props.news.created,
        format: 'DD.MM.YYYY HH:MM',
        defaultValue: ''
    });

    return(
        <ItemContainer>
            <ItemContentContainer>
                <ItemTitle title={props.news.newsPublicName}/>
                <div>
                    {props.news.previewText}
                </div>
            </ItemContentContainer>

            <div>
                {
                    dateCreated ?
                        <div className={styles.dateCreatedContainer}>
                            {dateCreated}
                        </div>
                        : null
                }
                <EditableItemLargeButton
                    linkOrEvent={`${props.linkDetail}/${props.news.id}`}
                    buttonText={'Подробно'}
                />
            </div>
        </ItemContainer>
    );
}

export default React.memo(GuestPreviewNewsItem);
