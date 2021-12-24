import React from 'react';
import Header from '../../Home/Header/Header';
import HeaderContents from '../../Home/HeaderContent/HeaderContents';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar';
import CovidInfoCountryWise from '../CovidInfoCountryWise/CovidInfoCountryWise';
import './Covid.css'

const Covid = () => {
    return (
        <div className='covid-container'>
            {/* <Navbar></Navbar> */}
            {/* <HeaderContents></HeaderContents> */}
            <Header></Header>
            <CovidInfoCountryWise></CovidInfoCountryWise>
            <Footer></Footer>
        </div>
    );
};

export default Covid;