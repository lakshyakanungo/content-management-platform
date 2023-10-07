import React, { useState } from "react";

import Header from "@bigbinary/neeto-molecules/Header";
import SubHeader from "@bigbinary/neeto-molecules/SubHeader";
import { Delete } from "neetoicons";
import { Button } from "neetoui";

import EmptyState from "components/commons/EmptyState";
import Container from "neetomolecules/Container";

const ArticlePage = ({ isMenuOpen, setIsMenuOpen }) => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  setArticles;

  return (
    <Container>
      <Header
        title="All articles"
        actionBlock={
          <Button
            icon="ri-add-line"
            label="Add new note"
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
          <SubHeader
            rightActionBlock={
              <Button
                // disabled={!selectedNoteIds.length}
                icon={Delete}
                label="Delete"
                size="small"
                // onClick={() => setShowDeleteAlert(true)}
              />
            }
          />
          {/* <Table
            fetchNotes={fetchNotes}
            notes={notes}
            selectedNoteIds={selectedNoteIds}
            setSelectedNoteIds={setSelectedNoteIds}
          /> */}
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
