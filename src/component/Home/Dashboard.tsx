import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import './Dashboard.css'
import logo from '../../Images/covid-logo.png';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [totalConfirmed, setTotalConfirmed] = useState('');
    const [totalDeaths, setTotalDeaths] = useState('');
    const [totalDischarged, setTotalDischarged] = useState('');
    const [newConfirmed, setNewConfirmed] = useState('');
    const [newDeaths, setNewDeaths] = useState('');
    const [date, setDate] = useState('');
    const [spinner, setSpinner] = useState(true);

    const covidIndiaData = async () => {
        setSpinner(true);
        const newres = await fetch('https://api.covid19api.com/summary');
        const res = await fetch('https://api.rootnet.in/covid19-in/stats/latest');
        setSpinner(false);
        const responseData = await res.json();
        const newresponseData = await newres.json();
        const Data = (responseData.data.summary)
        setData(Data)
        setTotalConfirmed(Data.total);
        setTotalDeaths(Data.deaths);
        setTotalDischarged(Data.discharged);
        setNewConfirmed(newresponseData.Countries[77].NewConfirmed);
        setNewDeaths(newresponseData.Countries[77].NewDeaths);
        setDate(responseData.lastOriginUpdate);
      }
      useEffect(()=>{
        covidIndiaData();
      },[])

      if(spinner){
        return <div>{<Spinner />}</div>
      }
      if (data.length === 0) {
        return <h1 className="error-txt"><img src={logo} alt='Covid-19 logo' /><br />No Data Found!!</h1>
      }

return (
    <>
    <div className ='header-txt'>
        <h1>Covid-19 INDIA Cases Update</h1>
        <h5 style={{color: '#1d5a5a'}}>{`Last Updated on : ${date.slice(0, 10)}`}</h5>
    </div>
    <div className="new">
      <h3>New Cases : <span>{newConfirmed}</span></h3>
      <h3>New Deaths : <span>{newDeaths}</span></h3>
    </div>

    <div className="row dashboard mb-5 mx-0 ms-md-5 ms-sm-3">
    <div className="col">
    <Card>
    <h1>Total Cases</h1>
    <span>{totalConfirmed}</span>
    </Card>
    </div>
    <div className="col">
    <Card>
    <h1>Total Deaths</h1>
    <span>{totalDeaths}</span>
    </Card>
    </div>
    <div className="col">
    <Card>
    <h1>Total Discharged</h1>
    <span>{totalDischarged}</span>
    </Card>
    </div>
    </div>
    </>
    );
}
export default Dashboard;