import React from "react";
import styles from './testExamCountdownTimerStyle.scss';
import {CountdownTimerValue} from "./workerTestExamCountdownTimer";

interface TestExamCountdownTimerProps {
    // Событие время истекло
    readonly eventTimeIsUp: () => void;
    // Время таймера
    readonly timerDurationSeconds?: number;
}

interface TestExamCountdownTimerState {
    timerPublicValue: string;
    webWorker?: Worker;
}

class TestExamCountdownTimer extends React.PureComponent<TestExamCountdownTimerProps, TestExamCountdownTimerState> {

    private _destroyTimer() {
        // Проверяем наличие webWorker
        if (this.state.webWorker) {
            // Если существует отключаемся
            this.state.webWorker.terminate();
            // Забываем про webWorker и меняем состояние
            this.setState(() => {
                return {
                    timerPublicValue: '',
                    webWorker: undefined
                }
            });
        }
    }

    private _createTimer() {
        const timerDurationSeconds: number | undefined = this.props?.timerDurationSeconds;

        if (typeof timerDurationSeconds !== 'number') {
            return;
        }

        if (timerDurationSeconds <= 0) {
            return;
        }

        // Создаем Worker
        const webWorker = new Worker(new URL('./workerTestExamCountdownTimer.ts', import.meta.url));
        webWorker.postMessage(timerDurationSeconds);
        webWorker.onmessage = ((e) => {
            const {isTimerRun, timerPublicValue} = e.data as CountdownTimerValue;

            if (typeof isTimerRun !== 'boolean') {
                return;
            }

            if (typeof timerPublicValue !== 'string') {
                return;
            }

            if (!isTimerRun) {
                this._destroyTimer();
                this.props.eventTimeIsUp();
                return;
            }

            this.setState(() => {
                return {
                    timerPublicValue: timerPublicValue
                }
            });
        });

        // Устанавливаем Worker, timer запущен
        this.setState(() => {
            return {
                webWorker: webWorker
            }
        })
    }


    componentWillUnmount() {
        this._destroyTimer();
    }

    componentDidMount() {
        this._createTimer();
    }

    constructor(props: TestExamCountdownTimerProps) {
        super(props);
        this._createTimer = this._createTimer.bind(this);
        this._destroyTimer = this._destroyTimer.bind(this);

        this.state = {
            timerPublicValue: '',
            webWorker: undefined
        };
    }

    render() {
        if (!this.state.webWorker) {
            return (
                <div className={styles.componentContainer}>
                    <span className={styles.infinityIco}/>
                </div>
            );
        }

        return (
            <div className={styles.componentContainer}>
                <span>{this.state.timerPublicValue}</span>
            </div>
        );
    }
}


export default React.memo(TestExamCountdownTimer);
