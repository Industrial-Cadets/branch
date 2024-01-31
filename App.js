import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MazeProvider } from './MazeContext'; // Import MazeProvider
import HomePage from './Components/HomePage'; // Import HomePage
import MazeHomePage from './Components/MazeHomePage'; // Correct naming convention
import Page1 from './Components/Page1';
import Page2 from './Components/Page2';
import Page3 from './Components/Page3'; 
import Page4 from './Components/Page4';
import Page5 from './Components/Page5';

function App() {
  return (
    <Router>
      <MazeProvider> {/* Wrap Routes with MazeProvider */}
        <Routes>
          <Route path="/" exact element={<HomePage />} /> {/* Set HomePage as root */}
          <Route path="/mazehomepage" exact element={<MazeHomePage />} />
          <Route path="/page1" exact element={<Page1 />} />
          <Route path="/page2" exact element={<Page2 />} />
          <Route path="/page3" exact element={<Page3 />} />
          <Route path="/page4" exact element={<Page4 />} />
          <Route path="/page5" exact element={<Page5 />} />
        </Routes>
      </MazeProvider>
    </Router>
  );
}

export default App;