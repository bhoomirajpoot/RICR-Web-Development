import React from "react";

const About = () => {
  return (
    <>
      <div className="container my-5">
        <h2 className="text-primary mb-3">About Us</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde vero officia quae consequuntur dolor. Explicabo quibusdam dolores molestias, aperiam quas alias amet neque blanditiis doloribus voluptates enim aspernatur. Sint, vel!
        </p>

        <ul className="list-group mt-3">
          <li className="list-group-item">React Components</li>
          <li className="list-group-item">React Router DOM</li>
          <li className="list-group-item">Bootstrap Styling</li>
        </ul>

        <p className="mt-3">
          Created by <strong>Bhoomi</strong> as a learning project 🚀
        </p>
      </div>
    </>
  );
};

export default About;
