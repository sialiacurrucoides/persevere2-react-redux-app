import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import Spinner from './Spinner';

function LoadingIndicator() {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <Spinner></Spinner>
    );
}

export default LoadingIndicator;