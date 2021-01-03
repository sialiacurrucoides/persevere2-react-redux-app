import React, { useState } from "react";
import Popover from '@material-ui/core/Popover';

import classes from './Tips.module.css';
import Button from '../UI/Button/Button';

function Tips() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'tips' : null;

    function openTips(event) {
        setAnchorEl(event.currentTarget);
    }

    return <div className={classes.Tips}>
        <div id="tips" onClick={openTips}>
            <Button  btnType="Primary" >Tips</Button>
        </div>
 
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <p className="popOver">Concrete goals are better. Instead of exercise: exercise 15 minutes or go running 3 times.</p>
            <p className="popOver">Set an alarm to evaluate each day what did you achieve. We do not want to bombard you with emails. Set an alarm at e.g. 8:00 pm not to forget to log in each day.</p>
            <p className="popOver">If you cannot build up a streak you might want to think about what is important and define a new goal accordingly.</p>

        </Popover>
    </div>
}

export default Tips;