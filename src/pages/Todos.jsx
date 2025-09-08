import { useEffect, useState } from "react";

function loadTodos() {
  try {
    const raw = localStorage.getItem("todos");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Todos() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (!input.trim()) return;
    const newTodo = { id: Date.now(), text: input.trim(), done: false };
    setTodos([...todos, newTodo]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <section>
      <h2>Minhas Tarefas</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      <div className="todos">
        {todos.length === 0 && (
          <div className="empty-state">
            <p>🎯 Nenhuma tarefa ainda. Que tal adicionar uma?</p>
          </div>
        )}
        {todos.map(t => (
          <div key={t.id} className="todo">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTodo(t.id)}
            />
            <span className={t.done ? "completed" : ""}>{t.text}</span>
            <button className="danger" onClick={() => removeTodo(t.id)}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
