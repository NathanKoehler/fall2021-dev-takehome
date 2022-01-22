import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div style={{backgroundImage: `url(${process.env.PUBLIC_URL+ "/images/layer2.svg"})`}} className="App">
      <TodoList/>
    </div>
  );
}

export default App;
