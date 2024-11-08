import {useEffect, useState} from "react";


export const Timer = () => {
    const [time, setTime] = useState<number>(0);
    const [startTimer, setStartTimer] = useState<boolean>(false);

    useEffect(() => {
        let timer: number;

        if (startTimer) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }
        return () => clearInterval(timer);
    }, [startTimer]);

    const toggleTimer = () => {
        setStartTimer(prevState => !prevState);
    }

    const getTime = () => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return (minutes == 0 ? `` : `${String(minutes).padStart(2, '0')}:`)+`${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    }

    return {getTime, toggleTimer};
}