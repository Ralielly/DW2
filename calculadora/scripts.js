
const btnBotoes = document.querySelectorAll("[btn-numero]");
const btnOperacoes = document.querySelectorAll("[btn-operador]");
const btnIgual = document.querySelector("[btn-igual]");
const btnDelete = document.querySelector("[btn-delete]");
const btnAC = document.querySelector("[btn-ac]");


const bufferElemento = document.querySelector("[txt-buffer]");
const displayElemento = document.querySelector("[txt-display]");

const calculadora = {
  operandoAnterior: "",
  operandoAtual: "",
  operador: "",
  bufferTextoElemento: bufferElemento,
  displayTextoElemento: displayElemento,
};


btnAC.addEventListener("click", () => limpaVariaveis(calculadora));
btnDelete.addEventListener("click", () => apagaDigito(calculadora));
btnIgual.addEventListener("click", () => executaCalculo(calculadora));

btnBotoes.forEach((btn) =>
  btn.addEventListener("click", () => {
    adicionaNumero(calculadora, btn.innerText);
  })
);

btnOperacoes.forEach((btn) =>
  btn.addEventListener("click", () => {
    escolheOperador(calculadora, btn.innerText);
  })
);


function atualizaDisplay(calculadora) {
  calculadora.displayTextoElemento.innerText = calculadora.operandoAtual;
  calculadora.bufferTextoElemento.innerText = calculadora.operandoAnterior + (calculadora.operador || "");
}

function limpaVariaveis(calculadora) {
  calculadora.operandoAtual = "";
  calculadora.operandoAnterior = "";
  calculadora.operador = "";
  atualizaDisplay(calculadora);
}

function adicionaNumero(calculadora, numero) {
  if (numero === "." && calculadora.operandoAtual.includes(".")) return;
  calculadora.operandoAtual = calculadora.operandoAtual.toString() + numero.toString();
  atualizaDisplay(calculadora);
}

function escolheOperador(calculadora, operador) {
  if (calculadora.operandoAtual === "") return;

  if (calculadora.operandoAnterior !== "") {
    executaCalculo(calculadora);
  }

  calculadora.operador = operador;
  calculadora.operandoAnterior = calculadora.operandoAtual;
  calculadora.operandoAtual = "";
  atualizaDisplay(calculadora);
}

function executaCalculo(calculadora) {
  const anterior = parseFloat(calculadora.operandoAnterior);
  const atual = parseFloat(calculadora.operandoAtual);
  if (isNaN(anterior) || isNaN(atual)) return;

  let resultado = 0;
  switch (calculadora.operador) {
    case "+":
      resultado = anterior + atual;
      break;
    case "-":
      resultado = anterior - atual;
      break;
    case "*":
      resultado = anterior * atual;
      break;
    case "÷":
      if (atual === 0) {
        alert("Erro: divisão por zero");
        limpaVariaveis(calculadora);
        return;
      }
      resultado = anterior / atual;
      break;
    default:
      return;
  }

  calculadora.operandoAtual = resultado.toString();
  calculadora.operandoAnterior = "";
  calculadora.operador = "";
  atualizaDisplay(calculadora);
}

function apagaDigito(calculadora) {
  calculadora.operandoAtual = calculadora.operandoAtual.toString().slice(0, -1);
  atualizaDisplay(calculadora);
}
