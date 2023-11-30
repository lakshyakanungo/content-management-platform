import React from "react";

import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import queryClient from "utils/queryClient";

import Main from "./components/Main";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
