import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login } from './component/index.js'
import { missingConfig } from './conf/conf.js'
import Home from './Pages/Home.jsx'
import AddPost from "./Pages/AddPost.jsx";
import Signup from './Pages/Signup.jsx'
import EditPost from "./Pages/EditPost.jsx";
import Post from "./Pages/Post.jsx";
import AllPosts from './Pages/AllPost.jsx';
import NotFound from './Pages/NotFound.jsx';
import ConfigError from './Pages/ConfigError.jsx';
import RouteError from './Pages/RouteError.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {missingConfig.length > 0 ? (
      <ConfigError missing={missingConfig} />
    ) : (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )}
  </StrictMode>,
)
