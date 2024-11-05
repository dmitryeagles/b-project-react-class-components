import {observer} from "mobx-react";
import React from "react";
import {StoreComponentSelectViewFormatItems} from "../../../stores/common/storeComponentSelectViewFormatItems";
import ProjectItemsContainer from "./projectItemsContainer";

interface ProjectItemsContainerSmartProps {
    readonly children: React.ReactNode;
    readonly storeDisplayType: StoreComponentSelectViewFormatItems;
}

function ProjectItemsContainerSmart(props: ProjectItemsContainerSmartProps) {
    return (
        <ProjectItemsContainer
            displayType={props.storeDisplayType.isActiveViewGrid ? '2_column' : '1_column'}
        >
            {props.children}
        </ProjectItemsContainer>
    );
}

export default observer(ProjectItemsContainerSmart);
