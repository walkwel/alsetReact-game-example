import React from "react";
import { Link } from "react-router-dom";
const App = () => (
  <div>
    <ul>
      <Link to = '/example1'>
        <li>
          <p>Example1 </p>
        </li>
      </Link>
      <Link to = "/example2" >
        <li>
          <p>Example2 </p>
        </li>
      </Link>      
    </ul>
  </div>
);
export default App;

