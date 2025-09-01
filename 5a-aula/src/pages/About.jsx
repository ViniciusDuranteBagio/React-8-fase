function About() {
    return (
        <div className="about-page">
            <h1>Sobre o Projeto</h1>

            <div className="about-section">
                <h2>Objetivo</h2>
                <p>
                    Este projeto foi desenvolvido para recriar o clássico <strong>Jogo da Velha</strong>,
                    aplicando conceitos de <em>React</em>, <em>Vite</em> e boas práticas de
                    desenvolvimento front-end.
                </p>
            </div>

            <div className="about-section">
                <h2>Como Funciona</h2>
                <p>
                    Dois jogadores se enfrentam em um tabuleiro 3x3, alternando entre X e O.
                    Vence quem conseguir alinhar três símbolos em linha, coluna ou diagonal.
                    Caso todas as casas sejam preenchidas sem um vencedor, o jogo termina em empate.
                </p>
            </div>
        </div>
    );
}

export default About;