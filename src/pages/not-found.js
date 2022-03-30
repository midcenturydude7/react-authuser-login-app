import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h2>Sorry, this page isn't available</h2>
      <p>The link you followed may be broken, or the page may have been removed. <Link to="/"><span>Return to the home page</span></Link></p>
    </>
  );
}

export default NotFoundPage;