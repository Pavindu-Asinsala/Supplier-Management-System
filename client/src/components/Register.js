import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { adddata } from './context/ContextProvider';
import './Home.css'


const Register = () => {
    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        name: '',
        email: '',
        age: '',
        mobile: '',
        work: '',
        add: '',
        desc: ''
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            };
        });
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, work, add, mobile, desc, age } = inpval;

        // Basic validation checks
        if (!name || !email || !work || !add || !mobile || !desc || !age) {
            alert('Please fill in all fields');
            return;
        }

        // Additional validation checks (e.g., email format, mobile number length, etc.)
        // You can customize these checks based on your requirements.

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Mobile number length validation
        if (mobile.length !== 10) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        // API call
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                age,
                work,
                mobile,
                add,
                desc
            })
        });

        const data = await res.json();

        if (res.status === 404 || !data) {
            alert('Error');
            console.log('error');
        } else {
            alert('Data added');
            history.push('/');
            setUdata(data);
            console.log('Data added');
        }
    };
    

    return (
        <div className="container1">

            <form className="mt--1">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Company</label>
                        <input type="text" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Mobile</label>
                        <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">NIC Number</label>
                        <input type="text" value={inpval.work} onChange={setdata} name="work" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Address</label>
                        <input type="text" value={inpval.add} onChange={setdata} name="add" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>


                    <button type="submit" onClick={addinpdata} class="btn btn-success custom-small">Submit</button>






                </div>
            </form>
        </div>
    )
}
export default Register;