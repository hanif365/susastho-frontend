import React, { useContext, useEffect, useState } from 'react';
import './CovidInfoCountryWise.css';
import { useForm } from "react-hook-form";

const CovidInfoCountryWise = () => {
    const [countryData, setCountryData] = useState('');
    const [defaultCountryData, setDefaultCountryData] = useState('');
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const [time, setTime] = useState('');

    const onSubmit = (data) => {
        console.log(data);
        // console.log(data.countryName);
        setCountryData(data.countryName);
        reset();

        const covidCountryURL = `https://disease.sh/v3/covid-19/countries/${data.countryName}`
        console.log(covidCountryURL);
        fetch(covidCountryURL)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message == null) {
                    setCountryData(data);
                }
                // setCountryData(data);
                else {
                    const Swal = require('sweetalert2')
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Country not found or doesn\'t have any cases',
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: true,
                    })
                }
            })
    }

    // Get Default country Info(BD)
    useEffect(() => {
        fetch(`https://disease.sh/v3/covid-19/countries/bd`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDefaultCountryData(data)
            })
    }, [])
    console.log("CountryWiseData: ", defaultCountryData);

    useEffect(() => {
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        setTime(date);

    }, [])
    return (
        <div className='covid-info-country-wise container-fluid py-5' id='covid-19-dashboard'>
            <div className="row text-center py-5">
                <h2>COVID-19 DASHBOARD</h2>
                <hr className='covid-hr' />
            </div>

            <div className="row container py-4 ms-4">
                <h4>{countryData ? countryData?.country : defaultCountryData?.country}</h4>
                <img className='flag-img' src={countryData ? countryData?.countryInfo?.flag : defaultCountryData?.countryInfo?.flag} alt="" />
            </div>

            <div className="row">
                <div className="col-12">
                    <form className='d-flex country-input input-group input-group-lg' onSubmit={handleSubmit(onSubmit)}>
                        <input className="form-control" name="countryName" placeholder='Country Name' ref={register({ required: true })} />
                        <input type="submit" value="SEARCH" className='px-4 ms-2 covid-submit' />
                    </form>
                </div>
            </div>

            <div className='row container ms-4 pt-5'>
                <p><span className='fw-bold'>Last Update : </span><span className='text-info fw-bold'>{time}</span> <span className='ms-3'> Source : worldometers</span></p>
            </div>

            <div className='d-flex flex-wrap justify-content-center covid-card-outer'>
                <div className="py-2 me-4">
                    <div className="card covid-card infected-card">
                        {/* <img src={countryData ? countryData?.countryInfo?.flag : defaultCountryData?.countryInfo?.flag} class="card-img-top" alt="..." /> */}
                        <div className="text-center">
                            <h5 className="card-title py-5 covid-title infected-title">New Infected</h5>
                            <div className='d-flex justify-content-around pt-5'>
                                <p className='card-text'>In 24 Hours</p>
                                <p className="card-text">{countryData ? countryData?.todayCases : defaultCountryData?.todayCases}</p>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-around pb-5'>
                                <p className='card-text'>Total</p>
                                <p className="card-text">{countryData ? countryData?.cases : defaultCountryData?.cases}</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="py-2 me-4">
                    <div className="card covid-card deaths-card">
                        <div className="text-center">
                            <h5 className="card-title py-5 covid-title deaths-title">Deaths</h5>
                            <div className='d-flex justify-content-around pt-5'>
                                <p className='card-text'>In 24 Hours</p>
                                <p className="card-text">{countryData ? countryData?.todayDeaths : defaultCountryData?.todayDeaths}</p>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-around pb-5'>
                                <p className='card-text'>Total</p>
                                <p className="card-text">{countryData ? countryData?.deaths : defaultCountryData?.deaths}</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="py-2 me-4">
                    <div className="card covid-card recovered-card">
                        <div className="text-center">
                            <h5 className="card-title py-5 covid-title recovered-title">Recovered</h5>
                            <div className='d-flex justify-content-around pt-5'>
                                <p className='card-text'>In 24 Hours</p>
                                <p className="card-text">{countryData ? countryData?.todayRecovered : defaultCountryData?.todayRecovered}</p>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-around pb-5'>
                                <p className='card-text'>Total</p>
                                <p className="card-text">{countryData ? countryData?.recovered : defaultCountryData?.recovered}</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="py-2 me-3">
                    <div className="card covid-card test-card">
                        <div className="text-center">
                            <h5 className="card-title py-5 covid-title test-title">Tests</h5>
                            <div className='d-flex justify-content-around pt-5'>
                                <p className='card-text'>Total</p>
                                <p className="card-text">{countryData ? countryData?.tests : defaultCountryData?.tests}</p>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-around pb-5'>
                                <p className='card-text'>Total Populations</p>
                                <p className="card-text">{countryData ? countryData?.population : defaultCountryData?.population}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CovidInfoCountryWise;