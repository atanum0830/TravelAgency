import React, { useState } from 'react';
import { Table, Card, Button, FormControl, InputGroup } from 'react-bootstrap';
import Pagination from './pagination';

export function TourComponent(props) {
    console.log(props);

    const [pageRecords, setPageRecords] = useState([]); // array of records in a specific page (3 such records)
    const [detailRecord, setDetailRecord] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;

    // Definition of the function called getPageRecords
    // This will be executed inside paginate function
    const getPageRecords = (allRecords, startIndex, recordsPerPage) => {
        const pageRecords = [];
        for (let index = startIndex; index < startIndex + recordsPerPage && index < allRecords.length; index++) {
            const record = allRecords[index];
            pageRecords.push(record);
        }

        return pageRecords;
    };

    // Definition of the function called paginate. Circular bracket optional if only one param
    // This is not executed here. This will be executed in the pagination component
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * recordsPerPage;
        const records = getPageRecords(props.records, startIndex, recordsPerPage);
        setPageRecords(records);
    };

    if (props.records && props.records.length > 0 && pageRecords.length === 0) {
        const records = getPageRecords(props.records, 0, recordsPerPage);
        setPageRecords(records);
        // paginate(1);
    }

    const handleAddNewRecord = () => {};
    const handleDeleteRecord = () => {};
    const handleEditRecord = () => {};

    /*
    ** Use map function to build a dynamic JSX list of Card objects
    ** by transforming props.records array
    */

    const rows = props.records.map((record, index) => {
        const row = (
        <tr key={index}>
            <td>{record.tourId}</td>
            <td>{record.name}</td>
            <td>
                <i className="mx-2 fas fa-binoculars" style={{color: "MediumBlue"}} aria-hidden="true" onClick={() => {
                    handleEditRecord(record);
                }}></i>
                <i className="mx-2 far fa-edit" style={{color: "Blue"}} aria-hidden="true" onClick={() => {
                    handleEditRecord(record);
                }}></i>
                <i className="mx-2 fa fa-trash" style={{color: "Red"}} aria-hidden="true" onClick={() => {
                    handleDeleteRecord(record, index);
                }}></i>
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
                    <div className="col">Upcoming Tours</div>
                </div>
            </Card.Title>
            <Table striped bordered hover size="sm">
                <thead variant="primary">
                    <tr>
                        <th>Tour ID</th>
                        <th>Tour Name</th>
                        <th>
                            <button type="submit" className="btn btn-primary btn-sm" onClick={handleAddNewRecord}>
                                <i className="fa fa-plus-circle" aria-hidden="true"></i> New Tour</button>
                        </th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>

            <Pagination recordsPerPage={recordsPerPage} totalRecords={props.records.length} paginate={paginate}></Pagination>

            </Card.Body>
        </Card>
    );

    /*
    detfragment will be the dynamically selected Card object
    when you click <Learn More> it will allocate that object to detfragment
    */
    const detfragment = (
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>{detailRecord.name}</Card.Title>
                <Card.Text>{detailRecord.description}</Card.Text>
            </Card.Body>
        </Card>
    );

    return (
        <div className='container-fluid'>
            <div className='row no-gutters'>
            <div className='col-4'>{leftSide}</div>
            <div className='col-8'>{detfragment}</div>
            </div>
        </div>
    );
}
