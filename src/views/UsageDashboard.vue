<!-- <template>
    <div>
        <Bar :data="browserChartData" />
        <Pie :data="cityChartData" />
    </div>
</template> -->


<template>
    <div class="chart-container">
      <div class="chart-item">
        <!-- Bar chart for browsers -->
        <Bar :data="browserChartData" />
      </div>
  
      <div class="chart-item">
        <!-- Pie chart for cities -->
        <Pie :data="cityChartData" />
      </div>
    </div>
  </template>
  
  <style scoped>
  .chart-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }
  
  .chart-item {
    flex: 1 1 45%; /* Ensures the charts take up equal width and wrap */
    min-width: 300px; /* Sets a minimum width for smaller screens */
    box-sizing: border-box;
  }
  </style>

<script>
import { Bar, Pie } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement
} from 'chart.js';
import { supabase } from '@/lib/supabase';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

export default {
    name: 'Charts',
    components: { Bar, Pie },
    data() {
        return {
            // Data for browser bar chart
            browserChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Browser Usage',
                        backgroundColor: '#f87979',
                        data: []
                    }
                ]
            },
            // Data for city pie chart
            cityChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'City Distribution',
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                        data: []
                    }
                ]
            }
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            // Fetch browser data
            const { data: browserData, error: browserError } = await supabase
                .from('page_visits')
                .select('browser_name');
            if (browserError) {
                console.error('Error fetching browser data:', browserError);
                return;
            }

            const browserCounts = browserData.reduce((acc, record) => {
                const browserName = record.browser_name || 'Unknown';
                acc[browserName] = (acc[browserName] || 0) + 1;
                return acc;
            }, {});

            this.browserChartData = {
                labels: Object.keys(browserCounts),
                datasets: [
                    {
                        label: 'Browser Usage',
                        backgroundColor: '#f87979',
                        data: Object.values(browserCounts)
                    }
                ]
            };

            // Fetch city data
            const { data: cityData, error: cityError } = await supabase
                .from('page_visits')
                .select('city');
            if (cityError) {
                console.error('Error fetching city data:', cityError);
                return;
            }

            const cityCounts = cityData.reduce((acc, record) => {
                const cityName = record.city || 'Unknown';
                acc[cityName] = (acc[cityName] || 0) + 1;
                return acc;
            }, {});


            this.cityChartData = {
                labels: Object.keys(cityCounts),
                datasets: [
                    {
                        label: 'City Distribution',
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                        data: Object.values(cityCounts)
                    }
                ]
            };

        }
    }
};
</script>