let ncaso = document.getElementById('txtn')
let caso = document.getElementById('caso')
let res = document.getElementById('res')
let selcaso = document.getElementById('selcasos')
let divtimer = document.getElementById('divtimer')
let numcounter = document.getElementById('numcounter')

let keycaso = 0

//Carrega o select com os casos no JSON
window.onload = loadcasos

function loadcasos(){
    let kkcaso = 0
    let loadcaso = 1
    while (loadcaso <= pistas.length){
        let item = document.createElement('option')
        item.innerText = `Caso nº ${pistas[kkcaso].caso} - ${pistas[kkcaso].nomecaso}.`
        item.value = pistas[kkcaso].caso
        selcaso.appendChild(item)
        kkcaso++
        loadcaso++        
    }       
}

//Variaveis de locasis base - sem info das pistas
let farm = undefined
let banc = undefined
let estac = undefined
let docas = undefined
let hotel = undefined
let chav = undefined
let museu = undefined
let livra = undefined
let parq = undefined
let cpen = undefined
let teat = undefined
let bar = undefined
let syard = undefined
let charut = undefined

function nvalid(n){
    if(Number(n)> 0 && Number(n) <= 100){
        return true
    } else{
        return false
    }
}

//Confirma a seleção do caso e preenche cada varíavel de local com a sua pista
function confirmar(){
    if (nvalid(ncaso.value || nvalid(selcaso.options[selcaso.selectedIndex].value))){
        keycaso = Number(ncaso.value || selcaso.options[selcaso.selectedIndex].value) - 1
        caso.innerHTML = `<p><strong>O caso selecionado: ${ncaso.value || selcaso.options[selcaso.selectedIndex].value } - ${pistas[keycaso].nomecaso}</strong></p>`
        res.innerHTML = ''
        farm = pistas[keycaso].farm
        banc = pistas[keycaso].banc
        estac = pistas[keycaso].estac
        docas = pistas[keycaso].docas
        hotel = pistas[keycaso].hotel
        chav = pistas[keycaso].chav
        museu = pistas[keycaso].museu
        livra = pistas[keycaso].livra
        parq = pistas[keycaso].parq
        cpen = pistas[keycaso].cpen
        teat = pistas[keycaso].teat
        bar = pistas[keycaso].bar
        syard = pistas[keycaso].syard
        charut = pistas[keycaso].charut

        ncaso.value = ''
    } else {
        alert('Digitar um número de caso entre 1 a 100')
    }
}

//Puxa as pistas do JSON conforme a variável setada no onclick
function pista(n){               
    if(nvalid(ncaso.value) || nvalid(selcaso.options[selcaso.selectedIndex].value)){
        res.innerHTML = n
         //Timer
        let counter = Number(numcounter.value)
        let timer = setInterval(function(){
            if (counter <= 0){
                clearInterval(timer)
                res.innerHTML = ''
                divtimer.innerHTML = ''
                
            }
            divtimer.innerHTML = `Fim da investigação em <strong>${counter--} segundos </strong>`
        }, 1000)

        
    } else {
        alert('Insira uo número do caso antes de continuar.')
               
    } 
}

//Limpar pistas
function limpar(){
    res.innerHTML = ''    
}

//variavel para receber as informações do JSON
let pistas = undefined

//requisição http do arquivo pistas.json
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        let response = JSON.parse(xhttp.responseText)
        pistas = response.pistas
    }
    };
    xhttp.open("GET", "pistas.json", true);
    xhttp.send();


