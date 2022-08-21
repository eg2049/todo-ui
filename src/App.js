import Navbar from "./components/UI/navbar/Navbar";
import TodoList from "./components/TodoList";
import "./styles/App.css";

function App() {
    return (
        <div className="container">
            <Navbar />
            <TodoList />
        </div>
    );
}

export default App;
