let cartaSelecionada = null;
let indiceSelecionado = null;

let Deck = [
    {nome: "card1", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7F4jS0-ADbkvqZQM-i5oJxSQ1rKWo60FMkQ&"},
    {nome: "card2", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7F4jS0-ADbkvqZQM-i5oJxSQ1rKWo60FMkQ&"},
    {nome: "card3", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7F4jS0-ADbkvqZQM-i5oJxSQ1rKWo60FMkQ&"},
    {nome: "card4", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBMdJNvLx6f-oh5oHH4id7qNJ8spmhZOD2qQ&s"},
    {nome: "card5", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBMdJNvLx6f-oh5oHH4id7qNJ8spmhZOD2qQ&s"},
    {nome: "card6", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBMdJNvLx6f-oh5oHH4id7qNJ8spmhZOD2qQ&s"},
    {nome: "card7", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_TfnuiNqTcz_5VE83RnodOhyVRUUCTZN5Q&s"},
    {nome: "card8", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_TfnuiNqTcz_5VE83RnodOhyVRUUCTZN5Q&s"},
    {nome: "card9", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_TfnuiNqTcz_5VE83RnodOhyVRUUCTZN5Q&s"},
    {nome: "card10", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9WonJ5RzIMkpmtg1Bns_QwxwTfR-cxhjFw&s"}]

console.log("Deck original:", Deck);

let Hand = []

function abrir_menudeck(){
    let Menudeck = document.getElementById("menudeck");

    if (Menudeck.style.display === "none"){
        Menudeck.style.display = "grid";
    } else {
        Menudeck.style.display = "none";
    }
}
function embaralhar(){
    for (let i = Deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [Deck[i], Deck[j]] = [Deck[j], Deck[i]];
    }

    console.log("Deck embaralhado:", Deck);
}
function compra(){
    if (Deck.length === 0){
        console.log("O deck está vazio!");
        return;
    }

    let carta = Deck.shift();
    Hand.push(carta);

    console.log("Carta comprada:", carta);
    console.log("Sua mão:", Hand);
    console.log("Cartas restantes no deck:", Deck);

    atualizarHand();
}
function atualizarHand(){

    let area = document.getElementById("mao_container");

    area.innerHTML = "";

    Hand.forEach(function(carta, index){

        let botao = document.createElement("button");

        botao.className = "cardButton";

        botao.style.backgroundImage = `url(${carta.imagem})`;
        botao.style.backgroundSize = "cover";
        botao.style.backgroundPosition = "center";

        botao.onclick = function(){

            // se clicar na mesma carta selecionada → desmarcar
            if(indiceSelecionado === index){
                indiceSelecionado = null;
                cartaSelecionada = null;
                atualizarHand();
                return;
            }

            // selecionar nova carta
            cartaSelecionada = carta;
            indiceSelecionado = index;

            atualizarHand();
        };

        // deixa vermelha se estiver selecionada
        if(indiceSelecionado === index){
            botao.style.border = "4px solid red";
        }

        area.appendChild(botao);

    });

}
function enviarParaZona(idZona){

    if(cartaSelecionada === null){
        console.log("Nenhuma carta selecionada");
        return;
    }

    let zona = document.getElementById(idZona);

    zona.style.backgroundImage = `url(${cartaSelecionada.imagem})`;
    zona.style.backgroundSize = "cover";
    zona.style.backgroundPosition = "center";

    // remove da mão
    Hand.splice(indiceSelecionado,1);

    cartaSelecionada = null;
    indiceSelecionado = null;

    atualizarHand();
}
function buscar(){}
function enviar_gravehard_topcard(){}
function enviar_gravehard(){}
function abrir_menuextradeck(){}

document.getElementById("Monster_Zone1").onclick = () => enviarParaZona("Monster_Zone1");
document.getElementById("Monster_Zone2").onclick = () => enviarParaZona("Monster_Zone2");
document.getElementById("Monster_Zone3").onclick = () => enviarParaZona("Monster_Zone3");
document.getElementById("Monster_Zone4").onclick = () => enviarParaZona("Monster_Zone4");
document.getElementById("Monster_Zone5").onclick = () => enviarParaZona("Monster_Zone5");

document.getElementById("Magic_Zone1").onclick = () => enviarParaZona("Magic_Zone1");
document.getElementById("Magic_Zone2").onclick = () => enviarParaZona("Magic_Zone2");
document.getElementById("Magic_Zone3").onclick = () => enviarParaZona("Magic_Zone3");
document.getElementById("Magic_Zone4").onclick = () => enviarParaZona("Magic_Zone4");
document.getElementById("Magic_Zone5").onclick = () => enviarParaZona("Magic_Zone5");

document.getElementById("Camp-Zone").onclick = () => enviarParaZona("Camp-Zone");