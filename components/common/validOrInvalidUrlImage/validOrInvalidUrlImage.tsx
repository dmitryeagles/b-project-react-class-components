import React, {useState} from "react";
import SvgImageError from "../../../img/svg_component/error.svg";
import {ProjectFullScreenImagePopup} from "../../project/projectFullScreenImagePopup";
import styles from './validOrInvalidUrlImageStyle.scss';

interface ValidOrInvalidUrlImageProps {
    readonly children?: React.ReactNode;
    readonly label: string;
    readonly classNameLabelIco?: string;
    readonly className?: string;
    readonly imageUrl: string;
}

interface ValidImageProps {
    readonly imageUrl: string;
    readonly image?: string;
}

const ValidImage = React.memo((props: ValidImageProps) => {
    const [isError, setError] = useState(false);
    const [isOpenLargeImage, setOpenLargeImage] = useState(false);

    const eventOpenLargeImage = () => {
        setOpenLargeImage(!isOpenLargeImage);
    }

    if (isError) {
        return (
            <div className={styles.itemContainer}>
                <div className={styles.itemContainer}>
                    <div className={styles.labelIco}>
                        <SvgImageError />
                    </div>
                    <div className={styles.description}>{"Не удалось загрузить изображение"}</div>
                </div>
            </div>
        );
    }
    return (
        <>
            <img
                src={props.imageUrl}
                onError={() => {
                    setError(true);
                }}
                onClick={eventOpenLargeImage}
            />
            {isOpenLargeImage ?
                <div className={styles.popapContainer}>
                    <ProjectFullScreenImagePopup
                        eventClosePopup={eventOpenLargeImage}
                        imagePublicName=''
                        imageUrl={props.imageUrl}
                    />
                </div>
                : null
            }
        </>
    );

});

/**
 * Заголовок и какой-то контент, на одной строке
 * @param props
 * @constructor
 */
function ValidOrInvalidUrlImage(props: ValidOrInvalidUrlImageProps) {
    const cssClassName: string = props.className ? `${props.className} ${styles.componentContainer}` : `${styles.componentContainer}`;

    return (
        <div className={cssClassName}>
            <label>{props.label}</label>
            <ValidImage key={props.imageUrl} imageUrl={props.imageUrl} />
        </div>
    );
}

export default React.memo(ValidOrInvalidUrlImage);
