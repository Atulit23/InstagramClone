import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import signaxios from './signaxios.mjs'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState([])
    const [exists, setExists] = useState([])
    const [dataUser, setDataUser] = useState([])

    useEffect(() => {
        signaxios.get('/signup').then((res) => {
            setData(res.data)
        })
        axios.get('http://localhost:8001/profile').then((res) => {
            setDataUser(res.data)
        })
    }, [data] || [dataUser])


    return (
        <main className='loginMain'>
            <div className="login">
                <p>Login</p>
                <div className="inputs">
                    <input type="email" className="email" placeholder='Enter your email...' onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <input type="password" className="pass" placeholder='Enter your password...' onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </div>
                <button className="loginBtn" onClick={() => {
                    // localStorage.setItem('loginEmail', email)
                    // // localStorage.setItem('loginPass', password)
                    // localStorage.setItem('loginOrSign', 'login')

                    // for (let f = 0; f < dataUser.length; f++) {
                    //     if (email == dataUser[f].email) {
                    //         localStorage.setItem('loginUsername', dataUser[f].username)
                    //         localStorage.setItem('loginDp', dataUser[f].dp)
                    //     }
                    // }

                    let count = 0
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].useremail == email && data[i].password == password) {
                            exists[i] = true
                        }
                        if ((data[i].useremail != email && data[i].password != password) || (data[i].useremail == email && data[i].password != password) || (data[i].useremail != email && data[i].password == password)) {
                            exists[i] = false
                        }
                    }

                    for (let k = 0; k < exists.length; k++) {
                        if (exists[k] == false) {
                            count += 1
                        }
                    }

                    console.log(exists)

                    if (count == exists.length) {
                        alert('Invalid details')
                    }

                    if (count != exists.length) {
                        localStorage.setItem('loginEmail', email)
                        // localStorage.setItem('loginPass', password)
                        localStorage.setItem('loginOrSign', 'login')
                        for (let f = 0; f < dataUser.length; f++) {
                            if (email == dataUser[f].email) {
                                localStorage.setItem('loginUsername', dataUser[f].username)
                                localStorage.setItem('loginDp', dataUser[f].dp)
                                localStorage.setItem('loginBio', dataUser[f].bio)
                            }
                        }

                    }

                    // signaxios.put('/signup', { useremail: email, password: password })

                }}>Login</button>
                <Link to='signup' className='sign_link'>Don't have an account? Sign up.</Link>
            </div>
        </main >
    );
}

export default Login;
