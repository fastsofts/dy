"use client";
import { use, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DataItem } from "../../dataType";
import { RootState } from "../../store/store";
import { Chart } from "chart.js/auto";
import Highcharts from "highcharts";
import Select from "react-select";
import Insight from '../../components/Insights'

interface filteritems {
  value: string;
  label: string;
}

const ChartGenerate = ({ params }: { params: { id: string } }) => {
  const { id } = use(params);
  const { items, loading, error } = useSelector(
    (state: RootState) => state.data
  );
  const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
  const chartjsRef = useRef<Chart | null>(null);
  const highchartRef = useRef<HTMLDivElement | null>(null);
  const filteritems: filteritems[] = [];
  const [updatedfilterdata, setUpdatedFilterData] = useState({
    values: [],
    labels: [],
  });
  const chartjsdefn = useRef<Chart | null>(null);
  const highchartdefn = useRef<Highcharts.Chart | null>(null);
  const [svgData,setSvgData] = useState('')


  useEffect(() => {
    if (
      chartjsRef.current &&
      filteredItems.length > 0 &&
      filteredItems[0].chart === "chartjs"
    ) {
      const title = `${filteredItems[0].title}${
        filteredItems[0].filter.length > 0 ? " - " : ""
      }${filteredItems[0].filter.length > 0 ? filteredItems[0].default : ""}`;
      const labels: string[] = [];
      if (filteredItems[0].default && filteredItems[0].filter.length > 0) {
        filteredItems[0].filter.forEach((filter: string) => {
          filteritems.push({ value: filter, label: filter });
        });
        Object.keys(filteredItems[0].data[filteredItems[0].default]).forEach(
          (key) => {
            if (filteredItems[0].split) {
              let newVal = "";
              const rval = key.split(" ");
              for (let rv = 1; rv < rval.length; rv++) {
                newVal += rval[rv] + " ";
              }
              labels.push(newVal);
            } else {
              labels.push(key);
            }
          }
        );
      } else {
        Object.keys(filteredItems[0].data).forEach((key) => {
          if (filteredItems[0].split) {
            let newVal = "";
            const rval = key.split(" ");
            console.log(rval);
            for (let rv = 1; rv < rval.length; rv++) {
              newVal += rval[rv] + " ";
            }
            labels.push(newVal);
          } else {
            labels.push(key);
          }
        });
      }
      const values: number[] = [];
      if (filteredItems[0].default && filteredItems[0].filter.length > 0) {
        Object.keys(filteredItems[0].data[filteredItems[0].default]).forEach(
          (key) => {
            values.push(filteredItems[0].data[filteredItems[0].default][key]);
          }
        );
      } else {
        Object.keys(filteredItems[0].data).forEach((key) => {
          values.push(filteredItems[0].data[key]);
        });
      }
      chartjsdefn.current = new Chart(chartjsRef.current, {
        type: filteredItems[0].type,
        data: {
          labels: labels,
          datasets: [
            {
              label: filteredItems[0].title,
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)", // Red
                "rgba(54, 162, 235, 0.2)", // Blue
                "rgba(255, 205, 86, 0.2)", // Yellow
                "rgba(75, 192, 192, 0.2)", // Green
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)", // Red border
                "rgba(54, 162, 235, 1)", // Blue border
                "rgba(255, 205, 86, 1)", // Yellow border
                "rgba(75, 192, 192, 1)", // Green border
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            title: {
              display: true,
              text: title,
            },
          },
        },
      });
      return () => {
        if (chartjsdefn.current) {
          console.log(chartjsRef.current);
          chartjsdefn.current.destroy();
          chartjsdefn.current = null;
        }
      };
    }
  }, [filteredItems, filteritems]);

  useEffect(() => {
    if (
      highchartRef.current &&
      filteredItems.length > 0 &&
      filteredItems[0].chart === "highchart"
    ) {
      console.log(filteredItems);
      const title = `${filteredItems[0].title}${
        filteredItems[0].filter.length > 0 ? " - " : ""
      }${filteredItems[0].filter.length > 0 ? filteredItems[0].default : ""}`;
      let labels: string[] = [];
      if (filteredItems[0].default && filteredItems[0].filter.length > 0) {
        Object.keys(filteredItems[0].data[filteredItems[0].default]).forEach(
          (key) => {
            if (filteredItems[0].split) {
              let newVal = "";
              const rval = key.split(" ");
              for (let rv = 1; rv < rval.length; rv++) {
                newVal += rval[rv] + " ";
              }
              labels.push(newVal);
            } else {
              labels.push(key);
            }
          }
        );
      } else {
        Object.keys(filteredItems[0].data).forEach((key) => {
          if (filteredItems[0].split) {
            let newVal = "";
            const rval = key.split(" ");
            for (let rv = 1; rv < rval.length; rv++) {
              newVal += rval[rv] + " ";
            }
            labels.push(newVal);
          } else {
            labels.push(key);
          }
        });
      }
      const values: string[] = [];
      if (filteredItems[0].type === "pie") {
        labels = [];
        if (filteredItems[0].default && filteredItems[0].filter.length > 0) {
          Object.keys(filteredItems[0].data[filteredItems[0].default]).forEach(
            (key) => {
              if (filteredItems[0].split) {
                let newVal = "";
                const rval = key.split(" ");
                for (let rv = 1; rv < rval.length; rv++) {
                  newVal += rval[rv] + " ";
                }
                values.push({
                  name: newVal,
                  y: filteredItems[0].data[filteredItems[0].default][key],
                });
              } else {
                values.push({
                  name: key,
                  y: filteredItems[0].data[filteredItems[0].default][key],
                });
              }
            }
          );
        } else {
          Object.keys(filteredItems[0].data).forEach((key) => {
            if (filteredItems[0].split) {
              let newVal = "";
              const rval = key.split(" ");
              for (let rv = 1; rv < rval.length; rv++) {
                newVal += rval[rv] + " ";
              }
              values.push({ name: newVal, y: filteredItems[0].data[key] });
            } else {
              values.push({ name: key, y: filteredItems[0].data[key] });
            }
          });
        }
      } else {
        if (filteredItems[0].default && filteredItems[0].filter.length > 0) {
          Object.keys(filteredItems[0].data[filteredItems[0].default]).forEach(
            (key) => {
              values.push({ name: key, y: filteredItems[0].data[filteredItems[0].default][key] });
//              values.push(filteredItems[0].data[filteredItems[0].default][key]);
            }
          );
        } else {
          Object.keys(filteredItems[0].data).forEach((key) => {
            values.push({ name: key, y: filteredItems[0].data[key] });
//            values.push(filteredItems[0].data[key]);
          });
        }
      }
      console.log(values);
      highchartdefn.current = Highcharts.chart(highchartRef.current, {
        chart: {
          type: filteredItems[0].type,
        },
        title: {
          text: title, 
        },
        xAxis: {
          categories: labels,
          title: {
            text: "", 
          },
        },
        yAxis: {
          title: {
            text: "", 
          },
        },
        series: [
          {
            name: title, 
            data: values, 
          },
        ],
        dataLabels: {
          enabled: true,
        },
      });
      return () => {
        if (highchartdefn.current) {
          highchartdefn.current.destroy();
          highchartdefn.current = null;
        }        
      };
    }
  }, [filteredItems]);

  useEffect(() => {
    if (
      filteredItems.length > 0 &&
      filteredItems[0].chart === "svg"
    ) {
      setSvgData(filteredItems[0].data.svg)
    }  
  }, [filteredItems]);     

  useEffect(() => {
    if (items) {
      const filtered = items.filter((item) => item.id === Number(id));
      console.log(filtered);
      setFilteredItems((prevState) => [...prevState, ...filtered]);
    }
  }, [items, id]);

  useEffect(() => {
    if (chartjsRef.current && updatedfilterdata.values.length > 0) {
      console.log(updatedfilterdata);
      const chart = chartjsdefn.current;
      chart.data.labels = updatedfilterdata.labels;
      chart.data.datasets[0].data = updatedfilterdata.values;
      chart.update();
    }
  }, [updatedfilterdata]);

  const changeData = (e: any, filteredItems: DataItem[]) => {
    const labels: string[] = [];
    console.log(filteredItems);
    Object.keys(filteredItems.data[e.value]).forEach((key) => {
      if (filteredItems.split) {
        let newVal = "";
        const rval = key.split(" ");
        for (let rv = 1; rv < rval.length; rv++) {
          newVal += rval[rv] + " ";
        }
        labels.push(newVal);
      } else {
        labels.push(key);
      }
    });
    const values: number[] = [];
    Object.keys(filteredItems.data[e.value]).forEach((key) => {
      values.push(filteredItems.data[e.value][key]);
    });
    setUpdatedFilterData({ values: values, labels: labels });
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {filteredItems &&
      filteredItems.length > 0 &&
      filteredItems[0].filter.length > 0 ? (
        <div className="dropdown">
          <Select
            options={filteritems}
            onChange={(e) => changeData(e, filteredItems[0])}
            defaultValue={filteredItems[0].default}
            value={filteritems.value}
          />
        </div>
      ) : null}
      {filteredItems &&
      filteredItems.length > 0 &&
      filteredItems[0].chart === "chartjs" ? (
        <div>
          <canvas
            width="500"
            height="300"
            className="chartstyle"
            ref={chartjsRef}
          ></canvas>
        </div>
      ) : filteredItems &&
        filteredItems.length > 0 &&
        filteredItems[0].chart === "highchart" ? (
        <div
          id="higchart"
          className="chartstyle"
          ref={highchartRef}
          style={{ width: "100%", height: "50vh" }}
        ></div>
      ) : (
        filteredItems &&
        filteredItems.length > 0 &&
        filteredItems[0].chart === "svg" ? (   
          <div className="svglayout" dangerouslySetInnerHTML={{ __html: svgData}}/>  
        ):(  
          <div>No chart available</div>
        )  
      )}
      {filteredItems &&
        filteredItems.length > 0 && filteredItems[0] && Object.keys(filteredItems[0].insights).length > 0 ? (
          <Insight item = {filteredItems[0].insights}/>
        ):(
          null
        )
      }
    </>
  );
};

export default ChartGenerate;
