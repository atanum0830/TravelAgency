import firebase from '../services/firebase';

export class TourRec {
    constructor(rec) {
        this.name = rec.hasOwnProperty('name')? rec.name: '';
        this.startDate = rec.hasOwnProperty('startDate')? rec.startDate: TourRec.fromNowToTimeStamp();
        this.endDate = rec.hasOwnProperty('endDate')? rec.endDate: TourRec.fromNowToTimeStamp();
        this.mealIncluded = rec.hasOwnProperty('mealIncluded')? rec.mealIncluded: true;
        this.hotelIncluded = rec.hasOwnProperty('hotelIncluded')? rec.hotelIncluded: true;
        this.isPrivate = rec.hasOwnProperty('isPrivate')? rec.isPrivate: true;
        this.conducted = rec.hasOwnProperty('conducted')? rec.conducted: true;
        this.places = rec.hasOwnProperty('places')? rec.places: [];
        if (rec.hasOwnProperty('id')) { this.id = rec.id; }
        if (rec.hasOwnProperty('vo')) { this.vo = rec.vo; }
    }

    name;
    startDate;
    endDate;
    mealIncluded;
    hotelIncluded;
    isPrivate;
    conducted;
    places;

    static fromNowToTimeStamp() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const ts = firebase.firestore.Timestamp.fromDate(date);
        return ts;
    }

    static fromDateToTimeStamp(date) {
        date.setHours(0, 0, 0, 0);
        const ts = firebase.firestore.Timestamp.fromDate(date);
        return ts;
    }

}