import "../css/app.css";
import { Link } from "react-router-dom";
function App() {
  return (
    <div className="container2">
      <div className="title">Noty</div>
      <div className="sub">
        A simple note taking app for all your quick needs.
      </div>
      <Link to="/notes">
        <button className="start">Get started</button>
      </Link>
      <div className="data">0 notes created !</div>
      <div className="footer">
        A Sample Test Project for KwameAI&reg; 2022&copy;
      </div>
    </div>
  );
}

export default App;
