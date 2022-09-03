import {
  Box,
  Grid,
  Stack,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { PollState } from "../context/context";
import { Outlet, Link } from "react-router-dom";
import { format, subDays } from "date-fns";

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  margin: "1rem",
  cursor: "pointer",
}));

export default function Polls({}: Props) {
  const {
    adminState: { polls },
    adminDispatch,
  }: any = PollState();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState(-1);
  const todayDate = new Date();

  const triggerSave = (item: any) => {
    let filterArr = polls.map((each: any) => {
      if (each.id === item.id) {
        each["isSubmit"] = true;
        each.options.forEach((option: any) => {
          if (Number(option.key) === Number(selectedOption)) {
            option["count"] = option.count + 1;
            return option;
          }
          return option;
        });
        return each;
      }
      return each;
    });
    adminDispatch({ type: "SUBMIT_POLL", payload: filterArr });
  };

  const triggerSelection = (e: any, option: any) => {
    setSelectedOption(option.key);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={6}>
          <Stack>
            {polls.map((poll: any, index: number) => {
              return (
                <div>
                  <Item onClick={() => setSelectedIndex(index)} key={index}>
                    <Grid>
                      <Typography variant="h6">
                        {`${index + 1})`} {poll.name}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="subtitle2">
                        {poll.endDate < subDays(todayDate, 1) ? (
                          <span style={{ color: "red" }}>Poll Expired</span>
                        ) : (
                          <span style={{ color: "green" }}>
                            This poll expires on{" "}
                            {format(poll.endDate, "dd-MM-yyyy")}
                          </span>
                        )}
                      </Typography>
                    </Grid>
                    {index === selectedIndex && (
                      <>
                        <FormControl sx={{ m: 1 }}>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Select Options
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                          >
                            {poll.options.map((option: any, index: number) => {
                              return (
                                <FormControlLabel
                                  onChange={(e) => triggerSelection(e, option)}
                                  key={option.id}
                                  value={option.value}
                                  control={<Radio size="small" />}
                                  label={option.value}
                                />
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                        <Grid textAlign="right">
                          {(poll.isSubmit && poll.isSubmit) ||
                          poll.endDate < subDays(todayDate, 1) ? (
                            <Link to={`${poll.id}`}>
                              <Button variant="outlined" color="primary">
                                View Result
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              sx={{ m: "0 10px" }}
                              variant="outlined"
                              color="primary"
                              onClick={() => triggerSave(poll)}
                              disabled={poll.endDate < subDays(todayDate, 1)}
                            >
                              Submit
                            </Button>
                          )}
                        </Grid>
                      </>
                    )}
                  </Item>
                </div>
              );
            })}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Outlet context={{ polls: polls }} />
        </Grid>
      </Grid>
    </Box>
  );
}
