import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../sidebar/sidebar";
import Heading from "../headingProfile/heading";

const Staff = ({ data, handleClick, handleAction, loading }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box display="flex" flexDirection={isSmallScreen ? "column" : "row"}>
      <Box
        sx={{
          width: { xs: "100%", md: "18%" },
          minHeight: "100vh",
          borderRight: { md: "1px solid #ccc" },
        }}
      >
        <Sidebar />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "82%" },
          bgcolor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Heading />
        <Grid container direction="column" p={{ xs: 2, md: 4 }}>
          <Typography variant="h4" gutterBottom>
            Staff List
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {data?.length > 0 ? (
                data.map((item) => (
                  <Grid
                    key={item._id}
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      padding: 2,
                      marginBottom: 2,
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Typography variant="subtitle1">
                      {item.username}
                    </Typography>
                    <Typography variant="subtitle2">{item.email}</Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleAction(item._id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Grid>
                ))
              ) : (
                <Typography>No staff data available.</Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                sx={{ marginTop: 2 }}
              >
                Add Staff
              </Button>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Staff;

