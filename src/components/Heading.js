import React from 'react'

const Heading = ({children, event=false, className}) => {
  return (
    <div className={`${className} w-fit ${event ? "mb-4" : ""}`}>
      <h1 className="text-4xl font-bold text-center">{children}</h1>
      <div className="w-[80%] bg-yellow h-1"></div>
    </div>
  );
}

export default Heading