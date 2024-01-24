import messagebubble from '../assets/messagebubble.svg'


const InboxNoChat = () => {
    return (
        <>
            <div className="no-chat-open">
            <div className='chat-message-icon chat-message-icon-secondary'>
                    <img src={messagebubble} alt="home"/>
                </div>
                <div className="no-chats">
                    Click on chat to read conversation
                </div>
        </div>
        </>
    )
}

export default InboxNoChat