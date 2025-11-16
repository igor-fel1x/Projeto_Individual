var barra = 0
var maxBarra = 80
var tempo = 5
var intervalo
var jogo = false 

var barraForca = document.getElementById("barraForca");
var geral = document.getElementById("geral");
var contador = document.getElementById("contadorForca");
var luvaImg = document.querySelector(".luva img");
var alvoImg = document.querySelector(".alvo img");


 

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
  var forcaFinal = barra * 20;
  contador.innerHTML = "Força final: " + forcaFinal;
  luvaImg.src = "assets/imgs/imgluva.png";
  alvoImg.src = "assets/imgs/alvo2.png";
  alvoImg.height = 120;
  alvoImg.style.width = "120px";
  jogo = false


}

    function iniciar(){
        alvoImg.src = "assets/imgs/alvo.png";
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

