import React, { Component } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme();
class GastosAnuales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gastos: [],
      ingresos: []
    };
  }

 
  async componentDidMount() {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get('http://localhost:8001/api/clients/accounts/statistics/anual', { headers });
      const negativeTransactions = response.data.negativeTransactionsByMonth;
      const positiveTransactions = response.data.positiveTransactionsByMonth;

      const gastos = [];
      const ingresos = [];

      for (let i = 0; i < 12; i++) {
        const transaction = negativeTransactions.find(trans => trans.month === i + 1);
        gastos[i] = transaction ? -transaction.amount : 0;
      }

      for (let i = 0; i < 12; i++) {
        const transaction = positiveTransactions.find(trans => trans.month === i + 1);
        ingresos[i] = transaction ? transaction.amount : 0;
      }

      this.setState({ gastos, ingresos });
      console.log(gastos)
      console.log(ingresos)
    } catch (error) {
      console.log(error);
      this.setState({ gastos: [], ingresos: [] });
    }
  }






  render() {
    const { gastos, ingresos } = this.state;
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const data = months.map((month, index) => ({
      name: month,
      gastos: gastos[index],
      ingresos: ingresos[index],
    }));

    const maxDataValue = Math.max(
      ...data.map(entry => Math.max(entry.gastos, entry.ingresos))
    );

    return (
      <ThemeProvider theme={defaultTheme}>  
            <Container component="main" >
                <CssBaseline />
                <Box sx={{ width:'100%' }}>
                <Container sx={{ display: 'flex flex-wrap', flexDirection: 'row', justifyContent: 'space-evenly',alignItems:'center'}} >
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                          domain={[0, maxDataValue]}
                          tickFormatter={value => `${value / 1000}K`}
                        />
                        <Tooltip formatter={value => new Intl.NumberFormat('es-ES').format(value)} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="gastos"
                          name="Gastos"
                          stroke="#f26c6d"
                          strokeWidth={2}
                          dot={{ strokeWidth: 2, r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="ingresos"
                          name="Ingresos"
                          stroke="#4caf50"
                          strokeWidth={2}
                          dot={{ strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  </Container>
              </Box>
          </Container>
    </ThemeProvider>
    );
  }
}

export default GastosAnuales;
