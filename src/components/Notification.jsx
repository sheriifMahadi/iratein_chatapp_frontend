import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


const Notification = ({notificationDisplay}) => {
    return (
        <>
        {
        notificationDisplay==false 
        ? <div></div>
        :
            <div className='notification-main'>
                <div className="notification-inner">
                <span className='check-icon-span'>
                    <FontAwesomeIcon className='check-icon' icon={faCheck} style={{color: "#FFFFF",}} />
                </span>
                <p>Person has successfully been added</p>
                </div>
            </div>
        }
        </>
        
    ) 
}



export default Notification