import React, { useEffect } from "react";

import { Modal, DatePicker } from "@bigbinary/neetoui";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const Schedule = ({
  showScheduleModal,
  setShowScheduleModal,
  formikProps,
  setIsScheduled,
}) => {
  const { t } = useTranslation();

  const time = formikProps.values.time;

  useEffect(() => {
    if (time) setIsScheduled(true);
    else setIsScheduled(false);
  }, [time]);

  return (
    <Modal
      className="p-4"
      isOpen={showScheduleModal}
      onClose={() => setShowScheduleModal(false)}
    >
      <h2>{t("dashboard.articles.actions.edit.scheduleUpdate.title")}</h2>
      <DatePicker
        showTime
        className="w-52"
        disabledDate={current => dayjs().add(-1, "days") >= current}
        label={t("dashboard.articles.actions.edit.scheduleUpdate.label")}
        labelProps={{ className: "mt-4" }}
        name="time"
        value={time}
        placeholder={t(
          "dashboard.articles.actions.edit.scheduleUpdate.placeholder"
        )}
        onChange={time => formikProps.setFieldValue("time", time)}
      />
    </Modal>
  );
};
export default Schedule;
