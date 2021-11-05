import React from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}
export default function IOChart({ data }) {
    const options = {
        chart: {
            type: 'column',
            zoomType: 'x'
        },
        title: {
            text: 'IO Chart'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: "datetime",
            labels: {
                format: '{value:%Y-%m-%d}'
            }
        },
        yAxis: {
            title: {
                text: 'AED'
            }
        },
        series: [{
            name: 'inflow',
            data: data && data.map(i => [Date.parse(i.date), i.inflow])
        }, {
            name: 'outflow',
            data: data && data.map(i => [Date.parse(i.date), i.outflow])
        }],
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
            <HighchartsReact
                containerProps={{ style: { height: "500px", width: '100%' } }}
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}
