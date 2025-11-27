import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Routing from "./layout/Routing";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "./styles/clean.css";
import "./styles/sidebar.css";
import "./styles/header.css";

function App() {
  return (
    <BrowserRouter>
      {/* Toast container (global) */}
      <ToastContainer position="top-right" theme="colored" />

      {/* Routes wrapped with Layout */}
      <Routes>
        {Routing.map((r, i) => {
          const Component = r.element;
          return (
            <Route
              key={i}
              path={r.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
