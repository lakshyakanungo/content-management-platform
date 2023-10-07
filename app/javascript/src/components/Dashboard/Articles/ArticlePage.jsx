import React, { useState } from "react";

import Columns from "@bigbinary/neeto-molecules/Columns";
import Header from "@bigbinary/neeto-molecules/Header";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import SubHeader from "@bigbinary/neeto-molecules/SubHeader";
import { Delete } from "neetoicons";
import { Dropdown, Button } from "neetoui";

import EmptyState from "components/commons/EmptyState";
import Container from "neetomolecules/Container";

import {
  ARTICLES_TABLE_ROW_DATA,
  ARTICLES_TABLE_COLUMN_DATA,
} from "./constants";
import Table from "./Table";

const ArticlePage = ({ isMenuOpen, setIsMenuOpen }) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState(ARTICLES_TABLE_ROW_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);
  const [columns, setColumns] = useState(ARTICLES_TABLE_COLUMN_DATA);

  const { Menu, MenuItem } = Dropdown;

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setArticles;
      // API call
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Header
        title="All articles"
        actionBlock={
          <Button
            icon="ri-add-line"
            label="Add article"
            size="small"
            // onClick={() => setShowNewNotePane(true)}
          />
        }
        menuBarToggle={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        searchProps={{
          value: searchTerm,
          onChange: event => setSearchTerm(event.target.value),
          placeholder: "Search something",
        }}
      />
      {articles.length ? (
        <>
          {/* <SubHeader
            rightActionBlock={
              <Button
                // disabled={!selectedNoteIds.length}
                icon={Delete}
                label="Delete"
                size="small"
                // onClick={() => setShowDeleteAlert(true)}
              />
            }
          /> */}
          <SubHeader
            leftActionBlock={
              <div>
                {selectedArticleIds.length ? (
                  <div className="flex gap-x-3 items-center	">
                    <span>
                      <b>{selectedArticleIds.length} articles</b> selected of{" "}
                      {articles.length}
                    </span>
                    <Dropdown
                      buttonSize="medium"
                      buttonStyle="secondary"
                      label="Change category"
                    >
                      <Menu>
                        <MenuItem.Button>Category 1</MenuItem.Button>
                        <MenuItem.Button>Category 2</MenuItem.Button>
                        <MenuItem.Button>Category 3</MenuItem.Button>
                        <MenuItem.Button>Category 4</MenuItem.Button>
                      </Menu>
                    </Dropdown>
                    <Dropdown
                      buttonSize="medium"
                      buttonStyle="secondary"
                      label="Change status"
                    >
                      <Menu>
                        <MenuItem.Button>Draft</MenuItem.Button>
                        <MenuItem.Button>Publish</MenuItem.Button>
                      </Menu>
                    </Dropdown>
                    <Button
                      // disabled={!selectedNoteIds.length}
                      icon={Delete}
                      label="Delete"
                      size="medium"
                      style="danger"
                      // onClick={() => setShowDeleteAlert(true)}
                    />
                  </div>
                ) : (
                  <div>{articles.length} articles</div>
                )}
              </div>
            }
            rightActionBlock={
              !selectedArticleIds.length && (
                <Columns
                  buttonStyle="secondary"
                  checkboxProps={{}}
                  columnData={ARTICLES_TABLE_COLUMN_DATA}
                  fixedColumns={["title", "iconButton"]}
                  label="Columns"
                  // localStorageKey="TABLE_HIDDEN_COLUMNS"
                  noColumnMessage="No columns found"
                  onChange={setColumns}
                  // searchProps={{ placeholder: "Search columns" }}
                />
              )
            }
          />
          <Table
            articles={articles}
            columnData={columns}
            fetchArticles={fetchArticles}
            selectedArticleIds={selectedArticleIds}
            setSelectedArticleIds={setSelectedArticleIds}
          />
        </>
      ) : (
        <EmptyState
          primaryAction={() => {}}
          primaryActionLabel="Add article"
          subtitle="You have not yet created an article. Create an article using the CTA given below."
          title="There are no articles."
        />
      )}
      {/* <NewNotePane
        fetchNotes={fetchNotes}
        setShowPane={setShowNewNotePane}
        showPane={showNewNotePane}
      />
      {showDeleteAlert && (
        <DeleteAlert
          refetch={fetchNotes}
          selectedNoteIds={selectedNoteIds}
          setSelectedNoteIds={setSelectedNoteIds}
          onClose={() => setShowDeleteAlert(false)}
        />
      )} */}
    </Container>
  );
};

export default ArticlePage;
