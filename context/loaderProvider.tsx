import React, { createContext, useState } from "react";

type loadercontextprops = {
  loader: Boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoaderContext = createContext<loadercontextprops>({
  loader: false,
  setLoader() {},
});

// @ts-ignore
export function LoaderProvider({ children }) {
  const [loader, setLoader] = useState(false);
  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      {children}
    </LoaderContext.Provider>
  );
}

export default LoaderContext;
