import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import context from './context';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    marginTop: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Pickcountry() {
  const classes = useStyles();

  const handleChange = (event) => {
    //   setting up the global country pick by the user
    setglob(event.target.value)
    const name = event.target.name;
  };

  const [countries, setcoutries] = useState([])
  const [global, setglob] = useContext(context)

  useEffect(()=>{
    async function fetchfunc(){
        const res = await fetch('https://covid19.mathdro.id/api/countries')
        let json = await res.json()
        setcoutries(json.countries)
    }
    fetchfunc()
    },[])
    if(!countries){return 'Loading...'
console.log(countries)
}else
  return (
    <div>
      <FormControl className={classes.formControl}>
        <NativeSelect
          onChange={handleChange}
        >
            <option key={'global'} value = {'global'}>Global</option>
            {countries.map((element) => {
               return <option key={element.name} value = {element.name}>{element.name}</option>
            })}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default Pickcountry