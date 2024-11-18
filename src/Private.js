import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Private({ children }) {
    
    const [loading, setloading] = useState(true)
    const [signed, setSigned] = useState(false);
    useEffect(() => {
        function isSigned() {
            
            const authorized = localStorage.getItem("@active")
           // Se autorizado for "true", usuário está autenticado
            if (authorized === "true") {
                setSigned(true);
            } else {
                setSigned(false); // Usuário não autenticado
            }
        
        }

        isSigned();
        setloading(false);
    }, [])

    if(loading){
        return(
            <div>
                
            </div>
        );
    }

    if(!signed){
         return <Navigate to="/" />;
    }

    return children
}