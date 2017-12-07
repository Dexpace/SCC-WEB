function setup(){
    noCanvas();
    //pegando botão de enviar
    let a = select("#enviar");
    a.mousePressed(enviar);
    //pegando as informações do sessionStorage
    let result = JSON.parse(sessionStorage.getItem("cadastro-data"));

    ///pegando os campos do formulario pelo id
    let rua =  document.getElementById("rua");
    let complemento = document.getElementById("complemento")
    let numero =  document.getElementById("numero");
    let bairro =  document.getElementById("bairro");
    let uf =  document.getElementById("estado");
    let cidade =  document.getElementById("cidade");

    let nome = document.getElementById("nome");
    let sobrenome = document.getElementById("sobrenome");
    let rg = document.getElementById("rg");
    let cpf =  document.getElementById("cpf");
    let tel =  document.getElementById("tel");

    let email =  document.getElementById("email");
    let senha =  document.getElementById("senha");

    //colocando as informações do sessionStorage nos campos dos formularios
    rua.value = result.pes_endereco;
    complemento.value = result.pes_complemento;
    numero.value = result.pes_numero;
    bairro.value = result.pes_bairro;
    cidade.value = result.pes_cidade;
    uf.value = result.pes_UF;

    nome.value = result.pes_nome;
    sobrenome.value = result.pes_sobrenome;
    rg.value = result.pes_rg;
    cpf.value = result.pes_cpf;
    tel.value = result.pes_telefone;
    
    email.value = result.pes_email;
    senha.value = result.pes_senha;

  //function enviar de edicao de usuario
    function enviar(){
      var data = {
        pes_nome:nome.value,
        pes_sobrenome:sobrenome.value,
        pes_rg:rg.value,
        pes_cpf:cpf.value,
        pes_telefone:tel.value,
        pes_email:email.value,
        pes_senha:senha.value,
        pes_complemento:complemento.value,
        pes_numero:numero.value,

        pes_sexo:result.pes_sexo,
        pes_grup:result.pes_grup,
        pes_condo:result.pes_condo,
        pes_endereco:result.pes_endereco,
        pes_cidade:result.pes_cidade,
        pes_UF:result.pes_UF,
        pes_bairro:result.pes_bairro
        
      }
      if (confirm("voce esta prestes a alterar os dados de um usuário,deseja continuar?") == true) {
      httpPost('http://localhost:56467/api/Alterar/User', data, 'json',deucerto);
      }
      
    }
  function deucerto(result){
    sessionStorage.setItem("usuario",JSON.stringify(result));
    (sessionStorage.setItem("cadastro-data",JSON.stringify(result)));
    window.alert("dados alterados com sucesso")
    location.reload(); 
  }
}