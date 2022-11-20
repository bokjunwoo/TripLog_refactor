import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import List from './pages/List';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Main from './pages/Main';
import SubMain from './pages/SubMain';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/submain/:region' element={<SubMain />} />
        <Route path='/login' element={<Login />} />
        <Route path='/list/:region/:type' element={<List />}/>
        <Route path="/detail/:region/:contentId" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
