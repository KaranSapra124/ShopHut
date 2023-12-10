import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './Components/Navbar.jsx';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import Home from './Components/Home.jsx';
import ProductPage from './Components/ProductPage';
import { Provider } from 'react-redux';
import store from './store';
import AllProducts from './Components/AllProducts';
import Login from './Components/Login';
import Signup from './Components/SignIn';
import UserContext from './utils/UserContext';
import UserDataContext from './utils/UserData';
import Profile from './Components/Profile';
import EditProfile from './Components/EditProfile';
import CartOrder from './Components/CartOrder';
import PayNow from './Components/PayNow.jsx';
const App = () => {
  const [User, setUser] = useState('');

  const updateUser = (txt) => {
    setUser(txt);
  };

  const [UserData, setUserData] = useState('');

  const updateUserDataContext = (txt) => {
    setUserData(txt);
  };

  return (
    <UserDataContext.Provider value={{ UserData: UserData, updateUserDataContext: updateUserDataContext, setUserData: setUserData }}>

      <UserContext.Provider value={{ User: User, updateUser: updateUser, setUser: setUser }}>
        <Provider store={store}>
          <RouterProvider router={Routes}></RouterProvider>
        </Provider>
      </UserContext.Provider>
    </UserDataContext.Provider>
  );
};

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/ProductInfo',
        element: <ProductPage />,
      },
      {
        path: '/Products',
        element: <AllProducts />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/SignIn',
        element: <Signup />,
      },
      {
        path: '/Profile',
        element: <Profile />,
      }, {
        path: '/EditForm',
        element: <EditProfile/>,
      }, {
        path: '/Orders',
        element: <CartOrder/>,
      }, {
        path: '/PayNow',
        element: <PayNow/>,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
