import React from "react";

import { Search as SearchIcon } from "@bigbinary/neeto-icons";
import { Input, Modal } from "@bigbinary/neetoui";

import { useKeyDown } from "hooks/useKeyDown";

import { SEARCH_SUFFIX } from "./constants";

const Search = ({ showSearchModal, setShowSearchModal }) => {
  const { Body } = Modal;

  useKeyDown(() => setShowSearchModal(true), "Slash");
  useKeyDown(() => setShowSearchModal(false), "Escape");

  return (
    <Modal
      className=""
      closeButton={false}
      isOpen={showSearchModal}
      onClose={() => setShowSearchModal(false)}
    >
      <Body className="p-2">
        <Input
          placeholder="Search article title or content"
          prefix={<SearchIcon />}
          suffix={SEARCH_SUFFIX}
        />
      </Body>
    </Modal>
  );
};

export default Search;
