import logo from "./logo.svg";
import "./App.css";
import TagView from "./components/TagView";
import { useState } from "react";

function App() {
  const [tree, setTree] = useState(initialTree);
  const [exportedString, setExportedString] = useState("");
  const handleUpdateTree = (updatedTree) => {
    setTree(updatedTree);
  };

  const data = (onAddChild) => {
    setTree(onAddChild);
  };
  const handleExport = () => {
    console.log(JSON.stringify(tree, null, 2));
    const jsonString = JSON.stringify(tree, null, 2);
    setExportedString(jsonString);
  };
  return (
    <div className="app">
      <TagView tag={tree} onUpdate={handleUpdateTree} onAddChild={data} />
      <button className="export-button" onClick={handleExport}>
        Export
      </button>
      <pre>{exportedString}</pre>
    </div>
  );
}

const initialTree = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" },
      ],
    },
    { name: "child2", data: "c2 World" },
  ],
};

export default App;
