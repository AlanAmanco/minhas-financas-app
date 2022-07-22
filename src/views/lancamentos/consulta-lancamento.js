import React from 'react'
import { withRouter} from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentoTable from './lancamentoTable';

import LancamentosService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';

import * as messages from '../../components/toastr'
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button'

class ConsultaLancamentos extends React.Component {

    state = {
        ano:  '',
        mes:  '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor(){
        super();
        this.service = new LancamentosService();
    }

    buscar = () =>{
        if(!this.state.ano){
            messages.mensagemErro('O preechimento do campo Ano é Obrigatório.')
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then( resposta => {
                this.setState({ lancamnetos: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log('Editando',id)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog : true, lancamentoDeletar: lancamento})
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, lancamentoDeletar :{} })
    }

    deletar = () => {
        this.service
            .delete(this.state.lancamentoDeletar.id)
            .then(response => {

                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1)
                this.setState( {lancamentos: lancamentos, showConfirmDialog: false} )

                messages.mensagemSucesso('Lançamento deletado com sucesso!.')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento')
            })
    }

    render(){
        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos()

        const ConfirmaDiologFooter = (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-text" />
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} autoFocus />
            </div>
        )

        return(
            <Card className='Consulta Lançamentos'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className=' bs-component'>
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                className="form-control"
                                id="inputAno"
                                value={this.state.ano}
                                onChange={e => this.setState({ano: e.target.value})}
                                placeholder="Didite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes"
                                            value={this.state.mes}
                                            onChange={e =>this.setState({mes: e.target.value})}
                                            className='form-control' lista={meses}/>
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Descrição: *">
                                <input type="text"
                                className="form-control"
                                id="inputDescricao"
                                value={this.state.descricao}
                                onChange={e => this.setState({descricao: e.target.value})}
                                placeholder="Didite a Descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                <SelectMenu id= "inputTipo"
                                            value={this.state.tipo}
                                            onChange={e =>this.setState({tipo: e.target.value})}
                                            className='form-control' lista={tipos}/>
                            </FormGroup>
                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos  ={this.state.lancamentos}
                                             deleteAction ={this.abrirConfirmacao}
                                             editAction   ={this.editar} />
                        </div>
                    </div>
                </div>
                <div>
                <Dialog header="CONFIRMAÇÃO"
                        visible={this.state.showConfirmDialog} 
                        onHide={() => this.setState({showConfirmDialog: false})} 
                        breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}
                        footer={ConfirmaDiologFooter}
                        modal={true}>
                    Confirma a Exclusão desse lançamento ?
                </Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos);