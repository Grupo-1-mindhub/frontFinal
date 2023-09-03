import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import { Divider } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { useEffect } from 'react';


export default function useSelect() {
    const auth = useAuth();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        //console.log(auth.user.currentAccountId)
        setAge(event.target.value);
        auth.user.currentAccountId = age;
        console.log(age)
    };


    return (
        
        <div>
            <FormControl variant="filled" sx={{ m: 1, minWidth: '100%', textAlign: 'center' }}>
                <InputLabel id="demo-simple-select-filled-label" style={{ color: '#ffff' }}>Current Account</InputLabel>
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
                    {auth.user.accounts.map((account) => (
                        <MenuItem key={account.description} value={account.id}>
                            <Box sx={{display:'flex',flexDirection:'column'}}>
                                <Box>
                                    {account.description}
                                </Box>
                                <Box>
                                </Box>
                                <Box>
                                    ${account.balance}
                                </Box>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
        
    );
}