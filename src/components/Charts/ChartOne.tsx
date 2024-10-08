import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Series } from '../../types/series';

interface ChartOneState {
  series: Series[];
}

interface ChartOneProps {
  series: Series[];
  mini: number;
  maxi: number;
}

const ChartOne: React.FC<ChartOneProps> = ({ series, mini, maxi }) => {
  const [state, setState] = useState<ChartOneState>({
    series
  });

  const colors = ['#3C50E0', '#80CAEE', '#FF0000', '#00FF00']

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: colors,
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: colors,
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: [
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
        '2024'
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: mini - 30,
      max: maxi + 30,
    },
  };

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <h2 className="text-2xl font-bold mb-4">Increase / Decrease</h2>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">

        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          {
            state.series.map((series, index) => (
              <div className="flex min-w-47.5">
                <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                  <span className={`block h-2.5 w-full max-w-2.5 rounded-full`} style={
                    {
                      backgroundColor: colors[index],
                    }
                  }></span>
                </span>
                <div className="w-full">
                  <p className="font-semibold" style={{ color: colors[index] }}> {series.name} </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>


      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
