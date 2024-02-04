import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Paper } from "./vite-env";

function App() {
  const [data, setData] = useState<Paper[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) =>
        setData(
          data.sort((a: any, b: any) => -5 * (+a.year - +b.year) + a.p - b.p)
        )
      );
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: "20px" }}>
      {data.length > 0 ? (
        <Box>
          <Typography variant="h3">Papers</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {data.map((paper) => (
              <Card key={paper.paper} sx={{ mx: "5px", my: "5px" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {paper.paper}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/p/${paper.id}`}
                  >
                    Open
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </Container>
  );
}

export default App;
