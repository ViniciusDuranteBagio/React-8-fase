import { useState } from "react";

function Quadrado({ value }) {

  return <button className="quadrado">{value}</button>;
}

export default function Tabuleiro() {
  const [quadrados, setQuadrados] = useState(Array(9).fill(null));
  return (
    <>
      <div className="linhaTabuleiro">
        <Quadrado value={quadrados[0]} />
        <Quadrado value={quadrados[1]} />
        <Quadrado value={quadrados[2]} />
      </div>
      <div className="linhaTabuleiro">
        <Quadrado value={quadrados[3]} />
        <Quadrado value={quadrados[4]} />
        <Quadrado value={quadrados[5]} />
      </div>
      <div className="linhaTabuleiro">
        <Quadrado value={quadrados[6]} />
        <Quadrado value={quadrados[7]} />
        <Quadrado value={quadrados[8]} />
      </div>
    </>
  );
}
