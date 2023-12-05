import React, { useState } from "react";

import { Button, Modal } from "neetoui";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils";

import DeleteAlert from "./DeleteAlert";

const Schedule = ({ article, showSchedule, setShowSchedule }) => {
  const { t } = useTranslation();
  const { Header, Body, Footer } = Modal;
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <Modal isOpen={showSchedule} onClose={() => setShowSchedule(false)}>
      <Header>
        <h2>{t("dashboard.articles.actions.edit.schedule.details.header")}</h2>
      </Header>
      <Body>
        {t("dashboard.articles.actions.edit.schedule.details.subheader", {
          time: formatDate(article.schedule.time),
        })}
      </Body>
      <Footer>
        <Button
          label={t("dashboard.articles.actions.edit.schedule.details.label")}
          style="danger"
          onClick={() => setShowDeleteAlert(true)}
        />
      </Footer>
      <DeleteAlert
        article={article}
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
    </Modal>
  );
};

export default Schedule;
