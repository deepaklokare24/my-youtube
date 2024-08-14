import React from "react";

const QuickFilterList = ({ categories }) => {
  if (!categories.length) {
    return null;
  }

  return (
    <div className="py-2">
      {categories.slice(0, 9).map((category) => (
        <ButtonWrap key={category.id} label={category?.snippet?.title} />
      ))}
    </div>
  );
};

const ButtonWrap = ({ label }) => {
  return (
    <button className="px-4 py-2 mx-2 bg-gray-200 rounded-md text-sm">
      {label}
    </button>
  );
};

export default QuickFilterList;
