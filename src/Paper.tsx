import { Box, Container, Typography, Link } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "./vite-env";
import InteractiveQuestion from "./InteractiveQuestion";

export const qType: Record<string, string> = {
  numerical: "Numerical",
  singleCorrect: "Single Correct",
  multipleCorrect: "Multiple Correct",
};

function App() {
  const [data, setData] = useState<Paper>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data.find((paper: any) => paper.id === id)));
  }, []);

  const subjects = ["physics", "chemistry", "mathematics"] as const;

  const fmt = (str: string) => str[0].toUpperCase() + str.slice(1);

  const refs = subjects.map(() => {
    return useRef<HTMLHeadingElement>(null);
  });

  const goTo = (ref: React.RefObject<HTMLHeadingElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "20px" }}>
      {data ? (
        <Box>
          <Typography variant="h3">{data.paper}</Typography>
          <Typography variant="h6">
            {data.year} {data.p ? <>| Paper {data.p}</> : ""} |{" "}
            <Link onClick={() => goTo(refs[0])}>Physics</Link> |{" "}
            <Link onClick={() => goTo(refs[1])}>Chemistry</Link> |{" "}
            <Link onClick={() => goTo(refs[2])}>Mathematics</Link>
          </Typography>

          <Box sx={{ marginTop: "20px" }}>
            {subjects.map((subject, i) => (
              <Box key={subject} sx={{ marginBottom: "20px" }}>
                <Typography ref={refs[i]} variant="h5">
                  {fmt(subject)}
                </Typography>
                <Box>
                  {data[subject].map((question: any, index: number) => (
                    <InteractiveQuestion key={index} question={question} />
                  ))}
                </Box>
              </Box>
            ))}
            CF
          </Box>
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </Container>
  );
}

export default App;
