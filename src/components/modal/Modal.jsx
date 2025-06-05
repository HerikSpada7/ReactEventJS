import React, { useEffect, useState } from 'react';
import ImgDeletar from "../../assets/img/Excluir.svg"
import api from "../../services/Services";
import "./Modal.css"

const Modal = (props) => {
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState("");
    const [usuarioId, setUsuarioId] = useState("3feffa48-7846-4f48-8c74-ec355e891680");

    async function listarComentarios() {
        try {
            const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`);

            setComentarios(resposta.data);

            console.log(resposta);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarComentarios();
    }, [])

    async function cadastrarComentario(comentario) {
        try {
            await api.post("ComentariosEvento", {
                idUsuario: usuarioId,
                idEvento: props.idEvento,
                Descricao: comentario,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function deletarComentario(idComentario) {
        try {
            await api.delete(`ComentariosEvento/${idComentario}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="model-overlay" onClick={props.fecharModal}></div>
            <div className="model">
                <h1>{props.titulo}</h1>
                <div className="model_conteudo">
                    {props.tipoModel === "descricaoEvento" ? (
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) => (
                                <div key={item.idComentarioEvento}>
                                    <strong>{item.usuario.nomeUsuario}</strong>

                                    <img
                                        src={ImgDeletar}
                                        alt="Deletar"
                                        onClick={() => deletarComentario(item.idComentarioEvento)}
                                    />

                                    <p>{item.descricao}</p>
                                    <hr />
                                </div>
                            ))}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Escreva seu comentário..."
                                    value={novoComentario}
                                    onChange={(e) => setNovoComentario(e.target.value)} />
                                <button onClick={() => cadastrarComentario(novoComentario)}>
                                    cadastrar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div >
        </>
    )
}

export default Modal