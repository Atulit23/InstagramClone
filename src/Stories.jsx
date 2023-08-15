import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CurrentStory from './CurrentStory'

export default function Stories() {
    const [data, setData] = useState([])
    const [follow, setFollow] = useState([])
    const [following, setFollowing] = useState([])
    const [from, setFrom] = useState('')
    const [dp, setDP] = useState('')
    const [story_, setStory_] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8001/story').then((res) => {
            setData(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8001/follow').then((res) => {
            setFollow(res.data)
        })
    }, [])

    useEffect(() => {
        for (let i = 0; i < follow.length; i++) {
            if (localStorage.getItem('loginUsername') == follow[i].username) {
                setFollowing(follow[i].following)
            }
        }
    }, [follow])

    let scrollLeft = 0

    return (
        <main>
            <div className="main__stories" id='m__s'>
                <div className="scroll__btns">
                    <div className='scroll__left' id='scroll__main' onClick={() => {
                        document.getElementById('m__s').scrollLeft -= 240
                        console.log(document.getElementById('m__s').scrollLeft)
                    }} />
                    <div className='scroll__right' id='scroll__main' onClick={() => {
                        document.getElementById('m__s').scrollLeft += 240
                        console.log(document.getElementById('m__s').scrollLeft)
                    }} />
                </div>
                {
                    data.map((story, i) => (
                        following.includes(story.from) == true && <div className='current__story' onClick={() => {
                            setDP(story.dp)
                            setFrom(story.from)
                            setStory_(story.post)
                            document.getElementById('body').style.overflowY = 'hidden'
                        }}>
                            <div className="story__bg">
                                <img src={story.dp} alt="" />
                            </div>
                            <p>{story.from}</p>
                        </div>
                    ))
                }
            </div>
            {from != '' &&
                <>
                    <div className="posts__close__story" style={{ left: '97vw', marginTop: window.scrollY }} onClick={() => {
                        setFrom('')
                        setDP('')
                        setStory_('')
                        document.getElementById('body').style.overflowY = 'scroll'
                    }}><svg aria-label="Close" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Close</title><path clip-rule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fill-rule="evenodd"></path></svg></div>
                    <CurrentStory from={from} dp={dp} story_={story_} />

                </>}
        </main>
    )
}
