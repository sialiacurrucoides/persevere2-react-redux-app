import React from "react";
import classes from './Title.module.css';

const title = (props) => {
    return (
        <p className={classes.Title}>{props.name}</p>
    )
}

export default title;