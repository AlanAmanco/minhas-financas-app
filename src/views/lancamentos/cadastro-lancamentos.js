import React from "react";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosService from "../../app/service/lancamentoService";
import * as messages from '../../components/toastr'
import localStorageService from "../../app/service/localStorageService";

import { withRouter } from "react-router-dom";

class CadastroLancamento extends React.Component {

    state ={
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super()
        this.service = new LancamentosService
    }

    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({...response.data})
                }).catch(erros =>{
                    messages.mensagemErro(erros.response.data)
                })
        }
    }


    submit = ()=>{

        const usuarioLogado = localStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo} = this.state
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id}

        try {
            this.service.validar(lancamento)
        } catch (erro) {
            const mensagens = erro.mensagens;
         mensagens.forEach(msg => messages.mensagemErro(msg))
            return false;
        }

        this.service
            .salvar(lancamento)
            .then(response  => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento cadastrado com sucesso! ')
            }).catch(error =>{
                messages.mensagemErro(error.response.data)
            })

    }

    atualiza = () =>{
        const usuarioLogado = localStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo, id, usuario} = this.state
        const lancamento = { descricao, valor, mes, ano, tipo, id, usuario}

        this.service
            .atualizar(lancamento)
            .then(response  => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento atualizado com sucesso! ')
            }).catch(error =>{
                messages.mensagemErro(error.response.data)
            })


    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({[name]: value})
    }

    render(){

        const tipos = this.service.obterListaTipos()
        const meses = this.service.obterListaMeses()

        return(
            <Card title={ this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *" >
                            <input id ="inputDescricao" 
                                   type="text" 
                                   name="descricao"
                                   value={this.state.descricao}
                                   onChange={this.handleChange}
                                   className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *" >
                                <input id="inputAno" 
                                       type="text"
                                       name="ano"
                                       value={this.state.ano}
                                       onChange={this.handleChange} 
                                       className="form-control"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *" >
                             <SelectMenu id="inputMes" 
                                         value={this.state.mes}
                                         onChange={this.handleChange}
                                         lista={meses} 
                                         name="mes"
                                         className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor"
                                   type="text" 
                                   name="valor"
                                   value={this.state.valor}
                                   onChange={this.handleChange}
                                   className= "form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipos" 
                                        lista={tipos} 
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        className="form-control"/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            <input type="text" 
                                   className="form-control" 
                                   name="status"
                                   value={this.state.status}
                                   disabled />
                        </FormGroup>
                    </div>
                </div>    
                <div className="row">
                    <div className="col-md-6">
                        { this.state.atualizando ? 
                        (
                            <button onClick={this.atualiza}
                                    className="btn btn-primary">
                                    <i className="pi pi-refresh"></i> atualizar
                            </button>
                        ) : (
                            <button onClick={this.submit} 
                                    className="btn btn-success"> 
                                    <i className="pi pi-save"></i> Salvar
                            </button>
                        )

                        }
                        <button onClick={e => this.props.history.push('/consulta-lancamentos')}
                                className="btn btn-danger"> 
                                <i className="pi pi-times"> </i> Cancelar
                        </button>
                    </div>
                </div>
            </Card>

        )
    }

}

export default withRouter(CadastroLancamento)