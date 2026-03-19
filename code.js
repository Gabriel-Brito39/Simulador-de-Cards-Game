let cartaSelecionada = null;
let indiceSelecionado = null;

let Zonas = {
    Monster_Zone1: null,
    Monster_Zone2: null,
    Monster_Zone3: null,
    Monster_Zone4: null,
    Monster_Zone5: null,

    Magic_Zone1: null,
    Magic_Zone2: null,
    Magic_Zone3: null,
    Magic_Zone4: null,
    Magic_Zone5: null,
    Camp_Zone: null
};

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
    {nome: "card10", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9WonJ5RzIMkpmtg1Bns_QwxwTfR-cxhjFw&s"}
]

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
        botao.style.backgroundSize = "140px 200px";
        botao.style.backgroundRepeat = "no-repeat";
        botao.style.backgroundPosition = "center";

        botao.onclick = function(){

            if(indiceSelecionado === index){
                indiceSelecionado = null;
                cartaSelecionada = null;
                atualizarHand();
                return;
            }

            cartaSelecionada = carta;
            indiceSelecionado = index;

            atualizarHand();
        };
    
        if(indiceSelecionado === index){
            botao.style.border = "4px solid red";
        }

        area.appendChild(botao);

    });

}
function clicarZona(idZona){

    let cartaNaZona = Zonas[idZona];

    // 🔴 CASO 1: tem carta selecionada na mão → enviar pra zona
    if(cartaSelecionada){

        // se já tiver carta na zona → volta pra mão
        if(cartaNaZona){
            Hand.push(cartaNaZona);
        }

        Zonas[idZona] = cartaSelecionada;

        Hand.splice(indiceSelecionado,1);

        cartaSelecionada = null;
        indiceSelecionado = null;

        atualizarHand();
        atualizarZonas();
        return;
    }

    // 🔵 CASO 2: não tem carta selecionada → puxar da zona pra mão
    if(cartaNaZona){

        Hand.push(cartaNaZona);
        Zonas[idZona] = null;

        atualizarHand();
        atualizarZonas();
    }
}
function atualizarZonas(){

    for(let zona in Zonas){

        let elemento = document.getElementById(zona);

        if(Zonas[zona]){
            elemento.style.backgroundImage = `url(${Zonas[zona].imagem})`;
            elemento.style.backgroundSize = "cover";
            elemento.style.backgroundPosition = "center";
        } else {
            elemento.style.backgroundImage = "none";
        }
    }
}
function buscar(){

    let area = document.getElementById("buscar_container");
    let areap = document.getElementById("buscar");

    areap.style.display = "flex";

    area.innerHTML = "";

    Deck.forEach(function(carta, index){

        let botao = document.createElement("button");

        botao.className = "cardButton";

        botao.style.backgroundImage = `url(${carta.imagem})`;
        botao.style.backgroundSize = "140px 200px";
        botao.style.backgroundPosition = "center";

        botao.onclick = function(){

            Hand.push(carta);

            Deck.splice(index,1);

            areap.style.display = "none";

            cartaSelecionada = null;
            indiceSelecionado = null;

            atualizarHand();
            embaralhar();
        };

        area.appendChild(botao);
    });
}
function enviar_gravehard_topcard(){}
function enviar_gravehard(){}
function abrir_menuextradeck(){}

[
"Monster_Zone1","Monster_Zone2","Monster_Zone3","Monster_Zone4","Monster_Zone5",
"Magic_Zone1","Magic_Zone2","Magic_Zone3","Magic_Zone4","Magic_Zone5","Camp_Zone"
].forEach(id => {
    document.getElementById(id).onclick = () => clicarZona(id);
});