import React, {useEffect} from "react";
import {MainCategoryList} from "../../components/common/mainCategoryList";
import {PageContainer} from "../../components/common/pageContainer";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreCommonPageHome} from "../../stores/common/pageHome/storeCommonPageHome";

function PageCommonHome(props: PageComponentProps<StoreCommonPageHome>) {
    useEffect(() => {
        props.storePage.eventPageShown();
    }, [])

    return (
        <PageContainer>
            <MainCategoryList store={props.storePage}/>
        </PageContainer>
    );
}

export default React.memo(PageCommonHome);
