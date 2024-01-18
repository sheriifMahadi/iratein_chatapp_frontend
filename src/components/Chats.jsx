import homesvg from '../assets/homesvg.svg'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Chat = () => {
    return (
        <div>
            <div className="chat-container">
                <div className='left-pane'>

                    <div className='leftpane-top'>
                        <div className='home-icon'>
                        <img src={homesvg} alt="home"/>
                        <span className='home-icon-text'>Home</span>
                        </div>
                        <div className='chats-search-box'>
                            <input type="text" placeholder='Messages'/>

                            <span className="message-icon-div">
                                <FontAwesomeIcon icon={faComments} className="message-icon"/>
                            </span>
                          
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
                    text
                </div>
            </div>
        </div>
    )
}

export default Chat  