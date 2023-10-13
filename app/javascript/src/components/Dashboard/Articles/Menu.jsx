import React from "react";

import MenuBar from "@bigbinary/neeto-molecules/MenuBar";
import { Typography } from "@bigbinary/neetoui";
import { Search, Plus } from "neetoicons";

const ArticlesStates = ["All", "Draft", "Published"];

const Menu = ({
  isMenuOpen,
  showAddCategoryModal,
  setShowAddCategoryModal,
  categories,
  activeMenuState,
  handleMenuStateChange,
  selectedCategories,
  setSelectedCategories,
}) => {
  const { Block, SubTitle } = MenuBar;

  const handleCategoryClick = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category)
      );
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  return (
    <MenuBar showMenu={isMenuOpen} title="Articles">
      {/* <Block active={} count={13} label="All" />
      <Block count={2} label="Published" />
      <Block count={7} label="Draft" /> */}
      {ArticlesStates.map(state => (
        <Block
          active={state === activeMenuState}
          key={state}
          label={state}
          onClick={() => handleMenuStateChange(state)}
          // count={}
        />
      ))}
      <SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => {},
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
      {categories.map(category => (
        <Block
          // count={}
          active={selectedCategories.includes(category)}
          key={category.id}
          label={category.name}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </MenuBar>
  );
};

export default Menu;
