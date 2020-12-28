class Handler {
    #record;
    #event;
    constructor(event, record) {
        this.#event = event;
        this.#record = record;
    }

    handleTextChange() {
        const { name, value } = this.#event.target;
        this.#record[name] = value;
        if (!isNewRecord) {
          const vo = this.#record.vo;
          vo[name] = value;
        }
    
        console.log("handletextChange >>>>>", e, name, value, this.#record);
    }
}