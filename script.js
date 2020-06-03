let ncaso = document.getElementById("ifctr");
let caso = document.getElementById("isrvh");
let res = document.getElementById("ipo6m");
let selcaso = document.getElementById("ip2qs");
let divtimer = document.getElementById("ibiv6");
let numcounter = document.getElementById("i7zns");

let pistas, casoSelecionado, timer;
let counter = Number(numcounter.value)

const loadCases = async () => {
  //Carrega os casos ao iniciar a página
  fetch("./pistas.json").then((res) => {
    res.json().then((data) => {
      //Add casos na lista
      Object.keys(data.pistas).forEach((el) => {
        let item = document.createElement("option");
        item.innerText = `Caso nº ${data.pistas[el].caso} - ${data.pistas[el].nomecaso}.`;
        item.value = data.pistas[el].caso;
        selcaso.appendChild(item);
      });
      pistas = data.pistas;
    });
  });
};

window.onload = loadCases();

const confirmar = () => {
  casoSelecionado = pistas.find((pista) => {
    return pista.caso === `${selcaso.options[selcaso.selectedIndex].value}`;
  });
  caso.innerHTML = `<p><strong>O caso selecionado: ${casoSelecionado.caso} - ${casoSelecionado.nomecaso}</strong></p>`;
};

const pista = (local) => {
  if (casoSelecionado) {
    counter = Number(numcounter.value)
    const pista = casoSelecionado[local];
    res.innerHTML = pista;
    clearInterval(timer)

    const timerStarter = () =>{
      timer = setInterval(function () {
        if (counter <= 0) {
          clearInterval(timer);
          res.innerHTML = "Clique no botão de local para ver a pista.";
          divtimer.innerHTML = "Fim da investigação em <strong>0 segundos</strong>"
        } else {
          divtimer.innerHTML = `Fim da investigação em <strong>${counter--} segundos </strong>`
        }
        ;
      }, 1000);
    }

    timerStarter()
    
  } else {
    res.innerHTML = "Você precisa selecionar um caso acima.";
  }
};

const limpar = () => {
  clearInterval(timer)
  counter = Number(numcounter.value)
  res.innerHTML = "Clique no botão de local para ver a pista."
  divtimer.innerHTML = "Fim da investigação em <strong>0 segundos</strong>"
}
