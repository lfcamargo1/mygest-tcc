import CardHome from "../../Components/CardHome/CardHome";
import './home.css'
import Header from "../../Components/Header/Header";

export default function Home() {
    return (
        <>
            <Header />
            <body>
                <div className="card-rows" >
                    <CardHome title="Entradas" />
                    <CardHome title="Saidas" />
                    <CardHome title="Saldo" />
                </div>
            </body>
        </>
    )
}