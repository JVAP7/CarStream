import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const MarketChart = ({ history }) => {
    const data = {
        labels: history.map(h => h.date),
        datasets: [
            {
                label: 'Market Value (€)',
                data: history.map(h => h.value),
                fill: true,
                borderColor: '#0074D9',
                backgroundColor: 'rgba(0, 116, 217, 0.1)',
                tension: 0.4,
                pointBackgroundColor: '#0074D9',
                pointBorderColor: '#fff',
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#001f3f',
                titleFont: { family: 'Inter', size: 14 },
                bodyFont: { family: 'Inter', size: 14 },
                padding: 12,
                cornerRadius: 8,
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    display: true,
                    color: '#E2E8F0',
                },
                ticks: {
                    font: { family: 'Inter' },
                    callback: (value) => '€' + value.toLocaleString(),
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { family: 'Inter' }
                }
            },
        },
    };

    return (
        <div className="chart-container" style={{ height: '300px', width: '100%', marginTop: '1rem' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default MarketChart;
