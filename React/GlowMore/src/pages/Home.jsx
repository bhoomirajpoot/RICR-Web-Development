import React from "react";

const Home = () => {
  return (
    <>
      <div className="container my-5">
        <div className="text-center">
          <h1 className="mb-3 text-primary">Welcome to My Website</h1>
          <p className="lead">
            This is my first React application using React Router and Bootstrap.
          </p>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card shadow p-3">
              <h5>Fast</h5>
              <p>React provides fast rendering using Virtual DOM.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3">
              <h5>Reusable</h5>
              <p>Components can be reused across the application.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3">
              <h5>Modern UI</h5>
              <p>Bootstrap helps in creating responsive layouts.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
