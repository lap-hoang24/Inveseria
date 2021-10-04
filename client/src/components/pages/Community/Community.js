import React, { useState, useEffect } from 'react'
import { withCookies } from 'react-cookie';
import axios from 'axios';
function Community(props) {
   const [content, setContent] = useState('');
   const [send, setSend] = useState(false);
   const [chats, setChats] = useState([]);
   const userId = props.cookies.get('id');

   useEffect(() => {
      if (content !== '') {
         axios.post(process.env.REACT_APP_API_URL + '/chatApi/sendChat', { content, userId })
            .then(response => {
               setContent('');
               setSend(false);
            })
            .catch(err => console.error(err));
      }


      axios.get('/chatApi/getAllChats')
         .then(response => {
            setChats(response.data);
         })
         .catch(err => console.error(err));
   }, [send])

   return (
      <div id="community">
         <div id="panel">Chat with Inverseria Community</div>
         <div id="chat-screen">
            <div id="chat-wrapper">
               {chats && chats.map(chat => {
                  if (chat.userId === userId) {
                     return (
                        <div key={chat._id} className="chat owner">
                           <img className='user-picture' src={chat.userInfo[0].picture} alt="" />
                           <span className='chat-content'>{chat.content}</span>
                        </div>)
                  } else {
                     return (
                        <div key={chat._id}  className="chat not-owner">
                           <img className='user-picture' src={chat.userInfo[0].picture} alt="" />
                           <span className='chat-content'>{chat.content}</span>
                        </div>)
                  }
               })}

            </div>
            <div id="chat-input" >
               <input type="text" value={content} onChange={(e) => { setContent(e.target.value) }} placeholder="type your ideas" />
               {/* <button onClick={() => { setSend(true) }}>send</button> */}
            </div>
         </div>
      </div>
   )
}

export default withCookies(Community);
