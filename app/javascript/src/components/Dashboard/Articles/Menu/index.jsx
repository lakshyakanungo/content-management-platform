import React, { useContext, useEffect, useState } from "react";

import MenuBar from "@bigbinary/neeto-molecules/MenuBar";
import { Typography } from "@bigbinary/neetoui";
import { Search as SearchIcon, Plus } from "neetoicons";
import { includes, equals } from "ramda";
import { useTranslation } from "react-i18next";

import { useCategorySearch } from "hooks/reactQuery/menu/useCategorySearch";
import { useMenuStore } from "hooks/zustand/useMenuStore";
import { useSelectedArticlesStore } from "hooks/zustand/useSelectedArticlesStore";

import AddCategoryModal from "./AddCategory";
import { MENU_ARTICLE_STATES } from "./constants";
import { getMenuArticlesCount, handleKeyEvent } from "./utils";

import { CategoryContext } from "..";

const Menu = ({ articleCounts, setCurrentPageNumber }) => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  const { categories, selectedCategories, setSelectedCategories } =
    useContext(CategoryContext);
  const { showMenu, activeMenuState, setActiveMenuState } = useMenuStore();
  const { setSelectedArticleIds } = useSelectedArticlesStore();

  const { data: categoriesDisplayed, refetch: fetchSearchResults } =
    useCategorySearch({
      searchTerm,
    });

  const { Block, SubTitle, Search } = MenuBar;

  const { t } = useTranslation();

  const handleCategoryClick = categoryClicked => {
    if (includes(categoryClicked, selectedCategories)) {
      setSelectedCategories(prev =>
        prev.filter(
          selectedCategory => !equals(selectedCategory, categoryClicked)
        )
      );
    } else {
      setSelectedCategories(prev => [...prev, categoryClicked]);
    }
    setSelectedArticleIds([]);
    setCurrentPageNumber(1);
  };

  const handleCollapse = () => {
    setIsSearchCollapsed(true);
    setSearchTerm("");
  };

  const handleKeyDown = event => handleKeyEvent(event, handleCollapse);

  const handleMenuStateChange = state => {
    setActiveMenuState(state);
    setSelectedArticleIds([]);
    setCurrentPageNumber(1);
  };

  useEffect(() => {
    if (!isSearchCollapsed) fetchSearchResults();
  }, [searchTerm]);

  return (
    <>
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
                active={includes(category, selectedCategories)}
                count={category.articlesCount}
                key={category.id}
                label={category.name}
                onClick={() => handleCategoryClick(category)}
              />
            ))
          : categories.map(category => (
              <Block
                active={includes(category, selectedCategories)}
                count={category.articlesCount}
                key={category.id}
                label={category.name}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
      </MenuBar>
      <AddCategoryModal
        setShowAddCategoryModal={setShowAddCategoryModal}
        showAddCategoryModal={showAddCategoryModal}
      />
    </>
  );
};

export default Menu;
