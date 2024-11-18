import CardHome from "../../Components/CardHome/CardHome";
import './home.css'
import plus from '../../Assets/plus-icon.svg'
import Header from "../../Components/Header/Header";
import lapis from "../../Assets/lapis.png"
import lixeira from '../../Assets/lixeira1.svg'
import { useEffect, useState } from "react";
import api from "../../Services/api";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {

    const userId = localStorage.getItem("@userId");

    const [descricaoCarteira, setDescricaoCarteira] = useState("");
    const [valorCarteira, setValorCarteira] = useState("");
    const [categoriaCarteira, setCategoriaCarteira] = useState("");
    const [tipoCarteira, setTipoCarteira] = useState("");

    // valores editados
    const [editValues, setEditValues] = useState({});

    const [carteiras, setCarteiras] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [timeFilter, setTimeFilter] = useState(0)

    const [entradas, setEntradas] = useState(0);
    const [saidas, setSaidas] = useState(0);
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {

        async function loadCarteiras() {
            await api.get(`carteira/${localStorage.getItem("@userId")}/filter/${timeFilter}`)
            .then((d) => {
                setCarteiras(d.data)

                const totalEntradas = d.data.reduce((acc, c) => {
                    return c.tipoCarteira === 'Entrada' ? acc + c.valor : acc;
                }, 0);

                const totalSaidas = d.data.reduce((acc, c) => {
                    return c.tipoCarteira !== 'Entrada' ? acc + c.valor : acc;
                }, 0);

                setEntradas(totalEntradas);
                setSaidas(totalSaidas);
                setSaldo(totalEntradas - totalSaidas);
            })
            .catch((e) => {
                toast.error(e.response.data.message)
            })
        }

        async function loadCategorias() {
            await api.get(`categorias/${localStorage.getItem("@userId")}`)
            .then((d) => {
                setCategorias(d.data)
            })
            .catch((e) => {
                toast.error(e.response.data.message)
            })
        }

        loadCarteiras();
        loadCategorias();
    }, [timeFilter])

    async function handleSubmit(e) {
        e.preventDefault()

        await api.post("carteira", {
            descricaoCarteira: descricaoCarteira,
            tipoCarteira, tipoCarteira,
            catCarteira: categoriaCarteira,
            usuarioId: localStorage.getItem("@userId"),
            valor: valorCarteira
        })
        .then((d) => toast.success(d.data))
        .catch((e) => toast.error(e.response.data.message))

    }

    const handleInputChange = (id, field, value) => {
        setEditValues((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            [field]: value,
          },
        }));
      };

    async function handleDelete(id) {
        await api.delete("/carteira/" + id)
        .then(() => toast.success("Carteira Excluida com sucesso!"))
        .catch((error) => console.log(error))
    }

    async function handleEdit(id, userId) {
        const editedCarteira = editValues[id];
        
        try {
          await api.put(`/carteira/${userId}/${id}`, {
            descricao: editedCarteira?.descricaoCarteira ?? "",
            valor: editedCarteira?.valor ?? 0,
            categoria: editedCarteira?.categoria ?? "",
            tipo: editedCarteira?.tipoCarteira ?? ""
          });
          toast.success("Carteira Atualizada com Sucesso!");
        } catch (error) {
          toast.error(error.response?.data?.message || "Erro ao atualizar a carteira");
        }
    }

    function clickFilter(value, e) {
        let btn = e.target;
        if (btn.className === "btnselected") {
            setTimeFilter(0);
            btn.classList.add('btnfilter')
            btn.classList.remove('btnselected')

            return
        }

        setTimeFilter(value);
        btn.classList.add('btnselected')
        btn.classList.remove('btnfilter')
        
    }

    return (
        <>
            <Header/>
            <body>
                <div className="card-rows" >
                    <div className="buttons-filter">
                        <button className="btnfilter" onClick={(e) => clickFilter(365, e)}>No último ano</button>
                        <button className="btnfilter" onClick={(e) => clickFilter(30, e)}>Nos últimos 30 dias</button>
                        <button className="btnfilter" onClick={(e) => clickFilter(7, e)}>Nos últimos 7 dias</button>
                    </div>
                    <CardHome title="Entradas" value={entradas}/>
                    <CardHome title="Saidas" value={saidas}/>
                    <CardHome title="Saldo" value={saldo}/>
                </div>
                <div className="form-add-cat">
                    <div className="inputarea-home" >
                        <label>Descrição</label>
                        <input value={descricaoCarteira} onChange={(e) => setDescricaoCarteira(e.target.value)} className="inputarea" type="text"/>
                    </div>

                    <div className="inputarea-home" >
                        <label>Valor</label>
                        <input value={valorCarteira} onChange={(e) => setValorCarteira(e.target.value)} className="inputarea" type="text"/>
                    </div>

                    <div className="inputarea-home" >
                        <label>Categoria</label>
                        <select value={categoriaCarteira} onChange={(e) => setCategoriaCarteira(e.target.value)}>
                            {categorias.map((c) => (
                                <option value={c.idCat}>{c.descricaoCat}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="inputarea-home">
                        <div className="input-radio">
                            <label>Entrada</label>
                            <input name="tipoCarteira" checked={tipoCarteira === "Entrada"}  value={"Entrada"} onChange={(e) => setTipoCarteira(e.target.value)} type="radio"/>
                        </div>
                        <div className="input-radio">
                            <label>Saida</label>
                            <input name="tipoCarteira" checked={tipoCarteira === "Saida"} value={"Saida"} onChange={(e) => setTipoCarteira(e.target.value)} type="radio"/>
                        </div>
                    </div>

                    <button className="save-btn" onClick={(e) => handleSubmit(e)}>
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
                        {carteiras.map((c) => (
                            <tr key={c.idCarteira}>
                              <td>
                                <input
                                  type="text"
                                  value={editValues[c.idCarteira]?.descricaoCarteira ?? c.descricaoCarteira}
                                  onChange={(e) => handleInputChange(c.idCarteira, 'descricaoCarteira', e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  value={editValues[c.idCarteira]?.valor ?? c.valor}
                                  onChange={(e) => handleInputChange(c.idCarteira, 'valor', e.target.value)}
                                />
                              </td>
                              <td>
                                <select
                                  value={editValues[c.idCarteira]?.categoria ?? c.categoria}
                                  onChange={(e) => handleInputChange(c.idCarteira, 'categoria', e.target.value)}
                                >
                                  {categorias.map((categoria) => (
                                    <option key={categoria.nomeCat} value={categoria.nomeCat}>
                                      {categoria.descricaoCat}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={editValues[c.idCarteira]?.tipoCarteira ?? c.tipoCarteira}
                                  onChange={(e) => handleInputChange(c.idCarteira, 'tipoCarteira', e.target.value)}
                                />
                              </td>
                              <td>
                                <img onClick={() => handleEdit(c.idCarteira, userId)} src={lapis} />
                              </td>
                              <td onClick={() => handleDelete(c.idCarteira)}>
                                <img src={lixeira} />
                              </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </body>
            <ToastContainer/>
        </>
    )
}