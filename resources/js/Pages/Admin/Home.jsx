import React from "react"
// import Main from "../../Layout/Main.jsx"
import { Grid, Box, Typography, Paper, Button } from "@mui/material"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PeopleIcon from '@mui/icons-material/People'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DashboardCharts from '../../Components/DashboardCharts.jsx'

function StatCard({ bgcolor, icon, value, label }) {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
                p: 2, 
                bgcolor: bgcolor, 
                color: 'white', 
                position: 'relative', 
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 1
            }}>
                <Box sx={{ position: 'absolute', right: 10, top: 10, opacity: 0.3, fontSize: 60 }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight="bold">{value}</Typography>
                    <Typography variant="body2">{label}</Typography>
                </Box>
                <Button 
                    variant="text" 
                    sx={{ color: 'white', p: 0, textTransform: 'none', justifyContent: 'flex-start' }}
                    endIcon={<ArrowForwardIcon />}
                >
                    More info
                </Button>
            </Paper>
        </Grid>
    );
}

function Home({ title }) {
    return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Quản lý doanh thu</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                    Sơ đồ và thống kê doanh thu
                </Typography>
                <Grid container spacing={2}>
                    <StatCard 
                        bgcolor="#17a2b8" 
                        icon={<ShoppingBagIcon />} 
                        value="150" 
                        label="New Orders" 
                    />
                    <StatCard 
                        bgcolor="#28a745" 
                        icon={<TrendingUpIcon />} 
                        value="53%" 
                        label="Bounce Rate" 
                    />
                    <StatCard 
                        bgcolor="#ffc107" 
                        icon={<PersonAddIcon />} 
                        value="44" 
                        label="User Registrations" 
                    />
                    <StatCard 
                        bgcolor="#dc3545" 
                        icon={<PeopleIcon />} 
                        value="65" 
                        label="Unique Visitors" 
                    />
                </Grid>
                <Box sx={{ mt: 6 }}>
                    <DashboardCharts />
                </Box>
            </Box>
    );
}

export default Home

