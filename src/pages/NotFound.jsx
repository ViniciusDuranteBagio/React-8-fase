export default function NotFound() {
  return (
    <section>
      <h2>Página não encontrada 😅</h2>
      <p>
        Ops! Parece que você tentou acessar uma página que não existe.
      </p>
      <p>
        Verifique a URL ou navegue usando o menu acima para voltar ao conteúdo principal.
      </p>
      <div style={{marginTop: '1.5rem'}}>
        <a href="/" style={{
          display: 'inline-block',
          background: 'var(--primary)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--radius)',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.2s ease'
        }}>
          🏠 Voltar ao Início
        </a>
      </div>
    </section>
  );
}
