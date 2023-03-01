function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}){
    return(
        <form>
            <input type='text' value={obj.nome} onChange={eventoTeclado} name='nome' placeholder="Nome" className="form-control" />
            <input type='text' value={obj.marca} onChange={eventoTeclado} name='marca' placeholder="Marca" className="form-control" />

            {
                botao
                ?
                <input type='button' value='Cadastrar' onClick={cadastrar} class="btn btn-primary" />
                :    
            <div>    
                <input type='button' value='Alterar' onClick={alterar} class="btn btn-warning" />
                <input type='button' value='Remover' onClick={remover} class="btn btn-danger" />
                <input type='button' value='Cancelar' onClick={cancelar} class="btn btn-info" />      
            </div>
            }      
            
        </form>
        
    )
}

export default Formulario;