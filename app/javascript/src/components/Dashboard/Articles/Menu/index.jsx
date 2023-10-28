import React, { useEffect, useState } from "react";

import MenuBar from "@bigbinary/neeto-molecules/MenuBar";
import { Typography } from "@bigbinary/neetoui";
import { Search as SearchIcon, Plus } from "neetoicons";
import { useTranslation } from "react-i18next";

import categoriesApi from "apis/categories";

import AddCategoryModal from "./AddCategory";
import { MENU_ARTICLE_STATES } from "./constants";
import { getMenuArticlesCount, handleKeyEvent } from "./utils";

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

  const { t } = useTranslation();

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
      } = await categoriesApi.search({ name: searchTerm });
      setCategoriesDisplayed(categories);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleCollapse = () => {
    setIsSearchCollapsed(true);
    setSearchTerm("");
    setCategoriesDisplayed([]);
  };

  const handleKeyDown = event => handleKeyEvent(event, handleCollapse);

  useEffect(() => {
    if (!isSearchCollapsed) fetchSearchResults();
  }, [searchTerm]);

  return (
    <div>
      <MenuBar showMenu={showMenu} title={t("dashboard.articles.menu.title")}>
        {MENU_ARTICLE_STATES.map(state => (
          <Block
            active={state === activeMenuState}
            className="capitalize"
            count={getMenuArticlesCount(articleCounts, state)}
            key={state}
            label={state}
            onClick={() => handleMenuStateChange(state)}
          />
        ))}
        <SubTitle
          iconProps={[
            {
              icon: SearchIcon,
              onClick: () => setIsSearchCollapsed(!isSearchCollapsed),
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
            {t("dashboard.articles.menu.subtitle")}
          </Typography>
        </SubTitle>
        <Search
          isCollapsed={isSearchCollapsed}
          placeholder={t("dashboard.articles.menu.searchPlaceholder")}
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          onCollapse={handleCollapse}
          onKeyDown={handleKeyDown}
        />
        {searchTerm.length
          ? categoriesDisplayed.map(category => (
              <Block
                active={selectedCategories.includes(category)}
                count={category.articlesCount}
                key={category.id}
                label={category.name}
                onClick={() => handleCategoryClick(category)}
              />
            ))
          : categories.map(category => (
              <Block
                active={selectedCategories.includes(category)}
                count={category.articlesCount}
                key={category.id}
                label={category.name}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
      </MenuBar>
      <AddCategoryModal
        fetchCategories={fetchCategories}
        setShowAddCategoryModal={setShowAddCategoryModal}
        showAddCategoryModal={showAddCategoryModal}
      />
    </div>
  );
};

export default Menu;
