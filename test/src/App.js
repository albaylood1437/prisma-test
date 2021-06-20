import "./App.css";
import Header from "./components/header";
import SignUp from "./components/register";
import Grid from "@material-ui/core/Grid";
import BasicTable from "./components/table";

function App() {
  return (
    <div className="App">
      <Header />
      <BasicTable />
    </div>
  );
}

export default App;
