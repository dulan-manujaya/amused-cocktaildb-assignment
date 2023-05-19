import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/favorites",
      element: <Favorites />,
    },
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router} fallbackElement={<div>Uh No</div>} />
    </RecoilRoot>
  );
}

export default App;
