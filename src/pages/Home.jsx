export default function Home() {
  return (
    <div>
      <section>
        <h2>📝 Avaliação Prática - To-Do PWA</h2>
        <p>
          <strong>Bem-vindos à avaliação prática!</strong> Este projeto contém
          bugs intencionais que vocês devem identificar e corrigir para
          demonstrar conhecimento em React, PWA e boas práticas de
          desenvolvimento.
        </p>
      </section>

      <section>
        <h2>🎯 Objetivos da Prova</h2>
        <p>
          Identificar e corrigir bugs no código, além de implementar
          funcionalidades PWA para tornar o app instalável.
        </p>

        <div
          style={{
            background: "#f0f9ff",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginTop: "1rem",
            color: "#1f2937",
          }}
        >
          <h3 style={{ color: "#0369a1", marginBottom: "0.5rem" }}>
            📋 Instruções:
          </h3>
          <ol style={{ marginLeft: "1.5rem", lineHeight: "1.8" }}>
            <li>
              Teste o app na seção <strong>Todos</strong> e identifique os
              problemas
            </li>
            <li>Corrija os bugs encontrados no código</li>
            <li>Implemente o manifesto PWA para tornar o app instalável</li>
            <li>Corrija o Service Worker para funcionar offline</li>
            <li>Teste a instalação e funcionamento offline</li>
          </ol>
        </div>
      </section>

      <section>
        <h2>🐛 Bugs para Identificar e Corrigir</h2>
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          <div
            style={{
              background: "#fef2f2",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #fecaca",
            }}
          >
            <h4
              style={{
                color: "#dc2626",
                marginBottom: "0.5rem",
                textDecoration: "line-through",
              }}
            >
              🔴 Bug 1: Mutação Direta de Estado
            </h4>
            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
              O estado está sendo mutado diretamente em vez de criar novos
              objetos/arrays.
            </p>
            <div
              style={{
                background: "#fef7f7",
                padding: "0.75rem",
                borderRadius: "0.25rem",
                fontSize: "0.85rem",
                color: "#1f2937",
              }}
            >
              <strong>Como reproduzir:</strong> Vá em Todos → Adicione uma
              tarefa → Marque como concluída → Observe que pode não funcionar
              corretamente ou não atualizar a interface.
            </div>
          </div>

          <div
            style={{
              background: "#fef2f2",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #fecaca",
            }}
          >
            <h4
              style={{
                color: "#dc2626",
                marginBottom: "0.5rem",
                textDecoration: "line-through",
              }}
            >
              🔴 Bug 2: Inconsistência no localStorage
            </h4>
            <div
              style={{
                background: "#fef7f7",
                padding: "0.75rem",
                borderRadius: "0.25rem",
                fontSize: "0.85rem",
                color: "#1f2937",
              }}
            >
              <strong>Como reproduzir:</strong> Vá em Todos → Adicione algumas
              tarefas → Recarregue a página (F5) → Observe que as tarefas
              desapareceram mesmo tendo sido "salvas".
            </div>
          </div>

          <div
            style={{
              background: "#fef2f2",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #fecaca",
            }}
          >
            <h4
              style={{
                color: "#dc2626",
                marginBottom: "0.5rem",
                textDecoration: "line-through",
              }}
            >
              🔴 Bug 3: Não está sendo possivel instalar o app
            </h4>
            <div
              style={{
                background: "#fef7f7",
                padding: "0.75rem",
                borderRadius: "0.25rem",
                fontSize: "0.85rem",
                color: "#1f2937",
              }}
            >
              <strong>Como reproduzir:</strong>
              Observe que não há ícone de instalação no navegador (Chrome/Edge).
            </div>
          </div>

          <div
            style={{
              background: "#fef2f2",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #fecaca",
            }}
          >
            <h4 style={{ color: "#dc2626", marginBottom: "0.5rem" }}>
              🔴 Bug 4: Service Worker Incompleto
            </h4>
            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
              O CSS não é cacheado, causando perda de estilo offline.
            </p>
            <div
              style={{
                background: "#fef7f7",
                padding: "0.75rem",
                borderRadius: "0.25rem",
                fontSize: "0.85rem",
                color: "#1f2937",
              }}
            >
              <strong>Como reproduzir:</strong> DevTools → Network → Marque
              "Offline" → Recarregue a página → Observe que o app perde todos os
              estilos e fica sem formatação.
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>📊 Critérios de Avaliação (Nota Máxima: 10)</h2>
        <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem" }}>
          <div
            style={{
              background: "#f0fdf4",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #bbf7d0",
              color: "#1f2937",
            }}
          >
            <strong style={{ color: "#166534" }}>2.5 pontos</strong> - Corrigir
            mutação direta de estado
          </div>
          <div
            style={{
              background: "#f0fdf4",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #bbf7d0",
              color: "#1f2937",
            }}
          >
            <strong style={{ color: "#166534" }}>2.5 pontos</strong> - Corrigir
            inconsistência no localStorage
          </div>
          <div
            style={{
              background: "#f0fdf4",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #bbf7d0",
              color: "#1f2937",
            }}
          >
            <strong style={{ color: "#166534" }}>2.5 pontos</strong> - Fazer com
            que o app seja instalável como PWA, com ícone de aplicativo e com o
            layout mais parecido com um aplicativo o possivel.
          </div>
          <div
            style={{
              background: "#f0fdf4",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #bbf7d0",
              color: "#1f2937",
            }}
          >
            <strong style={{ color: "#166534" }}>2.5 pontos</strong> - Corrigir
            Service Worker para funcionar offline
          </div>
        </div>
      </section>

      <section>
        <h2>✅ Critérios de Aprovação</h2>
        <div
          style={{
            background: "#fef3c7",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginTop: "1rem",
            color: "#1f2937",
          }}
        >
          <p style={{ margin: 0, fontWeight: "500" }}>
            <strong>Para aprovação:</strong> O app deve ser instalável como PWA
            e funcionar corretamente após a instalação, incluindo funcionamento
            offline com estilos preservados.
          </p>
        </div>
      </section>

      <section>
        <h2>🚀 Como Começar</h2>
        <p>
          1. Navegue até a seção <strong>Todos</strong> e teste as
          funcionalidades
          <br />
          2. Identifique os problemas de comportamento
          <br />
          3. Analise o código fonte para encontrar os bugs
          <br />
          4. Implemente as correções necessárias
          <br />
          5. Teste a instalação e funcionamento offline
        </p>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <a
            href="/todos"
            style={{
              display: "inline-block",
              background: "var(--primary)",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "1.1rem",
              transition: "all 0.2s ease",
            }}
          >
            🎯 Começar a Prova - Ir para Todos
          </a>
        </div>
      </section>
    </div>
  );
}
