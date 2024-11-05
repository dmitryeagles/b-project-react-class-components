import styles from "./popupFullscreenStyle.scss";

export function showHiddenDocumentBodyOverflow(isShowOverflow: boolean) {
    if (isShowOverflow) {
        if (document.body.classList.contains(styles.documentBodyOverflowHidden)) {
            document.body.classList.remove(styles.documentBodyOverflowHidden);
        }
    } else {
        if (!document.body.classList.contains(styles.documentBodyOverflowHidden)) {
            document.body.classList.add(styles.documentBodyOverflowHidden);
        }
    }
}
