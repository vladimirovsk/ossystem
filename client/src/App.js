import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./component/Home/Home"
import './App.css';

function App() {
     let myRoute = (
         <BrowserRouter>
         <Switch>
             <Route exact={true} path="/" render={()=><Home />}/>
         </Switch>
         </BrowserRouter>
     )

    return (
        <div className="App">
                {myRoute}
        </div>
    )
}

export default App;
