import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>

function Footer() {
  return (
    <div>
      <footer 
        className="bg-dark text-center text-white" 
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "120px"
        }}
      >
        {/* Grid container */}
        <div className="container p-4 pb-0" >
          {/* Section: Social media */}
        <section className="mb-4">
          {/* Facebook */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://facebook.com/"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          {/* Twitter */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://twitter.com/"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          {/* Google */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.google.com/"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          {/* Instagram */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.instagram.com/"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          {/* Linkedin */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://pt.linkedin.com/"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          {/* Github */}
          <div>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://github.com/DavidRamires911"
            role="button"
          > 
          
            <i className="fab fa-github"></i>
            <p>
David Correia
          </p>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://github.com/andrehcarvalho6"
            role="button"
          > 
            <i className="fab fa-github"></i>
            <p>
 André Carvalho
          </p>
          </a>
          </div>
          
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}

      <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
        </div>
      </footer>
      <div style={{ paddingBottom: "100px" }}></div>
    </div>
  );
}

export default Footer;