import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const Marker = ({ text }) => <div>{text}</div>;
 
class CovidMap extends Component {
  constructor(props){
    super(props);
    this.state ={
      Covid: [],
      country: '',
      confirmed: '',
      recovered: '',
      critical: '',
      deaths: '',
      latitude: '',
      longitude: '',
      isLoading: false,
    }
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

  getCountryDatabyName(name){
    const encodedURL = encodeURIComponent(name);
    fetch("https://covid-19-data.p.rapidapi.com/country?format=undefined&name="+encodedURL, {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		    "x-rapidapi-key": "34bd11e989msh39e775948fdba82p1d191ajsna92920e8f23c"
	    },
    })
    .then(response => response.json().then((result)=>{
      console.log(result)
    }))
    .catch(err => {
	    console.log(err);
    });
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

    if (this.state.Covid){
      const listItems = this.state.Covid.map((item,index)=>
      <div key={index} style={{float: 'left', padding: '20px', borderStyle: 'solid', textAlign: 'center'}}>
        <div style={{width: '200px', height: '50px'}}>
            <h3>{item.country}</h3>
        </div>
        <div>Confirmed: {item.confirmed} </div>
        <div>Recovered: {item.recovered} </div>
        <div>Critical: {item.critical} </div>
        <div>Deaths: {item.deaths} </div>
      </div>);
    return (
      <div>
        <div style={{ height: '50vh', width: '50vw' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCz_OE36IuPr4x31shAoamjs1sFzOMqyvU' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={59.955413}
              lng={30.337844}
              text="M"
            />
          </GoogleMapReact>
        </div>
        <div>
          {listItems}
        </div>
      </div>
    );
  }
}
}
export default CovidMap;