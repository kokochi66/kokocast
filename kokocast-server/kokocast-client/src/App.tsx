import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserList from './component/test/user/UserList';

export const App = () => {
  return (
      <Router>
        <div>
          {/* 다른 라우트 및 네비게이션 컴포넌트 */}
          {/*<Route path="/userlist" element={<UserList />} />*/}
        </div>
      </Router>
  );
}