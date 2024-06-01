import "./App.css";
import { FlowArea } from "./components/flowArea";
// import { Sidebar } from "./components/sidebar";

function App() {
  return (
    <div className="flex w-full h-full">
      <FlowArea></FlowArea>
      {/* <div id="divider" className="h-full bg-gray-400 w-px"></div> */}
      {/* <Sidebar></Sidebar> */}
    </div>
  );
}

export default App;
