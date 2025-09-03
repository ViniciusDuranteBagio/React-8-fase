function Sobre() {
  return (
    <div className="nav-summary" style={{marginTop: 40}}>
      <h3>Sobre o React</h3>
      <p>React é uma biblioteca JavaScript para criar interfaces de usuário de forma declarativa, eficiente e flexível. Muito utilizada para construir aplicações web modernas e interativas.</p>
      <ul className="nav-links-list">
        <li><a href="https://react.dev/" target="_blank" rel="noopener noreferrer">Documentação Oficial</a></li>
        <li><a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Sobre o Vite</a></li>
        <li><a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer">React Router</a></li>
      </ul>
    </div>
  );
}

export default Sobre;
