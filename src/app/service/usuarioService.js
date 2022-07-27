import Apiservice from "../apiservice";

import ErroValidacao from "../exception/erroValidacao";

class UsuarioService extends Apiservice{

    constructor(){
        super('/api/usuarios')
    }
    
    autenticar(credencias){
        return this.post('/autenticar', credencias)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario){
        return this.post('/', usuario)
    }

    validar(usuario){
        const erros = []

        if( !usuario.nome){
            erros.push('O compo Nome é obrigatório.')
        }
        if( !usuario.email){
            erros.push('O campo Email é obrigatório.')
        }else if( usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            erros.push('Informe um Email válido.')
        }

        if( !usuario.senha || !usuario.repitaSenha){
            erros.push('Digite a senha 2x. ')
        }else if( usuario.senha !== usuario.repitaSenha ){
            erros.push('As senha não batem. ')
        }
        
        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }
}

export default UsuarioService;