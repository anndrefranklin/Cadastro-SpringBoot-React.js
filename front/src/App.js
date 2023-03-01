
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './formulario';
import Tabela from './tabela';

function App() {

  //Objeto Produto
  const produto ={
    codigo : 0,
    nome : '',
    marca : ''
  }

  //useStade
  const[btnCadastrar, setBtnCadastrar] = useState(true);
  const[produtos, setProdutos] = useState([]);
  const[objProduto, setObjProduto] = useState(produto);

  //useEfeect
  useEffect(()=>{
    fetch('http://localhost:8080/listar')
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  // Obtendo os Dados do Formulário
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  //Cadastrar Produtos 
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      if (retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem);        
        }else{
          setProdutos([...produtos, retorno_convertido]);
          alert('Produto Cadastrado com sucesso !')
          limparformulario();
        }

    })
  }

  //Alterar Produtos
  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      if (retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem);        
        }else{

        //Menssagem
        alert('Produto alterado com sucesso !')

        //Cópia de Vetor de produtos
        let vetorTemp = [...produtos];

        //Indice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        //Rewmover produto do vetorTemp
        vetorTemp[indice] = objProduto;

        //Atualizar o vetor de produtos
        setProdutos(vetorTemp);

        //limpar Forulário
        limparformulario();  
      }
    })
  }

  //Remover Produtos
  const remover = () => {
      fetch('http://localhost:8080/remover/'+objProduto.codigo, {
        method:'delete',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json'
        }
      })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
  
        //Mensagem 
        alert(retorno_convertido.mensagem);

        //Cópia de Vetor de produtos
        let vetorTemp = [...produtos];

        //Indice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        //Rewmover produto do vetorTemp
        vetorTemp.splice(indice, 1);

        //Atualizar o vetor de produtos
        setProdutos(vetorTemp);
        
        //Limpar formulário
        limparformulario();
        
      })

  }

  //limpar formulário
  const limparformulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

    // Selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);    
  }
 
  //Retorno
  return (
    <div>      
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparformulario} remover={remover} alterar={alterar} />
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;