import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import messagebubble from '../assets/messagebubble.svg'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const NoMessage = () => {
    return (
        <div className="content">
            <div className='chat-message-icon'>
                <img src={messagebubble} alt="home"/>
            </div>
            <div className="no-chats">
                No Chats
            </div>
            <div className="empty-inbox-text">
                You have not recieved or send anyone a 
                    <span>
                        message.
                    </span>
            </div>
            <div className="add-person-btn-container">
                <span className='add-person-icon'>
                    <FontAwesomeIcon icon={faPlus} />
                </span>
                <button className="add-person-btn" type="button">
                    Add person
                </button>
            </div>
           
        </div>
    )
}

export default NoMessage