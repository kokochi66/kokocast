import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './test/UserList';
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/AuthPage/LoginPage";

export const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/userlist" element={<UserList />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              {/* 다른 라우트들 */}
          </Routes>
      </Router>
  );
}