import { Box, Grid, Typography, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { PollState } from "../context/context";
import { styled } from "@mui/material/styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

type Props = {};
ChartJS.register(ArcElement, Tooltip, Legend);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  margin: "1rem",
  cursor: "pointer",
}));

export default function PollResult(props: Props) {
  const {
    adminState: { polls },
  }: any = PollState();

  const params = useParams();
  const chartData = polls
    .filter((each: any) => each.id === Number(params.id))
    .map((poll: any) => poll.options);

  const data = {
    labels: chartData[0].map((each: any) => each.value),
    datasets: [
      {
        label: "# of Votes",
        data: chartData[0].map((each: any) => each.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      {polls
        .filter((each: any) => each.id === Number(params.id))
        .map((poll: any) => {
          return (
            <Box>
              <Grid>
                <Grid sx={{ m: 1 }}>
                  <Item>
                    <Typography>Resut Of :</Typography>
                    <Typography>{poll.name}</Typography>
                    <Grid>
                      <div style={{ width: "200px", height: "200px" }}>
                        <Pie data={data} />
                      </div>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          );
        })}
    </div>
  );
}
