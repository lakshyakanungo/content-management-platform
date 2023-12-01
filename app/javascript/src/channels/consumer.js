import { createConsumer } from "@rails/actioncable";

import { getFromLocalStorage } from "utils/storage";

const buildWebsocketURL = () => {
  const authToken = getFromLocalStorage("authToken");

  return encodeURI(`/cable?auth_token=${authToken}`);
};

export default () => createConsumer(buildWebsocketURL());
