import './App.css'
import {WebRTCProvider} from "./WebRTCContext.jsx";
import {TrackerStateProvider} from "./TrackerStateContext.jsx";
import Layout from "./Layout.jsx";

function App() {
  return (
    <WebRTCProvider>
      <TrackerStateProvider>
        <Layout/>
      </TrackerStateProvider>
    </WebRTCProvider>
  )
}

export default App
