import { useState } from "react";
import figure from "../../Assets/figureLogin.png"
import CardLogin from "../../Components/CardLogin";
import './register.css'

export default function Register() {

    return(
        <div className="container">
           <div className="left" >
                <div className="content">
                    <div className="title">
                        <h1>Bem-vindo(a) ao MyGest</h1>
                        <span>Controle suas finanças e cuide do seu dinheiro.</span>
                    </div>
                    <img src={figure} className="figure" />
                </div>
           </div>
           <div className="right">
                <h1>Faça seu registro!</h1>
                <CardLogin title="Registre-se" register={true}/>
                <div className="bola-cima"></div>
           </div>
        </div>
    );
}