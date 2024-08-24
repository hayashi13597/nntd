"use client";

import Loading from "@/components/Loading";
import React, { useState } from "react";
import { createContext, useContext } from "react";

export type GlobalContent = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const MyGlobalContext = createContext<GlobalContent>({
  loading: false,
  setLoading: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);

const LoadingContext = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  return (
    <MyGlobalContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loading />}
    </MyGlobalContext.Provider>
  );
};

export default LoadingContext;
