import Navbar from './Navbar'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CommentSection from './CommentSection';

export default function Explore() {
    const [posts, setPosts] = useState([])
    const [showComment, setShowComment] = useState(false)
    const [from, setFrom] = useState('')
    const [id, setID] = useState('')
    const [dp, setDP] = useState('')
    const [post, setPost] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8001/post').then((res) => {
            setPosts(res.data)
        })
    }, [])

    return (
        <main>
            <Navbar />
            <div className="explore__posts">
                {
                    posts.map((post, index) => (
                        <img src={post.post} alt="" onClick={() => {
                            setFrom(post.from)
                            setDP(post.dp)
                            setPost(post.post)
                            setID(post.id)
                            setShowComment(!showComment)
                            document.getElementById('body').style.overflowY = 'hidden'
                        }} />
                    ))
                }
            </div>
            {showComment == true &&
                <>
                    <div className="posts__close" style={{ marginTop: window.scrollY }} onClick={() => {
                        setShowComment(!showComment)
                        document.getElementById('body').style.overflowY = 'scroll'
                    }}><svg aria-label="Close" color="#ffffff" fill="#ffffff" height="18" role="img" viewBox="0 0 48 48" width="18"><title>Close</title><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg></div>
                    <CommentSection post={post} dp={dp} from={from} id={id} />

                </>}
        </main>
    )
}
