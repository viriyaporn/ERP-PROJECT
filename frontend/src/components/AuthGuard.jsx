import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getAuthTokens } from "../utils/Utils";
import { decodeToken } from "react-jwt";
import { logout } from "../services/redux/features/auth";

export default function AuthGuard({ userType, position, redirectTo = '/login' }) {
  /** @type {{isLoggedIn: boolean, user: *}} */
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unauthorizedResponse = {
    code: 403,
    message: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูลส่วนนี้',
  };

  const authenticateNeededResponse = {
    code: 401,
    message: 'โปรดเข้าสู่ระบบ',
  };

  if (!auth.isLoggedIn) return <Navigate to={redirectTo} state={authenticateNeededResponse} />;
  if (userType && auth.user.userType !== userType) return <Navigate to={redirectTo} state={unauthorizedResponse} />;
  if (position && auth.user.position !== position) return <Navigate to={redirectTo} state={unauthorizedResponse} />;

  useEffect(() => {
    let interval;
    getAuthTokens().then(({ accessToken, refreshToken }) => {
      interval = setInterval(() => {
        // console.log('Auth timer')
        const data = decodeToken(accessToken);
        const expiredAt = new Date(data.exp * 1000);
        const now = new Date();
        if (now > expiredAt) {
          clearInterval(interval)
          dispatch(logout());
          navigate('/login', { state: authenticateNeededResponse })
          console.log('access token EXPIRED!')
        }
      }, 1000);
    })
    return () => clearInterval(interval);
  }, []);

  return <Outlet />;
}
