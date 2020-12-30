import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './services/firebase';
import dataService from './services/data-service';
import { AttractionComponent } from './components/attractions';
import { BookingComponent } from './components/bookings';
import { CustomerComponent } from './components/customers';
import { HomeComponent } from './components/home';
import { NavBarComponent } from './components/navigation';
import { NoMatchComponent } from './components/no-match';
import { TourComponent } from './components/tours';
import { TourRec } from './model/all-classes';

function App() {
  const toursRef = firebase.firestore().collection('tours');
  const bookingsRef = firebase.firestore().collection('bookings');
  const customersRef = firebase.firestore().collection('customers');
  const attractionsRef = firebase.firestore().collection('attractions');

  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [attractions, setAttractions] = useState([]);

  const [loadedTours, setLoadedTours] = useState(false);
  const [loadedBookings, setLoadedBookings] = useState(false);
  const [loadedAttractions, setLoadedAttractions] = useState(false);
  const [loadedCustomers, setLoadedCustomers] = useState(false);

  // update={updateAttraction} remove={removeAttraction} add={addAttraction} />

  const updateAttraction = (attraction) => {
    setLoadedAttractions(false);
    dataService.updateRecord(attractionsRef, attraction);
  }

  const removeAttraction = (attraction) => {
    setLoadedAttractions(false);
    dataService.deleteRecord(attractionsRef, attraction);
  }

  const addAttraction = (attraction) => {
    setLoadedAttractions(false);
    dataService.insertRecord(attractionsRef, attraction);
  }

  const updateTour = (tour) => {
    setLoadedTours(false);
    dataService.updateRecord(toursRef, tour);
  };

  const removeTour = (tour) => {
    setLoadedTours(false);
    dataService.deleteRecord(toursRef, tour);
  };

  const addTour = (tour) => {
    setLoadedTours(false);
    dataService.insertRecord(toursRef, tour);
  };

  const loadTours = () => {
    console.log('loadTours called');
    toursRef.orderBy('startDate').onSnapshot((querySnapshot) => {
      const documents = dataService.fetchSnapshotDocs(querySnapshot);
      const tours = documents.map(document => new TourRec(document));
      setTours(tours);
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

  const loadAttractions = () => {
    attractionsRef.orderBy('name').onSnapshot((querySnapshot) => {
      const documents = dataService.fetchSnapshotDocs(querySnapshot);
      setAttractions(documents);
      setLoadedAttractions(true);
    });
  }

  useEffect(() => {
    loadAttractions();
    loadTours();
    loadBookings();
    // loadCustomers();
  }, []);

  return (
    <Fragment>
      <NavBarComponent></NavBarComponent>
      <Router>
        <Switch>
          <Route exact path='/' component={HomeComponent} />
          <Route path='/attractions' render={(props) => (
              <AttractionComponent records={attractions} loaded={loadedAttractions} 
                update={updateAttraction} remove={removeAttraction} add={addAttraction} />
            )} />
          <Route path='/tours' render={(props) => (
              <TourComponent records={tours} loaded={loadedTours} depRecords={attractions}
                update={updateTour} remove={removeTour} add={addTour} />
            )} />
          <Route path='/bookings' render={(props) => <BookingComponent bookings={bookings} loaded={loadedBookings}/>} />
          <Route path='/customers' render={(props) => <CustomerComponent customers={customers} />} />
          <Route component={NoMatchComponent} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
