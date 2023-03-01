import {Route,Routes,Navigate} from "react-router-dom";
import Mainlayouts from "./layouts/Mainlayouts";
import LoginPage from "./pages/LoginPage";
import PaidPage from "./pages/PaidPage";
import AdminPage from "./pages/AdminPage";
import ActivatePage from "./pages/ActivatePage";
import EditPage from "./pages/EditPage";

const App = ()=>{
  return (
    <Routes>
      <Route path={''} element={<Mainlayouts/>}>
          <Route index element={<Navigate to={'login'}/>}/>
          <Route path={'login'} element={<LoginPage/>}/>
          <Route path={'paid'} element={<PaidPage/>}/>
          <Route path={'admin'} element={<AdminPage/>}/>
          <Route path={'activate/:token'} element={<ActivatePage/>}/>
          <Route path={'edit'} element={<EditPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
