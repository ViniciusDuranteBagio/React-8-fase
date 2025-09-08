# 🎮 Jogo da Velha - Tutorial React

Um projeto educativo de Jogo da Velha desenvolvido em React para ensinar os conceitos fundamentais da biblioteca.

## 🚀 Funcionalidades

- **Jogo da Velha Completo**: Jogo funcional com histórico de jogadas
- **Interface Responsiva**: Design adaptável para todos os dispositivos
- **Navegação Moderna**: Sistema de rotas com React Router v7
- **Design Atraente**: Interface moderna com gradientes e animações
- **Tutorial Educativo**: Página explicativa sobre os conceitos React

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca principal para interface
- **React Router 7** - Sistema de navegação
- **CSS Responsivo** - Design adaptável
- **Hooks** - useState para gerenciamento de estado

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── Navigation.jsx      # Componente de navegação
├── pages/
│   ├── Home.jsx           # Página inicial
│   ├── Game.jsx           # Página do jogo
│   └── About.jsx          # Página sobre o projeto
├── App.jsx                # Componente principal com rotas
├── main.jsx               # Ponto de entrada
└── styles.css             # Estilos responsivos
```

## 🎯 Conceitos React Demonstrados

### 1. **Componentes**
- Separação de responsabilidades
- Componentes reutilizáveis
- Props para passagem de dados

### 2. **Estado (State)**
- `useState` para gerenciamento de dados
- Estado local e compartilhado
- Atualização de estado

### 3. **Eventos**
- Handlers de eventos
- Interação do usuário
- Callbacks entre componentes

### 4. **Roteamento**
- React Router v7
- Navegação entre páginas
- Layout compartilhado

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd todo-react

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Executa o projeto em modo desenvolvimento
npm run build  # Cria build de produção
npm test       # Executa os testes
```

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- **Desktop**: Layout completo com navegação horizontal
- **Tablet**: Layout adaptado com elementos reorganizados
- **Mobile**: Layout otimizado com navegação mobile

## 🎨 Design System

### Cores
- **Primária**: #667eea (azul)
- **Secundária**: #764ba2 (roxo)
- **Acento**: #ff6b6b (vermelho)

### Tipografia
- **Fonte**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Hierarquia**: Títulos grandes para destaque, texto legível

### Componentes
- **Botões**: Com hover effects e transições
- **Cards**: Com sombras e bordas arredondadas
- **Navegação**: Sticky com backdrop blur

## 📚 Como Usar Como Tutorial

1. **Explore a Estrutura**: Analise a organização dos arquivos
2. **Entenda os Componentes**: Veja como Square, Board e Game se relacionam
3. **Estude o Estado**: Observe como o estado é gerenciado
4. **Experimente**: Modifique o código para aprender
5. **Adicione Funcionalidades**: Implemente novas features

## 🔧 Personalização

### Adicionando Novas Páginas
1. Crie um novo componente em `src/pages/`
2. Adicione a rota em `src/App.jsx`
3. Atualize a navegação em `src/components/Navigation.jsx`

### Modificando Estilos
- Edite `src/styles.css` para alterar a aparência
- Use as variáveis CSS para manter consistência
- Teste a responsividade em diferentes dispositivos

## 🤝 Contribuindo

Este projeto é educativo e aceita contribuições! Algumas ideias:
- Adicionar sons ao jogo
- Implementar modo multiplayer
- Criar diferentes temas visuais
- Adicionar animações mais elaboradas

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍🏫 Para Professores

Este projeto é ideal para:
- **Aulas de React**: Demonstra conceitos fundamentais
- **Práticas de CSS**: Mostra responsividade e design moderno
- **Introdução ao Roteamento**: Ensina React Router
- **Projetos Práticos**: Base para exercícios e modificações

### Sugestões de Exercícios
1. Adicionar um contador de vitórias
2. Implementar um modo "jogar contra computador"
3. Criar um sistema de temas (claro/escuro)
4. Adicionar animações de vitória
5. Implementar persistência local (localStorage)

---

**Desenvolvido com ❤️ para o aprendizado de React** 
