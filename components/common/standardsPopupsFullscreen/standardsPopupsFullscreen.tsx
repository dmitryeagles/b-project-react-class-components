import {observer} from "mobx-react";
import React from "react";
import {StoreStandardFullScreenPopup} from "../../../stores/common/storeStandardFullScreenPopup";
import {PopupFullscreenConfirm, PopupFullscreenError, PopupFullscreenLoading} from "./index";
import PopupFullscreenSuccess from "./popupFullscreenSuccess";

interface StandardsPopupsFullscreenProps {
    storeStandardFullScreenPopup: StoreStandardFullScreenPopup
}

function StandardsPopupsFullscreen(props: StandardsPopupsFullscreenProps) {
    return (
        <>
            {props.storeStandardFullScreenPopup.confirm ?
                <PopupFullscreenConfirm {...props.storeStandardFullScreenPopup.confirm}/> : null}
            {props.storeStandardFullScreenPopup.loading ?
                <PopupFullscreenLoading {...props.storeStandardFullScreenPopup.loading}/> : null}
            {props.storeStandardFullScreenPopup.error ?
                <PopupFullscreenError {...props.storeStandardFullScreenPopup.error}/> : null}
            {props.storeStandardFullScreenPopup.success ?
                <PopupFullscreenSuccess {...props.storeStandardFullScreenPopup.success}/> : null}
        </>
    );
}

export default observer(StandardsPopupsFullscreen);
