import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login } from './component/index.js'
import { missingConfig, supabaseEnabled } from './conf/conf.js'
import Home from './Pages/Home.jsx'
import AddPost from "./Pages/AddPost.jsx";
import Signup from './Pages/Signup.jsx'
import EditPost from "./Pages/EditPost.jsx";
import Post from "./Pages/Post.jsx";
import AllPosts from './Pages/AllPost.jsx';
import NotFound from './Pages/NotFound.jsx';
import ConfigError from './Pages/ConfigError.jsx';
import RouteError from './Pages/RouteError.jsx';

// Sign in / sign up need Supabase; without it they explain how to set it up instead.
const accountPage = (page) => supabaseEnabled
  ? <AuthLayout authentication={false}>{page}</AuthLayout>
  : <ConfigError missing={missingConfig} />

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
            element: accountPage(<Login />),
        },
        {
            path: "/signup",
            element: accountPage(<Signup />),
        },
        {
            path: "/all-posts",
            element: <AllPosts />,
        },
        {
            path: "/add-post",
            element: <AddPost />,
        },
        {
            path: "/edit-post/:slug",
            element: <EditPost />,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
