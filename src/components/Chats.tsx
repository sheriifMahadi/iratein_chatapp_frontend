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
import { useState, useContext, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

interface UserResponse {
    username: string;
    name: string;
    url: string;
  }

export default function Chat() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    
    const formik = useFormik({
        initialValues: {
          username: "",
          password: "",
        },
        onSubmit: async (values, { setSubmitting }) => {
          setSubmitting(true);
          const { username, password } = values;
          const res = await logout();
          navigate("/login");
          
          setSubmitting(false);
        },
      });

      const { user } = useContext(AuthContext);
      const [users, setUsers] = useState<UserResponse[]>([]);
  
      useEffect(() => {
          async function fetchUsers() {
            const res = await fetch("https://irateinchatapp.onrender.com/api/users/all/", {
              headers: {
                Authorization: `Token ${user?.token}`
              }
            });
            const data = await res.json();    
            setUsers(data);
          }
          fetchUsers();
        }, [user]);
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

                            <FontAwesomeIcon icon={faComments} className="message-icon"/>
                            <input type="text" placeholder='Messages'/>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit}>

                    <div className='leftpane-bottom'>
                        <span className='button-logout-icon'>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} />
                        </span>

                        <button type="submit">
                            {formik.isSubmitting ? "Logging out..." : "Log out"}
                        </button>

                    </div>
                    </form>

                </div>

                <div className="right-pane">
                    <Header/>
                    {
                        users !== null
                        ? <Inbox users={users} user={user}/>
                        : <NoMessage/>

                    }
                    
                </div>
            </div>
        </div>
    )
}

