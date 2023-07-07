import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js'
import { registerables } from 'chart.js';
ChartJS.register(...registerables);

export const BarChart = ({ chartData }) => {

    return (
        <div style={{ width: 800, margin: 10 }}>
            <Bar data={chartData}></Bar>
        </div>
    )
}