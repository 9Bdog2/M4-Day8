import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MovieDetails from "./components/MovieDetails";


const App = () => (
  <Router>
    <Route exact path="/" component={HomePage}/>
    <Route exact path="/details/:movieID" component={MovieDetails}/>

  </Router>

)

export default App;
