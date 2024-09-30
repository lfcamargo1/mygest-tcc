import Header from "../../Components/Header/Header";
import '../Login/login.css'
import './profile.css'
import perfil from '../../Assets/PROFILE ICON.svg'

export default function Profile() {

    return (
        <>
            <Header name="Rafael" />
            <body className="container-perfil">
                <div className="profile-title">
                    <div className="name-row">
                        <h1>olá, Rafael.</h1>
                        <button className="save-btn">Salvar</button>
                    </div>
                    <div id="underline-perfil" className="underline"></div>
                </div>
                <div className="information">
                    <div className="dir">
                        <form>
                            <div className='inputarea-home'>
                                <label>Nome</label>
                                <input type='text' />
                            </div>

                            <div className='inputarea-home'>
                                <label>Email</label>
                                <input type='text' />
                            </div>

                            <div className='inputarea-home'>
                                <label>Moeda padrão</label>
                                <select>
                                </select>
                            </div>

                        </form>
                    </div>
                    <div className="esq">
                        <h2>Sua foto de perfil</h2>
                        <img src={perfil} />
                        <button className="save-btn">
                            Editar
                        </button>
                    </div>
                </div>
            </body>
        </>)
}