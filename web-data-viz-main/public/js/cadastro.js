var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var listaCaracteres = ['!','@','#','$', '%', '&', '*'];
    var emailValido = false;



function cadastrar() {
    aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
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
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 1000);
    }

     function analisarEmail() {
    // Variável do campo email
        var email = email_input.value
        
        if (!email.includes('@')) {
            div_email.innerHTML = '<span style="color:red">Incluir @</span>'
        } else {
            div_email.innerHTML = '';
        }

        if (email == '') {
            div_email.innerHTML= '';  
        }
    }







    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";


          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
  console.log("Tentando redirecionar...");
  window.location.href = "http://localhost:3333/login.html";
}, 2000);

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

  function sumirMensagem() {
    cardErro.style.display = "none";
  }
   