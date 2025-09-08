import { useEffect, useState } from 'react';

function loadTodos() {
  try {
    const raw = localStorage.getItem('todos');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Todos() {
  const [input, setInput] = useState(loadTodos);
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos)); //bug 2 corrigido
    } catch (e) {
      console.error('Falha ao salvar todos no localStorage', e);
    }
  }, [todos]);

  function addTodo() {
    if (!input.trim()) return;
    const newTodo = { id: Date.now(), text: input.trim(), done: false };
    setTodos((prev) => [...prev, newTodo]); //bug 1 corrigido
    setInput('');
  }

  function toggleTodo(id) {
    setTodos(
      (prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) //bug 1 corrigido
    );
  }

  function removeTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <section>
      <h2>Minhas Tarefas</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      <div className="todos">
        {todos.length === 0 && (
          <div className="empty-state">
            <p>🎯 Nenhuma tarefa ainda. Que tal adicionar uma?</p>
          </div>
        )}
        {todos.map((t) => (
          <div key={t.id} className="todo">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTodo(t.id)}
            />
            <span className={t.done ? 'completed' : ''}>{t.text}</span>
            <button className="danger" onClick={() => removeTodo(t.id)}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
