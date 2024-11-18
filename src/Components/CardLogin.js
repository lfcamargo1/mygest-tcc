import { useEffect, useState } from "react";
import "./cardLogin.css"
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import { toast, ToastContainer } from "react-toastify";

export default function CardLogin(props) {

    const navigate = useNavigate()

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function switchPage() {
        if (window.location.pathname === "/")
            navigate("/register")
        else 
            navigate("/")     
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (email === "" || senha === "")
            return

        if (props.register) {

            if (nome === "" )
                return 

            await api.post("usuario", {
                email: email,
                senha: senha,
                nome: nome
            }).then((d) => {
                localStorage.setItem("@userId", d.data.idUsuario)
                localStorage.setItem("@userName", d.data.nomeUsuario)
                localStorage.setItem("@active", true)

                navigate("/home")
            }).catch((e) => toast.error(e.response.data.message))
        } 
        else {

            await api.get(`usuario/${email}/${senha}`)
            .then((d) => {
                localStorage.setItem("@userId", d.data.idUsuario)
                localStorage.setItem("@userName", d.data.nomeUsuario)
                localStorage.setItem("@active", true)
                
                navigate("/home")
            }).catch((e) => {
                toast.error(e.response.data.message)
            })
        }
    }

    return(
        <div className="box">
            <h2>{props.title}</h2>
            <div className="input-fields">
                <form onSubmit={(event) => handleSubmit(event)}>
                    {props.register ? (
                        <div className="inputarea">
                           <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" placeholder="Nome"/>     
                        </div>
                    ) : <></>}

                    <div className="inputarea">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email"/>     
                    </div>

                    <div className="inputarea">
                        <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="senha"/>     
                    </div>

                    <div className="btnarea" >

                        {props.register ? (
                            <>
                                <button type="submit">
                                    Registre-se
                                </button>
                                <button type="button" onClick={() => switchPage()}>
                                    Login
                                </button>
                            </>
                        ) : (
                            <>
                                <button type="submit">
                                    Login
                                </button>
                                <button type="button" onClick={(e) => switchPage(e.target)}>
                                    Register
                                </button>
                            </>
                        )}
 
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}