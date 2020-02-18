import React from 'react';

const Search = ()=>  {
  return (
    <div className="search">
      <span><input type="text" placeholder=" Search Items here..."/></span>
      <span>
        <button>
          <i className="material-icons">search</i>
        </button>
      </span>
    </div>
  );
};

export default Search;
