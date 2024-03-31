import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6">
            <p>Get connected with us on social networks:</p>
          </div>
          <div className="col-lg-6">
            <ul className="list-unstyled">
              <li>
                <a href="#!">Facebook</a>
              </li>
              <li>
                <a href="#!">Twitter</a>
              </li>
              <li>
                <a href="#!">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3">
        Company name © 2024
      </div>
    </footer>
  );
};

export default Footer;
