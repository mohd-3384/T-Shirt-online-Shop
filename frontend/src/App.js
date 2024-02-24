import Root from "./pages/Root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/cart/Cart";
import Details from "./pages/details/Details";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
      <Route path="product-details/:id" element={<Details />} />
      {/* ... etc. */}
    </Route>
  )
);



function App() {
  return (

    <RouterProvider router={router} />

  );
}

export default App;
