import React, { useState } from 'react';
import { Table, Card, Button, FormControl, InputGroup } from 'react-bootstrap';
import Pagination from './pagination';
export function TourComponent(props) {
  console.log(props);

  const [pageTours, setPageTours] = useState([]); // array of tours in a specific page (3 such tours)
  const [detailTour, setDetailTour] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 3;

  // Definition of the function called getPageTours
  // This will be executed inside paginate function
  const getPageTours = (allTours, startIndex, toursPerPage) => {
    const pageTours = [];
    for (let index = startIndex; index < startIndex + toursPerPage && index < allTours.length; index++) {
      const tour = allTours[index];
      pageTours.push(tour);
    }

    return pageTours;
  };

  // Definition of the function called paginate. Circular bracket optional if only one param
  // This is not executed here. This will be executed in the pagination component
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * toursPerPage;
    const tours = getPageTours(props.tours, startIndex, toursPerPage);
    setPageTours(tours);
  };

  if (props.tours && props.tours.length > 0 && pageTours.length === 0) {
    const tours = getPageTours(props.tours, 0, toursPerPage);
    setPageTours(tours);

    // paginate(1);
  }

  const handleAddNewTour = () => {};
  const handleDeleteTour = () => {};
  const handleEditTour = () => {};
  /*
    Use map function to build a dynamic JSX list of Card objects
    by transforming props.tours array
  */

//   const tourCards = pageTours.map((tour, index) => {
//     console.log('current item = ', tour);
//     const tourCard = (
//       <Card style={{ width: '100%' }} key={index}>
//         <Card.Img variant='top' src={tour.picture} />
//         <Card.Body>
//           <Card.Title>{tour.tourId}</Card.Title>
//           <Card.Text>{tour.name}</Card.Text>
//           {/* <Button variant='primary'>Learn More</Button>  */}
//           <Button
//             variant='primary'
//             onClick={() => {
//               setDetailTour(tour);
//             }}
//           >
//             Learn More
//           </Button>
//         </Card.Body>
//       </Card>
//     );
//     return tourCard;
//   });


  const rows = props.tours.map((tour, index) => {
    // console.log("current item = ", tour);
    const row = (
      <tr key={index}>
        <td>{tour.tourId}</td>
        <td>{tour.name}</td>
        <td><i className="mx-2 fa fa-trash" style={{color: "red"}} aria-hidden="true" onClick={() => {
              // handleDeleteTour(tour, index);
            }}
          ></i>
          <i className="mx-2 far fa-edit" style={{color: "blue"}} aria-hidden="true" onClick={() => {
              // handleEditTour(tour);
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
            <div className="col">Upcoming Tours</div>
            <div className="col">
              <button type="submit" className="btn btn-primary" onClick={handleAddNewTour}>
                <i className="fa fa-plus-circle" aria-hidden="true"></i> New Tour</button>
            </div>
          </div>
        </Card.Title>
        <Table striped bordered hover size="sm">
          <thead variant="primary"><tr><th>Tour ID</th><th>Tour Name</th></tr></thead>
          <tbody>{rows}</tbody>
        </Table>

        <Pagination toursPerPage={toursPerPage} totalTours={props.tours.length} paginate={paginate}></Pagination>

      </Card.Body>
    </Card>
  );



  /*
    detfragment will be the dynamically selected Card object
    when you click <Learn More> it will allocate that object to detfragment
  */

  const detfragment = (
    <Card style={{ width: '100%' }}>
      <Card.Img variant='top' src={detailTour.picture} />
      <Card.Body>
        <Card.Title>{detailTour.address}</Card.Title>
        <Card.Text>{detailTour.description}</Card.Text>
      </Card.Body>
    </Card>
  );

  return (
    <div className='container-fluid'>
      <div className='row no-gutters'>
        <div className='col-3'>{leftSide}</div>
        <div className='col-9'>{detfragment}</div>
      </div>
    </div>
  );
}
