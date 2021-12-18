import React from 'react';
import './ContactForm.css'
import emailjs from 'emailjs-com';
import contactImg from '../../../Assets/Images/contact-us.jpg'

const ContactForm = () => {
    function sendEmail(e) {
        e.preventDefault();


        emailjs.sendForm('service_owtc906', 'template_e4221gr', e.target, 'user_mDinwGeMWeuKeKDTS1CS8')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
        
        // Notification for successfully message send
        const Swal = require('sweetalert2')
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Congratulations!! Your Message Successfully send!',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
        })
    }
    return (
        <div className="contact-form-container py-5 text-light" id="contact" >
            <div className="container contact-form-content">
                <div className="row d-flex">
                    <div className="col-md-6 align-self-center">
                        <img src={contactImg} className="img-fluid contact-img" alt="contact-img" />
                    </div>
                    <div className="col-md-6 align-self-center">
                        <h2>CONTACT US</h2>
                        <form className="contact-form" onSubmit={sendEmail}>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="user_name" placeholder="Name" required />
                            </div>
                            <div class="mb-3">
                                <input type="email" class="form-control" name="user_email" placeholder="Email" required />
                            </div>

                            <div class="mb-3">
                                <textarea class="form-control" name="message" placeholder="Message" rows="6" required></textarea>
                            </div>

                            <input type="submit" value="SEND MESSAGE" class="btn btn-contact" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;