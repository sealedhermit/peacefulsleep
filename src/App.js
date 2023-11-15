import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Pane from './Pane'; // Import your Pane component

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const appRef = useRef(null);

  const handleScroll = () => {
    if (appRef.current) {
      const pageNumber = Math.round(appRef.current.scrollLeft / window.innerWidth);
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    if (appRef.current) {
      appRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (appRef.current) {
        appRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollRight = () => {
    if (appRef.current) {
      appRef.current.scrollTo({
        left: (currentPage + 1) * window.innerWidth,
        behavior: 'smooth',
      });
      setCurrentPage(currentPage + 1);
    }
  };

  const scrollLeft = () => {
    if (appRef.current) {
      appRef.current.scrollTo({
        left: (currentPage - 1) * window.innerWidth,
        behavior: 'smooth',
      });
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App" style={{ overflow: 'hidden' }}>
      <div className="scroll-container" ref={appRef} style={{ display: 'flex', overflowX: 'scroll' }}>
        <Pane title="Forest" backgroundColor="#9EEBCF" />
        <Pane title="Beach" backgroundColor="#F5A494" />
        <Pane title="Countryside" backgroundColor="#FFD56D" />
        <Pane title="Urban" backgroundColor="#9A77B8" />
        <Pane title="Park" backgroundColor="#AAD8B0" />
      </div>

      {/* Navigation Buttons */}
      <button onClick={scrollLeft} disabled={currentPage === 0}>{'<'}</button>
      <button onClick={scrollRight} disabled={currentPage === 4}>{'>'}</button>
    </div>
  );
};

export default App;
