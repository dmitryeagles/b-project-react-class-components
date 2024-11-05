import {observer} from "mobx-react";
import React from "react";
import {ProjectVote} from "../../../../interfaces/api/projectBase";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonPageContentProjectVote
} from "../../../../stores/common/pageProjecVote/storeCommonPageContentProjectVote";
import {AdminPopup} from "../../../admin/adminPopup";
import {StubEmptyData} from "../../../common/stubEmptyData";
import styles from './projectsForVotingHistoryStyle.scss';

interface ItemVoteProps {
    vote: ProjectVote;
}

const ItemVote = React.memo((props: ItemVoteProps) => {

    return (
        <div className={styles.itemVoteContainer}>
            <span
                className={styles.voteNumber}
                title={'Оценка'}
            >
                {props.vote.voteNumber}
            </span>

            <div>
                <div
                    className={styles.lineUserFullName}
                    title={'Сотрудник'}>
                    {props.vote.voteAuthorFullName}
                </div>

                {
                    props.vote.voteText ?
                        <div className={styles.lineUserComment} title={'Комментарий'}>
                        {props.vote.voteText}
                    </div> : null
                }
            </div>
        </div>
    );
});

interface VotingHistoryProps {
    readonly votes: ProjectVote[];
    readonly eventClosePopup: () => void;
    readonly projectName: string;
}

const VotingHistory = React.memo((props: VotingHistoryProps) => {
    if (!props.votes.length) {
        return <StubEmptyData emptyDataText={'За проект еще никто не голосовал'}/>
    }

    return (
        <AdminPopup
            eventClosePopup={props.eventClosePopup}
            popupTitle={`Оценки проекта "${props.projectName}"`}
        >
            {
                props.votes.map((item) =>
                    <ItemVote
                        vote={item}
                        key={item.uuid}
                    />)
            }
        </AdminPopup>
    );
});


function ProjectsForVotingHistory(props: SmartComponentProps<StoreCommonPageContentProjectVote>) {
    if (!props.store.showVotesHistory) {
        return null;
    }

    return (
        <VotingHistory
            votes={props.store.showVotesHistory.votes}
            projectName={props.store.showVotesHistory.projectPublicName}
            eventClosePopup={props.store.eventCloseVotesHistory}
        />
    );
}

export default observer(ProjectsForVotingHistory);
