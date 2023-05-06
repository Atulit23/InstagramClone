import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import signaxios from './signaxios.mjs'
import React, { useState, useEffect } from 'react'

function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState([])
    const [exists, setExists] = useState([])

    useEffect(() => {
        signaxios.get('/signup').then((res) => {
            setData(res.data)
        })
    }, [data])

    return (
        <main>
            <main className='loginMain'>
                <div className="login">
                    <p>Sign Up</p>
                    <div className="inputs">
                        <input type="email" className="email" placeholder='Enter your email...' onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                        <input type="password" className="pass" placeholder='Enter your password...' onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>
                    <button className="loginBtn" onClick={async () => {
                        localStorage.setItem('signEmail', email)
                        localStorage.setItem('signPass', password)
                        localStorage.setItem('loginOrSign', 'signup')


                        for (let i = 0; i < data.length; i++) {
                            if (data[i].useremail == email && data[i].password == password) {
                                exists[i] = false
                            }
                            if (data[i].useremail != email && data[i].password != password) {
                                exists[i] = true
                            }
                        }
                        if (exists.includes(false) == false) {
                            await signaxios.post('signup', { useremail: email, password: password })
                            window.location.href = '/profile'
                        }
                        if (exists.includes(false) == true) {
                            console.log('User already exists!')
                        }
                    }}>Sign Up</button>
                    <Link to='/' className='sign_link'>Already have an account? Login.</Link>
                </div>
            </main>
        </main>
    );
}

export default SignUp;
