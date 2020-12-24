import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './services/firebase';
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

  const toursRef = firebase.firestore().collection('tours');
  // const tenantRef = firebase.firestore().collection('tenants');

  useEffect(() => {
    toursRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        item.id = doc.id;
        items.push(item);
      });
    });

  });

  return (
    <React.Fragment>
      <NavBarComponent></NavBarComponent>
      <Router>
        <Switch>
          <Route exact path='/' component={HomeComponent} />
          <Route path='/tours' render={(props) => <TourComponent tours={tours} />} />
          <Route path='/bookings' render={(props) => <BookingComponent bookings={bookings} />} />
          <Route path='/customers' render={(props) => <CustomerComponent customers={customers} />} />
          <Route component={NoMatchComponent} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
