var barra = 0
var maxBarra = 50
var tempo = 5
var intervalo
var jogo = false 

var barraForca = document.getElementById("barraForca");
var contador = document.getElementById("contadorforca");
var luvaImg = document.querySelector(".luva img");
var alvoImg = document.querySelector(".alvo img");
 

function atualizar(){
    var porc = (barra/maxBarra) * 100 
     barraForca.style.width = porc + "%";

     if(porc >= 0 && porc < 40){
        barraForca.style.backgroundColor = "#18d81eff"
      } else if ( porc >= 40 && porc < 80){
        barraForca.style.backgroundColor = "#a5d818ff"
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

    function iniciar(){
        alvoImg.src = "assets/imgs/alvo.png";
        barra = 0 
        tempo = 5
        contadorForca.innerHTML = "Tempo: " + tempo + "s";
        jogo = true
        atualizar ()

  intervalo = setInterval(function () {
    tempo--;
    contadorForca.innerHTML = "Tempo: " + tempo + "s";

    if (tempo <= 0) {
      clearInterval(intervalo);
      executarSoco();
    }
  }, 1000);
    }

    function executarSoco() {
  var forcaFinal = barra * 20;
  contadorForca.innerHTML = "Força final: " + forcaFinal;
  luvaImg.src = "assets/imgs/imgluva.png";
  alvoImg.src = "assets/imgs/alvo2.png";
  alvoImg.style.heigth = "120px"
 

  jogo = false

  
}

luvaImg.addEventListener("click", aumentarforca);
