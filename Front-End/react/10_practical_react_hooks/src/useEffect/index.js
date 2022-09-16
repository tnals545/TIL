import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

// React 16.8v
const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    if (typeof onClick !== "function") {
      return;
    }
    // component 가 mount 될 때 eventListener 추가, dependency 가 없기 때문에 한 번만 실행됨
    // => componentDidMount, componentDidUpdate
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    // component 가 mount 되지 않았을 때는 eventListener 가 배치되지 않게 함
    // => componentWillUnMount
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []); // [] => dependency
  return typeof onClick !== "function" ? undefined : element;
};

const App = () => {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
