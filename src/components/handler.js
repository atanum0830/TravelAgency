import firebase from '../services/firebase';
export class Handler {
    #record;
    #event;
    #isNew;
    constructor(event, record, isNew) {
        this.#event = event;
        this.#record = {...record};
        this.#isNew = isNew;
    }

    handleTextChange() {
        const { name, value } = this.#event.target;
        this.#record[name] = value;
        console.log("handletextChange >>>>>", this.#event, name, value, this.#record);
        if (!this.#isNew) {
          const vo = this.#record.vo;
          vo[name] = value;
        }

        return this.#record;
    }

    static createNewTourRec() {
        const item = {
            name: '',
            startDate: firebase.firestore.Timestamp.fromDate(new Date()),
            endDate: firebase.firestore.Timestamp.fromDate(new Date()),
            mealPlan: true,
            hotel: true,
            groupTour: true,
            conducted: true
        };

        
        return item;
    }
}