import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function Search() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8001/profile').then((res) => {
            setData(res.data)
        })
    }, [data])

    return (
        <main className='searchMain'>
            <div className="searchTab">
                {
                    data.map((profile, index) => {
                        return (
                            (profile.username.toLocaleLowerCase().includes(localStorage.getItem('searchVal').toLocaleLowerCase()) == true && profile.username.toLocaleLowerCase() != localStorage.getItem('loginUsername').toLocaleLowerCase()) && <div className="searchElements" key={index} onClick={() => {
                                localStorage.setItem('currName', profile.name)
                                localStorage.setItem('currUsername', profile.username)
                                localStorage.setItem('currBio', profile.bio)
                                localStorage.setItem('currDp', profile.dp)
                                window.location.href = `${profile.username}`
                            }}>
                                <img src={profile.dp} alt="" className='searchDp' />
                                <div className="searchNames">
                                    <p className="username">{profile.username}</p>
                                    <p className="name">{profile.name}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}
