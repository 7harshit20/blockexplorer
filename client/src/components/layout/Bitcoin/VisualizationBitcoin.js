import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

 
  


export function VisualizationBitcoin() {
  const [transactionCount,setTransactionCount]=useState([])
  const[labels,setLabels]=useState([])
  const [transactionSum,setTransactionSum]=useState([])
  const navigate=useNavigate()
  function createData(data) {
    return data ;
  }
  useEffect(()=>{
    async function getData(){
        const res=await axios.get(`
            https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(2023-05-08..)`
        )
        console.log(res)
        setTransactionCount(res.data.data.map((count)=>{
           return createData(count['count()']);
        }))

        setLabels(res.data.data.map((date)=>{
            return createData(date.date)
        }))

    }
    getData()
  },[])

  useEffect(()=>{
    const date = new Date();

   let day = date.getDate();
   let month = date.getMonth() + 1;
   let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    async function getData(){
        const res=await axios.get(`
           https://api.blockchair.com/bitcoin/transactions?a=date,sum(output_total_usd)&q=time(2023-05-08..)`
        )
        console.log(res)
        setTransactionSum(res.data.data.map((count)=>{
           return createData(count['sum(output_total_usd)']);
        }))

        setLabels(res.data.data.map((date)=>{
            return createData(date.date)
        }))

    }
    getData()
  },[])  
  // console.log(transactionCount)
  // console.log(transactionSum)
  const data={
    labels,
    datasets: [
        {
          label: 'Number of transactions',
          data: transactionCount,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
  }

  const data2={
    labels,
    datasets: [
        {
          label: 'Volume of transactions',
          data: transactionSum,
          backgroundColor: 'rgba(55, 99, 132, 0.5)',
        }
      ],
  }

  const options = {
    responsive: true,
    onClick: (event, elements) => {
      console.log(event)
      console.log(elements)
      const index=elements[0].index;
      console.log(index);
      navigate(`/bitcoin/visualization/${labels[index]}`)
      // const chart = elements[0]._chart;
      // const element = chart.getElementAtEvent(event)[0];
      // const dataset = chart.data.datasets[element._datasetIndex];
      // const xLabel = chart.data.labels[element._index];
      // const value = dataset.data[element._index];
      // console.log(dataset.label + " at " + xLabel + ": " + value);
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
      
    },
  };
  return (<>
    
          <Bar width={60} height={20} options={options} data={data}  />
          <br></br>
          <Bar width={60} height={20} options={options} data={data2} />
  </>)
}