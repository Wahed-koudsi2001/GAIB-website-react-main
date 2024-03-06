import { Container, Divider, Paper, Stack, Typography } from "@mui/material";

const AppModal = ({ title, icon, children }) => {
  return (
    <Paper
      component={Container}
      variant={"outlined"}
      sx={{
        width: "100%",
        height: "max-content",
        minHeight: "100%",
        bgcolor: "whiteT90.main",
        backdropFilter: "blur(5px)",
        padding: 2,
      }}
      maxWidth={"lg"}
    >
      <Stack
        direction={"column"}
        spacing={2}
        justifyContent={"start"}
        alignItems={"start"}
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"start"}
          alignItems={"baseline"}
          sx={{ width: "100%" }}
        >
          <Typography
            variant="h4"
            color="text.primary"
            sx={{ display: "inline", height: "min-content" }}
          >
            {icon}
          </Typography>
          <Typography variant="h4" color="text.primary">
            {title}
          </Typography>
        </Stack>
        <Divider />
        {children}
      </Stack>
    </Paper>
  );
};
export default AppModal;
