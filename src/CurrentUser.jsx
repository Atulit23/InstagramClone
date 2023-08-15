import Navbar from './Navbar'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CommentSection from './CommentSection';
import CurrentStory from './CurrentStory'

export default function CurrentUser() {
    const [data, setData] = useState([])
    const [posts, setPosts] = useState([])
    var   [count, setCount] = useState(0)
    const [showComment, setShowComment] = useState(false)
    const [from, setFrom] = useState('')
    const [id, setID] = useState('')
    const [dp, setDP] = useState('')
    const [post, setPost] = useState('')
    const [fromStory, setFromStory] = useState('')
    const [storyDP, setStoryDP] = useState('')
    const [story_, setStory_] = useState('')
    const [stories, setStories] = useState([])
    let [storyFroms, setStoryFroms] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8001/follow').then((res) => {
            setData(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8001/post').then((res) => {
            setPosts(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8001/story').then((res) => {
            setStories(res.data)
        })
    }, [])

    posts.map((post, i) => {
        if (post.from == localStorage.getItem('loginUsername')) count = count + 1
    })

    stories.map((st, j) => {
        storyFroms.push(stories[j].from)
    })

    return (
        <main>
            <Navbar />
            <div className="current__user__profile">
                <div className="current__user__essentials">
                    <div className="imgBorder">
                        <img src={localStorage.getItem('loginDp')} alt="" className="searchUserDp" />
                    </div>
                    <div className="follow__stuff">
                        <p className="current__user__username">{localStorage.getItem('loginUsername')}</p>
                        {data.map((follow, index) => (
                            follow.username == localStorage.getItem('loginUsername') && <div div className="followInfo" >
                                <p className="posts">{count} posts</p>
                                <p className="followers">{follow.followers.length} followers</p>
                                <p className="following">{follow.following.length} following</p>
                            </div>
                        ))}
                        <div className="bioN">
                            <p>{localStorage.getItem('loginBio')}</p>
                        </div>
                    </div>
                </div>
                {storyFroms.includes(localStorage.getItem('loginUsername')) == true && <div className="user__stories" id='us__s'>
                    <div className="scroll__btns">
                        <div className='scroll__left' id='scroll__main' onClick={() => {
                            document.getElementById('us__s').scrollLeft -= 240
                            console.log(document.getElementById('us__s').scrollLeft)
                        }} />
                        <div className='scroll__right' style={{ left: '56rem' }} id='scroll__main' onClick={() => {
                            document.getElementById('us__s').scrollLeft += 240
                            console.log(document.getElementById('us__s').scrollLeft)
                        }} />
                    </div>
                    {
                        stories.map((story, i) => (
                            story.from == localStorage.getItem('loginUsername') &&
                            <div className="story__bg" id='s__bg' onClick={() => {
                                setStoryDP(story.dp)
                                setFromStory(story.from)
                                setStory_(story.post)
                                document.getElementById('body').style.overflowY = 'hidden'
                            }}>
                                <img src={story.post} alt="" />
                            </div>
                        ))
                    }
                </div>}


                <div className="user__posts">
                    <div className="sometext">
                        <svg aria-label="" class="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                        <p>POSTS</p>
                    </div>
                    <div className="all__user__post">
                        {
                            posts.map((post, i) => (
                                post.from == localStorage.getItem('loginUsername') && <img src={post.post} onClick={() => {
                                    setShowComment(!showComment)
                                    setFrom(post.from)
                                    setID(post.id)
                                    setPost(post.post)
                                    setDP(post.dp)
                                    document.getElementById('body').style.overflowY = 'hidden'
                                }} />
                            ))
                        }
                    </div>

                </div>
            </div>
            {showComment == true &&
                <>
                    <div className="posts__close" style={{ marginTop: window.scrollY }} onClick={() => {
                        setShowComment(!showComment)
                        document.getElementById('body').style.overflowY = 'scroll'
                    }}><svg aria-label="Close" color="#ffffff" fill="#ffffff" height="18" role="img" viewBox="0 0 48 48" width="18"><title>Close</title><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg></div>
                    <CommentSection post={post} dp={dp} from={from} id={id} />

                </>}

            {fromStory != '' &&
                <>
                    <div className="posts__close" style={{ left: '97vw', marginTop: window.scrollY }} onClick={() => {
                        setFromStory('')
                        setStoryDP('')
                        setStory_('')
                        document.getElementById('body').style.overflowY = 'scroll'
                    }}><svg aria-label="Close" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Close</title><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg></div>
                    <CurrentStory from={fromStory} dp={storyDP} story_={story_} />

                </>}
        </main>
    )
}
