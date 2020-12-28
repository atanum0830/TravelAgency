import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './services/firebase';
import dataService from './services/data-service';
import { BookingComponent } from './components/bookings';
import { CustomerComponent } from './components/customers';
import { HomeComponent } from './components/home';
import { NavBarComponent } from './components/navigation';
import { NoMatchComponent } from './components/no-match';
import { TourComponent } from './components/tours';

function App() {
  const toursRef = firebase.firestore().collection('tours');
  const bookingsRef = firebase.firestore().collection('bookings');
  const customersRef = firebase.firestore().collection('customers');

  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loadedTours, setLoadedTours] = useState(false);
  const [loadedBookings, setLoadedBookings] = useState(false);

  const loadTours = () => {
    console.log('loadTours called');
    toursRef.onSnapshot((querySnapshot) => {
      const documents = dataService.fetchSnapshotDocs(querySnapshot);
      setTours(documents);
      setLoadedTours(true);
    });
  }

  const loadBookings = () => {
    bookingsRef.onSnapshot((querySnapshot) => {
      const documents = dataService.fetchSnapshotDocs(querySnapshot);
      setBookings(documents);
      setLoadedBookings(true);
    });
  }

  const loadCustomers = () => {
    customersRef.onSnapshot((querySnapshot) => {
      const documents = dataService.fetchSnapshotDocs(querySnapshot);
      setCustomers(documents);
    });
  }

  useEffect(() => {
    loadTours();
    loadBookings();
    // loadCustomers();
  }, []);

  return (
    <React.Fragment>
      <NavBarComponent></NavBarComponent>
      <Router>
        <Switch>
          <Route exact path='/' component={HomeComponent} />
          <Route path='/tours' render={(props) => <TourComponent records={tours} loaded={loadedTours} />} />
          <Route path='/bookings' render={(props) => <BookingComponent bookings={bookings} loaded={loadedBookings}/>} />
          <Route path='/customers' render={(props) => <CustomerComponent customers={customers} />} />
          <Route component={NoMatchComponent} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
