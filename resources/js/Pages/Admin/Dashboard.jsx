export default function Dashboard() {
    return (
        <Grid item xs={10}>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>Dashboard</Typography>
                <Grid container spacing={3}>
                    {/* Stat cards */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2, bgcolor: '#17a2b8', color: 'white', textAlign: 'center' }}>
                            <Typography variant="h4">150</Typography>
                            <Typography>Đơn hàng mới</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2, bgcolor: '#28a745', color: 'white', textAlign: 'center' }}>
                            <Typography variant="h4">53.4%</Typography>
                            <Typography>Tỷ lệ tăng trưởng</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2, bgcolor: '#ffc107', color: 'white', textAlign: 'center' }}>
                            <Typography variant="h4">44M</Typography>
                            <Typography>Doanh thu</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2, bgcolor: '#dc3545', color: 'white', textAlign: 'center' }}>
                            <Typography variant="h4">65</Typography>
                            <Typography>Khách hàng mới</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Charts */}
                <Box sx={{ mt: 4 }}>
                    <DashboardCharts />
                </Box>
            </Box>
        </Grid>
    );
}   