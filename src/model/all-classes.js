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

export class UserType {
    static get ADMIN() {
        return 'ADMIN';
    }

    static get CUSTOMER() {
        return 'CUSTOMER';
    }

    static get EMPLOYEE() {
        return 'EMPLOYEE';
    }
}

export class Gender {
    static get MALE() {
        return 'MALE';
    }

    static get FEMALE() {
        return 'FEMALE';
    }
}

export class AgeGroup {
    static get CHILD() {
        return 'CHILD';
    }

    static get ADULT() {
        return 'ADULT';
    }

    static get SENIOR() {
        return 'SENIOR';
    }
}

export class User {
    constructor(rec) {
        this.userId = rec.hasOwnProperty('userId') ? rec.userId : undefined;
        this.loginId = rec.hasOwnProperty('loginId') ? rec.loginId : undefined;
        this.firstName = rec.hasOwnProperty('firstName') ? rec.firstName : undefined;
        this.lastName = rec.hasOwnProperty('lastName') ? rec.lastName : undefined;
        this.email = rec.hasOwnProperty('email') ? rec.email : undefined;
        this.mobileNo = rec.hasOwnProperty('mobileNo') ? rec.mobileNo : undefined;
        this.address = rec.hasOwnProperty('address') ? rec.address : undefined;
        this.gender = rec.hasOwnProperty('gender') ? rec.gender : undefined;
        this.ageGroup = rec.hasOwnProperty('ageGroup') ? rec.ageGroup : undefined;
        this.birthDate = rec.hasOwnProperty('birthDate') ? rec.birthDate : undefined;
        this.userType = rec.hasOwnProperty('userType') ? rec.userType : undefined;
    }

    userId;
    loginId;
    firstName;
    lastName;
    email;
    mobileNo;
    address;
    gender;
    ageGroup;
    birthDate;
    userType;

    get isAdmin() {
        return this.userType === UserType.ADMIN;
    }
    get isCustomer() {
        return this.userType === UserType.CUSTOMER;
    }

    get isChild() {
        return this.ageGroup === AgeGroup.CHILD;
    }

    get isAdult() {
        return this.ageGroup === AgeGroup.ADULT;
    }

    get isFemale() {
        return this.gender === Gender.FEMALE;
    }

    get isMale() {
        return this.gender === Gender.MALE;
    }
}