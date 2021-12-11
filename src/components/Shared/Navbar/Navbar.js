import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import brandicon from '../../../Assets/Images/brandicon.png'
import { UserContext } from '../../../App';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <nav class="navbar navbar-expand-lg fixed-top navbar-dark">
                <div class="container">
                    <Link class="navbar-brand" to="/"> <img src={brandicon} alt="" className="brandicon" /> <span className="first-letter">S</span>USASTHO</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav ms-auto">
                            <Link class="nav-link active" aria-current="page" to="/home">HOME</Link>

                            <Link to="/dashboard" class="nav-link">DASHBOARD</Link>

                            <Link class="nav-link" to="/doctors">DOCTORS</Link>
                            {/* <Link class="nav-link" to="/">EMERGENCY</Link>
                            <Link class="nav-link" to="/">BLOOD BANK</Link>
                            <Link class="nav-link" to="/">HEALTH TIPS</Link> */}
                            {
                                loggedInUser.email ? loggedInUser.photo ? <Link className="nav-link"><img className='user-img' src={loggedInUser.photo} alt="" /></Link> : <Link className="nav-link" id="user-name">{loggedInUser.name}</Link> : <Link to="/login" className="nav-link btn btn-login px-2">LOG IN</Link>
                            }

                            {
                                loggedInUser.email ? <Link className="sign-out-btn btn-lg" onClick={() => setLoggedInUser({})}>LOG OUT</Link> : ''
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;