import { useState } from "react";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <AppLayout></AppLayout>
//   }


// ])
// function AppLayout({ children }) {
//   return (
//     < div className="app">
//       <Navigation />
//       <main className="main-content">
//         {children}
//       </main>
//     </div>
//   )
// }

function Quadrado({ value, quadradoClicado }) {
  return (
    <button className="quadrado" onClick={quadradoClicado}>
      {value}
    </button>
  );
}

function Tabuleiro({ xIsProx, quadrados, onPlay }) {
  function clique(i) {
    if (quadrados[i] || calculaVitoria(quadrados)) {
      return;
    }
    const proxQuadrados = quadrados.slice();
    proxQuadrados[i] = xIsProx ? "X" : "O";
    onPlay(proxQuadrados);
  }

  const vencedor = calculaVitoria(quadrados);
  let status = vencedor
    ? "Vencedor: " + vencedor
    : "Próximo jogador: " + (xIsProx ? "X" : "O");

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

export default function Jogo() {
  const [xIsProx, setXIsProx] = useState(true);
  const [historia, setHistoria] = useState([Array(9).fill(null)]);
  const [movimentoAtual, setMovimentoAtual] = useState(0);
  const quadradosAtuais = historia[movimentoAtual];

  function jogada(proxQuadrados) {
    const proxHistoria = [...historia.slice(0, movimentoAtual + 1), proxQuadrados];
    setHistoria(proxHistoria);
    setMovimentoAtual(proxHistoria.length - 1);
    setXIsProx(!xIsProx);
  }

  function pularPara(proxMovimento) {
    setMovimentoAtual(proxMovimento);
    setXIsProx(proxMovimento % 2 === 0);
  }

  const movimentos = historia.map((quadrados, movimento) => {
    let descricao;
    if (movimento > 0) {
      descricao = 'Vá para o movimento #' + movimento;
    } else {
      descricao = 'Vá para o inicío do jogo'
    }
    return (
      <li key={movimento}>
        <button onClick={() => pularPara(movimento)}>{descricao}</button>
      </li>
    )
  }


  )

  return (
    <div className="jogo">
      <div className="tabuleiro-jogo">
        <Tabuleiro
          xIsProx={xIsProx}
          quadrados={quadradosAtuais}
          onPlay={jogada}
        />
      </div>
      <div>
        <ol>{movimentos}</ol>
      </div>
    </div>
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
    [2, 4, 6],
  ];
  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i];
    if (
      quadrados[a] &&
      quadrados[a] === quadrados[b] &&
      quadrados[a] === quadrados[c]
    ) {
      return quadrados[a];
    }
  }
  return null;
}
