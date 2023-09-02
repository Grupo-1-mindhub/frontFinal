import React, { Component } from 'react';
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from 'recharts'
import axios from 'axios';


class EstadisticasCategorias extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
      };
    }

async componentDidMount() {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get('http://localhost:8001/api/clients/accounts/statistics/category', { headers });
      const groupedTransactions = response.data.groupedTransactions;
      const categorias =[
        "GENERAL",
        "COMIDA",
        "ENTRETENIMIENTO",
        "SERVICIOS",
        "SUPERMERCADO",
        "TRANSPORTE"
    ]
      const gastos = [];
   
      for (let i = 0; i < 6; i++) {
        const transaction = groupedTransactions.find(trans => trans.category === i + 1);
        gastos[i] = transaction ? - transaction.amount : 0;
      }
      const data = [];
      for (let i = 0; i < categorias.length; i++) {
        const objeto = {
          name: categorias[i],
          value: gastos[i]
        };
        data.push(objeto);
      }
      this.setState({ data});
      console.log(data)
      
    } catch (error) {
      console.log(error);
      this.setState({ data: []});
    }
  }

render ()  {
    const COLORS = ['#ce93d8', '#5c6bc0', '#b39ddb', '#4dd0e1', '#f48fb1', '#d500f9']

    const { data } = this.state;
 
    return (
        <div style={{ width: '100%', height: 400}}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="value" 
                        data={data}
                        innerRadius={60}
                        outerRadius={85}
                        fill="#82ca9d"
                    >
                       {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}     
                    </Pie>
                    <Tooltip />
                </PieChart>
    
            </ResponsiveContainer>
        </div>
      )
  };

}
 
export default EstadisticasCategorias;