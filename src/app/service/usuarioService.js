import Apiservice from "../apiservice";

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
}

export default UsuarioService;