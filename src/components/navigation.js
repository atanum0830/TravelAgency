import React from "react";
import NavDropdown from 'react-bootstrap/NavDropdown'

export function NavBarComponent() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid" style={{maxHeight: "30px"}}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="home"><i className="fas fa-crown"></i>Monarch Travels</a>
                {/* <img src="images/crown.jpg"/> */}
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <a className="nav-link active" aria-current="page" href="tours"><i className="fas fa-plane-departure"></i>Tours</a>
                        <a className="nav-link active" href="bookings"><i className="fa fa-address-card"></i>Bookings</a>
{/* 
                        <a className="nav-link disabled" href="home" tabIndex="-1" aria-disabled="true">Disabled</a>
 */}
                        <NavDropdown title="Admin" id="nav-admin">
                            <NavDropdown.Item eventKey="4.1" href="attractions"><i className="fas fa-archway"></i> Attractions</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.2" href="tours"><i className="fas fa-plane-departure"></i> Tours</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.3" href="customers"><i className="fas fa-user-friends"></i> Customers</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.4" href="bookings"><i className="fas fa-passport"></i> Bookings</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>

                <form className="d-flex">
                    <input className="form-control form-control-sm me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="mx-2 btn btn-sm btn-secondary" type="button">Search</button>
                </form>
                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                    <a className="nav-link active" href="contact"><i className="fas fa-phone-alt"></i>Contact Us</a>
                    <a className="nav-link active" href="login"><i className="fa fa-user"></i>Login</a>
                </div>
            </div>
        </nav>
    );
}