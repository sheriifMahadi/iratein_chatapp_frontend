
import React from "react";

const AddPersonModal = ({display, setDisplay, setNotificationDisplay}) =>  {
    const handleNotificationDisplay = (e) => {
        const notificationTimeout = setTimeout(
            function(){
                setNotificationDisplay(true)
            }
            ,1000
        )
        // clearTimeout(notificationTimeout)
    }
    return (
        <div>
            {
                display==false?
                <div>
                    
                </div>
                :
                <div className="modal-container">
            <div className="modal-main">
                <p>Invite a Person</p>
                <div className="modal-input-fields">
                    <div className="email-field-modal">
                        <label htmlFor="email">Email Address</label>
                        <span className="email-label-space">

                        </span>
                        <input type="text" name="email" placeholder="E.g john@gmail.com"/>
                    </div>
        
                    <div className="name-field-modal">
                        <span className="name-label-space">
                            
                        </span>
                        <label htmlFor="name">Name <span className="optional-text">(Optional)</span></label>
                        <span className="name-label-space">
                            
                        </span>
                        <input type="text" name="name" placeholder="E.g john@gmail.com"/>
                    </div>
                </div>
                    <div className="modal-buttons">
                        <button 
                        className="cancel" 
                        type="button"
                        onClick={() => setDisplay(false)}>
                            Cancel
                        </button>
        
                        <button 
                        className="add" 
                        type="button"
                        onClick={() => {setDisplay(false)
                        handleNotificationDisplay
                    
                    }
                        }
                        >
                            Add person
                        </button>
                    </div>

            </div>
        </div>
            }
        </div>
    )
}

export default AddPersonModal;