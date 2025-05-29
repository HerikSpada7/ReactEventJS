import { useState, useEffect } from "react";
import api from "../../services/Services";

import Imagem from "../../assets/img/CadastroEvento.svg"
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";
import Swal from "sweetalert2";

const CadastroEvento = () => {
    const [evento, setEvento] = useState("");
    const [listaEvento, setListaEvento] = useState([]);
    const [tipoEvento, setTipoEvento] = useState("");
    const [listaTipoEvento, setlistaTipoEvento] = useState([]);
    const [dataEvento, setDataEvento] = useState("");
    const [instituicoes, setInstituicoes] = useState("");
    const [descricao, setDescricao] = useState("");

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TiposEventos");
            setlistaTipoEvento(resposta.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function cadastrarEvento(e) {
        e.preventDefault();
        if (evento.trim() != "") {
            try {
                const resposta = await api.post("Eventos",
                    {
                        NomeEvento: evento,
                        DataEvento: dataEvento,
                        IdTipoEvento: tipoEvento,
                        IdInstituicao: instituicoes,
                        Descricao: descricao
                    });    
                console.log(resposta);
            } catch (error) {
                alertar("error", "Entre em contato com o suporte")
            }
        } else {
            alertar("error", "Preencha o campo vazio")
        }
    }

    async function listarEvento() {
        try {
            const resposta = await api.get("Eventos");
            setListaEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deletarEvento(id) {
        Swal.fire({
            title: 'Tem Certeza?',
            text: "Essa ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(`eventos/${id.idEvento}`);
                alertar("success", "Evento Excluido!");
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao Excluir!");
        })
    }

    async function editarEvento(eventos) {
        const { value: novoEvento } = await Swal.fire({
            title: "Modifique seu Tipo Evento",
            input: "text",
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            inputLabel: "Novo Evento",
            inputValue: eventos.nomeEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoEvento) {
            try {
                await api.put(`eventos/${eventos.idEvento}`,
                    { NomeEvento: novoEvento });
                alertar("success", "Evento Modificado!")
            } catch (error) {
                console.log(error);
            }
            Swal.fire(`Seu novo Tipo Evento: ${novoEvento}`);
        }
    }

    useEffect(() => {
        listarEvento();
        listarTipoEvento();
    }, [listaEvento]);

    return (
        <>
            <Header
                user="Administrador"
                botao_logar="none"
            />
            <main>
                <Cadastro
                    titulo_cadastro="Cadastro de Eventos"
                    campo_placeholder="Nome"
                    campo_descricao="Descrição"
                    botao="Cadastrar"
                    banner_img={Imagem}

                    funcCadastro={cadastrarEvento}

                    valorInput={evento}
                    setValorInput={setEvento}

                    valorData={dataEvento}
                    setValorData={setDataEvento}

                    valorInputDescricao={descricao}
                    setValorInputDescricao={setDescricao}

                    valorTipoEvento={tipoEvento}
                    setValorTipoEvento={setTipoEvento}

                    valorInstituicao={instituicoes}
                    setValorInstituicao={setInstituicoes}

                    lista={listaTipoEvento}
                />

                <Lista
                    titulo_lista="Eventos"
                    titulo="Nome"

                    tipoLista="Eventos"
                    lista={listaEvento}

                    funcDeletar={deletarEvento}
                    funcEditar={editarEvento}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroEvento;