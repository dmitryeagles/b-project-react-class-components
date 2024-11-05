import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {dateFormatForView} from "ts-common-helpers/dist";
import {GuestNewsPreview} from "../../../interfaces/api/guestNewsModel";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StorePageGuestAllNewsContent} from "../../../stores/guest/allNews/storePageGuestAllNewsContent";
import {StubEmptyData} from "../../common/stubEmptyData";
import styles from './guestAllNewsStyle.scss';

//region Новость
interface NewsProps {
    readonly news: GuestNewsPreview;
    readonly linkDetail: string;
}

function News(props: NewsProps) {
    return (
        <Link
            to={`${props.linkDetail}/${props.news.id}`}
            className={styles.newsContainer}
            title="Подробнее"
        >
            <div className={styles.newsTopicContainer}>
                {props.news.newsPublicName}
            </div>
            <div className={styles.newsContentContainer}>
                <div className={styles.newsTextContainer}
                    dangerouslySetInnerHTML={{
                        __html: props.news.previewText
                    }}
                />
                <div className={styles.newsCreated}>
                    {dateFormatForView({
                        date: props.news.created,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })}
                </div>
            </div>
        </Link>
    );
}

function GuestAllNews(props: SmartComponentProps<StorePageGuestAllNewsContent>) {
    const receivedNews = props.store.storeDataPagination.dataOnCurrentPage;

    if(!receivedNews.length) {
        return (
            <StubEmptyData emptyDataText={'Нет доступных данных для отображения'} />
        );
    }
    const newsListElements: JSX.Element[] = [];

    for (let i = 0; i < receivedNews.length; ++i) {
        newsListElements.push(
            <News key={receivedNews[i].uuid}
                news={receivedNews[i]}
                linkDetail={props.store.storeRouter.getPagePath('newsDetail')}
            />
        );
    }

    return (
        <div className={styles.componentContainer}>
            {newsListElements}
        </div>
    );
}

export default observer(GuestAllNews);
