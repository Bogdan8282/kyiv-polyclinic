import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="wrapper">
      <h2>404 - Сторінку не знайдено</h2>
      <div>
        <Link to="/">На головну</Link>
      </div>
    </div>
  );
}

export default NotFound;