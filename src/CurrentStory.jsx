import React from 'react'

export default function CurrentStory({ from, dp, story_ }) {
    return (
        <main className='current__story__main' style={{ marginTop: window.scrollY }}>
            <img src='http://static.cdninstagram.com/rsrc.php/v3/yM/r/rDzBWpi2fPw.png' alt="" className="story__logo" />
            <div className="story__main" style={{ background: `url(${story_})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className="story__credentials">
                    <img src={dp} alt="" />
                    <p>{from}</p>
                </div>
            </div>
        </main>
    )
}
