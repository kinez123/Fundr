import React, { useState } from 'react';
import SideNav from '../SideNav/SideNav';
import Chart from 'react-apexcharts'; // Import React-ApexCharts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircle, faPeopleGroup, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";

const AdminPanel = () => {
    const [chartOptions] = useState({
        chart: {
            type: "line",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 6,
        },
        grid: {
            strokeDashArray: 4,
            padding: {
                left: 10,
                right: 10,
            },
        },
        xaxis: {
            categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
            labels: {
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
                },
            },
        },
        yaxis: {
            show: true,
        },
        legend: {
            show: true,
        },
    });

    const [chartSeries] = useState([
        {
            name: "Clicks",
            data: [6500, 6418, 6456, 6526, 6356, 6456],
            color: "#1A56DB",
        },
        {
            name: "CPC",
            data: [6456, 6356, 6526, 6332, 6418, 6500],
            color: "#7E3AF2",
        },
    ]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <SideNav />

            <main className="flex-grow">
                
                <div class="sm:ml-64">
                    <div class="p-4 rounded-lg">
                        <div class="flex flex-wrap mb-3">
                            <div class="w-full max-w-full py-8 px-3 mb-6 shrink-0 sm:flex-0 sm:w-6/12 xl:w-3/12 xl:mb-0">
                                <div class="relative flex flex-col min-w-0 break-words py-6 bg-white drop-shadow-lg shadow-md rounded-2xl bg-clip-border">
                                    <div class="flex-auto p-4">
                                        <div class="flex flex-wrap items-center">
                                            <div class="flex-none w-2/3 max-w-full px-3">
                                                <div>
                                                    <p class="mb-0 font-sans font-semibold leading-normal text-lg">User Count</p>
                                                    <h5 class="mb-0 font-bold text-sm">
                                                    
                                                    <span class="leading-normal text-lg font-weight-bolder text-gray-950">1200</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div class="w-20 h-20 stroke-none shadow-soft-sm bg-gradient-to-tl from-gray-900 to-slate-800 mr-2 flex mx-5 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                                                <FontAwesomeIcon icon={faUser} className="text-white text-3xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full max-w-full py-8 px-3 mb-6 shrink-0 sm:flex-0 sm:w-6/12 xl:w-3/12 xl:mb-0">
                                <div class="relative flex flex-col min-w-0 break-words py-6 bg-white drop-shadow-lg shadow-md rounded-2xl bg-clip-border">
                                    <div class="flex-auto p-4">
                                        <div class="flex flex-wrap items-center">
                                            <div class="flex-none w-2/3 max-w-full px-3">
                                                <div>
                                                    <p class="mb-0 font-sans font-semibold leading-normal text-lg">Approved Campaigns</p>
                                                    <h5 class="mb-0 font-bold text-sm">
                                                    
                                                    <span class="leading-normal text-lg font-weight-bolder text-gray-950">500</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div class="w-20 h-20 stroke-none shadow-soft-sm bg-gradient-to-tl from-lime-700 to-lime-500 mr-2 flex mx-5 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                                                <FontAwesomeIcon icon={faPeopleGroup} className="text-white text-3xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full max-w-full py-8 px-3 mb-6 shrink-0 sm:flex-0 sm:w-6/12 xl:w-3/12 xl:mb-0">
                                <div class="relative flex flex-col min-w-0 break-words py-6 bg-white drop-shadow-lg shadow-md rounded-2xl bg-clip-border">
                                    <div class="flex-auto p-4">
                                        <div class="flex flex-wrap items-center">
                                            <div class="flex-none w-2/3 max-w-full px-3">
                                                <div>
                                                    <p class="mb-0 font-sans font-semibold leading-normal text-lg">Disapproved Campaigns</p>
                                                    <h5 class="mb-0 font-bold text-sm">
                                                    
                                                    <span class="leading-normal text-lg font-weight-bolder text-gray-950">30</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div class="w-20 h-20 stroke-none shadow-soft-sm bg-gradient-to-tl from-red-700 to-rose-600 mr-2 flex mx-5 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                                                <FontAwesomeIcon icon={faPeopleGroup} className="text-white text-3xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full max-w-full py-8 px-3 mb-6 shrink-0 sm:flex-0 sm:w-6/12 xl:w-3/12 xl:mb-0">
                                <div class="relative flex flex-col min-w-0 break-words py-6 bg-white drop-shadow-lg shadow-md rounded-2xl bg-clip-border">
                                    <div class="flex-auto p-4">
                                        <div class="flex flex-wrap items-center">
                                            <div class="flex-none w-2/3 max-w-full px-3">
                                                <div>
                                                    <p class="mb-0 font-sans font-semibold leading-normal text-lg">Pending Campaigns</p>
                                                    <h5 class="mb-0 font-bold text-sm">
                                                    
                                                    <span class="leading-normal text-lg font-weight-bolder text-gray-950">50</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div class="w-20 h-20 stroke-none shadow-soft-sm bg-gradient-to-tl from-blue-900 to-blue-700 mr-2 flex mx-5 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                                                <FontAwesomeIcon icon={faPeopleGroup} className="text-white text-3xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                
                <div className="sm:ml-64 p-4">
                    <div className="rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Earnings</h2>

                        {/* Add the Chart */}
                        <div className="bg-white p-4 rounded shadow">
                            <Chart
                                options={chartOptions}
                                series={chartSeries}
                                type="line"
                                height={350}
                            />
                        </div>
                    </div>
                </div>


                <div class="sm:ml-64">
                    <div class="p-4 rounded-lg">
                        <div class="flex flex-wrap mb-3">
                            <div class="w-full max-w-full py-8 px-3 mb-6 shrink-0 sm:flex-0 sm:w-6/12 xl:w-6/12 xl:mb-0">
                                <div class="relative flex flex-col min-w-0 break-words py-6 bg-white drop-shadow-lg shadow-md rounded-2xl bg-clip-border">
                                    <div class="flex-auto p-4">
                                        <div class="flex flex-wrap items-center">
                                            <div class="flex-none w-2/3 max-w-full px-3">
                                                <div>
                                                    <p class="mb-0 font-sans font-semibold leading-normal text-lg">Approved Donations</p>
                                                    <h5 class="mb-0 font-bold text-sm">
                                                    
                                                    <span class="leading-normal text-lg font-weight-bolder text-gray-950">500</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div class="w-20 h-20 stroke-none shadow-soft-sm bg-gradient-to-tl from-lime-700 to-lime-500 mr-2 flex mx-36 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                                                <FontAwesomeIcon icon={faHandHoldingDollar} className="text-white text-3xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="w-full max-w-full py-8 px-3 mb-6 shrink-0 sm:flex-0 sm:w-6/12 xl:w-6/12 xl:mb-0">
                                <div class="relative flex flex-col min-w-0 break-words py-6 bg-white drop-shadow-lg shadow-md rounded-2xl bg-clip-border">
                                    <div class="flex-auto p-4">
                                        <div class="flex flex-wrap items-center">
                                            <div class="flex-none w-2/3 max-w-full px-3">
                                                <div>
                                                    <p class="mb-0 font-sans font-semibold leading-normal text-lg">Pending Donations</p>
                                                    <h5 class="mb-0 font-bold text-sm">
                                                    
                                                    <span class="leading-normal text-lg font-weight-bolder text-gray-950">50</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div class="w-20 h-20 stroke-none shadow-soft-sm bg-gradient-to-tl from-blue-900 to-blue-700 mr-2 flex mx-36 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                                                <FontAwesomeIcon icon={faHandHoldingDollar} className="text-white text-3xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </main>
        </div>
    );
};

export default AdminPanel;

