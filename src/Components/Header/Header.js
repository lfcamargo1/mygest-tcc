import { Link } from "react-router-dom";
import logo from "../../Assets/LOGO.svg"
import icon from "../../Assets/PROFILE ICON.svg"
import "./header.css"

export default function Header() {

    const name = localStorage.getItem("@userName")
    return (
        <header>
            <div className="logo" >
                <div className="name" >
                    <img src={icon} />
                    <span>{name}</span>
                </div>
                <img src={logo} />

                <nav>
                    <ul>
                        <Link to='/home'>Home</Link>
                        <Link to='/categorias'>categorias</Link>
                        <Link to='/profile'>Perfil</Link>
                    </ul>
                </nav>
            </div>
        </header>
    );
}