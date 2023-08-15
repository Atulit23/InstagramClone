import Navbar from './Navbar'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CommentSection from './CommentSection';
import CurrentStory from './CurrentStory'

export default function SearchUser() {
    const [data, setData] = useState([])
    const [chatData, setChatData] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [some, setSome] = useState('')
    const [loggedInUserFollowing, setLoggedInUserFollowing] = useState([])
    const [loggedInUserFollowers, setLoggedInUserFollowers] = useState([])
    const [searchUserFollowing, setSearchUserFollowing] = useState([])
    const [searchUserFollowers, setSearchUserFollowers] = useState([])
    const [there, setThere] = useState(false)
    const [dummyFollowers, setDummyFollowers] = useState([])
    const [posts, setPosts] = useState([])
    var [count, setCount] = useState(0)
    const [showComment, setShowComment] = useState(false)
    const [from, setFrom] = useState('')
    const [id, setID] = useState('')
    const [dp, setDP] = useState('')
    const [post, setPost] = useState('')
    const [stories, setStories] = useState([])
    const [fromStory, setFromStory] = useState('')
    const [storyDP, setStoryDP] = useState('')
    const [story_, setStory_] = useState('')
    let [storyFroms, setStoryFroms] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8001/follow').then((res) => {
            setData(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8001/profile').then((res) => {
            setDataUser(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8001/chat').then((res) => {
            setChatData(res.data)
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
        if (post.from == localStorage.getItem('currUsername')) count = count + 1
    })

    stories.map((st, j) => {
        storyFroms.push(stories[j].from)
    })

    useEffect(() => {
        if (localStorage.getItem('loginOrSign') == 'login') {
            for (let i = 0; i < data.length; i++) {
                if (data[i].username == localStorage.getItem('loginUsername')) {
                    setLoggedInUserFollowing(data[i].following)
                    setLoggedInUserFollowers(data[i].followers)
                    setDummyFollowers(data[i].dummyFollowers)
                }
                if (data[i].username == localStorage.getItem('currUsername')) {
                    setSearchUserFollowing(data[i].following)
                    setSearchUserFollowers(data[i].followers)
                    if (data[i].followers.includes(localStorage.getItem('loginUsername')) == true) {
                        setThere(true)
                    }
                }
            }
        }
    }, [data])

    return (
        <main>
            <Navbar />
            <div className="serachUser">
                <div className="essentials">
                    <div className="imgBorder">
                        <img src={localStorage.getItem('currDp')} alt="" className="searchUserDp" />
                    </div>
                    <div className="everyMain">
                        <div className="userBio">
                            <div className="userSub">
                                <p className="serachUsername1">{localStorage.getItem('currUsername')}</p>
                                <button className="messageuser" onClick={async () => {
                                    if (dummyFollowers.includes(localStorage.getItem('currUsername')) == false) {
                                        dummyFollowers.push(localStorage.getItem('currUsername'))
                                    }
                                    // let alreadyThere = []
                                    // localStorage.setItem('directUsername', localStorage.getItem('currUsername'))
                                    // localStorage.setItem('directDP', localStorage.getItem('currDp'))
                                    // for (let i = 0; i < chatData.length; i++) {
                                    //     if (chatData[i].from == localStorage.getItem('loginUsername') && chatData[i].to == localStorage.getItem('currUsername')) {
                                    //         alreadyThere[i] = 'there'
                                    //     }
                                    //     else if (chatData[i].from != localStorage.getItem('loginUsername') && chatData[i].to != localStorage.getItem('currUsername')) {
                                    //         alreadyThere[i] = 'notThere'
                                    //     }
                                    //     else {
                                    //         alreadyThere[i] = 'notThere'
                                    //     }
                                    // }

                                    // if (alreadyThere.includes('there') == false) {
                                    //     // await axios.post('http://localhost:8001/chat', { from: localStorage.getItem('loginUsername'), to: localStorage.getItem('currUsername'), chats: [], which: [] })
                                    // }
                                    await axios.put('http://localhost:8001/follow', { username: localStorage.getItem('loginUsername'), following: loggedInUserFollowing, followers: loggedInUserFollowers, dummyFollowers: dummyFollowers })

                                    localStorage.setItem('directUsername', localStorage.getItem('currUsername'))
                                    localStorage.setItem('directDP', localStorage.getItem('currDp'))
                                    window.location.href = '/direct'
                                }}>Message</button>
                                {there == false && <button button className="followUser" onClick={async () => {
                                    if (localStorage.getItem('loginOrSign') == 'login') {
                                        for (let i = 0; i < data.length; i++) {
                                            if (data[i].username == localStorage.getItem('loginUsername')) {
                                                searchUserFollowers.push(localStorage.getItem('loginUsername'))
                                                setSearchUserFollowers(searchUserFollowers)
                                            }
                                            if (data[i].username == localStorage.getItem('currUsername')) {
                                                loggedInUserFollowing.push(localStorage.getItem('currUsername'))
                                                setLoggedInUserFollowing(loggedInUserFollowing)
                                            }
                                        }
                                    }
                                    await axios.put('http://localhost:8001/follow', { username: localStorage.getItem('loginUsername'), following: loggedInUserFollowing, followers: loggedInUserFollowers, dummyFollowers: dummyFollowers })
                                    await axios.put('http://localhost:8001/follow', { username: localStorage.getItem('currUsername'), following: searchUserFollowing, followers: searchUserFollowers, dummyFollowers: dummyFollowers })
                                }}>Follow</button>}
                                {there == true && <button className='followingUser' >Following</button>}
                            </div>
                            {data.map((follow, index) => (
                                follow.username == localStorage.getItem('currUsername') && <div div className="followInfo" >
                                    <p className="posts">{count} posts</p>
                                    <p className="followers">{follow.followers.length} followers</p>
                                    <p className="following">{follow.following.length} following</p>
                                </div>
                            ))}
                            <div className="bioN">
                                <p>{localStorage.getItem('currBio')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {storyFroms.includes(localStorage.getItem('currUsername')) == true && <div className="user__stories" id='u__s'>
                    <div className="scroll__btns">
                        <div className='scroll__left' id='scroll__main' onClick={() => {
                            document.getElementById('u__s').scrollLeft -= 240
                            console.log(document.getElementById('u__s').scrollLeft)
                        }} />
                        <div className='scroll__right' style={{ left: '56rem' }} id='scroll__main' onClick={() => {
                            document.getElementById('u__s').scrollLeft += 240
                            console.log(document.getElementById('u__s').scrollLeft)
                        }} />
                    </div>

                    {stories.map((story, i) => (
                        story.from == localStorage.getItem('currUsername') &&
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
                                post.from == localStorage.getItem('currUsername') && <img src={post.post} onClick={() => {
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
        </main >
    )
}
