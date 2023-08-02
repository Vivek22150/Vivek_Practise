import React, { Fragment } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector } from 'react-redux';


export default function Add() {

  const amount = useSelector((state) => state.amount);

    return(
        <Fragment>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">State bank of Vivek</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      
      </ul>
      <div>
        <button className="btn btn-primary">Your Balance : {amount}</button>
      </div>
    </div>
  </div>
</nav>

        </Fragment>
    )

}
