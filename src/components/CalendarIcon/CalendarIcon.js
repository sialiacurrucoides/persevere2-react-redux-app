import React from 'react';

import calendar from '../../assets/calendar_undraw.svg';
import classes from './CalendarIcon.module.css';


const calendarIcon = (props) => {
    return (    
    <div className={classes.CalendarIcon}>
        <img src={calendar} alt="Calendar icon with completed days"></img>
    </div>);
};

export default calendarIcon;