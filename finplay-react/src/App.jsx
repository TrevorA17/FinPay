import React from 'react';
import Header from './components/Header';
import Sidebar from './components/sidebar';

const App = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main style={{ marginLeft: '300px', paddingTop: '60px', padding: '20px' }}>
        {/* Main content */}
        <p>Content Area</p>
      </main>
    </div>
  );
};

export default App;
