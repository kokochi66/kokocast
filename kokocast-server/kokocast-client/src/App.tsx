import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './test/UserList';
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import ChangePasswordPage from "./pages/AuthPage/ChangePasswordPage";
import FindPasswordPage from "./pages/AuthPage/FindPasswordPage";
import ChannelSettingPage from "./pages/ChannelSettingPage/ChannelSettingPage";

export const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/userlist" element={<UserList />} />
              <Route path="/main" element={<MainPage />} />


              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/find-password" element={<FindPasswordPage />} />
              <Route path="/auth/change-password" element={<ChangePasswordPage />} />


              <Route path="/setting/channel" element={<ChannelSettingPage />} />
          </Routes>
      </Router>
  );
}