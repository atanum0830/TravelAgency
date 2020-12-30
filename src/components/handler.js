import { TourRec } from '../model/all-classes';
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

    handleBooleanChange() {
        const { name, checked } = this.#event.target;
        this.#record[name] = checked;
        console.log("After BooleanChange >>>>>", name, checked, this.#record);
        if (!this.#isNew) {
            const vo = this.#record.vo;
            vo[name] = checked;
        }

        return this.#record;
    };

    handleDateChange() {
        const { name, date } = this.#event;
        const ts = TourRec.fromDateToTimeStamp(date);
        this.#record[name] = ts;
        console.log("After BooleanChange >>>>>", name, ts, this.#record);
        if (!this.#isNew) {
            const vo = this.#record.vo;
            vo[name] = ts;
        }

        return this.#record;
    }

    handleListAdd() {
        const { name, item, index } = this.#event;
        const list = this.#record[name];
        list.push(item.id);
        this.#record[name] = list;
        console.log("After handleListAdd >>>>>", name, item, this.#record);
        if (!this.#isNew) {
            const vo = this.#record.vo;
            vo[name] = list;
        }

        return this.#record;
    }

    handleListDelete() {
        const { name, item, index } = this.#event;
        const list = this.#record[name];
        list.splice(index, 1);
        this.#record[name] = list;
        console.log("After handleListDelete >>>>>", name, item, this.#record);
        if (!this.#isNew) {
            const vo = this.#record.vo;
            vo[name] = list;
        }

        return this.#record;
    }

    static isEmpty(rec) {
        const isEmpty =  (!rec || Object.keys(rec).length === 0);
        return isEmpty;
    }
}