# 📚 Branch de Aulas

Cada pasta representa uma aula, contendo materiais, exemplos de código e anotações correspondentes.  

---

## Estrutura de Pastas

aulas/  

- **1a-aula-introducao**
- [**2a-aula-fundamentos-PWA**](https://github.com/ViniciusDuranteBagio/pwa-8-fase/tree/gabriel-ramos/1a-aula)
  <details>
    <summary>atividade</summary>
    
    - Criar um app PWA simples com manifest.json e service worker.
  </details>
- [**3a-aula-introducao-React-Native**](https://github.com/ViniciusDuranteBagio/React-8-fase/tree/gabriel-ramos/3a-aula)  
  <details>
    <summary>atividade Jogo da Velha</summary>
    
    - Desenvolver um jogo da velha funcional em React Native seguindo o tutorial do react.
	- Link do exercício: https://pt-br.react.dev/learn/tutorial-tic-tac-toe
  </details>
- [**4a-aula-organizacao-basica**](https://github.com/ViniciusDuranteBagio/React-8-fase/tree/gabriel-ramos/4a-aula) *(pages, navigation...)*  
  <details>
	<summary>Importante</summary>

	- Antes de modificar qualquer coisa, **verifique** se o `react` já está listado nas dependências do arquivo **package.json**.

	- ✅ Se o **React já estiver presente**, rode:
		```bash
		npm install
		```

	- ❌ Se o **React não estiver presente**, instale-o com:
		```bash
		npm install react
		```

	- Em seguida, instale o **React Router**:
		```bash
		npm install react-router-dom
		```

	- Pronto! Agora você está liberado para modificar o projeto.
	</details>
  <details>
    <summary>atividades</summary>
    
    - Criar estrutura inicial com páginas, navegação e componentes básicos.  
    - Implementar um **Fallback** para quando aparecer erro 404, redirecionando para a Home. 
  </details>
- [**5a-aula-funcionalidades-dinamicas**](https://github.com/ViniciusDuranteBagio/React-8-fase/tree/gabriel-ramos/5a-aula) *(jogo da velha - placar, bot, timer...)*  
  <details>
	<summary>Importante</summary>

	- Antes de modificar qualquer coisa, **verifique** se o projeto está rodando corretamente.  

	- ✅ Se o projeto já estiver funcionando, continue normalmente.  
	- ❌ Se houver erros, revise as dependências e execução com:  
		```bash
		npm install
		npm start
		```

	- Lembre-se: essa atividade vale como **presença para a aula de hoje (01/09/2025)**.  
  </details>

  <details>
    <summary>atividades</summary>
    
    - Adicionar **funcionalidades dinâmicas** ao jogo da velha.  
    - Escolha **pelo menos uma** das opções abaixo:  
      - Placar & "melhor de 3".  
      - Bot "Fácil" (single-player).  
      - Timer por jogada (10s).  

    - Regras gerais:  
      - Ao detectar vencedor/empate: atualizar placar, bloquear jogadas e mostrar botão **“Próxima rodada”**.  
      - Se escolher o modo **melhor de 3**: vence quem alcançar 2 vitórias primeiro.  
      - Se ativar o **modo Bot**: ele deve jogar em posição aleatória, após um pequeno delay.  
      - Se ativar o **timer**: turno dura no máximo 10s, caso expire deve pular jogada ou jogar automático.  
  </details>
