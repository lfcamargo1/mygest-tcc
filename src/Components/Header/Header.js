import logo from "../../Assets/LOGO.svg"
import icon from "../../Assets/PROFILE ICON.svg"
import "./header.css"

export default function Header(props) {
    return (
        <header>
            <div className="logo" >
                <div className="name" >
                    <img src={icon}/>
                    <span>Luís Bruno</span>
                </div>
                <img src={logo} />

                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Carteira</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}