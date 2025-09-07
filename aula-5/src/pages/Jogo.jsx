import { useEffect, useMemo, useState, useRef } from "react";

function Quadrado({ value, quadradoClicado, disabled }) {
  return (
    <button
      className="quadrado"
      onClick={quadradoClicado}
      disabled={disabled}
      aria-label={value ? `Casa com ${value}` : "Casa vazia"}
      title={disabled ? "A jogada está congelada" : ""}
    >
      {value}
    </button>
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

function Tabuleiro({ xIsProx, quadrados, onPlay, congelado }) {
  function clique(i) {
    if (quadrados[i] || calculaVitoria(quadrados) || congelado) return;
    const proxQuadrados = quadrados.slice();
    proxQuadrados[i] = xIsProx ? "X" : "O";
    onPlay(proxQuadrados);
  }

  const vencedor = calculaVitoria(quadrados);
  const cheio = quadrados.every((q) => q !== null);
  const empate = !vencedor && cheio;

  let status;
  if (vencedor) status = "Vencedor: " + vencedor;
  else if (empate) status = "Empate!";
  else status = "Próximo jogador: " + (xIsProx ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      <div className="linhaTabuleiro">
        <Quadrado
          value={quadrados[0]}
          quadradoClicado={() => clique(0)}
          disabled={congelado}
        />
        <Quadrado
          value={quadrados[1]}
          quadradoClicado={() => clique(1)}
          disabled={congelado}
        />
        <Quadrado
          value={quadrados[2]}
          quadradoClicado={() => clique(2)}
          disabled={congelado}
        />
      </div>
      <div className="linhaTabuleiro">
        <Quadrado
          value={quadrados[3]}
          quadradoClicado={() => clique(3)}
          disabled={congelado}
        />
        <Quadrado
          value={quadrados[4]}
          quadradoClicado={() => clique(4)}
          disabled={congelado}
        />
        <Quadrado
          value={quadrados[5]}
          quadradoClicado={() => clique(5)}
          disabled={congelado}
        />
      </div>
      <div className="linhaTabuleiro">
        <Quadrado
          value={quadrados[6]}
          quadradoClicado={() => clique(6)}
          disabled={congelado}
        />
        <Quadrado
          value={quadrados[7]}
          quadradoClicado={() => clique(7)}
          disabled={congelado}
        />
        <Quadrado
          value={quadrados[8]}
          quadradoClicado={() => clique(8)}
          disabled={congelado}
        />
      </div>
    </>
  );
}

export default function Jogo() {
  const [xIsProx, setXIsProx] = useState(true);
  const [historia, setHistoria] = useState([Array(9).fill(null)]);
  const [movimentoAtual, setMovimentoAtual] = useState(0);
  const [tempo, setTempo] = useState(10); // 10s por jogada
  const intervalo = useRef(null);

  const quadradosAtuais = historia[movimentoAtual];

  const vencedor = useMemo(
    () => calculaVitoria(quadradosAtuais),
    [quadradosAtuais]
  );
  const cheio = useMemo(
    () => quadradosAtuais.every((q) => q !== null),
    [quadradosAtuais]
  );
  const empate = useMemo(() => !vencedor && cheio, [vencedor, cheio]);
  const jogoEncerrado = vencedor || empate;

  function resetarTimer() {
    setTempo(10);
  }

  function pararTimer() {
    if (intervalo.current) {
      clearInterval(intervalo.current);
      intervalo.current = null;
    }
  }

  // Cronômetro regressivo: conta quando o jogo não está encerrado
  useEffect(() => {
    pararTimer();
    if (!jogoEncerrado) {
      intervalo.current = setInterval(() => {
        setTempo((t) => t - 1);
      }, 1000);
    }
    return pararTimer;
  }, [xIsProx, movimentoAtual, jogoEncerrado]);

  // Quando tempo chega a zero: passa o turno automaticamente (sem jogar)
  useEffect(() => {
    if (tempo <= 0 && !jogoEncerrado) {
      setXIsProx((v) => !v); // troca jogador
      setTempo(10); // reseta tempo para o novo turno
    }
  }, [tempo, jogoEncerrado]);

  function jogada(proxQuadrados) {
    const proxHistoria = [
      ...historia.slice(0, movimentoAtual + 1),
      proxQuadrados,
    ];
    setHistoria(proxHistoria);
    setMovimentoAtual(proxHistoria.length - 1);
    setXIsProx((v) => !v);
    setTempo(10); // reseta timer a cada jogada válida
  }

  function pularPara(proxMovimento) {
    setMovimentoAtual(proxMovimento);
    setXIsProx(proxMovimento % 2 === 0);
    setTempo(10); // reseta timer ao viajar no tempo
  }

  function reiniciar() {
    pararTimer();
    setHistoria([Array(9).fill(null)]);
    setMovimentoAtual(0);
    setXIsProx(true);
    setTempo(10);
  }

  const movimentos = historia.map((_, movimento) => {
    const descricao =
      movimento > 0
        ? "Vá para o movimento #" + movimento
        : "Vá para o início do jogo";
    return (
      <li key={movimento}>
        <button onClick={() => pularPara(movimento)}>{descricao}</button>
      </li>
    );
  });

  return (
    <div className="jogo">
      <div className="tabuleiro-jogo">
        {/* HUD do Timer */}
        <div
          className="status"
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <span>
            Jogador atual: <strong>{xIsProx ? "X" : "O"}</strong>
          </span>
          <span>
            Tempo: <strong>{tempo}s</strong>
          </span>
          {jogoEncerrado && (
            <span style={{ color: "#ff5252", fontWeight: 700 }}>
              Partida encerrada — cronômetro congelado
            </span>
          )}
        </div>

        <Tabuleiro
          xIsProx={xIsProx}
          quadrados={quadradosAtuais}
          onPlay={jogada}
          congelado={!!jogoEncerrado}
        />

        <button
          className="btn btn-reset"
          onClick={reiniciar}
          style={{ display: "block" }}
        >
          Reiniciar
        </button>
      </div>

      <div className="jogo-info">
        <h3>Movimentos</h3>
        <ol>{movimentos}</ol>
      </div>
    </div>
  );
}
