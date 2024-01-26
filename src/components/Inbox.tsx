import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import homesvg from '../assets/homesvg.svg'
import InboxNoChat from './InboxNoChat'
import React from 'react'

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
import { AuthContext } from "../contexts/AuthContext";
import ChatTextBox from './ChatTextBox'
import { UserModel } from '../models/User'

interface UserResponse {
  username: string;
  name: string;
  url: string;
}
const Inbox = ({users, user}) => {
   
    function convertChatName(username: string) {
        const namesAlph = [user?.username, username].sort();
        return `${namesAlph[0]}`.replace(/[^a-zA-Z0-9 ]/g, '-');;
    }
    return (
        <div className="inbox-main">
            <div className="left-pane-inbox-wrapper">
                <div className="left-pane-inbox">
                    Inbox
                </div>
                <div className="left-pane-inbox-search">
                <FontAwesomeIcon className='search-icon search-icon-secondary' icon={faMagnifyingGlass} />
                <input className="search-for-message" type="text" placeholder='Search for message'/>
                </div>
                {users.filter((u:UserModel) => u.username !== user?.username)
                .map((u:UserModel) => (
                    <Link 
                        key={u.username} 
                        to={`chats/${convertChatName(u.username)}`}>
                    <div className="chats-outer-wrapper">
                        <div className="chats-inner-wrapper">
                            <div className="profile-picture-wrapper">
                            <img src={homesvg} alt="" />
                        </div>
                        <div className="chats-info-wrapper">
                            <div className="chats-top">
                                <div className="chats-user">
                                    {u.username}
                                </div>
                                <div className="chats-timestamp">
                                    12:13
                                </div>
                            </div>
                            <div className="chats-bottom">
                                <div className="chats-last-message">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem quia voluptate, ratione totam doloribus officia quam sint atque ducimus quos similique odit? Ipsa sed itaque deserunt commodi esse quam provident corporis asperiores placeat architecto aperiam voluptatum neque, distinctio nesciunt debitis, at eum alias dolor natus! Praesentium neque quae vel eligendi.

                                </div>
                                <span className='unread'>
                                    2
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
                
            </div>
            <div className="right-pane-inbox-wrapper">
               <ChatTextBox/>
            </div>
            
    </div>
    )
}

export default Inbox