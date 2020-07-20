import React, {useEffect, useContext, useState} from 'react';
import {Line} from 'react-chartjs-2';
import context from './context';
import {Bar} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default function Graphss(){
    const [global, setglob] = useContext(context)
    var [json,setjson] = useState([])
    var jjson = ''
    let [doosraa, setdoosra] = useState({})

    useEffect(()=>{
      const url = 'https://covid19.mathdro.id/api'
      const Fetchdata = async(u)=>{
        if(u == ''){
          const res = await fetch(`${url}/daily`)
          const jjson = await res.json()
          setjson(jjson)
        }else{
          // console.log("ala")
          // const res = await fetch(`${url}/countries/${global}`)
          // jjson = await res.json()
          // console.log(jjson)
          // if(jjson){
          //   setdoosra(jjson)
          // }
          // console.log(doosraa)
        }
      }
      if(global == 'global'){Fetchdata('')}else{Fetchdata(global)}
  },[global])


    if(global == 'global'){
        if(json)
        return (
            <div>
              <h2>Line Chart</h2>
              <Line height={90} data={{
                  labels: json.map((element)=>{return element.reportDate}),
                  datasets: [{
                      data: json.map((element)=>{return element.confirmed.total}),
                      label: 'Infected',
                      borderColor: '#3333ff',
                      fill: true,
                  },
                  {
                      data: json.map((element)=>{return element.deaths.total}),
                      label: 'Deaths',
                      borderColor: 'red',
                      fill: true,
                  },
                  {
                      data: json.map((element)=>{return element.recovered.total}),
                      label: 'Recovered',
                      borderColor: 'green',
                      fill: true,
                  }]
              }} />
            </div>
          );
    }else{
        // if(doosra.confirmed.value)
        return (
          ''
            // <h2>Bar Chart</h2>
            // <div>
            //   <h2>Bar Chart</h2>
            //   <Bar
            //     data={{
            //         labels: ['Infected','Recovered','Deaths'],
            //         datasets: [{
            //             label: 'People',
            //             backgroundColor: [
            //                 '#3333ff',
            //                 'red',
            //                 'green',
            //             ],
            //             data: [json.confirmed.value,json.recovered.value,json.deaths.value],
            //         }]
            //     }}
            //     width={100}
            //     height={50}
            //     options={{
            //       maintainAspectRatio: false
            //     }}
            //   />
            // </div>
          );
    }
}