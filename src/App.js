import {Route,Routes,Navigate} from "react-router-dom";
import Mainlayouts from "./layouts/Mainlayouts";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

const App = ()=>{
  return (
    <Routes>
      <Route path={''} element={<Mainlayouts/>}>
          <Route index element={<Navigate to={'login'}/>}/>
          <Route path={'login'} element={<LoginPage/>}/>
          <Route path={'paid'} element={<AdminPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
