import './App.css';
import React from 'react';

import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import AddPhaseComponent from './components/AddPhaseComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListPhaseComponent from './components/ListPhaseComponent';
import ListSeanceComponent from './components/ListSeanceComponent';
import AddSeanceComponent from './components/AddSeanceComponent';
import HomeComponent from './components/HomeComponent';
import ListPlanningComponent from './components/ListPlanningComponent';
import AddPlanningComponent from './components/AddPlanningComponent';



function App() {
  return (
    
    <div>
      <Router>
       
       <HeaderComponent/>
         <div className="container">
           <Switch>
            <Route path="/" exact component ={HomeComponent} ></Route>
           
            <Route path="/phases" component ={ListPhaseComponent} ></Route>
            <Route path="/AddPhase/:id" component ={AddPhaseComponent} ></Route>
            <Route path="/seances" component ={ListSeanceComponent} ></Route>
            <Route path="/AddSeance/:id" component ={AddSeanceComponent} ></Route>
            <Route path="/plannings" component ={ListPlanningComponent} ></Route>
            <Route path="/AddPlanning/:id" component ={AddPlanningComponent} ></Route>

           </Switch>
         </div>
       <FooterComponent/>
     
   </Router>
    </div>
  );
}


export default App;
