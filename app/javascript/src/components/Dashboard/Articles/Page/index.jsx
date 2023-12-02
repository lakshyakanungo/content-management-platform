import React, { useState, useContext } from "react";

import { Button, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useFetchSearchResults } from "hooks/reactQuery/articles/page/useSearch";
import {
  useHandleDelete,
  useHandleStatusChange,
} from "hooks/reactQuery/articles/page/useUpdate";
import { useMenuStore } from "hooks/zustand/useMenuStore";
import { usePageStore } from "hooks/zustand/usePageStore";
import Container from "neetomolecules/Container";
import Header from "neetomolecules/Header";

import Empty from "./Empty";
import SubHeader from "./SubHeader";
import Table from "./Table";

import { CategoryContext } from "..";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleTableColumns, setVisibleTableColumns] = useState([]);

  const { selectedCategories } = useContext(CategoryContext);

  const { showMenu, activeMenuState, setShowMenu } = useMenuStore();
  const { currentPageNumber, setCurrentPageNumber } = usePageStore();

  const selectedCategoriesIds = selectedCategories.map(category => category.id);
  const query = searchTerm.trim();

  const { data: { articles = [], totalCount = 0 } = {}, isLoading } =
    useFetchSearchResults({
      searchTerm: query,
      selectedCategoriesIds,
      activeMenuState,
      currentPageNumber,
    });

  const { mutate: handleStatusChange } = useHandleStatusChange();
  const { mutate: handleDelete } = useHandleDelete();

  const { t } = useTranslation();

  const history = useHistory();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <Header
        title={t("dashboard.articles.page.header.title")}
        actionBlock={
          <Button
            icon="ri-add-line"
            label={t("dashboard.articles.page.header.buttonLabel")}
            size="small"
            onClick={() => history.push("/articles/new")}
          />
        }
        menuBarToggle={() => {
          setShowMenu(!showMenu);
        }}
        searchProps={{
          value: searchTerm,
          onChange: event => setSearchTerm(event.target.value),
          placeholder: t("dashboard.articles.page.header.searchPlaceholder"),
        }}
      />
      <SubHeader
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
        setCurrentPageNumber={setCurrentPageNumber}
        setVisibleTableColumns={setVisibleTableColumns}
        totalArticlesCount={totalCount}
      />
      {articles.length ? (
        <Table
          articles={articles}
          columnData={visibleTableColumns}
          totalArticlesCount={totalCount}
        />
      ) : (
        <Empty
          history={history}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          setSearchTerm={setSearchTerm}
        />
      )}
    </Container>
  );
};

export default Page;
