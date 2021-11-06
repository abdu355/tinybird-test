import React from 'react'
import useTinybird from '@hooks/useTinybird'
import bytesToSize from '@utils/bytesToSize'

import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

export default function OrdersChart() {
    const {
        data,
        stats,
        isLoading,
        isError } = useTinybird({
            pipe: 'food_demand_data_1259_pipe_4198.json',
        })

    if (isError) return <div>Chart failed to load. <br />{isError ? `Reason: ${isError}` : ""} </div>
    if (isLoading) return <div>Chart is loading...</div>

    const options = {
        chart: {
            type: 'line',
            zoomType: 'x'
        },
        title: {
            text: 'Orders By Week'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: 'Week'
        },
        yAxis: {
            title: {
                text: 'Number of orders'
            }
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1
            }
        },

        series: [
            {
                name: "Total Orders",
                data: data?.map(i => [i.week, i.num_orders])
            }
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        enabled: false
                    }
                }
            }]
        }
    }
    return (
        <div>
            <p>{stats?.rows_read} rows of size {bytesToSize(stats?.bytes_read)} processed in {stats?.elapsed} seconds. </p>
            <HighchartsReact
                containerProps={{ style: { height: "500px", width: '100%' } }}
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}
