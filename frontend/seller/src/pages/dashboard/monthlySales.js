/**
 * @author yashkasera
 * Created 13/10/21 at 5:56 PM
 */
import React from 'react';
import Chart from "react-apexcharts";
import useAxios from "../../hooks/useAxios";
import LoadingComponent from "../../components/loading";

const MonthlySales = (props) => {
    const optionsArea = {
        chart: {
            height: 380,
            type: 'area',
            stacked: false,
            foreColor: '#ccc',
            fontFamily: 'Poppins,sans-serif',
            toolbar: {
                show: false
                // theme:'dark',
            },
            zoom: {
                enabled: false,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        colors: ['#FFD868', '#F66060'],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        tooltip: {
            followCursor: true,
            theme: 'dark',
        },
        fill: {
            type: 'gradient',
            gradient: {
                // opacityFrom: 0.6,
                // opacityTo: 0.8,
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [20, 100, 100, 100]
            }
        },
        grid: {
            borderColor: "#535A6C",
            xaxis: {
                // type: 'datetime',
                lines: {
                    show: true
                }
            }
        }
    }
    const orders = useAxios({
        url: 'seller/dashboard/orders',
        method: 'GET'
    })
    const issues = useAxios({
        url: 'seller/dashboard/issues',
        method: 'GET'
    })
    if (issues.response != null) {
        props.setIssueCount(issues.response[issues.response.length - 1]);
    }
    if (orders.response != null) {
        props.setOrderCount(orders.response[orders.response.length - 1]);
    }

    return (
        <>
            {(orders.loading || issues.loading) && <LoadingComponent/>}
            {orders.response && issues.response && <Chart
                type={'area'}
                options={optionsArea}
                series={
                    [
                        {
                            name: "Orders",
                            data: orders.response
                        },
                        {
                            name: "Issues",
                            data: issues.response
                        },
                    ]
                }
            />}
        </>
    )
};

export default MonthlySales;