import React from 'react';
import { useForm } from "react-hook-form";
import Sidebar from '../../Sidebar/Sidebar';

const MakeAdmin = () => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmitAdmin = (datalist) => {
        const adminData = {
            Admin_Name: datalist.Admin_Name,
            email: datalist.email,
            Admin_Added_Date: (new Date().getUTCDate()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getUTCFullYear())
        };

        const adminURL = `http://localhost:5000/addAdmin`

        // console.log(adminData);

        fetch(adminURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(adminData)
        })
            .then(res => {
                // console.log('server side response', res)
                // window.location.reload(false)
            })

    }

    return (
        <section className="">
            <Sidebar></Sidebar>
            <div className="col-9 my-5 py-5 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <div className="my-3 order-component">
                    <form onSubmit={handleSubmit(onSubmitAdmin)}>
                        <div className="row">
                            <div className="col">
                                <input name="Admin_Name" className="form-control" placeholder="Add Admin Name" ref={register} />
                                <input name="email" className="form-control my-5" placeholder="Add Admin Email" ref={register} />
                            </div>
                        </div>
                        <input className="btn btn-info ps-4 w-25" type="submit" />
                    </form>
                </div>

            </div>
        </section>
    );
};

export default MakeAdmin;