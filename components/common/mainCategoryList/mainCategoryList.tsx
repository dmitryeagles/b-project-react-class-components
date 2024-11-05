import {observer} from "mobx-react";
import React from "react";
import {Link} from "react-router-dom";
import SvgImageCalendar from '../../../img/svg_component/calendar.svg';
import SvgImageComments from '../../../img/svg_component/comments.svg';
import SvgImageFileLines from '../../../img/svg_component/fileLines.svg';
import SvgImageHandshake from '../../../img/svg_component/handshake.svg';
import SvgImageMultipleFilled from '../../../img/svg_component/multipleFilled.svg';
import SvgImagePenRuler from '../../../img/svg_component/penRuler.svg';
import SvgImagePeopleGroup from '../../../img/svg_component/peopleGroup.svg';
import SvgImagePersonChalkboard from '../../../img/svg_component/personChalkboard.svg';
import SvgImagePersonCircleExclamation from '../../../img/svg_component/personCircleExclamation.svg';
import SvgImagePersonFallingBurst from '../../../img/svg_component/personFallingBurst.svg';
import SvgImageQuestion from '../../../img/svg_component/question.svg';
import SvgImageTarget from '../../../img/svg_component/target.svg';
import SvgImageTaskListLined from '../../../img/svg_component/taskListLined.svg';
import SvgImageListCheck from '../../../img/svg_component/listCheck.svg';
import SvgImageThumbsUp from '../../../img/svg_component/thumbsUp.svg';
import SvgImageUserGraduate from '../../../img/svg_component/userGraduate.svg';
import SvgImagePeopleGroupLine from '../../../img/svg_component/peopleGroupLine.svg';
import {SitePageInfo} from "../../../interfaces/sitePageInfo";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {RouterPagesKeysCommon} from "../../../staticData/routerPages/routerPagesCommon";
import {StoreCommonPageHome} from "../../../stores/common/pageHome/storeCommonPageHome";
import {StubErrorGetData} from "../stubErrorGetData";
import styles from './mainCategoryListStyle.scss';

interface PageImageProps {
    readonly pageName: RouterPagesKeysCommon;
}

const PageImage = React.memo((props: PageImageProps) => {

    if (props.pageName === 'studentAttestationList') {
        return <SvgImageUserGraduate/>
    }

    if (props.pageName === 'studentAssignedTests') {
        return <SvgImagePersonChalkboard/>
    }

    if (props.pageName === 'sendProject') {
        return <SvgImagePenRuler/>
    }

    if (props.pageName === 'sendProjectLEAN') {
        return <SvgImagePenRuler/>
    }

    if (props.pageName === 'feedbackSEV') {
        return <SvgImagePersonFallingBurst/>
    }

    if (props.pageName === 'feedbackNM') {
        return <SvgImagePersonCircleExclamation/>
    }

    if (props.pageName === 'shiftManagerAttestations') {
        return <SvgImagePeopleGroup/>
    }

    if (props.pageName === 'projectResourceAlignment') {
        return <SvgImageHandshake/>
    }

    if (props.pageName === 'resourceAlignmentLEAN') {
        return <SvgImageHandshake/>
    }

    if (props.pageName === 'resourceAlignmentMini5s') {
        return <SvgImageHandshake/>
    }

    if (props.pageName === 'safetySpecialistReceivedFeedbackSEV') {
        return <SvgImageComments/>
    }

    if (props.pageName === 'safetySpecialistReceivedFeedbackNM') {
        return <SvgImageComments/>
    }

    if (props.pageName === 'choiceReport') {
        return <SvgImageFileLines/>
    }

    if (props.pageName === 'projectVote') {
        return <SvgImageThumbsUp/>
    }

    if (props.pageName === 'projectRegistry') {
        return <SvgImageMultipleFilled/>
    }

    if (props.pageName === 'projectRegistryRating') {
        return <SvgImageTaskListLined/>
    }

    if (props.pageName === 'supvEmpGoalsList') {
        return <SvgImageTarget/>
    }

    if (props.pageName === 'supvEmpDevPlanYear') {
        return <SvgImagePeopleGroupLine/>
    }

    if (props.pageName === 'userDevelopmentPlanList') {
        return <SvgImageCalendar/>
    }

    if (props.pageName === 'employeeGoals') {
        return <SvgImageListCheck/>
    }

    return <SvgImageQuestion/>;
});


//region Плитка ссылка
interface MainCategoryItem {
    readonly sitePage: SitePageInfo;
}

function MainCategoryItem(props: MainCategoryItem) {

    return (
        <Link to={props.sitePage.fullPath} className={styles.item}>
            <div className={styles.imageLine}>
                <div className={styles.imageContainer}>
                    <PageImage pageName={props.sitePage.pageKey as RouterPagesKeysCommon}/>
                </div>
            </div>

            <div className={styles.textContainer}>{props.sitePage.pagePublicName}</div>
        </Link>
    );
}

//endregion


function MainCategoryList(props: SmartComponentProps<StoreCommonPageHome>) {

    if (!props.store.pagesList.length) {
        return (
            <StubErrorGetData errorText={'Ой, кажется у Вас нет доступа к этой странице...'}/>
        );
    }

    return (
        <div className={styles.componentContainer}>
            {props.store.pagesList.map((item) => <MainCategoryItem key={item.uuid} sitePage={item}/>)}
        </div>
    );
}

export default observer(MainCategoryList);
