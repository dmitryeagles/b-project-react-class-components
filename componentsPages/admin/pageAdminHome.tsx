import React, {useEffect} from "react";
import {AdminMainCategoryList} from "../../components/admin/adminMainCategoryList";
import {PageContainer} from "../../components/common/pageContainer";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageHome} from "../../stores/admin/home/storeAdminPageHome";

function PageAdminHome(props: PageComponentProps<StoreAdminPageHome>) {
    useEffect(() => {
        props.storePage.eventPageShown();
    }, [])

    return (
        <PageContainer>
            <AdminMainCategoryList store={props.storePage}/>
        </PageContainer>
    );
}

export default React.memo(PageAdminHome);
