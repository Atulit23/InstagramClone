import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Chats from './Chats'

export default function Direct() {
    const [data, setData] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [chatData, setChatData] = useState([])
    var [directName, setDirectName] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8001/follow').then((res) => {
            setData(res.data)
        })
    }, [data])

    useEffect(() => {
        axios.get('http://localhost:8001/profile').then((res) => {
            setDataUser(res.data)
        })
    }, [dataUser])

    useEffect(() => {
        axios.get('http://localhost:8001/chat').then((res) => {
            setChatData(res.data)
        })
    }, [chatData])

    let followers = []

    return (
        <main className='main__direct'>
            <Navbar />
            <div className="direct_main">
                <div className="direct_list">
                    <p className='directUsername'>{localStorage.getItem('loginUsername')}</p>
                    <div className="direct_followerMain" >
                        {
                            data.map((follow, index) => {
                                if (follow.username == localStorage.getItem('loginUsername')) {
                                    if (follow.dummyFollowers.length > 0) {
                                        if (follow.dummyFollowers.includes(localStorage.getItem('directUsername')) || follow.dummyFollowers.includes(localStorage.getItem('loginUsername'))) {
                                            directName = true
                                        }
                                    }

                                    if (follow.dummyFollowers.length == 0) {
                                        directName = false
                                    }
                                }
                                return (
                                    follow.username == localStorage.getItem('loginUsername') &&
                                    follow.dummyFollowers.map((followers, i) => (
                                        localStorage.getItem('directUsername') == followers ? <div className="subFollower" style={{ background: ' #dfdfdf5e' }}
                                            onClick={() => {
                                                localStorage.setItem('directUsername', followers)
                                                dataUser.map((dp, i) => {
                                                    dp.username == followers && localStorage.setItem('directDP', dp.dp)
                                                })
                                            }}>
                                            <div className="direct_follower">
                                                {dataUser.map((dp, i) => (
                                                    dp.username == followers && <img src={dp.dp} alt="" />
                                                ))}
                                                <div className="nameAndMessage">
                                                    <p>{followers}</p>
                                                    <p className='msgg'>Sent you a message.</p>
                                                </div>
                                            </div>
                                        </div> :
                                            <div className="subFollower" style={{ background: 'white' }} onClick={() => {
                                                localStorage.setItem('directUsername', followers)
                                                dataUser.map((dp, i) => {
                                                    dp.username == followers && localStorage.setItem('directDP', dp.dp)
                                                })
                                            }}>
                                                <div className="direct_follower">
                                                    {dataUser.map((dp, i) => (
                                                        dp.username == followers && <img src={dp.dp} alt="" />
                                                    ))}
                                                    <div className="nameAndMessage">
                                                        <p>{followers}</p>
                                                        <p className='msgg'>Sent you a message.</p>
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                    )
                                )
                            })
                        }
                    </div>
                </div>
                <div className="direct__chat">
                    <Chats directName={directName} />
                </div>
            </div>

            <div className="direct_main__mobile">

                {(localStorage.getItem('directUsername') == '' || !localStorage.getItem('directUsername')) ?

                    <div className="direct_list">
                        <p className='directUsername'>{localStorage.getItem('loginUsername')}</p>
                        <div className="direct_followerMain" >
                            {
                                data.map((follow, index) => {
                                    if (follow.username == localStorage.getItem('loginUsername')) {
                                        if (follow.dummyFollowers.length > 0) {
                                            if (follow.dummyFollowers.includes(localStorage.getItem('directUsername')) || follow.dummyFollowers.includes(localStorage.getItem('loginUsername'))) {
                                                directName = true
                                            }
                                        }

                                        if (follow.dummyFollowers.length == 0) {
                                            directName = false
                                        }
                                    }
                                    return (
                                        follow.username == localStorage.getItem('loginUsername') &&
                                        follow.dummyFollowers.map((followers, i) => (
                                            localStorage.getItem('directUsername') == followers ? <div className="subFollower" style={{ background: ' #dfdfdf5e' }}
                                                onClick={() => {
                                                    localStorage.setItem('directUsername', followers)
                                                    dataUser.map((dp, i) => {
                                                        dp.username == followers && localStorage.setItem('directDP', dp.dp)
                                                    })
                                                }}>
                                                <div className="direct_follower">
                                                    {dataUser.map((dp, i) => (
                                                        dp.username == followers && <img src={dp.dp} alt="" />
                                                    ))}
                                                    <div className="nameAndMessage">
                                                        <p>{followers}</p>
                                                        <p className='msgg'>Sent you a message.</p>
                                                    </div>
                                                </div>
                                            </div> :
                                                <div className="subFollower" style={{ background: 'white' }} onClick={() => {
                                                    localStorage.setItem('directUsername', followers)
                                                    dataUser.map((dp, i) => {
                                                        dp.username == followers && localStorage.setItem('directDP', dp.dp)
                                                    })
                                                }}>
                                                    <div className="direct_follower">
                                                        {dataUser.map((dp, i) => (
                                                            dp.username == followers && <img src={dp.dp} alt="" />
                                                        ))}
                                                        <div className="nameAndMessage">
                                                            <p>{followers}</p>
                                                            <p className='msgg'>Sent you a message.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                        )
                                        )
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className="direct__chat">
                        <button className="back__to__direct__list" onClick={() => {
                            console.log('lol')
                            localStorage.setItem('directUsername', '')
                        }}><svg aria-label="Back" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg></button>
                        <Chats directName={directName} />
                    </div>
                }
            </div>

        </main>
    )
}
