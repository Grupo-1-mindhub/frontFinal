import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import { useState } from 'react';


export default function useSelect({ dato }) {
    const [age, setAge] = useState('');



    console.log(age)



    const handleChange = (event) => {


        setAge(event.target.value);
    };
    const tarjetas = [
        { nombre: "Santander", monto: 1000, id: 1 },
        { nombre: "UALA", monto: 750, id: 2 },
        { nombre: "cuenta dni", monto: 500, id: 3 }
    ];

    return (

        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label" style={{ color: '#ffff' }}>Bank</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange}
                style={{ color: '#ffff' }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {tarjetas.map((tarjeta) => (
                    <MenuItem key={tarjeta.nombre} value={tarjeta.id}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box>
                                {tarjeta.nombre}
                            </Box>
                            <Box>
                                ${tarjeta.monto}
                            </Box>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}