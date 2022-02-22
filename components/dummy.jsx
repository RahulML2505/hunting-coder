import React from 'react';

const Dummy = () => {
  return (
    <div>
      <style jsx global>
        {`
          .dummy {
            background: yellow
          }
        `}
      </style>
      <span className='dummy'>I am dummy</span>
    </div>
  );
};

export default Dummy;
