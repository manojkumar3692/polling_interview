import { useState } from "react";
import {
  Button,
  Grid,
  Box,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { PollState } from "../context/context";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { format, subDays } from 'date-fns';

type Props = {};

const DEFAULT_POLL_OPTION = [
  {
    key: Date.now(),
    value: "",
    count: 0,
  },
];

export default function Home({}: Props) {
  const {
    adminState: { polls },
    adminDispatch,
  }: any = PollState();


  const [isCreatePoll, setCreatePoll] = useState(false);
  const [pollTitle, setPollTitle] = useState("");
  const [pollOptions, setPollOptions] = useState(DEFAULT_POLL_OPTION);
  const [errorMessage, setErrorMessage] = useState("");
  const [endDate, setValue] = useState<Date | null>(new Date());
  const todayDate = new Date();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  const optionOnChange = (e: any, option: any) => {
    const { value } = e.target;
    setPollOptions((prevState): any => {
      let newOptions = prevState.map((each: any) => {
        if (each.key === option.key) {
          option.value = value;
          return option;
        } else {
          return each;
        }
      });
      return newOptions;
    });
  };

  const addOptionPoll = () => {
    let obj = {
      key: Date.now(),
      value: "",
      count: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    };
    setPollOptions([...pollOptions, obj]);
  };

  const createPoll = () => {
    let obj = {
      id: Date.now(),
      name: pollTitle,
      options: pollOptions,
      endDate: endDate,
      isSubmit: false,
    };
    if (obj.options.some((opt: any) => opt.value.length <= 1)) {
      setErrorMessage("Please add minimum 2 option");
      return;
    }
    adminDispatch({ type: "ADD_POLL", payload: obj });
    setPollTitle("");
    setPollOptions(DEFAULT_POLL_OPTION);
    setErrorMessage("");
    setValue(new Date());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ m: 1 }} textAlign="right">
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setCreatePoll((prevState) => !prevState)}
          >
            {" "}
            { isCreatePoll ? "Close" : "Create Poll"}
          </Button>
        </Grid>
      </Grid>
      {isCreatePoll && (
        <Box
          sx={{
            width: "50%",
            margin: "0 auto",
          }}
        >
          <Grid>
            <TextField
              style={{ width: "98%" }}
              sx={{ m: 1 }}
              value={pollTitle}
              name="pollTitle"
              onChange={(e) => setPollTitle(e.target.value)}
              id="outlined-basic"
              label="Enter Poll Title"
              variant="outlined"
            />
          </Grid>
          <Grid sx={{ p: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Poll End Date"
                inputFormat="MM/dd/yyyy"
                value={endDate}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid>
            {pollOptions.map((option: any, index: any) => {
              return (
                <TextField
                  style={{ width: "98%" }}
                  sx={{ m: 1 }}
                  key={index}
                  value={option.value}
                  name="polloption"
                  onChange={(e) => optionOnChange(e, option)}
                  id="outlined-basic"
                  label={`Enter Option ${index + 1}`}
                  variant="outlined"
                />
              );
            })}
          </Grid>
          <Grid textAlign={"center"}>
            <Button
              disabled={pollOptions.length >= 5}
              color="primary"
              variant="outlined"
              onClick={addOptionPoll}
            >
              {" "}
              Add Polls
            </Button>
          </Grid>
          <Grid container>
            <Grid xs={12}>
              <Typography textAlign={"center"} color="error">
                {errorMessage}
              </Typography>
              <Button
                sx={{ m: 1 }}
                style={{ width: "98%" }}
                color="primary"
                variant="outlined"
                onClick={createPoll}
                disabled={pollOptions.length <= 1}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      <Grid container spacing={2} textAlign="left">
        <Grid item xs={12} sx={{ m: 1 }}>
          {polls.map((poll: any, index: number) => {
            return (
              <Paper sx={{ p: 1 }} key={index} elevation={3} square>
                <Grid container style={{ alignItems: "center" }}>
                  <Grid xs={6}>
                    <Typography>{poll.name}</Typography>
                    <Typography variant="subtitle2">
                        { poll.endDate < subDays(todayDate, 1) ? <span style={{color: 'red'}}>Poll Expired</span> : <span style={{color:"green"}}>This poll expires on {format(poll.endDate,'dd-MM-yyyy')}</span>} 
                      </Typography>
                  </Grid>
                  <Grid xs={6} textAlign="right">
                    <Button
                      onClick={() =>
                        adminDispatch({ type: "DELETE_POLL", payload: poll.id })
                      }
                    >
                      <DeleteOutlineOutlinedIcon />
                      Delete
                    </Button>
                    <Button>Edit</Button>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
