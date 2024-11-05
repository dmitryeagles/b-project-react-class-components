export interface CountdownTimerValue {
    readonly timerPublicValue: string;
    readonly isTimerRun: boolean;
}



/**
 * Перевести секунды в миллисекунды
 * @param inputSeconds
 * @private
 */
function convertSecondsToMilliseconds(inputSeconds: number): number {
    return inputSeconds * 1000;
}

/**
 * Преобразовать значение таймера число в строку
 * @param value
 * @private
 */
function getTimeValueStr(value: number): string {
    const valueStr = String(value);

    if (valueStr.length === 1) {
        return `0${valueStr}`;
    } else {
        return valueStr;
    }
}


/**
 * Создать публичное значение для таймера из даты
 * @param inputCurrentTimerValue
 * @private
 */
function createTimerPublicValueString(inputCurrentTimerValue: Date): string {
    const hoursNumber = inputCurrentTimerValue.getHours();
    const minutesNumber = inputCurrentTimerValue.getMinutes();
    const secondsNumber = inputCurrentTimerValue.getSeconds();

    let resultPublicValueStr: string = '';

    // Если есть часы добавляем их
    if (hoursNumber > 0) {
        resultPublicValueStr = `${getTimeValueStr(hoursNumber)}:`;
    }

    // Добавляем минуты и секунды
    resultPublicValueStr += `${getTimeValueStr(minutesNumber)}:${getTimeValueStr(secondsNumber)}`;
    return resultPublicValueStr;
}


/**
 * Получить текущую дату без времени
 * @private
 */
function getEmptyDate() {
    const currentDate: Date = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
}


/**
 * Создает начальное значение таймера
 * @param timerDurationSeconds
 * @private
 */
function createStartTimerValue(timerDurationSeconds?: number | null): Date {
    const startTimerValue: Date = getEmptyDate();

    if (typeof timerDurationSeconds !== 'number') {
        return startTimerValue;
    }

    if (timerDurationSeconds <= 0) {
        return startTimerValue;
    }

    const oneDaySeconds: number = 86400;
    // Проверяем время на таймер, если по каким то причинам время больше суток
    // Записываем время дня и отнимаем секунду, чтобы таймер показывал 23ч
    const timerDurationMilliseconds: number = (timerDurationSeconds > oneDaySeconds) ?
        convertSecondsToMilliseconds(oneDaySeconds - 1)
        : convertSecondsToMilliseconds(timerDurationSeconds);

    startTimerValue.setMilliseconds(timerDurationMilliseconds);
    return startTimerValue;
}



/**
 * Таймер обратного отсчета
 */
class CountdownTimer {
    // Значение когда таймер должен завершиться
    private _endTimerValue: number;
    // Текущее значение таймера
    private _currentTimerValue: Date;
    // id текущего таймера
    private _timerId?: NodeJS.Timeout;
    // Флаг запущен таймер или нет
    private _isTimerRun: boolean;

    /**
     * Обновить публичное значение таймера
     * @param timerPublicValue
     * @private
     */
    private _setTimerPublicValue(timerPublicValue: string){
        postMessage(<CountdownTimerValue>{
            timerPublicValue: timerPublicValue,
            isTimerRun: this._isTimerRun
        });

        console.log(timerPublicValue);
    }

    /**
     * Тик таймера
     */
    private _eventTimerTick() {
        // Отнимаем секунду у таймера
        this._currentTimerValue.setSeconds(this._currentTimerValue.getSeconds() - 1);
        // Обновляем публичное значение таймера
        const timerPublicValue: string = createTimerPublicValueString(this._currentTimerValue);

        this._setTimerPublicValue(timerPublicValue);

        if (!this._isTimerRun) {
            this._destroyTimer();
            return;
        }

        // Получаем числовое текущее значение таймера
        const currentTimerValueNumber: number = +this._currentTimerValue;
        // Оставшееся время таймера
        const remainingTimeInMilliseconds: number = currentTimerValueNumber - this._endTimerValue;
        // Проверяем значение таймера
        if (remainingTimeInMilliseconds <= 0) {
            // Уничтожаем текущий таймер
            this._destroyTimer();
            return;
        }

        this._createTimer();
    }

    /**
     * Уничтожает таймер и обнуляет его значения
     * @private
     */
    private _destroyTimer() {
        if (this._timerId) {
            clearTimeout(this._timerId);
        }

        this._currentTimerValue = getEmptyDate();
        this._endTimerValue = +getEmptyDate();
        this._timerId = undefined;
        this._isTimerRun = false;
        const timerPublicValueString = createTimerPublicValueString(this._currentTimerValue);
        this._setTimerPublicValue(timerPublicValueString);
    }

    /**
     * Создает новый таймер
     * @private
     */
    private _createTimer() {
        this._timerId = setTimeout(this._eventTimerTick, 1000);
    }

    /**
     * Запустить таймер
     */
    public startTimer() {
        this._timerId = undefined;
        this._isTimerRun = true;
        this._endTimerValue = +getEmptyDate();

        // Получаем публичное значение таймера
        const timerPublicValue: string = createTimerPublicValueString(this._currentTimerValue);
        // Устанавливаем новое публичное значение
        this._setTimerPublicValue(timerPublicValue);
        this._createTimer();
    }

    /**
     * Уничтожаем таймер
     */
    public destroyTimer() {
        this._destroyTimer();
    }

    constructor(timerDurationSeconds: number) {
        this._eventTimerTick = this._eventTimerTick.bind(this);
        this._timerId = undefined;
        this._isTimerRun = false;
        this._endTimerValue = +getEmptyDate();
        this._currentTimerValue = createStartTimerValue(timerDurationSeconds);
    }
}

onmessage = function(e) {
    // Получаем параметры таймера
    const timerDurationSeconds = e.data;

    if(typeof timerDurationSeconds !== 'number') {
        return;
    }

    // Создаем таймер
    const countdownTimer = new CountdownTimer(timerDurationSeconds)

    // Запускаем таймер
    countdownTimer.startTimer();
}



