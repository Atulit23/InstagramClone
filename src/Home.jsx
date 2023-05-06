import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Login from './Login'
import MainContent from './MainContent'
import Navbar from './Navbar'
import Stories from './Stories'

export default function Home() {
    const [data, setData] = useState([])
    const [posts, setPosts] = useState([])
    const [follow, setFollow] = useState([])
    const [following, setFollowing] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8001/post').then((res) => {
            setPosts(res.data)
        })
    }, [posts])

    useEffect(() => {
        axios.get('http://localhost:8001/follow').then((res) => {
            setFollow(res.data)
        })
    }, [follow])

    useEffect(() => {
        for (let i = 0; i < follow.length; i++) {
            if (localStorage.getItem('loginUsername') == follow[i].username) {
                setFollowing(follow[i].following)
            }
        }
    }, [follow])


    return (
        <>
            {(localStorage.getItem('loginEmail') != '' && localStorage.getItem('loginEmail')) ? <main>
                <Navbar />
                <div className="main__content">
                    <Stories />
                    {
                        posts.map((post, index) => (
                            following.includes(post.from) == true && <MainContent from={post.from} post={post.post} likeBy={post.likeBy} comments={post.comments} caption={post.caption} dp={post.dp} id={post.id} />
                        ))
                    }
                </div>
            </main>
                : <Login />
            }
        </>


    )
}
