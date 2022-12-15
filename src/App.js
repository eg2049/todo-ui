import { BrowserRouter } from "react-router-dom";
import Navbar from "@components/UI/navbar/Navbar";
import TodoRouter from "@components/TodoRouter";
import "@styles/App.css";

/**
 * Компонент для монтирования всего UI
 * 
 * @returns {object} компонент для монтирования всего UI
 */
function App() {

    return (
        <div className="container">

            {/* компонент для постраничной навигации в который необходимо завернуть всё остальное */}
            <BrowserRouter>

                {/* подключается навбар */}
                <Navbar />

                {/* подключаются маршруты всех страниц приложения */}
                <TodoRouter />
            </BrowserRouter>
        </div>
    );
}

export default App;
