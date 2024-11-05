import React from "react";
import {GuestWelcomeLetters} from "../../../interfaces/api/guestWelcomeLetters";
import styles from './guestWelcomeLettersListStyle.scss';

//region Новость
interface WelcomeLetterProps {
    readonly welcomeLetter: GuestWelcomeLetters;
}

function WelcomeLetter(props: WelcomeLetterProps) {
    return (
        <div className={styles.newsContainer}>
            <div>
                <img
                    alt={'Изображение отсутствует'}
                    className={styles.image}
                    src={props.welcomeLetter.imageUrl}
                />
                <div className={styles.newsTextContainer}>
                    {props.welcomeLetter.newsText}
                </div>
            </div>
        </div>
    );
}

//endregion

interface GuestNewsListProps {
    readonly welcomeLettersList: GuestWelcomeLetters[];
}

function GuestWelcomeLettersList(props: GuestNewsListProps) {
    return (
        <div className={styles.componentContainer}>
            {props.welcomeLettersList.map((newsItem) =>
                <WelcomeLetter
                    key={newsItem.uuid}
                    welcomeLetter={newsItem}
                />)}
        </div>
    );
}

export default React.memo(GuestWelcomeLettersList);
