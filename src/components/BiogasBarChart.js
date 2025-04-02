


import React, { useEffect } from 'react'; 
import Chart from 'react-apexcharts';
const BiogasBarChart = ({ isExpanded }) => {   // <--- accept as prop

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 350); // adjust if your sidebar animates slower/faster
    return () => clearTimeout(timer);
  }, [isExpanded]);  // ⬅ everytime isExpanded changes => resize chart

  const chartOptions = {
    series: [
      {
        name: 'Raw Bio Gas',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, 
      {
        name: 'Comp Bio Gas',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }
    ],
    chart: {
      type: 'bar',
      height: 350,
      width: '100%',  // Ensure chart takes full width
      toolbar: {
        show: true // Show toolbar for better control
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',  // Adjusted for better responsiveness
        borderRadius: 5,
        borderRadiusApplication: 'end'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%' // Adjust for medium screens
            }
          }
        }
      },
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '60%' // Adjust for smaller screens
            }
          }
        }
      }
    ]
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>   {/* overflowX hidden */}
      <Chart 
        options={chartOptions} 
        series={chartOptions.series} 
        type="bar" 
        height={350} 
        width="100%" 
      />
    </div>
  );
};

export default BiogasBarChart;