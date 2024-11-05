import {observer} from "mobx-react";
import {dateFormatForView} from "ts-common-helpers/dist";
import FilePdfSvgIco from '../../../img/svg_component/filePdf.svg';
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StorePageGuestNewsDetailsContent} from "../../../stores/guest/newsDetail/storePageGuestNewsDetailsContent";
import {LinkAsButton} from "../../common/linkAsButton";
import styles from './guestNewsDetailsStyle.scss';

function GuestNewsDetails(props: SmartComponentProps<StorePageGuestNewsDetailsContent>) {
    return (
        <div className={styles.componentContainer}>
                {
                    props.store.newsDetailItem.linkPDF ?
                        <>
                            <div className={styles.buttonDownloadFileContainer}>
                                <LinkAsButton
                                    href={props.store.newsDetailItem.linkPDF}
                                    isRealLink={true}
                                    isDownload={true}
                                    iconLeft={<FilePdfSvgIco/>}
                                    text={'Скачать PDF'}
                                />
                            </div>
                        </>
                        : null
                }
            <div className={styles.newsTextContainer}
                 dangerouslySetInnerHTML={{
                     __html: props.store.newsDetailItem.text
                 }}
            />
            <div className={styles.newsCreated}>
                {dateFormatForView({
                    date: props.store.newsDetailItem.created,
                    format: 'DD.MM.YYYY',
                    defaultValue: '-'
                })}
            </div>
        </div>
    );
}

export default observer(GuestNewsDetails);
