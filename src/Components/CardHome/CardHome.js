import seta from "../../Assets/seta3.png";
import "./cardHome.css";

export default function CardHome(props) {

    return (
        <div className="card">
            <div className="title">
                <span>{props.title}</span>
                <img src={seta} />
            </div>
            <span className="value">R$ 1500,00</span>
        </div>
    )
}