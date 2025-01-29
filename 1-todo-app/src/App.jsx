import { useState } from 'react';
import TodoList from './components/TodoList';
import FormTodos from './components/FormTodos';

const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([
    { id: Date.now(), text: 'Learn React', completed: true },
    { id: Date.now(), text: 'Learn TypeScript', completed: false },
    { id: Date.now(), text: 'Build a React App', completed: false },
  ]);

  const handleAddTodoClick = () => {
    if (text.trim()) {
      setTodos([...todos, { id: Date.now(), text, completed: false }]);
      setText('');
    }
  };

  return (
    <>
      <h1>Todo List</h1>
      <FormTodos setText={setText} handleAddTodoClick={handleAddTodoClick} />
      <TodoList todos={todos} text={text} />
    </>
  );
};

export default App;
