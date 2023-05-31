import React from "react";

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Chip,
} from "@mui/material";

const BaseCard = (props) => {
  return (
    <Card className=" overflow-y-hidden">
      <Box p={2} display="flex" alignItems="center">
        <Typography variant="h1">{props.title}</Typography>
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
