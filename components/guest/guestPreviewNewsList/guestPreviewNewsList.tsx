import {observer} from "mobx-react";
import React from "react";
import {Link} from "react-router-dom";
import SvgImageNews from '../../../img/svg_component/news.svg'
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StorePageGuestHomeContent} from "../../../stores/guest/home/storePageGuestHomeContent";
import GuestPreviewNewsItem from "../guestPreviewNewsItem/guestPreviewNewsItem";
import GuestPreviewNewsListLoading from "./guestPreviewNewsListLoading";
import styles from './guestPreviewNewsListStyle.scss';

interface LinkAllNewsProps {
    readonly linkAllNews: string;
}

const LinkAllNews = (props: LinkAllNewsProps) => {
    return (
        <Link to={props.linkAllNews} className={styles.allNewsLink}>
            <div>
                <div className={styles.allNewsImageLine}>
                    <div className={styles.allNewsImageContainer}>
                        <SvgImageNews/>
                    </div>
                </div>
                <div className={styles.allNewsTextContainer}>
                    {'Перейти к списку всех новостей'}
                </div>
            </div>
        </Link>
    );
}

function GuestPreviewNewsList(props: SmartComponentProps<StorePageGuestHomeContent>) {
    const newsList = props.store.newsList;

    if (!Array.isArray(newsList)) {
        return (
            <GuestPreviewNewsListLoading/>
        );
    }

    if (!newsList.length) {
        return null;
    }

    return (
        <div
            className={newsList.length > 3 ? `${styles.bigFirstNews} ${styles.componentContainer}` : styles.componentContainer}>
            {
                newsList.map(newsItem =>
                    <GuestPreviewNewsItem
                        key={newsItem.uuid}
                        news={newsItem}
                        linkDetail={props.store.linkDetailNews}
                    />
                )
            }

            <LinkAllNews linkAllNews={props.store.linkAllNews}/>
        </div>
    );
}

export default observer(GuestPreviewNewsList);
