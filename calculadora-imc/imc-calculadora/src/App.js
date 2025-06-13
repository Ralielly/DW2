import { useState } from 'react';
import './App.css';

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [categoria, setCategoria] = useState('');

  function calcularIMC() {
    if (!peso || !altura) return;

    const alturaMetros = parseFloat(altura);
    const pesoKg = parseFloat(peso);
    const imcCalculado = pesoKg / (alturaMetros * alturaMetros);
    setImc(imcCalculado.toFixed(2));

    if (imcCalculado < 18.5) setCategoria('Baixo peso');
    else if (imcCalculado < 24.9) setCategoria('Peso normal');
    else if (imcCalculado < 29.9) setCategoria('Excesso de peso');
    else if (imcCalculado < 34.9) setCategoria('Obesidade de classe 1');
    else if (imcCalculado < 39.9) setCategoria('Obesidade de classe 2');
    else setCategoria('Obesidade de classe 3');
  }

  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>
      <input
        type="number"
        placeholder="Peso (kg)"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />
      <input
        type="number"
        placeholder="Altura (m)"
        value={altura}
        onChange={(e) => setAltura(e.target.value)}
      />
      <button onClick={calcularIMC}>Calcular IMC</button>

      {imc && (
        <div>
          <p><strong>Seu IMC:</strong> {imc}</p>
          <p><strong>Categoria:</strong> {categoria}</p>
        </div>
      )}
    </div>
  );
}

export default App;
