import React from "react";

import MenuBar from "@bigbinary/neeto-molecules/MenuBar";
import { Typography } from "@bigbinary/neetoui";
import { Search, Plus } from "neetoicons";

const Menu = ({
  isMenuOpen,
  showAddCategoryModal,
  setShowAddCategoryModal,
}) => {
  const { Block, SubTitle } = MenuBar;

  // const handlePlus =

  // useEffect(() => {
  //   handlePlus();
  // }, [setShowAddCategoryModal]);

  return (
    <MenuBar showMenu={isMenuOpen} title="Articles">
      <Block active count={13} label="All" />
      <Block count={2} label="Published" />
      <Block count={7} label="Draft" />
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
      <Block count={80} label="Getting Started" />
      <Block count={70} label="Security and SSO" />
      <Block count={60} label="Email labels and tags" />
      <Block count={40} label="Front End articles" />
      {/* <AddNew label="Add new category" /> */}
    </MenuBar>
  );
};

export default Menu;
