import React, { useEffect, useState } from "react";
import QuickFilterList from "../QuickFilterList/QuickFilterList";
import RecommendationsCardContainer from "../Recommendations/RecommendationsCardContainer";
import { VIDEO_CATEGORIES } from "../../utils/constants";

const MainContainer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const data = await fetch(VIDEO_CATEGORIES);
      const categories = await data.json();
      console.log(categories.items);
      setCategories(categories.items);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <QuickFilterList categories={categories} />
      <RecommendationsCardContainer />
    </div>
  );
};

export default MainContainer;
