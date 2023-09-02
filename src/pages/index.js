import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useAuth } from 'src/hooks/use-auth';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const now = new Date();

const Page = () => {
  const [IncomeData, setIncomeData] = useState([]);
  const [BudgetData, setBudgetData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryLabels, setCategoryLabels] = useState([]);
  const [TransactionsData, setTransactionData]= useState([]);
  const auth = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = auth.user.token;
        const headers = {
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get('http://localhost:8001/api/clients/accounts/statistics/anual', { headers });
        const negativeTransactions = response.data.negativeTransactionsByMonth;
        const positiveTransactions = response.data.positiveTransactionsByMonth;

        const newGastos = [];
        const newIngresos = [];

        for (let i = 0; i < 12; i++) {
          const transaction = negativeTransactions.find(trans => trans.month === i + 1);
          newGastos[i] = transaction ? -transaction.amount : 0;
        }

        for (let i = 0; i < 12; i++) {
          const transaction = positiveTransactions.find(trans => trans.month === i + 1);
          newIngresos[i] = transaction ? transaction.amount : 0;
        }

        setBudgetData(newGastos);
        setIncomeData(newIngresos);
      } catch (error) {
        console.log(error);
        setBudgetData([]);
        setIncomeData([]);
      }
    }
    async function fetchDataCategorys(){
      
      try {
        const token = auth.user.token;
        const headers = {
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get('http://localhost:8001/api/clients/accounts/statistics/category', { headers });
        const groupedTransactions = response.data.groupedTransactions;
        const categories = [
          "GENERAL",
          "FOOD",
          "ENTERTAINMENT",
          "SERVICES",
          "SUPERMARKET",
          "TRANSPORT"
        ];
        const expenses = [];
   
        for (let i = 0; i < 6; i++) {
          const transaction = groupedTransactions.find(trans => trans.category === i + 1);
          expenses[i] = transaction ? -transaction.amount : 0;
        }
        
        const newData = categories.map((category, index) => ({
          name: category,
          value: expenses[index]
        }));
        setCategoryData(expenses)
        setCategoryLabels(categories)
      } catch (error) {
        console.log(error);
        setCategoryData([]);
        setCategoryLabels([])
      }
    }
    async function fetchTransactionsData(){
      try{
        const token = auth.user.token;
        const headers = {
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get('http://localhost:8001/api/clients/current/account/1/transactions', { headers });
        setTransactionData(response.data);

      }
      catch(error){
        console.log(error);
        setTransactionData([]);
      }
    }

    fetchData();
    fetchDataCategorys();
    fetchTransactionsData();
  }, [auth.user.token]);

  return(<>
    <Head>
      <title>
        Overview 
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          sx={{width:'100%'}}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k" /*El presupuesto que carga el usuario */
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k" /*total de transacciones de esa cuenta */
            />
          </Grid>
         
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'Income',
                  data: IncomeData
                },
                {
                  name: 'Expences',
                  data: BudgetData
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
            sx={{width:'100%'}}
          >
            <OverviewTraffic
              chartSeries={categoryData}
              labels={categoryLabels}
              sx={{ 
                height: '100%',
                maxWidth:'100%'
              }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              orders={TransactionsData}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;