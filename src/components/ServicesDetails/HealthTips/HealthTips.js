import React, { useEffect, useState } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import HealthTipsList from '../HealthTipsList/HealthTipsList';
import './HealthTips.css'

const HealthTips = () => {
    const [healthTipsData, setHealthTipsData] = useState([]);

    useEffect(() => {
        fetch('https://sleepy-fjord-79948.herokuapp.com/healthTipsData')
            .then(res => res.json())
            .then(data => {
                console.log("healthTipsData from DB : ", data);
                setHealthTipsData(data)
            })
    }, [])
    return (
        <div className="container healthTips-container ">
            <Navbar></Navbar>
            <div className="row">
                <div className="col-12">
                    <div className="row row-cols-1 row-cols-md-3">
                        {
                            healthTipsData.map(healthTips => <HealthTipsList healthTips={healthTips}></HealthTipsList>)
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HealthTips;