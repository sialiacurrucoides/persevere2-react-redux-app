import React from "react";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import classes from './Congrat.module.css';

const congrat = () => {
    const messages = ["Awesome!", "Great!", "Nice job!", "Hurray!", "Well done"];

    function chooseCongratMsg() {
        const msg = Math.floor(Math.random() * messages.length);
        return messages[msg];
    }
    return <>
        <div className={classes.congrat}>
            <p className={classes.smile}><EmojiEmotionsIcon fontSize="inherit"></EmojiEmotionsIcon></p>
            <p>{chooseCongratMsg()}</p>
        </div>
    </>
}

export default congrat;