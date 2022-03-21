import './App.css';
import { SignUp } from './pages/signup';
import path from './constants/router';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ErrorBoundary } from './errorBoundary';
import { CookiesProvider } from 'react-cookie';
import Profile from './pages/profile';
import { LogIn } from './pages/login';
import ProtectedRoute from './helper/protected-route'
import IsUserLoggedIn from './helper/is-user-loggedin';
import ChatHome from './pages/chat/chatHome';
import { CreateChatRoom } from './pages/chat/createChatRoom';
import { Dashboard } from './pages/dashboard';



function App() {
  return (
    <ErrorBoundary>
      <CookiesProvider>
        <Router>
          <Routes>
            <Route exact path={path.SIGNUP} element={<IsUserLoggedIn />}>
              <Route exact path={path.SIGNUP} element={<SignUp />} />
            </Route>
            <Route exact path={path.LOGIN} element={<IsUserLoggedIn />}>
              <Route exact path={path.LOGIN} element={<LogIn />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route exact path='/' element={<Dashboard />} />
              <Route exact path={path.PROFILE} element={<Profile />} />
              <Route exact path={path.CHAT} element={<ChatHome />} />
              <Route exact path='/createRoom' element={<CreateChatRoom />} />
            </Route>
          </Routes>
        </Router>
      </CookiesProvider>
    </ErrorBoundary>
  );
}

export default App;
