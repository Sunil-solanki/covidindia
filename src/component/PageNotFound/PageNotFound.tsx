import "./PageNotFound.css";
import logo from '../../Images/covid-logo.png';
const PageNotFound= () =>{
    return <div>
            <h1 className="pagenotfound"><img src={logo} alt='Covid-19 logo' /><br />Page you are looking for is not found!</h1>
            </div>
}
  
export default PageNotFound;