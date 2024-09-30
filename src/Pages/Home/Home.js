import CardHome from "../../Components/CardHome/CardHome";
import './home.css'
import plus from '../../Assets/plus-icon.svg'
import Header from "../../Components/Header/Header";
import lixeira from '../../Assets/lixeira1.svg'

export default function Home() {
    return (
        <>
            <Header name="Rafael"/>
            <body>
                <div className="card-rows" >
                    <div className="buttons-filter">
                        <button>No último ano</button>
                        <button>Nos últimos 30 dias</button>
                        <button>Nos últimos 7 dias</button>
                    </div>
                    <CardHome title="Entradas" />
                    <CardHome title="Saidas" />
                    <CardHome title="Saldo" />
                </div>
                <div className="form-add-cat">
                    <div className="inputarea-home" >
                        <label>Descrição</label>
                        <input className="inputarea" type="text"/>
                    </div>

                    <div className="inputarea-home" >
                        <label>Valor</label>
                        <input className="inputarea" type="text"/>
                    </div>

                    <div className="inputarea-home" >
                        <label>Categoria</label>
                        <select>

                        </select>
                    </div>
                    
                    <div className="inputarea-home">
                        <div className="input-radio">
                            <label>Entrada</label>
                            <input type="radio"/>
                        </div>
                        <div className="input-radio">
                            <label>Saida</label>
                            <input type="radio"/>
                        </div>
                    </div>

                    <button className="save-btn">
                       <img src={plus}/>
                    </button>
                </div>
                <div className="form-add-cat" >
                <table>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Categoria</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="underline"></td>
                            <td className="underline"></td>
                            <td className="underline"></td>
                            <td className="underline"></td>
                        </tr>
                        <tr>
                            <td>Pagamento</td>
                            <td>25</td>
                            <td>Salário</td>
                            <td>Entrada</td>
                            <td><img src={lixeira}/></td>
                        </tr>
                        <tr>
                            <td>Pagamento</td>
                            <td>25</td>
                            <td>Salário</td>
                            <td>Entrada</td>
                            <td><img src={lixeira}/></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </body>
        </>
    )
}