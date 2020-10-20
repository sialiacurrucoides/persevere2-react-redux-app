import React from 'react';
import {Link} from 'react-router-dom';

import classes from './HomePage.module.css';
import Navigation from '../Navigation/Navigation';
import Button from '../UI/Button/Button';
import BuildingIcon from '../../components/BuildingIcon/BuildingIcon';
import CalendarIcon from '../../components/CalendarIcon/CalendarIcon';


const Home = () => {
    return (
        <div className={classes.HomeContainer}>
            <Navigation></Navigation>
            <section className={classes.Hero}>
                <div className={classes.CallForAction}>
                    <h1 className={classes.MainLine}>Work for your goal every day</h1>
                    <h4 className={classes.Quote}>“It does not matter how slowly you go so long you do not stop.”</h4>
                    <p className={classes.Author}><em>- Confucius</em></p>
                    <div className={classes.ActionButton}>
                        <Button ><Link to="auth">START BUILDING A STREAK</Link></Button>
                    </div>
                </div>
                <div className={classes.Illustration}>
                    <div className={classes.Building}>
                    <BuildingIcon />
                    </div>
                    <div className={classes.Calendar}>
                        <CalendarIcon />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;