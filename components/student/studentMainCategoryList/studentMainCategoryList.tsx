import React from "react";
import Lottie from "react-lottie-player";
import {Link} from "react-router-dom";
import lottieAnimationAssistantDirector from '../../../lottieAnimation/assistantDirector.json';
import lottieAnimationBusinessTaskManagement from '../../../lottieAnimation/businessTaskManagement.json';
import lottieAnimationDataAnalyticsDoing from '../../../lottieAnimation/dataAnalyticsDoing.json';
import lottieAnimationProfessionalTraining from '../../../lottieAnimation/professionalTraining.json';
import lottieAnimationReadTheDocument from '../../../lottieAnimation/readTheDocument.json';
import lottieAnimationWorkingTeam from '../../../lottieAnimation/workingTeam.json';
import styles from './studentMainCategoryListStyle.scss';

interface StudentHomeItemProps {
    readonly pubicText: string;
    readonly path: string;
    readonly animationData: object;
    readonly viewBoxSize: string;
}

interface StudentHomeItemState {
    readonly isPlayAnimation: boolean;
}

class StudentHomeItem extends React.PureComponent<StudentHomeItemProps, StudentHomeItemState> {
    private _isMouseEnter: boolean;
    public _eventMouseEnter() {
        this._isMouseEnter = true;
        this.setState(() => {
            return {
                isPlayAnimation: true
            }
        });
    }

    public _eventMouseLeave() {
        this._isMouseEnter = false;
    }

    public _eventAnimationEnd() {
        if (!this._isMouseEnter) {

            this.setState(() => {
                return {
                    isPlayAnimation: false
                }
            });
        }
    }

    constructor(props: StudentHomeItemProps) {
        super(props);
        this._eventMouseEnter = this._eventMouseEnter.bind(this);
        this._eventMouseLeave = this._eventMouseLeave.bind(this);
        this._eventAnimationEnd = this._eventAnimationEnd.bind(this);
        this._isMouseEnter = false;
        this.state = {
            isPlayAnimation: false
        };
    }

    render() {
        return (
            <Link
                className={styles.mainCategoryItem}
                to={this.props.path}
                onMouseEnter={this._eventMouseEnter}
                onMouseLeave={this._eventMouseLeave}
            >
                <Lottie
                    rendererSettings={{
                        viewBoxSize: this.props.viewBoxSize
                    }}
                    className={styles.imageContainer}
                    onLoopComplete={this._eventAnimationEnd}
                    animationData={this.props.animationData}
                    play={this.state.isPlayAnimation}
                />
                <div className={styles.textContainer}>{this.props.pubicText}</div>
            </Link>
        );
    }
}

interface StudentMainCategoryListProps {
    readonly pageAttestationListLink: string;
    readonly pageReportsLink: string;
    readonly pageSevLink: string;
    readonly pageNmLink: string;
    readonly pageAssignedTestsLink: string;
    readonly pageMyProjektLink: string;
    readonly pageMyProjektLEANLink: string;
}

function StudentMainCategoryList(props: StudentMainCategoryListProps) {
    return (
        <div className={styles.componentContainer}>
            <StudentHomeItem
                path={props.pageAttestationListLink}
                viewBoxSize={'160 200 900 900'}
                animationData={lottieAnimationBusinessTaskManagement}
                pubicText={'Аттестация'}
            />
            <StudentHomeItem
                path={props.pageReportsLink}
                viewBoxSize={'170 200 900 900'}
                animationData={lottieAnimationProfessionalTraining}
                pubicText={'Отчеты'}
            />
            <StudentHomeItem
                path={props.pageSevLink}
                viewBoxSize={'170 200 900 900'}
                animationData={lottieAnimationWorkingTeam}
                pubicText={'Наблюдения SEV/QEV/TEV'}
            />
            <StudentHomeItem
                path={props.pageNmLink}
                viewBoxSize={'170 200 900 900'}
                animationData={lottieAnimationAssistantDirector}
                pubicText={'Обращения NM'}
            />
            <StudentHomeItem
                path={props.pageAssignedTestsLink}
                viewBoxSize={'170 200 900 900'}
                animationData={lottieAnimationReadTheDocument}
                pubicText={'Назначенные тесты'}
            />
            <StudentHomeItem
                path={props.pageMyProjektLink}
                viewBoxSize={'150 200 900 900'}
                animationData={lottieAnimationDataAnalyticsDoing}
                pubicText={'Мои проекты Mini5s'}
            />
            <StudentHomeItem
                path={props.pageMyProjektLEANLink}
                viewBoxSize={'150 200 900 900'}
                animationData={lottieAnimationDataAnalyticsDoing}
                pubicText={'Мои проекты LEAN'}
            />
        </div>
    );
}

export default React.memo(StudentMainCategoryList);
