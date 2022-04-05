import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import './StateWiseData.css';
import logo from '../../Images/covid-logo.png';

const StateWiseData = () =>{
  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const covidData = async () => {
    setSpinner(true);
    const res = await fetch('https://api.rootnet.in/covid19-in/stats/latest');
    setSpinner(false);
    const responseData = await res.json();
    setData(responseData.data.regional);
  if(searchInput === ''){
  setFilteredResults(responseData.data.regional)
  }
  else{
    setFilteredResults(filteredResults)
  }
  
}

  useEffect(()=>{
    covidData();
  },[])

  if(spinner){
    return <div>{<Spinner />}</div>
  }

  const searchHandler=(e : any)=>{
    let value = e.target.value;
    const arr = value.split(" ");
    for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    const value2 = arr.join(" ");
    setSearchInput(value2);

    let filteredData = [];
    filteredData = data.filter((data : any) => {
    return data.loc.search(value2) !== -1;
    });
      setFilteredResults(filteredData)
  }
  return(
    <>
    <div  className="header-txt"><h1>Covid-19 INDIA State Wise Data</h1></div>
    <div className="header-txt"><input placeholder="Search by State" onChange={searchHandler}/></div>
    <div className="row m-0 p-5">
        <div className="col-12 col-md-12 overflow-auto data-table">
          <table className="table table-responsive table-hover">
            <thead className="t-head">
              <tr>
                <th scope="col">State</th>
                <th scope="col">Total Indian Cases</th>
                <th scope="col">Total Foreign Cases</th>
                <th scope="col">Discharged</th>
                <th scope="col">Deaths</th>
                <th scope="col">Total Confirmed Cases</th>
              </tr>
            </thead>
            <tbody>
             {filteredResults.length !==0 ? filteredResults.map((data : any, key) => (
                <tr key={key}>
                  <td>{data.loc}</td>
                  <td>{data.confirmedCasesIndian}</td>
                  <td>{data.confirmedCasesForeign}</td>
                  <td>{data.discharged}</td>
                  <td>{data.deaths}</td>
                  <td>{data.totalConfirmed}</td>
                </tr>
              )): <tr><td className="not-found-txt"><img src={logo} alt='Covid-19 logo' />{searchInput} State Not Found</td></tr>} 
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StateWiseData;
