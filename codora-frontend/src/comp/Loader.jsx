import { BoxesLoader } from "react-awesome-loaders";

export const Loader = () => {
    return (
      <>
        <BoxesLoader
          boxColor={"#6366F1"}
          style={{ marginBottom: "20px" }}
          desktopSize={"128px"}
          mobileSize={"80px"}
        />
      </>
    );
  };