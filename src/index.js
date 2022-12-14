import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./pages/error-page";
import Notes from './pages/Notes';
import { PopupProvider } from "react-custom-popup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/notes",
    element: <Notes />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PopupProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </PopupProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
