import React, {useEffect, useState} from "react";

function Now(props){

    const [currentTemp, setCurrentTemp] = useState({});

    useEffect(() => {
        async function fetchData(){
            if (props.selectedCity === "") {return}
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=77c5729e290843fd84e163402211601&q=${props.selectedCity}&days=3`);
            const jsonData = await response.json();
            const {current} = jsonData;
        
            setCurrentTemp({
                actual: current.temp_c,
                feelsLike: current.feelslike_c
            });
          }
        fetchData()
      }, [props.selectedCity]);

      return <div>
                <h1>Current Temperature: {currentTemp.actual}</h1>
                <h3>feels like: {currentTemp.feelsLike}</h3>
            </div>
}

export default Now;