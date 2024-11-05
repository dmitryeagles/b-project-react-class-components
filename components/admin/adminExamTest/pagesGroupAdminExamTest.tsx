import React, {Suspense} from "react";
import {Outlet} from "react-router-dom";
import {PageComponentProps} from "../../../interfaces/pageComponentProps";
import {StoreAdminPageTestList} from "../../../stores/admin/testList/storeAdminPageTestList";
import {LoaderSuspense} from "../../common/loaderSuspense";
import {PageContainer} from "../../common/pageContainer";

class PagesGroupAdminExamTest extends React.Component<PageComponentProps<StoreAdminPageTestList>> {
    constructor(props: PageComponentProps<StoreAdminPageTestList>) {
        super(props);
    }

    public componentDidMount() {
        this.props.storePage.eventPageShown();
    }

    public componentWillUnmount() {
        this.props.storePage.eventPageExit();
    }

    render() {
        return (
            <PageContainer>
                <Suspense fallback={<LoaderSuspense/>}>
                    <Outlet key={'pagesGroupAdminExamTest'}/>
                </Suspense>
            </PageContainer>
        );
    }
}

export default PagesGroupAdminExamTest;
