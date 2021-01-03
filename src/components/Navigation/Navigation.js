import React from 'react';
import classes from './Navigation.module.css';
import {Link} from 'react-router-dom';

import Logo from './Logo/Logo';
import Button from '../UI/Button/Button';

const navigation = () => {
    return (
        <div className={classes.Navigation}>
            <Logo height="8rem"/>
            <Button><Link to="/auth">Register</Link></Button>
        </div>
    );
};

export default navigation;