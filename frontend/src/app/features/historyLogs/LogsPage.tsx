import { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { HistoryLogs } from "../../api/agent";
import MyLoading from "../../common/MyLoading";
import { IHistoryLog } from "../../models/HistoryLogModel";
import MyContainer from "../../common/MyContainer";

const LogsPage = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["historyLogs"],
    queryFn: HistoryLogs.list,
  });

  const [logsByDate, setLogsByDate] = useState<{
    [key: string]: IHistoryLog[];
  }>({});

  useEffect(() => {
    if (data) {
        console.log(data);
      const groupedLogs = data.reduce((acc: any, log: IHistoryLog) => {
        const date = new Date(log.date).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(log);
        return acc;
      }, {});
      setLogsByDate(groupedLogs);
    }
  }, [data]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toLocaleDateString() === today.toLocaleDateString()) {
      return "Today";
    } else if (date.toLocaleDateString() === yesterday.toLocaleDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (isLoading || isFetching) return <MyLoading />;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <MyContainer>
        <Typography variant="h4" align="center" sx={{ py: 3 }}>
          History Logs
        </Typography>
        {Object.keys(logsByDate).map((date) => (
          <Box key={date} sx={{ pb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {formatDate(date)}
            </Typography>
            <Divider />
            {logsByDate[date].map((log) => (
              <Paper key={log.id} sx={{ p: 2, mt: 2 }}>
                <Typography variant="body1">{log.message}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(log.date).toLocaleTimeString()}
                </Typography>
              </Paper>
            ))}
          </Box>
        ))}
      </MyContainer>
    </Box>
  );
};

export default LogsPage;
