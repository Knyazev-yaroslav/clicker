import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";

import { postCounterValue } from "./api/postCounterValue";
import "./App.css";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [counterValue, setCounterValue] = useState<number>(0);
  const [serverCounterValue, setServerCounterValue] = useState<number>(0);

  const debouncedValue = useDebounce(counterValue, 1000);
  useEffect(() => {
    const post = async () => {
      setLoading(true);

      const response = await postCounterValue({ count: debouncedValue });
      const data = response.data;

      if (data.ok === true) {
        setServerCounterValue(data.count);
      } else {
        throw new Error(data.error_ui);
      }

      setLoading(false);
    };
    if (debouncedValue) {
      post();
    }
  }, [debouncedValue]);

  return (
    <Container
      sx={{
        width: "100vw",
        pt: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <LoadingButton
        size="large"
        sx={{
          bgcolor: "#fbc02d",
          color: "black",
          width: "300px",
          height: "50px",
          ":hover": {
            bgcolor: "#fba032",
          },
        }}
        loading={loading}
        variant="contained"
        onClick={() => {
          setCounterValue((prev) => prev + 1);
        }}
      >
        <span>КЛИКНУТЬ</span>
      </LoadingButton>
      <div className="counter local_value">Кликнули {counterValue} раз</div>
      <div className="counter server_value">
        По версии сервера: {serverCounterValue} раз
      </div>
    </Container>
  );
};

export default App;
