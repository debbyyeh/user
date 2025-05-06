import { Pagination } from './components/pagination/Pagination';
import { Content } from './components/content/Content';
import { Popup } from './components/popup/Popup';
import './index.css'

function App() {


  return (
    <div className="App">
      <div>用戶管理</div>
      <Content />
      <Pagination />
      <Popup/>
    </div>
  );
}

export default App;
