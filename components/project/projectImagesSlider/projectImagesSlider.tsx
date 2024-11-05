import React from "react";
import {fixedLengthString} from "ts-common-helpers";
import svgImageNoCameraSign from '../../../img/svg_base64/noCameraSign.svg';
import SvgImageAngleLeft from '../../../img/svg_component/angleLeft.svg';
import SvgImageAngleRight from '../../../img/svg_component/angleRight.svg';
import {ProjectPhoto} from "../../../interfaces/api/projectBase";
import {Dictionary} from "../../../interfaces/dictionary";
import {ProjectFullScreenImagePopup} from "../projectFullScreenImagePopup";
import styles from './projectImagesSliderStyle.scss';

interface ImagesSlider {
    readonly image: ProjectPhoto;
    readonly nextImageUuid?: string;
    readonly prevImageUuid?: string;
}

function getEmptyImage(): ImagesSlider {
    return {
        image: {
            uuid: '',
            photoId: -1,
            photoPublicName: '',
            photoUrl: 'emptyUrl',
            photoName: '',
            isError: false
        }
    }
}

interface ValidationImagesSliderResult {
    readonly rootImage: ImagesSlider;
    readonly images: Dictionary<ImagesSlider>;
}

function validationImagesSlider(images: ProjectPhoto[]): ValidationImagesSliderResult {
    const result: Dictionary<ImagesSlider> = {};

    if (!Array.isArray(images)) {
        return {
            images: result,
            rootImage: getEmptyImage()
        }
    }

    if (!images.length) {
        return {
            images: result,
            rootImage: getEmptyImage()
        }
    }

    const rootImageUuid = images[0].uuid;

    for (let i = 0; i < images.length; ++i) {
        const prevItem = images[i - 1];
        const nextItem = images[i + 1];
        let nextImageUuid: string | undefined = undefined;
        let prevImageUuid: string | undefined = undefined;

        if (prevItem) {
            if (typeof prevItem?.uuid === 'string') {
                if (prevItem.uuid) {
                    prevImageUuid = prevItem.uuid;
                }
            }
        }

        if (nextItem) {
            if (typeof nextItem?.uuid === 'string') {
                if (nextItem.uuid) {
                    nextImageUuid = nextItem.uuid;
                }
            }
        }

        const currentImage = images[i];

        result[currentImage.uuid] = {
            image: currentImage,
            nextImageUuid: nextImageUuid,
            prevImageUuid: prevImageUuid
        }
    }

    return {
        images: result,
        rootImage: result.hasOwnProperty(rootImageUuid) ? result[rootImageUuid] : getEmptyImage()
    }
}

interface ProjectImagesSliderProps {
    readonly images: ProjectPhoto[];
    readonly className?: string;
    readonly callbackErrorLoadImage?: (image: ProjectPhoto) => void;
}

interface ProjectImagesSliderState {
    readonly images: Dictionary<ImagesSlider>;
    readonly activeImage: ImagesSlider;
    readonly isShowFullScreenImagePopup: boolean;
}

class ProjectImagesSlider extends React.Component<ProjectImagesSliderProps, ProjectImagesSliderState> {

    private _eventShowNextImage() {
        const nextImageUuid = this.state.activeImage.nextImageUuid;

        if (!nextImageUuid) {
            return;
        }


        if (!this.state.images.hasOwnProperty(nextImageUuid)) {
            return;
        }

        this.setState(() => ({
            activeImage: this.state.images[nextImageUuid]
        }));
    }

    private _eventShowPrevImage() {
        const prevImageUuid = this.state.activeImage.prevImageUuid;

        if (!prevImageUuid) {
            return;
        }


        if (!this.state.images.hasOwnProperty(prevImageUuid)) {
            return;
        }

        this.setState(() => ({
            activeImage: this.state.images[prevImageUuid]
        }));
    }

