import react from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Stack direction='row' spacing={2}>
        <Link to={"/bitcoin"}>
          <Button variant='contained'>Bitcoin</Button>
        </Link>
        <Link to={"/ethereum"}>
          <Button variant='contained'>Ethereum</Button>
        </Link>
      </Stack>
    </>
  );
}

export default Home;
