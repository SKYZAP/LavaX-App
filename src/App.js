import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
  
class CovidMap extends Component {
  constructor(props){
    super(props);
    this.state ={
      Covid: [],
      isLoading: false,
      Totals: [],
      Country: [],
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({isLoading: true})
    fetch("https://covid-19-data.p.rapidapi.com/country/all?format=undefined", {
      "method": "GET",
	    "headers": {
		   "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		   "x-rapidapi-key": "34bd11e989msh39e775948fdba82p1d191ajsna92920e8f23c"
	    }
    })
    .then(response => response.json().then((result)=>{
      this.setState({Covid: result, isLoading: false});
    }))
    .catch(err => {
	    console.log(err);
    });
  }

  fetchTotals(){
    fetch("https://covid-19-data.p.rapidapi.com/totals?format=undefined", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		    "x-rapidapi-key": "34bd11e989msh39e775948fdba82p1d191ajsna92920e8f23c"
	    }
    })
    .then(response => response.json().then((result)=>{
      this.setState({Totals: result});
    }))
    .catch(err => {
	    console.log(err);
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
}

  handleSubmit(event) {
    const encodedURL = encodeURIComponent(this.state.value);
    console.log(encodedURL);
    fetch("https://covid-19-data.p.rapidapi.com/country?format=undefined&name="+encodedURL, {
    "method": "GET",
	  "headers": {
		  "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		  "x-rapidapi-key": "34bd11e989msh39e775948fdba82p1d191ajsna92920e8f23c"
	  }
  })
  .then(response => response.json().then((result)=>{
    this.setState({Country: result});
    console.log(this.state.Country);
  }))
  .catch(err => {
	  console.log(err);
  });
    event.preventDefault();
  }

  showData(){
    console.log(this.state.Covid[1].country);
    console.log(this.state.Covid[1].confirmed)
    console.log(this.state.Covid[1].critical)
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

 
  render() {
    const countrylocation = this.state.Covid.map((data,i)=>{
      return(
        <div lat={data.latitude}
        lng={data.longitude}
        style={{
          color: "red",
          backgroundColor: "#FFF",
          height: "25px",
          width: "35px",
          textAlign: "center",
          borderRadius: "30%",
        }}>
          Total <br></br>
        {data.confirmed}
        </div>
      )
    });
      
    if (this.state.Covid && this.state.Totals){
      const listItems = this.state.Covid.map((item,index)=>
      <div key={index} style={{float: 'left', padding: '20px', borderStyle: 'solid', textAlign: 'center'}}>
        <div style={{width: '190px', height: '50px'}}>
            <h3>{item.country}</h3>
        </div>
        <div>Confirmed: {item.confirmed} </div>
        <div>Recovered: {item.recovered} </div>
        <div>Critical: {item.critical} </div>
        <div>Deaths: {item.deaths} </div>
      </div>);
      
      const listTotal = this.state.Totals.map((item,index)=>
      <div>
        <div style={{
          padding: "10px",
          backgroundColor: "#FFA500",
        }}>Confirmed: {item.confirmed}</div>
        <div style={{
          padding: "10px",
          backgroundColor: "green",
        }}>Recovered: {item.recovered}</div>
        <div style={{
          padding: "10px",
          backgroundColor: "#B22222",
        }}>Critical: {item.critical}</div>
        <div style={{
          padding: "10px",
          backgroundColor: "grey",
        }}>Deaths: {item.deaths}</div>
      </div>
      );
      const listCountryz = this.state.Country.map((data,i)=>{
        return <div style={{textAlign:"center"}}>
          <div>CONFIRMED:{data.confirmed}</div>
          <div>RECOVERED:{data.recovered}</div>
          <div>CRITICAL: {data.critical}</div>
          <div>DEATHS: {data.deaths}</div>
        </div>
      })
    return (
      <div>
        <h1 style={{
          height: "50px",
          width: "100%",
          textAlign: "center",
          padding: "20px",
          margin: "0px",
          borderColor: "black",
          borderStyle: "solid",
        }}>
          Covid 19 Stats
        </h1>
        <div style={{ height: '70vh', width: '50vw', borderstyle:"solid" , float:"left"}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCz_OE36IuPr4x31shAoamjs1sFzOMqyvU' }}
            defaultCenter={{lat: 3.519863 , lng: 101.538116}}
            defaultZoom={5}
          >
           {countrylocation}
          </GoogleMapReact>
        </div>
        <div className="TotalInfoWrapper" style={{width:"49vw", height: "200px", float:"left", textAlign:"center", margin: "0px", padding: "0px"}}>
            <div style={{fontSize:"30px"}}>Total : {listTotal}</div>
            <p></p>
            <button style={{fontSize: "30px"}} onClick={()=>this.fetchTotals()}>Update Totals</button>
            <p></p>
            <div style={{width: "49vw", fontSize:"30px"}}>
            <form onSubmit={this.handleSubmit}>
            <label>
            Country Search: &nbsp;
            <input type="text" value={this.state.value} style={{fontSize: "30px"}} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" style={{fontSize: "30px"}} />
            <div>{listCountryz}</div>
            </form>
            </div>
        </div>  
        <div style={{overflow: "hidden", float:"left"}}>
          {listItems}
        </div>
      </div>
    );
  }
}
}
export default CovidMap;