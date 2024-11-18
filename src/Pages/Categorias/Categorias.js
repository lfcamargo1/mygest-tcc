import Header from '../../Components/Header/Header';
import plus from '../../Assets/plus-icon.svg';
import lixeira from '../../Assets/lixeira1.svg'
import lapis from '../../Assets/lapis.png'
import '../Home/home.css'
import './categorias.css'
import { useEffect, useState } from 'react';
import api from '../../Services/api';
import { toast, ToastContainer } from 'react-toastify';

export default function Categorias() {

    const [nomeCategoria, setNomeCategoria] = useState("");
    const [descricaoCategoria, setDescricaoCategoria] = useState("");
    const [categorias, setCategorias] = useState([]);
    // valores editados
    const [editCategoriaValues, setEditCategoriaValues] = useState({});

    const userId = localStorage.getItem("@userId")

    useEffect(() => {
        async function getCategorias() {
            await api.get(`categorias/${localStorage.getItem("@userId")}`)
            .then((d) => setCategorias(d.data))
            .catch((e) => toast.error(e.response.data.message))
        }

        getCategorias();
    }, [])

    // Função para atualizar os valores de edição de uma categoria individual
    const handleCategoriaInputChange = (id, field, value) => {
        setEditCategoriaValues((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            [field]: value,
          },
        }));
    };

    async function saveCategoria(e) {
        e.preventDefault()

        if (nomeCategoria === "" || descricaoCategoria === "") {
            alert("Campos obrigatórios faltantes!")
            return
        }

        await api.post("categorias", {
            descricaoCat: descricaoCategoria,
            nomeCat: nomeCategoria,
            usuarioId: localStorage.getItem("@userId")
        })
        .then((d) => alert(d.data))
        .catch((e) => alert(e.response.data.message))

        setDescricaoCategoria("");
        setNomeCategoria("");
    }

    async function handleDelete(id) {
        await api.delete("/categorias/" + id)
        .then(() => toast.success("Categoria Excluida com sucesso!"))
        .catch((error) => console.log(error))
    }

    async function handleEditCategoria(id) {
        console.log(id)

        const editedCategoria = editCategoriaValues[id];
        console.log(editCategoriaValues)

        try {
          await api.put(`/categorias/${id}`, {
            nome: editedCategoria?.nomeCat ?? "",
            descricao: editedCategoria?.descricaoCat ?? ""
          });
          toast.success("Categoria Atualizada com Sucesso!");
        } catch (error) {
          toast.error(error.response?.data?.message || "Erro ao atualizar a categoria");
        }
    }
    return (
        <>
            <Header/>
            <body>
                <div className='form-add-cat' id='categorias'>
                    <div className='title'>
                        <h1>Cadastre sua própria categoria!</h1>
                    </div>
                    <div className='content'>
                        <div className='inputarea-home'>
                            <label>Nome da Categoria</label>
                            <input value={nomeCategoria} onChange={(e) => setNomeCategoria(e.target.value)} type='text' />
                        </div>

                        <div className='inputarea-home'>
                            <label>Uma breve descrição</label>
                            <textarea value={descricaoCategoria} onChange={(e) => setDescricaoCategoria(e.target.value)}/>
                        </div>

                        <button className="save-btn" onClick={(e) => saveCategoria(e)}>
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
                                <th>Categoria</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="underline"></td>
                                <td className="underline"></td>
                                <td className="underline"></td>
                                <td className="underline"></td>
                            </tr>

                            {categorias.map((c) => (
                                <tr key={c.idCat}>
                                  <td>
                                    <input
                                      type="text"
                                      value={editCategoriaValues[c.idCat]?.nomeCat ?? c.nomeCat}
                                      onChange={(e) => handleCategoriaInputChange(c.idCat, 'nomeCat', e.target.value)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      value={editCategoriaValues[c.idCat]?.descricaoCat ?? c.descricaoCat}
                                      onChange={(e) => handleCategoriaInputChange(c.idCat, 'descricaoCat', e.target.value)}
                                    />
                                  </td>
                                  <td>
                                    <img onClick={() => handleEditCategoria(c.idCat)} src={lapis} />
                                  </td>
                                  <td>
                                    <img onClick={() => handleDelete(c.idCat)} src={lixeira} />
                                  </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>

            </body>
            <ToastContainer/>
        </>
    );
}