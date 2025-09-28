Por que React Native + Expo?
Antes de colocar a mão na massa, precisamos entender a base do que vamos usar.

O que é React Native?
O React Native é um framework criado pelo Facebook que permite desenvolver aplicativos móveis usando JavaScript e React.

Com ele, conseguimos criar aplicativos nativos para Android e iOS usando praticamente o mesmo código.

A grande vantagem é o reaproveitamento de código e a velocidade no desenvolvimento, sem precisar aprender duas linguagens diferentes (Java/Kotlin para Android e Swift/Objective-C para iOS).

O que é Expo?
O Expo é um conjunto de ferramentas que facilita a vida de quem desenvolve com React Native.

Ele fornece uma série de bibliotecas prontas e simplifica tarefas que seriam complicadas, como:

Rodar o app no celular sem precisar de configuração pesada.

Acessar recursos nativos (câmera, GPS, notificações, etc.) de forma rápida.

Compartilhar facilmente o aplicativo em fase de testes.

Em resumo: React Native é a base, e o Expo é o turbo que acelera o desenvolvimento.


Preparação de Ambiente

Agora, vamos preparar o computador e o celular para começarmos.
Passos:
Instalar o Node.js

O Node.js é necessário para rodar o React Native e o Expo.

Baixe e instale a versão LTS (Long Term Support) aqui: https://nodejs.org/


Instalar o Expo CLI

Depois de instalar o Node.js, vamos instalar a ferramenta Expo CLI pelo terminal:

npm install --global expo-cli



Instalar o app Expo Go no celular

Baixem e instalem o Expo Go:

Google Play (Android)-> https://play.google.com/store/apps/details?id=host.exp.exponent

App Store (iOS) -> https://apps.apple.com/app/expo-go/id982107779


Criar o primeiro app

No terminal, rodem o comando -> npx create-expo-app meu-primeiro-app

Entrem na pasta do projeto -> cd meu-primeiro-app

E iniciem o app -> npx expo start

Isso deve abrir um QR Code no navegador.

No celular, abram o Expo Go e escaneiem o código para rodar o app diretamente.

Documentação oficial para consulta:

- https://reactnative.dev/docs/getting-started
- https://docs.expo.dev/