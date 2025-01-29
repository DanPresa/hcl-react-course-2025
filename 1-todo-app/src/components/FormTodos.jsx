const FormTodos = ({ setText, handleAddTodoClick }) => {
  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddTodoClick}>Add Toddo</button>
    </div>
  );
};

export default FormTodos;