    private _eventErrorLoadImage() {
        const activeImageUuid: string = this.state.activeImage.image.uuid;

        if (!this.state.images.hasOwnProperty(activeImageUuid)) {
            return;
        }

        const images = Object.assign({}, this.state.images);
        const activeImage = Object.assign({}, images[activeImageUuid]);

        const activeImageWithError: ImagesSlider = {
            nextImageUuid: activeImage.nextImageUuid,
            prevImageUuid: activeImage.prevImageUuid,
            image: {
                uuid: activeImage.image.uuid,
                photoUrl: activeImage.image.photoUrl,
                photoPublicName: activeImage.image.photoPublicName,
                photoName: activeImage.image.photoName,
                photoId: activeImage.image.photoId,
                isError: true
            }
        };

        images[activeImageUuid] = activeImageWithError;

        this.setState(() => ({
            activeImage: images[activeImageUuid],
            images: images
        }));

        if (typeof this.props.callbackErrorLoadImage === 'function') {
            this.props.callbackErrorLoadImage(activeImageWithError.image);
        }
    }

    private _eventShowFullScreenImagePopup() {
        this.setState(() => ({
            isShowFullScreenImagePopup: true
        }));
    }

    private _eventCloseFullScreenImagePopup() {
        this.setState(() => ({
            isShowFullScreenImagePopup: false
        }));
    }

    constructor(props: ProjectImagesSliderProps) {
        super(props);
        this._eventShowNextImage = this._eventShowNextImage.bind(this);
        this._eventShowPrevImage = this._eventShowPrevImage.bind(this);
        this._eventErrorLoadImage = this._eventErrorLoadImage.bind(this);
        this._eventShowFullScreenImagePopup = this._eventShowFullScreenImagePopup.bind(this);
        this._eventCloseFullScreenImagePopup = this._eventCloseFullScreenImagePopup.bind(this);

        const validImages = validationImagesSlider(props.images);

        this.state = {
            activeImage: validImages.rootImage,
            images: validImages.images,
            isShowFullScreenImagePopup: false
        }
    }

    render() {
        return (
            <>
                <div
                    className={this.props.className ? `${styles.componentContainer} ${this.props.className}` : `${styles.componentContainer} ${styles.componentContainerDefaultStyle}`}>

                    {
                        this.state.activeImage.prevImageUuid ?
                            <span
                                onClick={this._eventShowPrevImage}
                                className={`${styles.sliderButtonLeft} ${styles.sliderButton}`}>
                            <SvgImageAngleLeft/>
                        </span> : null
                    }
                    {
                        this.state.activeImage.nextImageUuid ?
                            <span
                                onClick={this._eventShowNextImage}
                                className={`${styles.sliderButtonRight} ${styles.sliderButton}`}>
                            <SvgImageAngleRight/>
                        </span> : null
                    }

                    <div className={styles.imageContainer}>
                        <img
                            className={this.state.activeImage.image.isError ? undefined : styles.imageZoomCursor}
                            onError={this._eventErrorLoadImage}
                            onClick={this.state.activeImage.image.isError ? undefined : this._eventShowFullScreenImagePopup}
                            alt={this.state.activeImage.image.photoPublicName}
                            src={this.state.activeImage.image.isError ? String(svgImageNoCameraSign) : this.state.activeImage.image.photoUrl}
                        />
                        {
                            this.state.activeImage.image.photoPublicName ?
                                <div className={styles.imagePublicName}>
                                    {
                                        fixedLengthString({
                                            maxLength: 40,
                                            stringToFixed: this.state.activeImage.image.photoPublicName
                                        })
                                    }
                                </div> : null
                        }
                    </div>
                </div>
                {
                    this.state.isShowFullScreenImagePopup ?
                        <ProjectFullScreenImagePopup
                            eventClosePopup={this._eventCloseFullScreenImagePopup}
                            imagePublicName={this.state.activeImage.image.photoPublicName}
                            imageUrl={this.state.activeImage.image.photoUrl}
                        /> : null
                }
            </>
        );
    }
}

export default ProjectImagesSlider;
