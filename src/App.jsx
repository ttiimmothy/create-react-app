import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {store} from "./store";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./Home.jsx";
import {Call} from "./Call.jsx";
import {Provider} from "react-redux";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="call/:id" element={<Call />} />
    </Routes>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);

export default App;
