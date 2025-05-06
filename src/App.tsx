import './App.css';
import { Pagination } from './components/pagination/Pagination';
import { Content } from './components/content/Content';


function App() {


  return (
    <div className="App">
      <div className="dropdown">
        <div>用戶管理</div>
      </div>
      <Content />
      <Pagination />
    </div>
  );
}

export default App;
