import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store";
import ChampInfo from "./pages/ChampInfo";
import ChampInfoHome from "./pages/ChampInfoHome";
import Layout from "./pages/components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { BASE_NAME } from "./pages/routes";

console.log("basename:", BASE_NAME);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={BASE_NAME}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="champion">
              <Route index element={<ChampInfoHome />} />
              <Route path=":champId" element={<ChampInfo />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
