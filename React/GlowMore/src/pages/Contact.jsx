import React from "react";

const Contact = () => {
  return (
    <>
      <div className="container my-5">
        <h2 className="text-primary mb-3">Contact Us</h2>

        <form className="col-md-6 shadow p-4 rounded">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Enter name" />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="3"></textarea>
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Contact;
