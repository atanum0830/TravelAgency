import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Table, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { format } from 'date-fns';
import { Handler } from './handler';
import { TourRec } from '../model/all-classes';
import Pagination from './pagination';
import DependsList from './depends-list';
import model from '../model/model';

export function BookingComponent(props) {
    console.log(props);

    const [isNewRecord, setIsNewRecord] = useState(false); //true for add mode, false for update/edit mode
    const [pageRecords, setPageRecords] = useState([]); // array of records in a specific page (3 such records)
    const [detailRecord, setDetailRecord] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [collChanged, setCollChanged] = useState(false);
    const recordsPerPage = 3;
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
    
    const handleListAdd = (name, item, index) => {
        const handler = new Handler({name: name, item: item, index: index}, detailRecord, isNewRecord);
        const detail = handler.handleListAdd();
        setDetailRecord(detail);
    };

    const handleListDelete = (name, item, index) => {
        const handler = new Handler({name: name, item: item, index: index}, detailRecord, isNewRecord);
        const detail = handler.handleListDelete();
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
        // if (record === detailRecord) { setDetailRecord(props.records[0]); }
        props.remove(record);
        setCollChanged(true);
    };

    const handleReserveRecord = (record, index) => {

    }

    const handleShowRecord = (record, index) => {

    }

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
        const row = (model.user.isAdmin) ?
        <tr key={index}>
            <td>{format(record.bookingDate.toDate(), 'dd-MMM-yyyy')}</td>
            <td style={{maxWidth: "150px"}}>{record.bookingRefNo}</td>
            <td>
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
        :
        <tr key={index}>
            <td>{format(record.bookingDate.toDate(), 'dd-MMM-yyyy')}</td>
            <td style={{maxWidth: "150px"}}>{record.bookingRefNo}</td>
            <td>
                <OverlayTrigger placement="left" overlay={ <Tooltip id="tipDelete"><strong>Delete</strong> this booking</Tooltip> }>
                    <i className="mx-1 fa fa-trash">Delete</i>
                </OverlayTrigger>
                
                <OverlayTrigger placement="right" overlay={ <Tooltip id="tipReserve"><strong>Contact Us</strong> for help</Tooltip> }>
                    <i className="mx-1 fas fa-phone-square"></i>
                </OverlayTrigger>
            </td>
        </tr>
        ;
        return row;
    });

    const leftSide = (
        <Card>
            <Card.Body>
            <Card.Title>
                <div className="row">
                    <div className="col">Upcoming Tours</div>
                </div>
            </Card.Title>
            <Table striped bordered hover size="sm">
                <thead variant="primary">
                    <tr>
                        <th>Book Date</th>
                        <th>Booking Ref</th>
                        <th>
                            { (model.user.isAdmin) ?                          
                            <button type="submit" className="btn btn-primary btn-sm" onClick={handleAddNewRecord}>
                                <i className="fa fa-plus-circle" aria-hidden="true"></i> New Booking</button>: ''
                            }
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
                    <label for="inputRefNo">Booking Ref</label>
                    <input name="bookingRefNo" type="text" className="form-control" id="inputRefNo"
                        value={detailRecord.bookingRefNo ? detailRecord.bookingRefNo : ""} onChange={handleTextChange}></input>
                </div>
                <div className="form-group col-md-2">
                    <label for="inputCustomerId">Customer ID</label>
                    <input name="customerId" type="text" className="form-control" id="inputCustomerId"
                        value={detailRecord.customerId ? detailRecord.customerId : ""} onChange={handleTextChange}></input>
                </div>
                <div className="form-group col-md-2">
                    <label for="inputTourId">Tour ID</label>
                    <input name="tourId" type="text" className="form-control" id="inputTourId"
                        value={detailRecord.tourId ? detailRecord.tourId : ""} onChange={handleTextChange}></input>
                </div>
                <div className="form-group col-md-3">
                    <label for="InputBookingDate">Booking Date</label>
                    <DatePicker name="bookingDate" className="form-control" id="InputBookingDate" dateFormat="dd-MMM-yyyy"
                        selected={detailRecord.bookingDate ? detailRecord.bookingDate.toDate() : new Date()}
                        onChange={(date) => {handleDateChange(date, 'bookingDate')}}></DatePicker>
                </div>
                <div className="form-group col-md-3">
                    <label for="InputConfirmDate">Confirmation Date</label>
                    <DatePicker name="confirmDate" className="form-control" id="InputConfirmDate" dateFormat="dd-MMM-yyyy"
                        selected={detailRecord.confirmDate ? detailRecord.confirmDate.toDate() : new Date()}
                        onChange={(date) => {handleDateChange(date, 'confirmDate')}}></DatePicker>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-2">
                    <label for="inputBillAmount">Amount Billed</label>
                    <input name="billAmount" type="text" className="form-control" id="inputBillAmount"
                        value={detailRecord.billAmount ? detailRecord.billAmount : ""} onChange={handleTextChange}></input>
                </div>

                <div className="form-group col-md-2 mx-2">
                    <label for="inputStatus">Status</label>
                    <input name="status" type="text" className="form-control" id="inputStatus"
                        value={detailRecord.status ? detailRecord.status : ""} onChange={handleTextChange}></input>
                </div>

                <div className="form-check col-md-2 mx-2">
                    <input name="isPaid" type="checkbox" className="form-check-input px-0" id="inputIsPaid"
                        checked={detailRecord.isPaid ? detailRecord.isPaid : false} onChange={handleBooleanChange}></input>
                    <label className="form-check-label" for="inputIsPaid">Paid?</label>
                </div>

                <div className="form-group col-md-2 mx-2">
                    <label for="inputPaidAmount">Amount Paid</label>
                    <input name="paidAmount" type="text" className="form-control" id="inputPaidAmount"
                        value={detailRecord.paidAmount ? detailRecord.paidAmount : ""} onChange={handleTextChange}></input>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-2">
                    <label for="inputPaymentMode">Amount Billed</label>
                    <input name="paymentMode" type="text" className="form-control" id="inputPaymentMode"
                        value={detailRecord.paymentMode ? detailRecord.paymentMode : ""} onChange={handleTextChange}></input>
                </div>

                <div className="form-group col-md-2 mx-2">
                    <label for="inputPaymentRefNo">Mode</label>
                    <input name="paymentRefNo" type="text" className="form-control" id="inputPaymentRefNo"
                        value={detailRecord.paymentRefNo ? detailRecord.paymentRefNo : ""} onChange={handleTextChange}></input>
                </div>

                <div className="form-group col-md-2 mx-2">
                    <label for="inputCardType">Card Type</label>
                    <input name="cardType" type="text" className="form-control" id="inputCardType"
                        value={detailRecord.cardType ? detailRecord.cardType : ""} onChange={handleTextChange}></input>
                </div>

                <div className="form-group col-md-2">
                    <label for="inputCardExpDate">Expiry Date</label>
                    <DatePicker name="cardExpDate" className="form-control" id="inputCardExpDate" dateFormat="dd-MMM-yyyy"
                        selected={detailRecord.cardExpDate ? detailRecord.cardExpDate.toDate() : new Date()}
                        onChange={(date) => {handleDateChange(date, 'cardExpDate')}}></DatePicker>
                </div>
            </div>

            <div className="form-row">
                <div className="form-floating col-md-12">
                    <label for="inputNotes">Notes</label>
                    <textarea name="notes" class="form-control" style={{height: "100px"}} placeholder="Provide any notes" id="inputNotes"
                        value={detailRecord.notes ? detailRecord.notes : ""} onChange={handleTextChange}></textarea>
                </div>
            </div>

            <div className="form-row col-md-6">
                <DependsList name='places' id='inputPlaces' depRecs={props.depRecords} depIds={detailRecord.places}
                    addItem={handleListAdd} deleteItem={handleListDelete}></DependsList>
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
