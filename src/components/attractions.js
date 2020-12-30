import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Table, Card, Button, FormControl, InputGroup } from 'react-bootstrap';
import { format } from 'date-fns';
import { Handler } from './handler';
import { TourRec } from '../model/all-classes';
import Pagination from './pagination';

export function AttractionComponent(props) {
    console.log(props);

    const [isNewRecord, setIsNewRecord] = useState(false); //true for add mode, false for update/edit mode
    const [pageRecords, setPageRecords] = useState([]); // array of records in a specific page (3 such records)
    const [detailRecord, setDetailRecord] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [collChanged, setCollChanged] = useState(false);
    const recordsPerPage = 10;
    const isEmpty = (o) => !o || Object.keys(o).length === 0;

    /**
     * Generic Event handler for any Text field change
     */
    const handleTextChange = (event) => {
        const handler = new Handler(event, detailRecord, isNewRecord);
        const detail = handler.handleTextChange();
        setDetailRecord(detail);
    };

    /**
     * Generic Event handler for any Boolean field change
     */
    const handleBooleanChange = (event) => {
        const handler = new Handler(event, detailRecord, isNewRecord);
        const detail = handler.handleBooleanChange();
        setDetailRecord(detail);
    };

    /**
     * Generic Event handler for any Date field change
     */
    const handleDateChange = (date, name) => {
        const handler = new Handler({name: name, date: date}, detailRecord, isNewRecord);
        const detail = handler.handleDateChange();
        setDetailRecord(detail);
    };
    
    /**
     * Edit Tenant Event handler
     */
    const handleEditRecord = (record) => {
        console.log("handleEditRecord >>>>>", record);
        setDetailRecord(record);
        setIsNewRecord(false);
    };

    /**
     * Add a New Tenant Event handler
     */
    const handleAddNewRecord = () => {
        setIsNewRecord(true);
        const detail = new TourRec({});
        setDetailRecord(detail);
    };

    /**
     * Delete Tenant Event handler
     */
    const handleDeleteRecord = (record, index) => {
        props.remove(record);
        setCollChanged(true);
    };

    /**
     * SAVE/SUBMIT button Event handler
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNewRecord) {
            props.add(detailRecord);
            setCollChanged(true);
        } else {
            props.update(detailRecord);
            setCollChanged(true);
        }
    };

    // Definition of the function called getPageRecords
    // This will be executed inside paginate function
    const getPageRecords = (allRecords, startIndex, recordsPerPage) => {
        const records = [];
        for (let index = startIndex; index < startIndex + recordsPerPage && index < allRecords.length; index++) {
            const record = allRecords[index];
            records.push(record);
        }

        return records;
    };

    // Definition of the function called paginate. Circular bracket optional if only one param
    // This is not executed here. This will be executed in the pagination component
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * recordsPerPage;
        const records = getPageRecords(props.records, startIndex, recordsPerPage);
        setPageRecords(records);
        setDetailRecord(records[0]);
    };

    if (isEmpty(detailRecord) && props.loaded) {
        console.log("Initialized Tenants Component");
        setDetailRecord(props.records[0]);
    }
    
    if (props.records && props.records.length > 0 && pageRecords.length === 0) {
        paginate(1);
    }

    if (collChanged && props.loaded) {
        paginate(currentPage);
        setCollChanged(false);
    }
    /*
    ** Use map function to build a dynamic JSX list of Card objects
    ** by transforming props.records array
    */
    const rows = pageRecords.map((record, index) => {
        const row = (
        <tr key={index}>
            <td style={{maxWidth: "100px"}}>{record.name}</td>
            <td>
                <i className="mx-2 fas fa-binoculars" style={{color: "MediumBlue"}} aria-hidden="true" 
                    onClick={() => {
                        handleEditRecord(record);
                    }}
                ></i>
                <i className="mx-2 far fa-edit" style={{color: "Indigo"}} aria-hidden="true"
                    onClick={() => {
                        handleEditRecord(record);
                    }}
                ></i>
                <i className="mx-2 fa fa-trash" style={{color: "Red"}} aria-hidden="true"
                    onClick={() => {
                        handleDeleteRecord(record, index);
                    }}
                ></i>
            </td>
        </tr>
        );
        return row;
    });

    const leftSide = (
        <Card>
            <Card.Body>
            <Card.Title>
                <div className="row">
                    <div className="col">Places We Visit</div>
                </div>
            </Card.Title>
            <Table striped bordered hover size="sm">
                <thead variant="primary">
                    <tr>
                        <th>Place/Attractions</th>
                        <th>
                            <button type="submit" className="btn btn-primary btn-sm" onClick={handleAddNewRecord}>
                                <i className="fa fa-plus-circle" aria-hidden="true"></i> New Place</button>
                        </th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>

            <Pagination itemsPerPage={recordsPerPage} totalItems={props.records.length}
                curPageNo={currentPage} paginate={paginate}></Pagination>

            </Card.Body>
        </Card>
    );

    /*
    rightSide will be the dynamically selected Card object
    when you click <Learn More> it will allocate that object to rightSide
    */

    const rightSide = (
        <form>
            <div className="form-row">
                <div className="form-group col-md-2">
                    <label for="inputName">Name</label>
                    <input name="name" type="text" className="form-control" id="inputName"
                        value={detailRecord.name ? detailRecord.name : ""} onChange={handleTextChange}></input>
                </div>
                <div className="form-group col-md-2">
                    <label for="inputLatitude">Latitude</label>
                    <input name="latitude" type="text" className="form-control" id="inputLatitude"
                        value={detailRecord.latitude ? detailRecord.latitude : ""} onChange={handleTextChange}></input>
                </div>

                <div className="form-group col-md-2">
                    <label for="inputLongitude">Longitude</label>
                    <input name="longitude" type="text" className="form-control" id="inputLongitude"
                        value={detailRecord.longitude ? detailRecord.longitude : ""} onChange={handleTextChange}></input>
                </div>

                <div className="form-group col-md-2">
                    <label for="inputAirport">Airport</label>
                    <input name="airport" type="text" className="form-control" id="inputAirport"
                        value={detailRecord.airport ? detailRecord.airport : ""} onChange={handleTextChange}></input>
                </div>

                <div className="form-group col-md-2">
                    <label for="inputStation">Station</label>
                    <input name="station" type="text" className="form-control" id="inputStation"
                        value={detailRecord.station ? detailRecord.station : ""} onChange={handleTextChange}></input>
                </div>
            </div>

            <div className="form-row">


                <div className="form-floating col-md-12">
{/* 
                    <input name="description" type="text" className="form-control" id="inputDescription"
                        value={detailRecord.description ? detailRecord.description : ""} onChange={handleTextChange}></input>
 */}
                    <label for="inputDescription">Attraction Highlights</label>
                    <textarea name="description" class="form-control" style={{height: "100px"}} placeholder="Provide details of the attraction" id="inputDescription"
                        value={detailRecord.description ? detailRecord.description : ""} onChange={handleTextChange}></textarea>
                </div>
            </div>

            <div className="col shadow col-md-3 mb-5 bg-white rounded">
                <div className="form-group col-md-3">
                    <input name="mountain" type="checkbox" className="form-check-input px-0" id="inputMountain"
                        checked={detailRecord.mountain ? detailRecord.mountain : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputMountain">Mountain/Hiking</label>
                </div>

                <div className="form-group col-md-3">
                    <input name="city" type="checkbox" className="form-check-input px-0" id="inputCity"
                        checked={detailRecord.city ? detailRecord.city : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputCity">Important/City/Capital</label>
                </div>

                <div className="form-group col-md-3">
                    <input name="palace" type="checkbox" className="form-check-input px-0" id="inputPalace"
                        checked={detailRecord.palace ? detailRecord.palace : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputPalace">Palace/Castles/Fort</label>
                </div>

                <div className="form-group col-md-3">
                    <input name="beach" type="checkbox" className="form-check-input px-0" id="inputBeach"
                        checked={detailRecord.beach ? detailRecord.beach : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputBeach">Sea/Ocean/Beach</label>
                </div>

                <div className="form-group col-md-3">
                    <input name="river" type="checkbox" className="form-check-input px-0" id="inputRiver"
                        checked={detailRecord.river ? detailRecord.river : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputRiver">River/Lake/Water</label>
                </div>

                <div className="form-group col-md-3">
                    <input name="nature" type="checkbox" className="form-check-input px-0" id="inputNature"
                        checked={detailRecord.nature ? detailRecord.nature : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputNature">Nature/Park/Forest</label>
                </div>

                <div className="form-group col-md-3">
                    <input name="desert" type="checkbox" className="form-check-input px-0" id="inputDesert"
                        checked={detailRecord.desert ? detailRecord.desert : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputDesert">Desert/Sand/Dunes</label>
                </div>

                <div className="form-group col-md-3">
                    <input name="sports" type="checkbox" className="form-check-input px-0" id="inputSports"
                        checked={detailRecord.sports ? detailRecord.sports : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputSports">Sports/Recreation/Fun</label>
                </div>

                <div className="form-group col-md-3">
                    <input name="religious" type="checkbox" className="form-check-input px-0" id="inputReligious"
                        checked={detailRecord.religious ? detailRecord.religious : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputReligious">Religious/Pilgrimmage</label>
                </div>

                <div className="form-group col-md-3">
                    <input name="shops" type="checkbox" className="form-check-input px-0" id="inputSports"
                        checked={detailRecord.shops ? detailRecord.shops : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputSports">Shopping/Outlets/Malls</label>
                </div>
            </div>


            <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </form>
      );
    
    return (
        <div className='container-fluid'>
            <div className='row no-gutters'>
                <div className='col-4 no-gutters'>{leftSide}</div>
                <div className='col-8 no-gutters'>{rightSide}</div>
            </div>
        </div>
    );
}
