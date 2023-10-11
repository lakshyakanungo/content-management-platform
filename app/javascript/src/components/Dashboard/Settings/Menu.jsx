import React from "react";

import MenuBar from "@bigbinary/neeto-molecules/MenuBar";

const Menu = () => {
  const { Item } = MenuBar;

  return (
    <MenuBar showMenu title="Settings">
      <Item
        description="Configure general settings of your EUI."
        label="General"
      />
      <Item
        active
        description="Create and configure redirection rules."
        label="Redirections"
      />
      <Item description="Secure knowledge base." label="Security" />
      <Item
        description="Edit and reorder KB structure."
        label="Manage Categories"
      />
    </MenuBar>
  );
};

export default Menu;
