import { useState } from "react";

function Quadrado({ value, quadradoClicado }) {

  return <button className="quadrado" onClick={quadradoClicado}>
    {value}
  </button>;
}

export default function Tabuleiro() {
  const [xIsProx, setXIsProx] = useState(true);
  const [quadrados, setQuadrados] = useState(Array(9).fill(null));

  function clique(i) {
    if (quadrados[i] || calculaVitoria(quadrados)) {
      return
    }
    const proxQuadrados = quadrados.slice();
    if (xIsProx) {
      proxQuadrados[i] = 'X';
    } else {
      proxQuadrados[i] = 'O';
    }
    setQuadrados(proxQuadrados);
    setXIsProx(!xIsProx);
  }

  const vencedor = calculaVitoria(quadrados);
  let status;
  if (vencedor) {
    status = "Vencedor: " + vencedor;
  } else {
    status = "Próximo jogador: " + (xIsProx ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="linhaTabuleiro">
        <Quadrado value={quadrados[0]} quadradoClicado={() => clique(0)} />
        <Quadrado value={quadrados[1]} quadradoClicado={() => clique(1)} />
        <Quadrado value={quadrados[2]} quadradoClicado={() => clique(2)} />
      </div>
      <div className="linhaTabuleiro">
        <Quadrado value={quadrados[3]} quadradoClicado={() => clique(3)} />
        <Quadrado value={quadrados[4]} quadradoClicado={() => clique(4)} />
        <Quadrado value={quadrados[5]} quadradoClicado={() => clique(5)} />
      </div>
      <div className="linhaTabuleiro">
        <Quadrado value={quadrados[6]} quadradoClicado={() => clique(6)} />
        <Quadrado value={quadrados[7]} quadradoClicado={() => clique(7)} />
        <Quadrado value={quadrados[8]} quadradoClicado={() => clique(8)} />
      </div>
    </>
  );
}
function calculaVitoria(quadrados) {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return quadrados[a];
    }
  }
  return null;
}