import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import homesvg from '../assets/homesvg.svg'


const Header = () => {


    return (
        <div className="header">
            <div className="header-left">
                <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
                <input className="search-for-house" type="text" placeholder='Search for house'/>
                <input className="location" type="text" placeholder='Location'/>
                <FontAwesomeIcon className='location-icon' icon={faLocationDot} />

            </div>
            <div className="header-right">
                <span className='notification-icon'>
                    <FontAwesomeIcon icon={faBell} />
                </span>
                <span className='profile'>
                    <select name="user" id="user">
                        <option value="john doe">
                            John Doe
                        </option>
                        <option value="">
                        <img src={homesvg} alt="home"/>

                        </option>
                    </select>
                </span>
            </div>
        </div>
    )
}

export default Header