import './Graph.css';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'
import { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

const Graph = () => {
  const [caseAxis, setCaseAxis] = useState([]);
  const [dateAxis, setDateAxis] = useState([]);
  const [stateCode, setStateCode] = useState('AN');
  const [stateNameData, setStateNameData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [defaultValue, setDefaultValue] = useState('');


  const data = {
    labels: dateAxis,
    datasets: [
      {
        label: "Covid-19 Cases",
        data: caseAxis,
        fill: false,
        borderColor: "#74201f",
        tension: 0.1,
      },
    ],
  };

  // api for date wise covid-19 cases
  const covidData = async () => {
    setSpinner(true)
    const res = await fetch('https://data.covid19india.org/v4/min/timeseries.min.json');
    setSpinner(false);
    const responseData = await res.json();
    const dates = [];
    const cases = [];
    for(const prop in responseData[stateCode].dates) {
      dates.push(prop);
      cases.push(responseData[stateCode].dates[prop].total.confirmed);
    }
    const yAxisCount = cases.map((c : any) => c);
    const xAxisCount = dates.map((d : any) => d);
    setCaseAxis(yAxisCount as any);
    setDateAxis(xAxisCount as any);
  }

  // api for state full names
  const covidStateData = async () => {
    const res = await fetch('https://api.rootnet.in/covid19-in/stats/latest');
    const responseData = await res.json();
    setStateNameData(responseData.data.regional);
  }

  useEffect(()=>{
    covidData();
    covidStateData();
  },[stateCode])

  if(spinner){
    return <div>{<Spinner />}</div>
  }

    const stateHandler = (e: any) => {
      let Value = e.target.value;
      setDefaultValue(Value);
      if(Value === "Andaman and Nicobar Islands"){
        setStateCode('AN')
      }
      else if(Value === "Andhra Pradesh"){
        setStateCode('AP')
      }
      else if(Value === "Arunachal Pradesh"){
        setStateCode('AR')
      }
      else if(Value === "Assam"){
        setStateCode('AS')
      }
      else if(Value === "Bihar"){
        setStateCode('BR')
      }
      else if(Value === "Chandigarh"){
        setStateCode('CH')
      }
      else if(Value === "Chhattisgarh"){
        setStateCode('CT')
      }
      else if(Value === "Dadra and Nagar Haveli and Daman and Diu"){
        setStateCode('DN')
      }
      else if(Value === "Delhi"){
        setStateCode('DL')
      }
      else if(Value === "Goa"){
        setStateCode('GA')
      }
      else if(Value === "Gujarat"){
        setStateCode('GJ')
      }
      else if(Value === "Haryana"){
        setStateCode('HR')
      }
      else if(Value === "Himachal Pradesh"){
        setStateCode('HP')
      }
      else if(Value === "Jharkhand"){
        setStateCode('JH')
      }
      else if(Value === "Jammu and Kashmir"){
        setStateCode('JK')
      }
      else if(Value === "Karnataka"){
        setStateCode('KA')
      }
      else if(Value === "Kerala***"){
        setStateCode('KL')
      }
      else if(Value === "Ladakh"){
        setStateCode('LA')
      }
      else if(Value === "Lakshadweep"){
        setStateCode('LD')
      }
      else if(Value === "Maharashtra"){
        setStateCode('MH')
      }
      else if(Value === "Meghalaya"){
        setStateCode('ML')
      }
      else if(Value === "Manipur"){
        setStateCode('MN')
      }
      else if(Value === "Madhya Pradesh"){
        setStateCode('MP')
      }
      else if(Value === "Mizoram"){
        setStateCode('MZ')
      }
      else if(Value === "Nagaland"){
        setStateCode('NL')
      }
      else if(Value === "Odisha"){
        setStateCode('OR')
      }
      else if(Value === "Punjab"){
        setStateCode('PB')
      }
      else if(Value === "Puducherry"){
        setStateCode('PY')
      }
      else if(Value === "Rajasthan"){
        setStateCode('RJ')
      }
      else if(Value === "Sikkim"){
        setStateCode('SK')
      }
      else if(Value === "Telangana"){
        setStateCode('TG')
      }
      else if(Value === "Tamil Nadu"){
        setStateCode('TN')
      }
      else if(Value === "Tripura"){
        setStateCode('TR')
      }
      else if(Value === "Uttarakhand"){
        setStateCode('TT')
      }
      else if(Value === "Andh Pradesh"){
        setStateCode('UN')
      }
      else if(Value === "Uttar Pradesh"){
        setStateCode('UP')
      }
      else if(Value === "Andhr Pradesh"){
        setStateCode('UT')
      }
      else{
        setStateCode('WB')
      }
    }  

  return (
    <>
      <div className='header-txt'><h1>Covid-19 INDIA Graph</h1></div>
      
      {/* State Select Dropdown */}
      <div  className='dropdown'>
      <select className='dropdown-select' onChange={stateHandler} defaultValue={defaultValue}>
        {stateNameData && stateNameData.map((st : any, index) => (<option value={st.loc} key={index}>{st.loc}</option>))}
      </select>
      </div>

      {/*Line Graph */}
      <div className="graph px-md-5 px-sm-0"><Line data={data} /></div>
    </>
  );
};
export default Graph;
