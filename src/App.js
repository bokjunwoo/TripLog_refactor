import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import List from './pages/List';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Main from './pages/Main';
import SubMain from './pages/SubMain';
import Data from './component/Data'
import UserImage from './pages/UserImage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/api' element={<Data />} />
        <Route path='/' element={<Main />} />
        <Route path='/mypage' element={<UserImage />} /> 
        <Route path='/submain/:region' element={<SubMain />} />
        <Route path='/login' element={<Login />} />
        <Route path='/list/:region/:type' element={<List />}/>
        <Route path="/detail/:region/:contentid" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
