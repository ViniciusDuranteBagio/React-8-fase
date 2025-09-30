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
- [**Prova 1**](https://github.com/ViniciusDuranteBagio/React-8-fase/tree/prova-1-gabriel-ramos) *(prova de conteúdo das aulas anteriores)*  
  <details>
    <summary>instruções</summary>
    
    - Data: 08/09/2025  
    - Formato: Presencial, individual.  
    - Conteúdo: tudo que foi abordado das aulas 1 à 5.  
    - Entrega: Fazer commits da resolução dos bugs no repositório até o final da aula.  
  </details>

- [**7a-aula-react-native-expo**](https://github.com/ViniciusDuranteBagio/React-8-fase/tree/gabriel-ramos/7a-aula) *(primeiro contato com desenvolvimento mobile)*  
  <details>
    <summary>preparação de ambiente</summary>
    
    1. Instalar [Node.js LTS](https://nodejs.org/)  
    2. Instalar Expo CLI globalmente:  
       ```bash
       npm install --global expo-cli
       ```
    3. Instalar o app **Expo Go** no celular:  
       - [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)  
       - [App Store](https://apps.apple.com/app/expo-go/id982107779)  
    4. Criar projeto:  
       ```bash
       npx create-expo-app meu-primeiro-app
       cd meu-primeiro-app
       npx expo start
       ```
    5. Escanear o QR Code no navegador pelo app **Expo Go**.  

    Documentação:  
    - [React Native Docs](https://reactnative.dev/docs/getting-started)  
    - [Expo Docs](https://docs.expo.dev/)  
  </details>

  <details>
    <summary>atividades</summary>
    
    - Fazer o projeto inicial rodar no Expo Go.  
    - Analisar o código gerado e responder as perguntas:  
      1. Liste **3 aplicativos** que você mais usa no dia a dia.  
      2. Qual a funcionalidade mais interessante/importante que você já viu em um app?  
      3. Escolha um deles e diga **qual você gostaria de ter criado e por quê**.  

    - Entregar as respostas no **AVA** (formato TXT ou DOCX).  
  </details>

- **8a-aula**  
  <details>
    <summary>atividades</summary>
    
    - Foi realizado um **Karrot** com **10 perguntas** referentes ao conteúdo já estudado nas aulas anteriores.
  </details>

- [**9a-aula-react-native-expo**](https://github.com/ViniciusDuranteBagio/React-8-fase/tree/gabriel-ramos/9a-aula) *(manipulação de telas e componentes no Expo)*  
  <details>
    <summary>atividades</summary>
    
    **Exercício 1 – Criar uma nova aba "Perfil"**  
    Objetivo: adicionar uma nova aba chamada **Perfil** ao sistema de navegação.  
    - Criar arquivo `app/(tabs)/profile.tsx`  
    - Copiar estrutura de algum arquivo já criado como base  
    - Adicionar aba no `_layout.tsx`  
    - Escolher ícone apropriado  

    **Exercício 2 – Criar um componente de Card**  
    Objetivo: criar um componente reutilizável de **Card** para exibir informações.  
    - Criar arquivo `components/info-card.tsx`  
    - Usar `ThemeView` e `ThemedText`  
    - Adicionar props para **título** e **descrição**  
    - Usar o componente na tela **Home**  

    **Exercício 3 – Criar uma página "Sobre"**  
    Objetivo: criar uma tela independente (não aba) chamada **Sobre**.  
    - Criar arquivo `app/about.tsx`  
    - Registrar no `_layout.tsx`  
    - Adicionar botão na tela **Home** para acessar  
    - Usar componentes temáticos  
  </details>
