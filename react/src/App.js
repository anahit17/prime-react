import "./App.scss";
import Router from "./router";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";     
import "primeicons/primeicons.css"; 
import './DialogDemo.scss'
import './FormDemo.scss'

function App() {

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
