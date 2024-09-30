import Header from '../../Components/Header/Header';
import plus from '../../Assets/plus-icon.svg';
import lixeira from '../../Assets/lixeira1.svg'
import '../Home/home.css'
import './categorias.css'

export default function Categorias() {

    return (
        <>
            <Header name="Rafael" />
            <body>
                <div className='form-add-cat' id='categorias'>
                    <div className='title'>
                        <h1>Cadastre sua própria categoria!</h1>
                    </div>
                    <div className='content'>
                        <div className='inputarea-home'>
                            <label>Nome da Categoria</label>
                            <input type='text' />
                        </div>

                        <div className='inputarea-home'>
                            <label>Uma breve descrição</label>
                            <textarea />
                        </div>

                        <button className="save-btn">
                            Salvar <img src={plus} />
                        </button>
                    </div>
                </div>

                <div className='form-add-cat' id='categorias'>
                    <div className='title'>
                        <h1>Suas categorias</h1>
                    </div>

                    <table className='tabela-cat'>
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
                                <td><img src={lixeira} /></td>
                            </tr>
                            <tr>
                                <td>Pagamento</td>
                                <td>25</td>
                                <td>Salário</td>
                                <td>Entrada</td>
                                <td><img src={lixeira} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </body>
        </>
    );
}