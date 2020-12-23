import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { BookingComponent } from './components/bookings';
import { CustomerComponent } from './components/customers';
import { HomeComponent } from './components/home';
import { NavBarComponent } from './components/navigation';
import { NoMatchComponent } from './components/no-match';
import { TourComponent } from './components/tours';


function App() {
  const tours = [];
  const bookings = [];
  const customers = [];
  return (
    <React.Fragment>
      <NavBarComponent></NavBarComponent>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/tours" render={(props) => <TourComponent tours={tours} />} />
          <Route path="/bookings" render={(props) => <BookingComponent bookings={bookings} />} />
          <Route path="/customers" render={(props) => <CustomerComponent customers={customers} />} />
{/* 
 */}          
          <Route component={NoMatchComponent} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
