import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Chats({ directName }) {
    const [chat, setChat] = useState('')
    const [chats, setChats] = useState([])
    const [chats1, setChats1] = useState([])
    const [data, setData] = useState([])
    var [whichs, setWhichs] = useState([])
    const [v, setV] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8001/chat').then((res) => {
            setData(res.data)
        })
    }, [data])

    useEffect(() => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].from == localStorage.getItem('loginUsername') && data[i].to == localStorage.getItem('directUsername')) {
                setChats(data[i].chats)
                setWhichs(data[i].which)
                setChats1({
                    from: localStorage.getItem('loginUsername'), to: localStorage.getItem('directUsername'), chat: data[i].chats
                })
            }
            if (data[i].to == localStorage.getItem('loginUsername') && data[i].from == localStorage.getItem('directUsername')) {
                // if (data[i].chats.length > 0) {
                //     setChats(data[i].chats)
                //     setWhichs(data[i].which)
                //     setChats1({
                //         from: localStorage.getItem('loginUsername'), to: localStorage.getItem('directUsername'), chat: data[i].chats
                //     })
                // }

            }
        }

    }, [])

    return (
        <main>
            <div className="chat__main">
                {directName == true ?
                    <>
                        <div className="chat__header">
                            <div>
                                <img src={localStorage.getItem('directDP')} alt="" />
                                <p>{localStorage.getItem('directUsername')}</p>
                            </div>
                        </div>

                        <div className="chat__section">
                            {
                                data.map((chats, index) => (
                                    <>
                                        {
                                            (chats.from == localStorage.getItem('loginUsername') && chats.to == localStorage.getItem('directUsername')) ?

                                                <div className="main__single__chat">
                                                    <div className="single__chat">
                                                        <p>{chats.chats}</p>
                                                    </div>
                                                </div> :
                                                chats.to == localStorage.getItem('loginUsername') && chats.from == localStorage.getItem('directUsername') &&
                                                <div className="main__single__chat__other">
                                                    <div className="single__chat__other">
                                                        <p>{chats.chats}</p>
                                                    </div>
                                                </div>
                                        }
                                    </>
                                ))
                            }
                        </div>
                        <div className="send__chat">
                            <form action="submit" onSubmit={async (e) => {
                                e.preventDefault()
                                await axios.post('http://localhost:8001/chat', { from: localStorage.getItem('loginUsername'), to: localStorage.getItem('directUsername'), chats: chat })
                                setChat('')
                            }}>
                                <input type="text" placeholder='Message...' value={chat} onChange={(e) => {
                                    setChat(e.target.value)
                                }} />
                            </form>
                        </div>
                    </>

                    :
                    <p className='nothin__text'>There's nothing here</p>
                }

            </div>
        </main >
    )
}
