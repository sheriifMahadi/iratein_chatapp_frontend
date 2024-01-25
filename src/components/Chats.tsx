import React from 'react'

import homesvg from '../assets/homesvg.svg'

import Header from './Header'
import NoMessage from './NoMessage'
import AddPersonModal from './AddPersonModal'
import Notification from './Notification'
import Inbox from './Inbox.tsx'
import { AuthContext } from "../contexts/AuthContext";

//

import { faComments } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useState, useContext } from 'react'
import { useParams } from "react-router-dom";

const Chat = () => {
    const { conversationName } = useParams(); 
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const { readyState, sendJsonMessage } = useWebSocket(user ? `ws://127.0.0.1:8000/chats/${conversationName}/` : null, { 
    queryParams:{
      token: user ? user.token: ""
    },
    onOpen: () => {
        console.log("Connected");
      },
      onClose: () => {
        console.log("Disconnected")
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "chat_message_echo":
            setMessageHistory((prev) => prev.concat(data));
            break;
          default:
            console.error("Unknown message type!");
            break;      
      }
    }
    });
    
    const connectionStatus = {
      [ReadyState.CONNECTING]: "Connecting",
      [ReadyState.OPEN]: "Open",
      [ReadyState.CLOSING]: "Closing",
      [ReadyState.CLOSED]: "Closed",
      [ReadyState.UNINSTANTIATED]: "Uninstantiated"
    }[readyState];
    
    function handleChangeMessage(e) {
      setMessage(e.target.value);
    }
     
    function handleChangeName(e) {
      setName(e.target.value);
    }
  
    function handleSubmit() {
      sendJsonMessage({
        type: "chat_message",
        message,
        name
      });
      setName("");
      setMessage("");
    }
    return (
        <div>
            <span>The WebSocket is currently {connectionStatus}</span>
            <div className="chat-container">
                <div className='left-pane'>

                    <div className='leftpane-top'>
                        <div className='home-icon'>
                        <img src={homesvg} alt="home"/>
                        <span className='home-icon-text'>Home</span>
                        </div>
                        <div className='chats-search-box'>

                            <FontAwesomeIcon icon={faComments} className="message-icon"/>
                            <input type="text" placeholder='Messages'/>
                        </div>
                    </div>

                    <div className='leftpane-bottom'>
                        <span className='button-logout-icon'>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} />
                        </span>

                        <button type="button">
                            Log out
                        </button>

                    </div>
                </div>

                <div className="right-pane">
                    <Header/>
                    {/* <Notification/> */}
                    {/* <NoMessage/> */}
                    {/* <AddPersonModal/> */}
                    <Inbox/>
                    
                </div>
            </div>
        </div>
    )
}

export default Chat  