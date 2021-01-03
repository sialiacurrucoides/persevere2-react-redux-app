import React from 'react';
import {Link} from 'react-router-dom';

import persevereLogo from '../../../assets/PersevereLogo.png';
import classes from './Logo.module.css';


const logo = (props) => {
    return (    
    <div className={classes.Logo} style={{'height':props.height}}>
        <Link to='/'><img src={persevereLogo} alt="Persevere logo"></img></Link>
    </div>);
};

export default logo;