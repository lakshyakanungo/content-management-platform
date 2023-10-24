import React, { useEffect, useState } from "react";

import MenuBar from "@bigbinary/neeto-molecules/MenuBar";
import { Typography } from "@bigbinary/neetoui";
import { Search as SearchIcon, Plus } from "neetoicons";

import categoriesApi from "apis/categories";

import AddCategoryModal from "./AddCategory";

const ArticlesStates = ["all", "draft", "published"];

const Menu = ({
  showMenu,
  categories,
  activeMenuState,
  handleMenuStateChange,
  selectedCategories,
  setSelectedCategories,
  articleCounts,
  fetchCategories,
}) => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categoriesDisplayed, setCategoriesDisplayed] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  const { Block, SubTitle, Search } = MenuBar;
  // console.log(categories, "categories from outside");

  const handleAddCategory = async ({ category }) => {
    try {
      await categoriesApi.create({ name: category });
      fetchCategories();
      // console.log(categories, " categories from add fn");
      // setCategoriesDisplayed(categories);
    } catch (error) {
      logger.log(error);
    } finally {
      setShowAddCategoryModal(false);
    }
  };

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
    setCategoriesDisplayed([]);
  };

  useEffect(() => {
    if (!isSearchCollapsed) fetchSearchResults();
  }, [searchTerm]);

  return (
    <div>
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
        {searchTerm.length
          ? categoriesDisplayed.map(category => (
              // console.log(category);
              <Block
                active={selectedCategories.includes(category)}
                count={category.articles_count}
                key={category.id}
                label={category.name}
                onClick={() => handleCategoryClick(category)}
              />
            ))
          : categories.map(category => (
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
      <AddCategoryModal
        handleAddCategory={handleAddCategory}
        setShowAddCategoryModal={setShowAddCategoryModal}
        showAddCategoryModal={showAddCategoryModal}
      />
    </div>
  );
};

export default Menu;
