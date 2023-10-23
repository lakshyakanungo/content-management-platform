import React, { useEffect, useState } from "react";

import MenuBar from "@bigbinary/neeto-molecules/MenuBar";
import { Typography } from "@bigbinary/neetoui";
import { Search as SearchIcon, Plus } from "neetoicons";

import categoriesApi from "apis/categories";

const ArticlesStates = ["all", "draft", "published"];

const Menu = ({
  showMenu,
  showAddCategoryModal,
  setShowAddCategoryModal,
  categories,
  activeMenuState,
  handleMenuStateChange,
  selectedCategories,
  setSelectedCategories,
  articleCounts,
}) => {
  const [categoriesDisplayed, setCategoriesDisplayed] = useState(categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const { Block, SubTitle, Search } = MenuBar;

  const handleCategoryClick = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category)
      );
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.search(searchTerm);
      // console.log(categories);
      setCategoriesDisplayed(categories);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleKeyDown = event => {
    // console.log(event);
    if (event.code === "Escape") {
      handleCollapse();
    }
  };

  const handleCollapse = () => {
    setIsSearchCollapsed(true);
    setSearchTerm("");
    setCategoriesDisplayed(categories);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <MenuBar showMenu={showMenu} title="Articles">
      {ArticlesStates.map(state => (
        <Block
          active={state === activeMenuState}
          className="capitalize"
          count={articleCounts[state]}
          key={state}
          label={state}
          onClick={() => handleMenuStateChange(state)}
        />
      ))}
      <SubTitle
        iconProps={[
          {
            icon: SearchIcon,
            onClick: () => {
              setIsSearchCollapsed(!isSearchCollapsed);
            },
          },
          {
            icon: Plus,
            onClick: () => setShowAddCategoryModal(!showAddCategoryModal),
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </SubTitle>
      <Search
        isCollapsed={isSearchCollapsed}
        placeholder="Search category"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        onCollapse={handleCollapse}
        onKeyDown={handleKeyDown}
      />
      {categoriesDisplayed.map(category => (
        // console.log(category);
        <Block
          active={selectedCategories.includes(category)}
          count={category.articles_count}
          key={category.id}
          label={category.name}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </MenuBar>
  );
};

export default Menu;
