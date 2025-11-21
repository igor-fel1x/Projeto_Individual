var barra = 0
var maxBarra = 250
var tempo = 5
var intervalo
var jogo = false;
var forcaFinal = 0 


var barraForca = document.getElementById("barraForca");
var geral = document.getElementById("geral");
var contador = document.getElementById("contadorForca");

function atualizar(){
    var porc = (barra/maxBarra) * 100 
     barraForca.style.width = porc + "%";

     if(porc >= 0 && porc < 40){
        barraForca.style.backgroundColor = "#18d81eff"
      } else if ( porc >= 40 && porc < 80){
        barraForca.style.backgroundColor = "#fffb00ff"
      } else {
         barraForca.style.backgroundColor = "#ff0000ff"
      }
    }

    function aumentarforca(){
        if (!jogo) {
         iniciar(); 
         return;
  }
        if(tempo > 0 && barra < maxBarra){
            barra++
            atualizar()
        }
    }
     function executarSoco() {
   forcaFinal = barra * 10;
  contador.innerHTML = "Força final: " + forcaFinal;
  img_luva.src = "assets/imgs/imgluva.png";
  img_alvo.src = "assets/imgs/alvo2.png";
  jogo = false


  cadastrarBD()


}

    function iniciar(){
        img_alvo.src = "assets/imgs/alvo.png";
        barra = 0 
        tempo = 5
        contador.innerHTML = "Tempo: " + tempo + "s";
        jogo = true
        atualizar ()

  intervalo = setInterval(function () {
    tempo--;
    contador.innerHTML = "Tempo: " + tempo + "s";

    if (tempo <= 0) {
      clearInterval(intervalo);
      executarSoco();
    }
  }, 1000); 

    }

geral.onclick = aumentarforca;

var idUsuario = sessionStorage.ID_USUARIO;
var fkjogo = 1

function cadastrarBD(){
    var forcaVar = forcaFinal;
    var fkUsuarioVar = idUsuario;
    var fkjogoVar = fkjogo
    
    fetch("/forca/inserir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkUsuarioServer: fkUsuarioVar,  
            fkjogoServer: fkjogoVar,
            forcaServer: forcaVar       
        }),
    });
}








function buscarUltimoIdjogo() {
    fetch(`/partida/ultimas/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                sessionStorage.ID_ULTIMO_JOGO = resposta[0].idPartida
                console.log(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados ${error.message}`);
        });
}
