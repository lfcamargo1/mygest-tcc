import { useEffect, useState } from "react";
import "./cardLogin.css"
import { useNavigate } from "react-router-dom";

export default function CardLogin(props) {

    const navigate = useNavigate()

    function switchPage() {
        if (window.location.pathname === "/")
            navigate("/register")
        else 
            navigate("/")     
    }

    return(
        <div className="box">
            <h2>{props.title}</h2>
            <div className="input-fields">
                <form>
                    {props.register ? (
                        <div className="inputarea">
                           <input type="text" placeholder="Nome"/>     
                        </div>
                    ) : <></>}

                    <div className="inputarea">
                        <input type="text" placeholder="Email"/>     
                    </div>

                    <div className="inputarea">
                        <input type="password" placeholder="senha"/>     
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
        </div>
    );
}