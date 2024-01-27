import { AuthContext } from "../contexts/AuthContext";
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useState, useContext } from 'react'
import { useParams } from "react-router-dom";
import InboxNoChat from "./InboxNoChat";
import { Messages } from "./Messages.tsx";
import { MessageModel } from "../models/Messages";
import InfiniteScroll from "react-infinite-scroll-component";

const ChatTextBox = () => {
    const { conversationName } = useParams(); 
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const { readyState, sendJsonMessage } = useWebSocket(user ? `wss://irateinchatapp.onrender.com/chats/${conversationName}/` : null, { 
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
            setMessageHistory((prev: any) => prev.concat(data.message));
            break;
        case "last_50_messages":
            setMessageHistory(data.messages);
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
        <>
        {conversationName == undefined 
        ? <InboxNoChat/> 
        : 
        
        <div>
            <input
            name="message"
            placeholder="Message"
            onChange={handleChangeMessage}
            value={message}
            className="ml-2 shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-md"
            />
            <button className="ml-3 bg-gray-300 px-3 py-1" onClick={handleSubmit}>
            Submit
            </button>
            <hr />
            
                <div>
                <InfiniteScroll
                    dataLength={messageHistory.length}
                    className="flex flex-col-reverse" 
                    inverse={true}
                    scrollableTarget="scrollableDiv"
                >
                    {messageHistory.map((message: MessageModel) => (
                    <Messages key={message.id} message={message} />
                    ))}
                </InfiniteScroll>
            </div>
        </div>
        
        
        }
        </>
    )
}

export default ChatTextBox