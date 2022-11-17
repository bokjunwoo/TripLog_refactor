import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import List from './pages/List';
import Login from './pages/Login';
import Data from './component/Data';
import Detail from './pages/Detail';

function App() {
  return (
    <>
      <Data />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='list' element={<List />}/>
        <Route path="/detail/:contentId" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
