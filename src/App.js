import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import TodoRouter from "./components/TodoRouter";
import "./styles/App.css";

function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Navbar />
                <TodoRouter />
            </BrowserRouter>
        </div>
    );
}

export default App;
