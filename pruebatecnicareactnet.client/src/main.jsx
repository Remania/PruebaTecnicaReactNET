import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfileSetting from './pages/ProfileSetting.jsx';
import Name from './pages/Name.jsx';
import UserName from './pages/UserName.jsx';
import ChangePassword from './pages/ChangePassword.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProfileSetting />
    },
    {
        path: "Name",
        element: <Name />
    },
    {
        path: 'UserName',
        element: <UserName />
    },
    {
        path: 'ChangePassword',
        element: <ChangePassword />
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App>
            <RouterProvider router={router} />
        </App>
    </StrictMode>,
)
