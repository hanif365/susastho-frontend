import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import HeaderContents from '../HeaderContent/HeaderContents';
import './Header.css'

const Header = () => {
    return (
        <div>
            <Navbar></Navbar>
            <HeaderContents></HeaderContents>
        </div>
    );
};

export default Header;