function Quadrado({ value }) {
  return <button className="quadrado">{value}</button>;
}

export default function Tabuleiro() {
  return (
    <>
      <div className="linhaTabuleiro">
        <Quadrado value="1" />
        <Quadrado value="2" />
        <Quadrado value="3" />
      </div>
      <div className="linhaTabuleiro">
        <Quadrado value="4" />
        <Quadrado value="5" />
        <Quadrado value="6" />
      </div>
      <div className="linhaTabuleiro">
        <Quadrado value="7" />
        <Quadrado value="8" />
        <Quadrado value="9" />
      </div>
    </>
  );
}
