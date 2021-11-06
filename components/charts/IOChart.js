import React from 'react'
import useTinybird from '@hooks/useTinybird'
import bytesToSize from '@utils/bytesToSize'

import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

export default function IOChart() {
    const {
        data,
        stats,
        isLoading,
        isError } = useTinybird({
            pipe: 'fin_data_by_tag.json',
            page_size: '100'
        })

    if (isError) return <div>Chart failed to load. <br />{isError ? `Reason: ${isError}` : ""} </div>
    if (isLoading) return <div>Chart is loading...</div>


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
            data: data?.map(i => [Date.parse(i.date), i.inflow])
        }, {
            name: 'outflow',
            data: data?.map(i => [Date.parse(i.date), i.outflow])
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
            <p>{stats?.rows_read} rows of size {bytesToSize(stats?.bytes_read)} fetched in {stats?.elapsed} seconds. </p>
            <HighchartsReact
                containerProps={{ style: { height: "500px", width: '100%' } }}
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}
