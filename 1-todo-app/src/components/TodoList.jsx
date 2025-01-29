import ChildrenForm from './ChildrenForm';

const TodoList = ({ todos, text }) => {
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" />
            {todo.text}
            <button>Delete</button>
          </li>
        ))}
      </ul>

      <ChildrenForm text={text} />
    </>
  );
};

export default TodoList;
