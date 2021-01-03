import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from '@material-ui/icons/Home';
import { Link, Redirect } from "react-router-dom";

import classes from './Header.module.css';
import GoalTitle from '../Title/GoalTitle';
import Title from "../Title/Title";

function Header(props) {

    let logout = '';
    function truncate(str, n) {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    };

    function handleLogout() {
        logout = <Redirect to='/logout' />;
    }


    return (
        <div className={classes.Header}>
            <div className={props.homeVisible ? classes.Home : [classes.Home, classes.Invisible].join(' ')}>
                <Link to={`/goals`}>
                    <HomeIcon></HomeIcon>
                </Link>
            </div>
            {props.isGoalTitle ? <GoalTitle name={truncate(props.title, 25)} title={props.title} importance={props.importance}></GoalTitle> : <Title name={truncate(props.title, 28)}></Title>}
            <div className={classes.Out}>
                <Link to="/logout">
                    <ExitToAppIcon onClick={handleLogout}></ExitToAppIcon>
                </Link>
            </div>
            {logout}
        </div>
    )
}

export default Header;