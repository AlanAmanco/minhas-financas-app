import React from "react";
import currencyformatte from 'currency-formatter'

export default props => {

    const rows = props.lancamentos.map( lancamento => {
        return(
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyformatte.format(lancamento.valor, { locate:'pt-BR'}) }</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type="button" title="Efetivar"
                            disabled={ lancamento.status !== 'PENDENTE' }
                            className="btn btn-success" 
                            onClick={ e=> props.alterarStaus( lancamento, 'EFETIVADO' )}>
                            <i className="pi pi-check"></i>
                    </button>
                    <button type="button" title="Cancelar"
                            disabled={ lancamento.status !== 'PENDENTE' }
                            className="btn btn-success" 
                            onClick={ e=> props.alterarStaus( lancamento, 'CANCELADO' )}>
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button" title="Editar"
                            className="btn btn-success" 
                            onClick={ e=> props.editAction(lancamento.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                            className="btn btn-danger"  
                            onClick={e => props.deleteAction(lancamento)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
                
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                      <th scope="col">Descrição</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Mês</th>
                      <th scope="col">Situação</th>
                      <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}