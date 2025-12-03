// Adicione isso NO INÍCIO do arquivo (antes de qualquer função)
var nome_input = document.getElementById("nome_input");
var email_input = document.getElementById("email_input");
var senha_input = document.getElementById("senha_input");
var confirmacao_senha_input = document.getElementById("confirmacao_senha_input");
var div_email = document.getElementById("div_email");
var div_senha = document.getElementById("div_senha");
var mensagem_erro = document.getElementById("mensagem_erro");
var divAguardar = document.getElementById("div_aguardar");

var listaNumeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var listaCaracteres = ['!','@','#','$', '%', '&', '*'];
var emailValido = false;
var senhaValida = false;

function analisarEmail() {
    var email = email_input.value;
    
    if (!email.includes('@')) {
        div_email.innerHTML = '<span style="color: red;">Email inválido! Deve conter @</span>';
        emailValido = false;
    } else {
        div_email.innerHTML = ''
        emailValido = true;
    }
}

function validarSenha() {
    // Variável do campo senha
    
    var senha = senha_input.value;
    var tamanhoSenha = senha.length;
    var mensagem = "";
    var tamanhoValido = false;
    var caractereValido = false;
    var numeroValido = false;
    var minusculoValido = false;
    var maiusculoValido = false;


    // Mínimo 8 caracteres
    if (tamanhoSenha < 8) {
        mensagem += `<span style="color:red">• 8 caracteres</span><br>`;
    } else {
        tamanhoValido = true;
         mensagem += "";
    }

    // Caractere especial
    caractereValido = false;
    for (var i = 0; i < listaCaracteres.length; i++) {
        if (senha.includes(listaCaracteres[i])) {
            caractereValido = true;
        }
    }
    
    if (!caractereValido) {
        mensagem += `<span style="color:red">• 1 caractere especial (!@#$%&*)</span><br>`;
    } else {
        mensagem += "";
    }

    // Número
    numeroValido = false;
    for (var i = 0; i < listaNumeros.length; i++) {
        if (senha.includes(listaNumeros[i])) {
            numeroValido = true;
        }
    }
    
    if (!numeroValido) {
        mensagem += `<span style="color:red">• 1 número</span><br>`;
    } else {
        mensagem += "";
    }

    // Letra maiúscula
    if (senha == senha.toLowerCase()) {
        mensagem += `<span style="color:red">• 1 letra maiúscula</span><br>`;
    } else {
        maiusculoValido = true;
        mensagem += "";
    }

    // Letra minúscula
    if (senha == senha.toUpperCase()) {
        mensagem += `<span style="color:red">• 1 letra minúscula</span>`;
    } else {
        minusculoValido = true;
        mensagem += "";
    }

    
    

    div_senha.innerHTML = mensagem;

    // Verifica se todos os critérios foram atendidos
    if (tamanhoValido && caractereValido && numeroValido && maiusculoValido && minusculoValido) {
        senhaValida = true;
      mensagem = ""
    } else {
        senhaValida = false;
    }
}

function senha2(){
    var senha = senha_input.value;
  var confirmacao = confirmacao_senha_input.value;
  var senhasIguais = false 
  var mensagem = ""
  if(senha == confirmacao){
      senhasIguais = true
      mensagem += ""
    } else {
       mensagem += `<span style="color:red">As senhas não sao iguais  </span>`;
    }
    
 div_confirmar.innerHTML = mensagem;
}

function cadastrar() {
    // CHAMA AS VALIDAÇÕES ANTES DE TUDO
    analisarEmail();
    validarSenha();
    
    aguardar();
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == ""
    ) {
       cardErro.innerHTML = '<span style="color: red;">Preencha todos os campos!</span>';
       cardErro.style.display = "block";
       
       finalizarAguardar(); 
       return false;
    }
    
    // Verifica se as senhas coincidem
    if (senhaVar !== confirmacaoSenhaVar) {
        cardErro.innerHTML = '<span style="color: red;">As senhas não coincidem!</span>';
        cardErro.style.display = "block";
        
        finalizarAguardar();
        return false;
    }
    
    // Verifica se o email é válido
    if (!emailValido) {
        cardErro.innerHTML = '<span style="color: red;">Email inválido!</span>';
        cardErro.style.display = "block";
        
        finalizarAguardar();
        return false;
    }
    
    // Verifica se a senha é válida
    if (!senhaValida) {
        mensagem_erro.innerHTML = '<span style="color: red;">Senha não atende todos os requisitos!</span>';
        mensagem_erro.style.display = "block";
        
        finalizarAguardar();
        return false;
    }

    // Se passar todas as validações, prossegue com o cadastro
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          return resposta.json();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .then(function (dados) {
        console.log("Dados recebidos: ", dados);
        
        alert('Cadastro realizado com sucesso! Redirecionando...');
        mensagem_erro.style.display = "block";

        setTimeout(() => {
          console.log("Redirecionando para login...");
          window.location.href = "login.html";
        }, 2000);

        
        finalizarAguardar();
      })
      .catch(function (erro) {
        console.log(`#ERRO: ${erro}`);
        mensagem_erro.innerHTML = `<span style="color: red;">Erro: ${erro}</span>`;
        mensagem_erro.style.display = "block";
        finalizarAguardar();
      });

    return false;
}

function aguardar() {
    if (divAguardar) {
        divAguardar.style.display = "block";
    }
}

function finalizarAguardar() {
    if (divAguardar) {
        divAguardar.style.display = "none";
    }
}

