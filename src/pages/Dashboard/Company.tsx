import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartTwo from '../../components/Charts/ChartTwo';
import CardDataNormal from '../../components/CardDataNormal';
import { Series } from '../../types/series';
import axios from '../../utils/axiosInstance';
import Loader from '../../components/Loader';
import { useLocation } from 'react-router-dom';

const Company: React.FC = () => {
  const [details, setDetails] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    async function fetchDetails() {
      setLoading(true)
      try {
        const response = await axios.get(`/analytics/company/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        })
        if (response.data) {
          setDetails(response.data);
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
      }
    }
    fetchDetails();
  }, [location.search])

  const getSeries = () => {
    let series: Series[] = [];
    Object.entries(details.c).forEach(([key, value]: [string, any]) => {
      series.push({
        name: key,
        data: Object.values(value)?.map((val: any) => Math.floor(val)),
      });
    });
    return series;
  }

  const getMini = () => {
    let mini = 1000000000000
    Object.entries(details.c).forEach(([_, value]: [string, any]) => {
      mini = Math.min(mini, Math.min(...Object.values(value)?.map((val: any) => Math.floor(val))));
    })
    return mini;
  }

  const getMaxi = () => {
    let maxi = -1000000000000
    Object.entries(details.c).forEach(([_, value]: [string, any]) => {
      maxi = Math.max(maxi, Math.max(...Object.values(value)?.map((val: any) => Math.floor(val))));
    })
    return maxi;
  }

  const getComparisonSeries = () => {
    let series: Series[] = [];
    let domestic_counts = details.d?.map((entry: any) => (
      entry.dom_cnt
    ))

    let global_counts = details.d?.map((entry: any) => (
      entry.glob_cnt
    ))

    series.push({
      name: 'Domestic Counts',
      data: domestic_counts,
    });

    series.push({
      name: 'Global Counts',
      data: global_counts,
    });
    return series;
  }

  const getComparisonMini = () => {
    let domestic_counts = details.d?.map((entry: any) => (
      entry.dom_cnt
    ))
    let global_counts = details.d?.map((entry: any) => (
      entry.glob_cnt
    ))
    return Math.min(Math.min(...domestic_counts), Math.min(...global_counts));
  }

  const getComparisonMaxi = () => {
    let domestic_counts = details.d?.map((entry: any) => (
      entry.dom_cnt
    ))
    let global_counts = details.d?.map((entry: any) => (
      entry.glob_cnt
    ))
    return Math.max(Math.max(...domestic_counts), Math.max(...global_counts));
  }

  function evaluateCompanyGrowthStability(cagrExpense: number, cagrMarketShare: number, cagrRevenue: number, cagrStockPrice: number, erRatioMean: number, erRatioStdDev: number) {
    let growthComment = "";
    let stabilityComment = "";

    if (cagrRevenue > 0 && cagrMarketShare > 0 && cagrStockPrice > 0) {
      if (cagrRevenue > 15 && cagrMarketShare > 10 && cagrStockPrice > 10) {
        growthComment = "The company is experiencing strong growth across revenue, market share, and stock price.";
      } else if (cagrRevenue > 5 && cagrMarketShare > 5 && cagrStockPrice > 5) {
        growthComment = "The company is showing steady and moderate growth in revenue, market share, and stock price.";
      } else {
        growthComment = "The company is growing slowly, but there is positive movement in revenue, market share, and stock price.";
      }
    } else if (cagrRevenue < 0 || cagrMarketShare < 0 || cagrStockPrice < 0) {
      growthComment = "The company is facing challenges with declining growth in revenue, market share, or stock price.";
    }

    if (cagrExpense < cagrRevenue && erRatioMean < 50 && erRatioStdDev < 10) {
      stabilityComment = "The company is financially stable with controlled expenses, low E/R ratio, and consistent performance.";
    } else if (cagrExpense > cagrRevenue) {
      stabilityComment = "The company is growing, but rising expenses could threaten its long-term profitability.";
    } else if (erRatioMean > 70 || erRatioStdDev > 15) {
      stabilityComment = "The company faces instability due to high E/R ratio or volatility in expense management.";
    } else {
      stabilityComment = "The company's expense and revenue management is relatively stable, but it may face challenges in sustaining this over time.";
    }

    return `${growthComment} ${stabilityComment}`;
  }

  // useEffect(() => {
  //   getSeries()
  // }, [])

  return (
    <>
      {
        !loading ?
          Object.values(details).length !== 0 ?
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardDataNormal title={"Company Name"} sub_title='' value={details.company} />
                <CardDataNormal title={"Country Code"} sub_title='' value={details.country_code} />
                <CardDataNormal title={"Companies"} sub_title='in the same country' value={details.a} />
                <CardDataNormal title={"Companies with greater diversity"} sub_title='in the same country' value={details.b} />
              </div>

              <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartOne series={getSeries()} mini={getMini()} maxi={getMaxi()} />
                <ChartTwo series={getComparisonSeries()} mini={getComparisonMini()} maxi={getComparisonMaxi()} />
              </div>

              <div>
                <h2 className="text-2xl font-bold mt-4">Company Growth and Stability</h2>
                <p className='bg-white p-3 mt-4 rounded-md'>{evaluateCompanyGrowthStability(details.e.cagr_ratio.Expense * 100, details.e.cagr_ratio["Market Share"] * 100, details.e.cagr_ratio.Revenue * 100, details.e.cagr_ratio["Stock Price"] * 100, details.e.e_r_ratio[0] * 100, details.e.e_r_ratio[1] * 100)}</p>
              </div>

              {
                details.f &&
                <div className='mt-3'>
                  <h2 className='font-bold text-xl mb-3'>Predictions for next year</h2>
                  <div className='flex gap-4'>
                    {
                      Object.entries(details.f)?.map(([key, value]: [string, any]) => (
                        <CardDataStats title={key} total={value} />
                      ))
                    }
                  </div>
                </div>
              }
            </> :
            <div>
              No Data Found
            </div> :
          <Loader />
      }
    </>
  );
};

export default Company;
