import {
  Typography,
  RadioGroup,
  FormGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  Card,
  Box,
  CardContent,
  Chip,
  Switch,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { type Question, type Option } from "./vite-env";
import { qType } from "./Paper";

function QuestionContent({
  question,
  showAns,
}: {
  question: Question;
  showAns: boolean;
}) {
  const [chosen, setChosen] = useState<number[]>([]);
  const [number, setNumber] = useState<string>("");

  useEffect(() => {
    if (showAns) {
      if (question.type === "numerical") {
        setNumber(question.correctValue!);
      } else {
        setChosen(
          question.options
            .map((x, i) => [x, i] as [Option, number])
            .filter((x) => x[0].isCorrect)
            .map((x) => x[1])
        );
      }
    } else {
      if (question.type === "numerical") {
        setNumber("");
      } else {
        setChosen([]);
      }
    }
  }, [showAns]);

  console.log(chosen);

  if (question.type === "numerical") {
    return (
      <>
        <Typography variant="subtitle1">
          <span
            dangerouslySetInnerHTML={{
              __html: question.content.text,
            }}
          ></span>
        </Typography>

        <TextField
          value={number}
          placeholder="Answer..."
          variant="standard"
          onChange={(e) => {
            setNumber((e.target as HTMLInputElement).value);
          }}
          disabled={showAns}
        />
      </>
    );
  }
  const GroupElt =
    question.type == "singleCorrect"
      ? RadioGroup
      : question.type == "multipleCorrect"
      ? FormGroup
      : Fragment;

  const toggleChosen = (index: number) => {
    if (chosen.includes(index)) {
      setChosen(chosen.filter((x) => x !== index));
    } else {
      setChosen([...chosen, index]);
    }
  };
  return (
    <>
      <Typography variant="subtitle1">
        <span
          dangerouslySetInnerHTML={{
            __html: question.content.text,
          }}
        ></span>
      </Typography>

      <FormControl disabled={showAns}>
        <GroupElt
          value={chosen}
          onChange={
            question.type === "singleCorrect"
              ? (e) => {
                  setChosen([+(e.target as HTMLInputElement).value]);
                }
              : undefined
          }
        >
          {question.options.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                question.type === "singleCorrect" ? (
                  <Radio />
                ) : (
                  <Checkbox
                    checked={(chosen as number[]).includes(index)}
                    onChange={() => toggleChosen(index)}
                  />
                )
              }
              value={index.toString()}
              label={
                <Typography key={index} variant="subtitle1">
                  <span dangerouslySetInnerHTML={{ __html: option.text }} />
                </Typography>
              }
            />
          ))}
        </GroupElt>
      </FormControl>
    </>
  );
}

function QuestionCard({ question }: { question: Question }) {
  const [showAns, setShowAns] = useState(false);
  return (
    <Card sx={{ marginTop: "10px" }}>
      <CardContent>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Chip label={qType[question.type]} />
          </Box>
          <FormControlLabel
            control={
              <Switch
                value={showAns}
                onChange={(e) => {
                  setShowAns(e.target.checked);
                }}
              />
            }
            label="Answer"
          />
        </Box>
        <Box>
          <QuestionContent question={question} showAns={showAns} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default QuestionCard;
