import React from 'react';
import classes from './Layout.module.css';

const layout = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.SmallWrapper}>
                {props.children}
            </div>
        </div>
    );
};

export default layout;