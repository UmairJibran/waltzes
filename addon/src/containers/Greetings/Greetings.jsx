import React, { Component } from 'react';
import icon from '../../assets/img/icon-128.png';
import '../../styles/tailwind.css';

class GreetingComponent extends Component {
  state = {
    name: 'dev',
  };

  render() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-black p-8 rounded-lg shadow-lg text-center">
          <p className="text-3xl font-bold text-gray-800 mb-4 text-underline">
            Hello, There!
          </p>
          <img
            src={icon}
            alt="extension icon"
            className="w-32 h-32 mx-auto hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    );
  }
}

export default GreetingComponent;
