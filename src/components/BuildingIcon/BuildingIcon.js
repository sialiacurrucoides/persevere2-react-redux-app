import React from 'react';

import futureBuilding from '../../assets/building.svg';
import classes from './BuildingIcon.module.css';


const buildingIcon = (props) => {
    return (    
    <div className={classes.BuildingIcon} style={{'height':props.height}}>
        <img src={futureBuilding} alt="Future building drawing"></img>
    </div>);
};

export default buildingIcon;