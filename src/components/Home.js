import React from "react";

import Landing from "./smallComponents/partials/Landing";
import Footer from "./smallComponents/partials/Footer";

// Simpele stateless component van de Home pagina
// Evt de Footer verplaatsen
const Home = () => (
  <div>
    <Landing />
    <Footer />
  </div>
);

export default Home;
