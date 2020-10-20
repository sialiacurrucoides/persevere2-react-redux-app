import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
    return (
        <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(" ")}
        onClick={props.clicked}
        style={{'width': props.width}}>
        {props.children}</button>
    );
};

export default button;