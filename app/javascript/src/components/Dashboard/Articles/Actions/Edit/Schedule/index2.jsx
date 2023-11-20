import React from "react";

import { Modal, DatePicker } from "@bigbinary/neetoui";
import dayjs from "dayjs";

const Schedule2 = ({
  showScheduleModal,
  setShowScheduleModal,
  formikProps,
}) => (
  <Modal
    className="p-4"
    isOpen={showScheduleModal}
    onClose={() => setShowScheduleModal(false)}
  >
    <h2>Schedule article update</h2>
    <>
      {/* {console.log(props)} */}
      {/* TODO: Add logic to not allow to set this for a past value */}
      {/* TODO: Change this name to time */}
      <DatePicker
        showTime
        className="w-52"
        disabledDate={current => dayjs().add(-1, "days") >= current}
        label="Select time to schedule update"
        labelProps={{ className: "mt-4" }}
        name="date"
        value={formikProps.values.date}
        onChange={date => formikProps.setFieldValue("date", date)}
      />
    </>
  </Modal>
);

export default Schedule2;
