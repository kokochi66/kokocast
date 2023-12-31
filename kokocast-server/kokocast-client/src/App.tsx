import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './component/test/user/UserList';

export const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/userlist" element={<UserList />} />
              {/* 다른 라우트들 */}
          </Routes>
      </Router>
  );
}