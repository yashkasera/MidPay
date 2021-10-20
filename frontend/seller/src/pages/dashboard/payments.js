/**
 * @author yashkasera
 * Created 13/10/21 at 10:38 PM
 */
import React from 'react';
import Chart from 'react-apexcharts'
import useAxios from "../../hooks/useAxios";
import LoadingComponent from "../../components/loading";

const Payments = (props) => {
    const optionsArea = {
        chart: {
            type: 'donut',
            foreColor: '#ccc',
            fontFamily: 'Poppins,sans-serif',
            // dropShadow: {
            //     enabled: true,
            //     enabledOnSeries: undefined,
            //     top: 0,
            //     left: 4,
            //     blur: 4,
            //     color: '#000',
            //     opacity: 0.25
            // }
        },
        stroke: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        colors: ['rgb(59,161,129)', 'rgb(66,123,166)'],
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom'
                }
            }
        }],
        plotOptions: {
            pie: {
                expandOnClick: false,
                dataLabels: {
                    offset: 0,
                },
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: 'Poppins, sans-serif',
                            color: undefined,
                            offsetY: -8,
                            formatter: function (val) {
                                return val
                            }
                        },
                        value: {
                            show: true,
                            fontSize: '22px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            color: undefined,
                            offsetY: 8,
                            formatter: function (val) {
                                return val
                            }
                        },
                        total: {
                            show: true,
                            showAlways: false,
                            label: 'Total',
                            fontFamily: 'Poppins, sans-serif',
                            color: '#eee',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                            }
                        }
                    }
                }
            }
        },
        labels: ['Received', 'Pending']
    }

    const {response, error, loading} = useAxios({
        url: 'seller/dashboard/payments',
        method: 'GET'
    })

    return (
        <>
            {loading && <LoadingComponent/>}
            {response &&
            <Chart
                type={'donut'}
                options={optionsArea}
                series={Array(response.completed, response.paid)}
                labels={['Received', 'Pending']}
            />}
        </>
    );
}

export default Payments