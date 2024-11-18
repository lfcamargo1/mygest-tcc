import Header from "../../Components/Header/Header";
import '../Login/login.css'
import './profile.css'
import perfil from '../../Assets/PROFILE ICON.svg'
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import api from "../../Services/api";

export default function Profile() {

    const userId = localStorage.getItem("@userId")
    const [loading, setLoading] = useState(true)

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [moeda, setMoeda] = useState("")
    const [moedas, setMoedas] = useState([])

    const [userAvatar, setUserAvatar] = useState("")
    
    const fileInputRef = useRef(null);

    useEffect(() => {
        async function getUserData() {
            await api.get("/usuario/find-by-id/" + userId)
            .then((data) => {
                setUserName(data.data.nomeUsuario);
                setUserEmail(data.data.emailUsuario);
                setMoeda(data.data.moedaPadrao);
                setUserAvatar(data.data.userAvatar);

                console.log(data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        getUserData();
        getAllMoedas();
    }, [])

    async function getAllMoedas() {
        await api.get("moedas/get-all")
        .then((data) => setMoedas(data.data))
        .catch((error) => console.log(error))
    }

    async function handleSubmit() {
        await api.put("/usuario/update-user/" + userId, 
            {
                dataRegistro: null,
                emailUsuario: userEmail,
                moedaPadrao: moeda,
                nomeUsuario: userName,
                userAvatar: userAvatar
            }
        )
        .then(() => {
            toast.success("Perfil atualizado!")
            localStorage.removeItem("@userName")
            localStorage.setItem("@userName", userName)
    })
        .catch((error) => console.log(error))
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setUserAvatar(null);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserAvatar(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file); // Converte o arquivo para base64
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };
    return (
        <>
            <Header name="Luis" />
            <body className="container-perfil">
                {loading ? (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                ) : (
                <>
                <div className="profile-title">
                    <div className="name-row">
                        <h1>{userName}</h1>
                        <button className="save-btn" onClick={() => handleSubmit()}>Salvar</button>
                    </div>
                    <div id="underline-perfil" className="underline"></div>
                </div>
                <div className="information">
                    <div className="dir">
                        <form>
                            <div className='inputarea-home'>
                                <label>Nome</label>
                                <input value={userName} onChange={(e) => setUserName(e.target.value)} type='text' />
                            </div>

                            <div className='inputarea-home'>
                                <label>Email</label>
                                <input type='text' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                            </div>

                            <div className='inputarea-home'>
                                <label>Moeda padrão</label>
                                <select value={moeda} onChange={(e) => setMoeda(e.target.value)}>
                                    {moedas.map((m) => (
                                        <option value={m.idMoeda}>{m.nomeMoeda}</option>
                                    ))}
                                </select>
                            </div>

                        </form>
                    </div>
                    <div className="esq">
                        <h2>Sua foto de perfil</h2>
                        <img src={userAvatar !== null ? `data:image/png;base64,${userAvatar}` :  perfil} />
                        <div className="input-photo-area">
                            <input className="photo-input" ref={fileInputRef} type="file" onChange={handleFileChange} />
                            <button onClick={handleClick}>Escolher Arquivo</button>
                        </div>
                    </div>
                </div>
                </>
                )}
            </body>
            <ToastContainer/>
        </>)
}