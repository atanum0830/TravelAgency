import firebase from '../services/firebase';

export class TourRec {
    constructor(rec) {
        // this.id = rec?.id;
        this.name = rec.hasOwnProperty('name')? rec.name: '';
        this.startDate = rec.hasOwnProperty('startDate')? rec.startDate: TourRec.fromNowToTimeStamp();
        this.endDate = rec.hasOwnProperty('endDate')? rec.endDate: TourRec.fromNowToTimeStamp();
        this.mealPlan = rec.hasOwnProperty('mealPlan')? rec.mealPlan: true;
        this.hotel = rec.hasOwnProperty('hotel')? rec.hotel: true;
        this.groupTour = rec.hasOwnProperty('groupTour')? rec.groupTour: true;
        this.conducted = rec.hasOwnProperty('conducted')? rec.conducted: true;
        // this.vo = rec?.vo;
        if (rec.hasOwnProperty('id')) {
            this['id'] = rec.id;
        }
    }
    // id;
    name;
    startDate;
    endDate;
    mealPlan;
    hotel;
    groupTour;
    conducted;
    vo = {};

    static fromNowToTimeStamp() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const ts = firebase.firestore.Timestamp.fromDate(date);
        return ts;
    }
}