import {observer} from "mobx-react";
import React, {useState} from "react";
import {dateFormatForView} from "ts-common-helpers";
import {AdminCreateNews} from "../../../../interfaces/api/adminCreateNews";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentCreateNews} from "../../../../stores/admin/createNews/storeAdminPageContentCreateNews";
import {
    EditableItemActionButtons,
    ItemContainer,
    ItemContentContainer,
    ItemShowHideDetailInfo,
    ItemTitle
} from "../../../common/itemContainer";
import {EditableItemEvents} from "../../../common/itemContainer/editableItemActionButtons/editableItemActionButtons";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import styles from "./adminNewsListStyle.scss";

interface NewsItemProps extends EditableItemEvents {
    readonly news: AdminCreateNews;
}

const NewsItem = React.memo((props: NewsItemProps) => {
    const [isOpenDetailInfo, setOpenDetailInfo] = useState(false);

    const eventToggleOpenClose = () => {
        setOpenDetailInfo(!isOpenDetailInfo);
    };

    return (
        <ItemContainer>
            <ItemContentContainer>
                <ItemTitle title={props.news.name}/>

                <AdminLabelWithContainerLine label={'Активно:'}>
                    {
                        props.news.isActive ?
                        <span className={styles.newsActive}>{'Да'}</span>:
                        <span className={styles.newsArchive}>{'Нет'}</span>
                    }
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine label={'Дата создания:'}>
                    {dateFormatForView({
                        date: props.news.dateCreated,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })}
                </AdminLabelWithContainerLine>
                {
                    props.news.fileDocumentUrl ?
                        <AdminLabelWithContainerLine label={'Файл:'}>
                            <a
                                className={styles.linkShowFile}
                                target={'_blank'}
                                href={props.news.fileDocumentUrl}>
                                {'Просмотреть'}
                            </a>
                        </AdminLabelWithContainerLine> : null
                }
                {
                    isOpenDetailInfo ?
                        <>
                            <AdminLabelWithContainerTwoLine label={'Текст превью:'}>
                                {props.news.previewText}
                            </AdminLabelWithContainerTwoLine>

                            <AdminLabelWithContainerTwoLine label={'Полный текст новости:'}>
                                <div
                                    className={styles.detailNewsText}
                                    dangerouslySetInnerHTML={{
                                    __html: props.news.text
                                }}
                                />
                            </AdminLabelWithContainerTwoLine>
                        </> : null
                }

                <ItemShowHideDetailInfo
                    isOpen={isOpenDetailInfo}
                    eventToggleOpenClose={eventToggleOpenClose}
                    publicTextClose={'Показать детальную информацию'}
                    publicTextOpen={'Свернуть детальную информацию'}
                />

            </ItemContentContainer>
            <EditableItemActionButtons
                itemUuid={props.itemUuid}
                eventStartEdit={props.eventStartEdit}
                eventDeleteItem={props.eventDeleteItem}
            />
        </ItemContainer>
    );
});

function AdminNewsList(props: SmartComponentProps<StoreAdminPageContentCreateNews>) {
    const dataOnCurrentPage: AdminCreateNews[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют данные для отображения'}/>
        );
    }

    return (
        <div className={styles.componentContainer}>
            {
                dataOnCurrentPage.map((item) =>
                    <NewsItem
                        key={item.uuid}
                        news={item}
                        itemUuid={item.uuid}
                        eventDeleteItem={props.store.eventStartDeleteItem}
                        eventStartEdit={props.store.eventStartChangeItem}
                    />
                )
            }
        </div>
    );
}

export default observer(AdminNewsList);
