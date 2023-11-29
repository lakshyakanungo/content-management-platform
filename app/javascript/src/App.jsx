import React from "react";

import { QueryClientProvider } from "react-query";

import queryClient from "utils/queryClient";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Main from "./components/Main";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
);

export default App;
