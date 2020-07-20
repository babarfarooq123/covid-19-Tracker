import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, Typography} from '@material-ui/core';
import context from './context';
import {Bar} from 'react-chartjs-2';
import Pickcountry from './pickCountry';

const useStyles = makeStyles((theme) => ({
    root: {
    //   flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginTop: 5,
      boxShadow: '4px 4px 4px 4px #efefef',
    },
    typo: {
        color: "black"
    },
}));

function Numbers(){
    var [json,setjson] = useState('')
    const [global, setglob] = useContext(context)
    console.log(global+" hello")
    const classes = useStyles();
 
    useEffect(()=>{
        const url = 'https://covid19.mathdro.id/api'
        const Fetchdata = async(u)=>{
          if(u == ''){
            const res = await fetch(url)
            const jjson = await res.json()
            setjson(jjson)
          }else{
            console.log("ala")
            const res = await fetch(`${url}/countries/${global}`)
            const jjson = await res.json()
            setjson(jjson)
          }
        }
        if(global == 'global'){Fetchdata('')}else{Fetchdata(global)}
    },[global])
if(!json.confirmed){return("Loading...")}else
    return (
        <div className={classes.root}>
          <Grid container spacing={3} direction={"row"} justify={"center"}>
            <Grid item xs={12} sm={6} lg={3}>
              <Paper className={classes.paper}>
              <Typography variant="h6" component="h2" className={classes.typo}>Infected</Typography>
              <Typography variant="subtitle1" component="h2">{json.confirmed.value}</Typography>
              <Typography variant="subtitle1" component="h2">{new Date(json.lastUpdate).toDateString()}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Paper className={classes.paper}>
              <Typography variant="h6" component="h2" className={classes.typo}>Deaths</Typography>
              <Typography variant="subtitle1" component="h2">{json.deaths.value}</Typography>
              <Typography variant="subtitle1" component="h2">{new Date(json.lastUpdate).toDateString()}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Paper className={classes.paper}>
              <Typography variant="h6" component="h2" className={classes.typo}>Recovered</Typography>
              <Typography variant="subtitle1" component="h2">{json.recovered.value}</Typography>
              <Typography variant="subtitle1" component="h2">{new Date(json.lastUpdate).toDateString()}</Typography>
                </Paper>
            </Grid>
          </Grid>

          <Pickcountry />

          {/* {console.log(json)} */}
          {global != 'global' ? (
            // <h2>Bar Chart</h2>
            <div>
              <h2>Bar Chart</h2>
              <Bar
               data={{
                   labels: ['Infected','Recovered','Deaths'],
                   datasets: [{
                       label: 'Covid-19 Graph of '+global,
                       backgroundColor: [
                           '#3333ff',
                           'red',
                           'green',
                       ],
                       data: [json.confirmed.value,json.recovered.value,json.deaths.value],
                   }]
               }}
               width={100}
               height={200}
               options={{
                 maintainAspectRatio: false
               }}
             />
           </div>
          ) : ''}
          

        </div>
    );
}

export default Numbers