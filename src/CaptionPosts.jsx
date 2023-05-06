import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function CaptionPosts({ image, type, cap }) {
    const [caption, setCaption] = useState('')

    return (
        <div className='posts__sub' style={{ width: '50%' }}>
            <p className="posts__heading">Create a new post</p>
            <div className="posts__sub__main">
                <div className="post__upload__image">
                    <img src={image} alt="" />
                </div>
                <div className="post__caption">
                    <div className="post__user__details">
                        <img src={localStorage.getItem('loginDp')} alt="" />
                        <p>{localStorage.getItem('loginUsername')}</p>
                    </div>
                    {cap == true && <textarea className="caption__text" value={caption} placeholder='Write a caption...' onChange={(e) => {
                        setCaption(e.target.value)
                    }}></textarea>}
                    <button className='post__share' onClick={async () => {
                        axios.post(`http://localhost:8001/${type}`, { from: localStorage.getItem('loginUsername'), post: image, likeBy: [], comments: [], caption: caption, dp: localStorage.getItem('loginDp'), id: Math.random().toString() })
                        window.location.reload()
                    }}>Share</button>
                </div>
            </div>

        </div>
    )
}
