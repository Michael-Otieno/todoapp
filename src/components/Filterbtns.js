import React from "react";

export default function Filterbtns(props) {

  return (
    <div className="task--btns">
      {props.filterNames.map(filterName => {
        return <button
        className={`${filterName} tasks  inputs`}
        onClick={() => props.onFilter(filterName)}
        >
      {filterName}
      </button>
      })}
      
    </div>
  );
}
