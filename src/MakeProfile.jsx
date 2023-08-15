import signaxios from './signaxios.mjs'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { MongoClient } from "mongodb";

// http://uploads-ssl.webflow.com/5ee6e50fe4be3a81f496e5ad/601a2e29a4cc31ad238481c6_instagram%201920x1080.jpg

export const MakeProfile = () => {
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [username, setUsername] = useState('')
    const [img, setImg] = useState('')
    const [bio, setBio] = useState('')
    const url = 'mongodb+srv://atulitgaur:sanjayashaS28@cluster0.zbmbdhh.mongodb.net/?retryWrites=true&w=majority'

    return (
        <main id='profileMain'>
            <div className="profile">
                <p className="Instagram">Instagram</p>
                <div className="name_main">
                    <p>Name</p>
                    <input type="text" className="name" placeholder='Name goes here...' onChange={(e) => {
                        setName(e.target.value)
                    }} />
                </div>
                <div className="dom_main">
                    <p>Date Of Birth</p>
                    <input type="text" className="dob" placeholder='dd/mm/yy' onChange={(e) => {
                        setDob(e.target.value)
                    }} />
                </div>
                <div className="username_main">
                    <p>Username</p>
                    <input type="text" className="usernameIn" placeholder='Username goes here...' onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                </div>
                <div className="dp_main">
                    <p>Profile Picture</p>
                    <input type="file" accept="image/*" className="dp" onChange={async (e) => {
                        const url = e.target.files[0];
                        const formData = new FormData();
                        formData.append('file', e.target.files[0]);
                        formData.append('upload_preset', 'nb6tvi1b');

                        axios
                            .post(
                                'http://api.cloudinary.com/v1_1/ddvajyjou/image/upload',
                                formData
                            )
                            .then(async response => {
                                setImg(response.data.secure_url);
                            });

                    }} />
                </div>
                <div className="bio_name">
                    <p>About You</p>
                    <textarea type="text" className="bio" placeholder='About you...' onChange={(e) => {
                        setBio(e.target.value)
                    }} />
                </div>
                <button className="submit" onClick={async () => {
                    if (img == '') {
                        img = 'http://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }
                    await axios.post('http://localhost:8001/profile', { name: name, dob: dob, username: username, dp: img, bio: bio, email: localStorage.getItem('signEmail'), password: localStorage.getItem('signPass') })
                    await axios.post('http://localhost:8001/follow', { username: username, follower: [], following: [], dummyFollowers: [] })
                    window.location.href = '/'
                }}>Submit</button>
            </div>
        </main>
    )
}
