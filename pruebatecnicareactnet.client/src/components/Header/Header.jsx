/* eslint-disable react/prop-types */
import "./Header.css"
import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <header className={`header__container ${props.isIndex ? 'index' : ''}`}>
            {!props.isIndex && <div className="header__nav">
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                </Link>
            </div>}
            <h1 className="header__title">{props.title}</h1>
        </header>
    )
}

export default Header