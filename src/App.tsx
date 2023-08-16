import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './components/Shopping/Cart/Cart';
import RootLayout from './routing/RootLayout';
import HomePage from './components/Pages/HomePage';
import ProductDetail from './components/Shopping/Product/ProductDetail/ProductDetail';
import ErrorPage from './routing/ErrorPage';
import Authentication from './components/Pages/Authentication';
import './App.css';

const App = () => {

  // Routing for pages
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {index: true, element: <HomePage />},
        {path: '/products/:id', element: <ProductDetail/>},
        {path: '/cart', element: <Cart />},
        {path: '/auth', element: <Authentication />},
      ]
    }]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
