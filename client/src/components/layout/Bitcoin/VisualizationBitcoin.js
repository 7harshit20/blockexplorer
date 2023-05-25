import React from 'react';
import { useEffect,useState,useRef } from 'react';
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
  const [date,setDate]=useState('')
  const [transactionSum,setTransactionSum]=useState([])
  const navigate=useNavigate()

  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };
  function createData(data) {
    return data ;
  }
  useEffect(()=>{
    async function getData(){
        const res=await axios.get(`
            https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${date}..)`
        )
        console.log(res)
        setTransactionCount(res.data.data.map((count)=>{
           return createData(count['count()']);
        }))

        setLabels(res.data.data.map((date)=>{
            return createData(date.date)
        }))

    }
    if(date!==''&&date.length===10){getData()}
  },[date])

  useEffect(()=>{
    
    async function getData(){
        const res=await axios.get(`
           https://api.blockchair.com/bitcoin/transactions?a=date,sum(output_total_usd)&q=time(${date}..)`
        )
        console.log(res)
        setTransactionSum(res.data.data.map((count)=>{
           return createData(count['sum(output_total_usd)']);
        }))

        setLabels(res.data.data.map((date)=>{
            return createData(date.date)
        }))

    }
    if(date!==''&&date.length===10){getData()}
  },[date])  
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
          <div>
      <input
        type="date"
        onChange={handleChange}
        ref={dateInputRef}
      />
      <p>Selected  Date {date}</p>
    </div>
     {date!==''&&(<>
          <Bar width={60} height={20} options={options} data={data}  />
          <br></br>
          <Bar width={60} height={20} options={options} data={data2} />
     </>)
       }
  </>)
}