import React, { useEffect, useState } from 'react';
import './Testimonials.css';
import user1 from '../../../Assets/Images/user1.jpeg';
import user2 from '../../../Assets/Images/user2.jpeg';
import user3 from '../../../Assets/Images/user3.jpeg';
import user4 from '../../../Assets/Images/user4.jpeg';
import user5 from '../../../Assets/Images/user5.jpeg';
import user6 from '../../../Assets/Images/user6.jpeg';
import user7 from '../../../Assets/Images/user7.jpeg';
import user8 from '../../../Assets/Images/user8.jpeg';
import user9 from '../../../Assets/Images/user9.jpeg';
import user10 from '../../../Assets/Images/user10.jpeg';


// users data

// const users = [{
//     "id": 'user1',
//     "Username": "Abu Hanif",
//     "Email": "abuhanif@fc2.com",
//     "Gender": "Male",
//     "Company": "DreamLand 1 Inc.",
//     // "userImage": "https://i.ibb.co/XCkcgyy/hanif.png",
//     "userImageURL": user1,
//     "UserComment": "Lorem 1 ipsum dolor sit amet consectetur adipisicing elit. Assumenda magnam pariatur dignissimos tempore modi in consectetur, enim quisquam sint aut provident ipsum adipisci inventore minima earum quod asperiores ipsam nihil laboriosam similique optio, accusantium illum? Non a eveniet, facere, nam qui quo optio cupiditate exercitationem possimus, eos modi dicta iusto!"
// }]

// console.log(users[0]);


const Testimonials = () => {
    const [userID, setUserID] = useState('user1');
    // const [selectedUser, setSelectedUser] = useState(users[0]);
    const [selectedUser, setSelectedUser] = useState();
    const [allTestimonialData, setAllTestimonialData] = useState();

    const [active, setActive] = useState('user1');


    // testimonials data fetch from DB
    const handleFetchTestimonialsData = async () => {
        const BackendLink = process.env.REACT_APP_BACKENDLINK;
        const response = await fetch(`${BackendLink}/testimonials`);
        const data = await response.json();
        // console.log(data);

        // use setSelectedUser for first user insert automatically
        setSelectedUser(data[0]);

        setAllTestimonialData(data);
    }

    useEffect(() => {
        handleFetchTestimonialsData();
    }, [])


    // console.log(allTestimonialData);

    const handleShowcase = (userName) => {
        // console.log(userName);
        setUserID(userName);

        const selectedUserFilterOut = allTestimonialData.filter((user) => user.userID === userName)
        // console.log(selectedUserFilterOut);
        // console.log(selectedUserFilterOut[0].userID);

        setSelectedUser(selectedUserFilterOut[0]);

        setActive(userName);
    }

    // console.log(selectedUser);

    // console.log(active);

    return (
        <div className='Testimonials_container'>
            <div className="container Testimonials_Inner_container">
                <div className="row">
                    <div className='testimonials_header'>
                        <p>Testimonials</p>
                        <h1 className='text-uppercase'>A word from our Users</h1>
                        {/* <p>{userID}</p> */}
                    </div>
                    <div className="col-md-3">
                        <div className='left_sided_user_img'>
                            <img src={allTestimonialData && allTestimonialData[0]?.userImageURL} name="user1" onClick={(e) => handleShowcase(e.target.name)} alt="" className='user_img user_img_1' id={active === 'user1' ? 'move_r_1' : ''} />
                            <img src={allTestimonialData && allTestimonialData[1]?.userImageURL} name="user2" onClick={(e) => handleShowcase(e.target.name)} alt="" className='user_img user_img_2' id={active === 'user2' ? 'move_r_2' : ''} />
                            <img src={allTestimonialData && allTestimonialData[2]?.userImageURL} name="user3" onClick={(e) => handleShowcase(e.target.name)} alt="" className='user_img user_img_3' id={active === 'user3' ? 'move_r_3' : ''} />
                            <img src={allTestimonialData && allTestimonialData[3]?.userImageURL} name="user4" onClick={(e) => handleShowcase(e.target.name)} alt="" className='user_img user_img_4' id={active === 'user4' ? 'move_r_4' : ''} />
                            <img src={allTestimonialData && allTestimonialData[4]?.userImageURL} name="user5" onClick={(e) => handleShowcase(e.target.name)} alt="" className='user_img user_img_5' id={active === 'user5' ? 'move_r_5' : ''} />
                        </div>



                    </div>

                    <div className="col-md-6 showcase_img_div">
                        <div className='showcase_inner_div'>
                            <div className='showcase_upper_div'>
                                <img src={selectedUser?.userImageURL} alt="" className='user_showcase_img' />
                                <div className='ms-3 align-self-center'>
                                    <h2>{selectedUser?.Username}</h2>
                                    <h4>{selectedUser?.Company}</h4>
                                </div>
                            </div>

                            <div className='showcase_lower_div'>
                                <p>{selectedUser?.UserComment}</p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">
                        <div className='right_sided_user_img'>

                            <img src={allTestimonialData && allTestimonialData[5]?.userImageURL} name="user6" onClick={(e) => handleShowcase(e.target.name)} alt="" className='user_img user_img_6' id={active === 'user6' ? 'move_r_6' : ''} />
                            <img src={allTestimonialData && allTestimonialData[6]?.userImageURL} name="user7" onClick={(e) => handleShowcase(e.target.name)} alt="" className='user_img user_img_7' id={active === 'user7' ? 'move_r_7' : ''} />
                            <img src={allTestimonialData && allTestimonialData[7]?.userImageURL} name="user8" onClick={(e) => handleShowcase(e.target.name)} alt="" className='user_img user_img_8' id={active === 'user8' ? 'move_r_8' : ''} />
                            <img src={allTestimonialData && allTestimonialData[8]?.userImageURL} name="user9" onClick={(e) => handleShowcase(e.target.name)} alt="" className='user_img user_img_9' id={active === 'user9' ? 'move_r_9' : ''} />
                            <img src={allTestimonialData && allTestimonialData[9]?.userImageURL} name="user10" onClick={(e) => handleShowcase(e.target.name)} alt="" className='user_img user_img_10' id={active === 'user10' ? 'move_r_10' : ''} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Testimonials;