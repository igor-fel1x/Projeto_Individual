var barra = 0
var maxBarra = 80
var tempo = 5
var intervalo
var jogo = false;
var forcaFinal = 0 
var intervaloDiminuir

// Elementos do HTML
var barraForca = document.getElementById("barraForca");
var geral = document.getElementById("geral");
var contador = document.getElementById("contadorForca");
var telaResultado = document.getElementById("telaResultado");
var forcaValor = document.getElementById("forcaValor");


janela.style.display = 'none';
telaResultado.style.display = 'none';
b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

contador.innerHTML = "Clique para começar";
contador.style.backgroundColor = "#0004f1ff";

function atualizar(){
    var porc = (barra/maxBarra) * 100;
    barraForca.style.width = porc + "%";

    if(porc >= 0 && porc < 40){
        barraForca.style.backgroundColor = "#18d81eff";
    } else if (porc >= 40 && porc < 80){
        barraForca.style.backgroundColor = "#fffb00ff";
    } else {
        barraForca.style.backgroundColor = "#ff0000ff";
    }
}

function diminuirForca() {
    if (jogo && barra > 0) {
        barra--;
        atualizar();
    }
}

function aumentarforca(){
    if (!jogo) {
       
        jogo = true;
        tempo = 5;
        contador.innerHTML = "Tempo: " + tempo + "s";
        contador.style.background = "linear-gradient(135deg, #33ff00ff, #00a108ff)";
        
        intervaloDiminuir = setInterval(diminuirForca, 500); // diminuir forca

        intervalo = setInterval(function() {
            tempo--;
            contador.innerHTML = "Tempo: " + tempo + "s";

            if (tempo <= 0) {
                clearInterval(intervalo);
                clearInterval(intervaloDiminuir);
                executarSoco();
            }
        }, 1000);
        
        return;
    }
    
    if (jogo && tempo > 0 && barra < maxBarra) {
        barra++;
        atualizar();
    }
}

function executarSoco() {
    forcaFinal = barra * 10;
    jogo = false;

    
    clearInterval(intervaloDiminuir);
    
    
    img_alvo.src = "assets/imgs/pancada2.png";   
    contador.innerHTML = "Força final: " + forcaFinal;
    contador.style.background = "linear-gradient(135deg, #ff0000, #cc0000)";
    
    setTimeout(function() {
        mostrarResultado();
        janela.style.display = 'block';
    }, 800);
    
    cadastrarBD();
}

function mostrarResultado() {
    forcaValor.innerHTML = forcaFinal;
    telaResultado.style.display = "flex";
    geral.style.display = 'none';
    contador.style.backgroundColor = "red";
}


function reiniciarJogo() {
    telaResultado.style.display = 'none';
    geral.style.display = 'flex';
    barra = 0;
    jogo = false;
    atualizar();
    contador.innerHTML = "Clique para começar";
    contador.style.background = "linear-gradient(135deg, #0004f1, #32b9cd)";
    img_alvo.src = "assets/imgs/pancada.png";
}

geral.onclick = aumentarforca;

var idUsuario = sessionStorage.ID_USUARIO;
var fkjogo = 1;

function cadastrarBD(){
    var forcaVar = forcaFinal;
    var fkUsuarioVar = idUsuario;
    var fkjogoVar = fkjogo;
    
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