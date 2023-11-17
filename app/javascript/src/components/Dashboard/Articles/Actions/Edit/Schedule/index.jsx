import React from "react";

import { Modal, DatePicker } from "@bigbinary/neetoui";
import { Button, Form, Select } from "@bigbinary/neetoui/formik";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Schedule = ({
  showScheduleModal,
  setShowScheduleModal,
  selectedCategory,
  editorRef,
}) => {
  const history = useHistory();
  selectedCategory;
  editorRef;
  history;

  const handleSubmit = async values => {
    try {
      values;
      // console.log(values);
      // await articlesApi.scheduleUpdate();
      // history.push("/articles");
    } catch (error) {
      logger.log(error);
    }
  };

  // const handleSubmit = async (values) => {
  //   try {
  //     const data = parseData({
  //       selectedCategory,
  //       editorRef,
  //       selectedOptionIndex:,
  //     });
  //     await articlesApi.update({ id, payload: data });
  //     history.push("/articles");
  //   } catch (error) {
  //     logger.log(error);
  //   }
  // };

  return (
    <Modal
      className="p-4"
      isOpen={showScheduleModal}
      onClose={() => setShowScheduleModal(false)}
    >
      <h2>Schedule article update</h2>
      {/* <div>Select time to schedule update</div>
      <div>Select status</div> */}
      <Form
        className="w-52"
        formikProps={{
          initialValues: {
            date: "",
            status: "",
          },
          onSubmit: handleSubmit,
        }}
      >
        {props => (
          <>
            {/* {console.log(props)} */}
            {/* TODO: Add logic to not allow to set this for a past value */}
            <DatePicker
              showTime
              className="w-52"
              disabledDate={current => dayjs().add(-1, "days") >= current}
              label="Select time to schedule update"
              labelProps={{ className: "mt-4" }}
              name="date"
              value={props.values.date}
              onChange={date => props.setFieldValue("date", date)}
            />
            <Select
              className="mt-2 mb-3"
              label="Select status"
              name="status"
              placeholder="Select status"
              strategy="fixed"
              options={[
                { label: "Save as draft", value: "draft" },
                { label: "Publish", value: "publish" },
              ]}
            />
            <Button label="Schedule" type="submit" />
            <Button
              label="Cancel"
              style="text"
              type="reset"
              onClick={() => setShowScheduleModal(false)}
            />
          </>
        )}
      </Form>
    </Modal>
  );
};

export default Schedule;
