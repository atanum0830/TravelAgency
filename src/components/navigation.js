import React from "react";

export function NavBarComponent() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/">Monarch Travels</a>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <a className="nav-link active" aria-current="page" href="home">Home</a>
                        <a className="nav-link" href="tours">Tours</a>
                        <a className="nav-link" href="bookings">Bookings</a>
                        <a className="nav-link" href="customers">Customers</a>
                        <a className="nav-link disabled" href="home" tabindex="-1" aria-disabled="true">Disabled</a>
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="home">
                            Dropdown link
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <div><a className="dropdown-item" href="tours">Tours</a></div>
                                <div><a className="dropdown-item" href="bookings">Bookings</a></div>
                                <div><a className="dropdown-item" href="customers">Customers</a></div>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-sm btn-secondary" type="button">Search</button>
                </form>
                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                    <a className="nav-link active" href="contact">Contact Us</a>
                    <a className="nav-link btn btn-sm btn-secondary" href="login">Login</a>
                </div>
            </div>
        </nav>
    );
}