import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer/MainContainer";
import WatchPage from "./components/WatchPage/WatchPage";

const bodyRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      { path: "/watch", element: <WatchPage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Header />
      <RouterProvider router={bodyRouter} />
    </Provider>
  );
}

export default App;
