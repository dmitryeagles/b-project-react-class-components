import React from "react";
import {LoaderSpinner} from "../loaderSpinner";
import PopupFullscreen from "../popupFullscreen/popupFullscreen";

export interface PopupFullscreenLoadingProps {
    loadingText: string;
}

function PopupFullscreenLoading(props: PopupFullscreenLoadingProps) {
    return (
        <PopupFullscreen>
            <LoaderSpinner
                loadingText={props.loadingText}
            />
        </PopupFullscreen>
    );
}

export default React.memo(PopupFullscreenLoading);
