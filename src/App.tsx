import React from "react";
import BaseLayout from "Layouts/BaseLayout";
import Report from "page/Report";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BaseLayout>
        <Report />
      </BaseLayout>
    </div>
  );
}

export default App;
