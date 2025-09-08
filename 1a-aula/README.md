# PWA Básica
Este é o modelo mais simples para demonstrar uma PWA.

## Estrutura
- `index.html`: página inicial e registro do Service Worker
- `manifest.json`: metadados (nome, ícones, cores)
- `service-worker.js`: cache simples (estratégia Cache First)
- `icon-192.png`, `icon-512.png`: ícones

## Como rodar em desenvolvimento
1. Instale o `serve` (ou use qualquer servidor estático):
   ```bash
   npm i -g serve
   ```
2. Na pasta do projeto, rode:
   ```bash
   serve .
   ```
3. Acesse `http://localhost:3000` (ou a porta indicada).

## Testes recomendados
- Abra DevTools > Application > Manifest/Service Workers para verificar o registro.
- Rode Lighthouse > PWA para checar requisitos.
- Teste offline: com o SW ativo, desligue a rede e recarregue a página.
