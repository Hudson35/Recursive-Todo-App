import { Box, Grid, AppBar, Typography } from '@mui/material';

export default function TopAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="fixed" sx={{height: '35px'}}>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, paddingLeft: '15px' }}>
              Recursive Todo App
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}