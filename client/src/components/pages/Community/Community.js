import React, { useState, useEffect } from 'react'
import { withCookies } from 'react-cookie';
import axios from 'axios';
function Community(props) {
   const [content, setContent] = useState('');
   const [send, setSend] = useState(false);
   const [chats, setChats] = useState([]);
   const userId = props.cookies.get('id');

   const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
         setSend(true)
      }
   }

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

            console.log(response.data)
         })
         .catch(err => console.error(err));
   }, [send])

   return (
      <div id="community">
         <div id="panel">Connect with Inverseria Community</div>
         <div id="chat-screen">
            <div id="chat-wrapper">
               {chats && chats.map(chat => {
                  if (chat.userId === userId) {
                     return (
                        <div key={chat._id} className="chat owner">
                           <div className="user">
                              <img className='user-picture' src={chat.userInfo[0].picture} alt="" />
                              <div className="username">{chat.userInfo[0].username}</div>
                           </div>
                           <span className='chat-content'>{chat.content}</span>
                        </div>)
                  } else {
                     return (
                        <div key={chat._id} className="chat not-owner">
                        <div className="user">
                              <img className='user-picture' src={chat.userInfo[0].picture} alt="" />
                              <div className="username">{chat.userInfo[0].username}</div>
                           </div>
                           <span className='chat-content'>{chat.content}</span>
                        </div>)
                  }
               })}
            </div>
            <div id="chat-input" >
               <input type="text" value={content} onKeyPress={handleKeyPress} onChange={(e) => { setContent(e.target.value) }} placeholder="share your ideas or post" />
               <button onClick={() => { setSend(true) }}><i className="fas fa-paper-plane"></i></button>
            </div>
         </div>
      </div>
   )
}

export default withCookies(Community);
