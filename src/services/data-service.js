
class DataService {
    // toursRef = firebase.firestore().collection('tours');
    // bookingsRef = firebase.firestore().collection('bookings');
    // customersRef = firebase.firestore().collection('customers');

    insertRecord(collRef, item) {
        collRef.add(item)
            .then((resp) => {
                console.log("insertRecord >>>> firestore inserted", item);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateRecord(collRef, item) {
        console.log("updateRecord >>>> updating Firestore", item);
        collRef.doc(item.id)
            .update(item.vo)
            .then((resp) => {
                console.log("updateRecord >>>> firestore updated; resetting vo", item);
                item.vo = {};
            })
            .catch((error) => {
                console.log(error);
            }); 
    }

    deleteRecord(collRef, item) {
        collRef.doc(item.id)
            .delete()
            .then((resp) => {
                console.log("deleteRecord >>>> firestore removed", item);
            })
            .catch((error) => {
                console.log(error);
            });
  
    }

    fetchSnapshotDocs(querySnapshot) {
        const items = [];

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            item.id = doc.id;
            item.vo = {};
            items.push(item);
        });

        return items;
    }

}

const dataService = new DataService();

export default dataService;
