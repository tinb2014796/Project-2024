export default function Dashboard() {
    return (
        <Grid item xs={10}>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>Dashboard</Typography>
                    <Grid container spacing={3}>
                        {/* Stat cards */}
                        <Grid item xs={3}>
                            <Paper sx={{ p: 2, bgcolor: '#17a2b8', color: 'white' }}>
                                <Typography variant="h4">150</Typography>
                                <Typography>New Orders</Typography>
                            </Paper>
                        </Grid>
                        {/* Add other stat cards similarly */}
                    </Grid> 
                </Box>
        </Grid>
    );
}   