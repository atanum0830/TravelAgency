import React, { useEffect, useState } from 'react';
import firebase from './firebase';

class DataService {
    toursRef = firebase.firestore().collection('tours');
    bookingsRef = firebase.firestore().collection('bookings');
    customersRef = firebase.firestore().collection('customers');
    tours = [];
    bookings = [];
    customers = [];

    getAllTours() {
        this.getAllDocuments(this.toursRef, this.tours);
    }

    getAllBookings() {
        this.getAllDocuments(this.bookingsRef, this.bookings);
    }

    getAllCustomers() {
        this.getAllDocuments(this.customersRef, this.customers);
    }

    getAllDocuments(collRef, documents) {
        const items = [];

        const xthis = this;

        collRef.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const item = doc.data();
              item.id = doc.id;
              items.push(item);
            });

            documents = [...items];
        });

        // return items;
    }

    fetchSnapshotDocs(querySnapshot) {
        const items = [];

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            item.id = doc.id;
            items.push(item);
        });

        return items;
    }

}

const dataService = new DataService();

export default dataService;
