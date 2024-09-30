import Header from "../../Components/Header/Header";
import './perfil.css'
import '../Home/home.css'

export default function Perfil() {

    return(
        <>
            <Header name="Rafael" />
            <div className="container-perfil">
                <h1>Olá Rafael, essas são as informações do seu perfil!</h1>
                <div className="underline"></div>
                <div className="content-perfil">
                    <div className="infos">
                        <div className="inputarea-home" >
                            <label>Nome</label>
                            <input className="inputarea" type="text"/>
                        </div>

                        <div className="inputarea-home" >
                            <label>Email</label>
                            <input className="inputarea" type="text"/>
                        </div>

                        <div className="inputarea-home" >
                            <label>Moeda</label>
                            <input className="inputarea" type="text"/>
                        </div>
                    </div>

                    <div className="foto-perfil" >
                        
                    </div>
                </div>
            </div>
        </>
    );
}