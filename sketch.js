//Variáveis da Bolinha
let xBolinha = 300; //podemos tambem escrever como width/2
let yBolinha = 200; //podemos tambem escrever como height/2
let dBolinha = 25;
let raio = dBolinha / 2;

//Variáveis da Velocidade da Bolinha
let veloXBolinha = 6;
let veloYBolinha = 6;

//Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;
let compriRaquete = 10;
let altRaquete = 95;
let colidiu = false;

//Variáveis do Oponente
let xRaqueteOponente = 585; 
let yRaqueteOponente = 150; 
let veloYOponente;

//Placar do Jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons do Jogo
let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  //Criação do tamnho do fundo e som de fundo
}

function draw() {
  background(0); //Cor do fundo - Preto
  mostraBolinha(); //Desenha a Bolinha
  movBolinha(); //Movimenta a Bolinha
  verifcColisao(); //Verifica a Colisão da Bolinha nas Bordas
  mostraRaquete(xRaquete, yRaquete); //Desenha a Raquete
  mostraRaquete(xRaqueteOponente, yRaqueteOponente); // Desenha a Raquete do Oponente
  movRaquete(); //Movimenta a Raquete
  //verifColisaoRaquete(); //Verifica a Colisão da Bolinha
  colisaoRaquetesBiblio(xRaquete, yRaquete); //Utilização de Bilioteca Externa p/ Verificar a Colisão da Bolinha
  colisaoRaquetesBiblio(xRaqueteOponente, yRaqueteOponente);
  
  //Para Escolher o Modo De Jogo Basta Comentar Aquele Que Não Deseja
  movimentaRaqueteOponente(); //Realiza a Movimentação do Oponente de Forma Automática
  //movimentaRaqueteJogador2(); //Movimentação do Oponente com Outro Jogador
  
  //Placar
  incluiPlacar();
  marcaPontos();
  }

function mostraBolinha(){
  circle(xBolinha, yBolinha, dBolinha);  
}

function movBolinha(){
  xBolinha += veloXBolinha;
  yBolinha += veloYBolinha;
}

function verifcColisao(){
  if (xBolinha  + raio > width || xBolinha - raio < 0){
    veloXBolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio < 0 ){
    veloYBolinha *= -1
  }
}

function mostraRaquete(x,y){
  rect(x, y, compriRaquete, altRaquete);
}

function movRaquete(){
  if (keyIsDown(87)){
    yRaquete -= 10;
  }
  if (keyIsDown(83)){
    yRaquete += 10;
  }
}

//function verifColisaoRaquete(){
  //if (xBolinha - raio < xRaquete + compriRaquete && yBolinha - raio < yRaquete + altRaquete && yBolinha + raio > yRaquete){
    //veloXBolinha *= -1;
    //raquetada.play();
  //}
//}

//Esta função foi trazida de uma biblioteca externa (p5.collide2d.js)
function colisaoRaquetesBiblio(x,y){
  colidiu = collideRectCircle(x, y, compriRaquete, altRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    veloXBolinha *= -1;
    raquetada.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}


//function mostraRaqueteOponente(){
  //rect(xRaqueteOponente, yRaqueteOponente, compriRaquete, altRaquete);
//} 
//Posso utilizar a função Mostra Raquete para desenhar as duas, pois a função mostraRaquete() já contém os parâmetros necessários. Basta colocar dentro dos () o pedido de X e Y e depois linkar para que ele altere somente estas informações.

function movimentaRaqueteOponente(){
  veloYOponente = yBolinha - yRaqueteOponente - compriRaquete / 2 -30;
  yRaqueteOponente += veloYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  } else{
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteJogador2(){
   if (keyIsDown(UP_ARROW)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteOponente += 10;
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(20);
  fill(color(131,111,255))
  rect(200, 10, 40, 20);
  fill(255);
  text(meusPontos, 220, 26);
  fill(color(131,111,255))
  rect(400, 10, 40, 20);
  fill(255);
  text(pontosOponente, 420, 26);
}

function marcaPontos(){
  if (xBolinha > 585){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 15){
    pontosOponente += 1;
    ponto.play();
  }
}
