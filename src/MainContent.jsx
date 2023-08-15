import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CommentSection from './CommentSection';

export default function MainContent({ from, post, likeBy, comments, caption, dp, id }) {
    const [posts, setPosts] = useState([])
    const [userComments, setUserComments] = useState([])
    const [likedBy, setLikedBy] = useState([])
    const [showComment, setShowComment] = useState(false)
    const [comm, setComm] = useState('')
    console.log(id)

    const getPostData = async () => {
        axios.get('http://localhost:8001/post').then((res) => {
            setPosts(res.data)
        })
    }
    
    useEffect(() => {
        getPostData()
    }, [userComments, likedBy])

    useEffect(() => {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id == id) {
                setLikedBy(posts[i].likeBy)
                setUserComments(posts[i].comments)
            }
        }
    }, [posts])

    return (
        <main>
            <div className="main__posts">
                <div className="post__user">
                    <img src={dp} alt="" />
                    <p>{from}</p>
                </div>
                <img src={post} alt="" className='post__image' />
                <div className="user__activities">
                    {likedBy.includes(localStorage.getItem('loginUsername')) == false ? <span onClick={() => {
                        if (likedBy.includes(localStorage.getItem('loginUsername')) == false) {
                            likedBy.push(localStorage.getItem('loginUsername'))
                        }
                        axios.put('http://localhost:8001/post', { from: from, post: post, likeBy: likedBy, comments: userComments, caption: caption, dp: dp, id: id.toString() })

                    }}><svg aria-label="Like" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg></span>
                        :
                        <span onClick={() => {
                            likedBy.splice(likedBy.lastIndexOf(localStorage.getItem('loginUsername')), 1)
                            axios.put('http://localhost:8001/post', { from: from, post: post, likeBy: likedBy, comments: userComments, caption: caption, dp: dp, id: id.toString() })
                            getPostData()
                        }}><svg aria-label="Unlike" class="_ab6-" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></span>
                    }
                    <span onClick={() => {
                        setShowComment(!showComment)
                        document.getElementById('body').style.overflowY = 'hidden'
                    }}><svg aria-label="Comment" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg></span>
                </div>
                <p className="post__likes">{likedBy.length} likes</p>
                <div className="post__texts">
                    {caption != '' && <p className="post__main__caption"><span>{from}</span>{caption.substring(0, 70)}</p>}

                    <button className="view__comments" onClick={() => {
                        setShowComment(!showComment)
                        document.getElementById('body').style.overflowY = 'hidden'
                    }}>View all {userComments.length} comments</button>

                    <form action="submit" className='form__comment' onSubmit={(e) => {
                        e.preventDefault()
                        userComments.push({ from: localStorage.getItem('loginUsername'), comment_: comm })
                        axios.put('http://localhost:8001/post', { from: from, post: post, likeBy: likedBy, comments: userComments, caption: caption, dp: dp, id: id.toString() })
                        getPostData()
                        setComm('')
                    }}>
                        <input type="text" className="add__comment" style={{ height: '57%', width: '95.3%' }} value={comm} placeholder='Press Enter to add a comment...' onChange={(e) => {
                            if (e.target.value != '') {
                                setComm(e.target.value)
                            }
                        }} />
                    </form>
                </div>

            </div>
            {showComment == true &&
                <>
                    <div className="posts__close" style={{ marginTop: window.scrollY }} onClick={() => {
                        setShowComment(!showComment)
                        document.getElementById('body').style.overflowY = 'scroll'
                    }}><svg aria-label="Close" color="#ffffff" fill="#ffffff" height="18" role="img" viewBox="0 0 48 48" width="18"><title>Close</title><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg></div>
                    <CommentSection post={post} dp={dp} from={from} id={id.toString()} />

                </>}
        </main>
    )
}
