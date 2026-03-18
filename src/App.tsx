import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '오뿐꿀로한테 Todo 앱 만들어달라기 😄', completed: true },
    { id: 2, text: 'React 공부하기', completed: false },
    { id: 3, text: '코딩 천재 되기 💻', completed: false },
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <>
      <Navbar />
      <div className="app">
      <h1>✅ Todo List</h1>

      <div className="input-row">
        <input
          type="text"
          placeholder="할 일을 입력하세요..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.nativeEvent.isComposing && addTodo()}
        />
        <button className="add-btn" onClick={addTodo}>추가</button>
      </div>

      <div className="filter-row">
        {(['all', 'active', 'completed'] as Filter[]).map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? '전체' : f === 'active' ? '진행중' : '완료'}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {filteredTodos.length === 0 && (
          <li className="empty">할 일이 없어요 🎉</li>
        )}
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>🗑</button>
          </li>
        ))}
      </ul>

      <div className="footer">
        <span>{activeCount}개 남음</span>
        {todos.some(t => t.completed) && (
          <button className="clear-btn" onClick={clearCompleted}>완료 항목 삭제</button>
        )}
      </div>
    </div>
    </>
  );
}

export default App;
