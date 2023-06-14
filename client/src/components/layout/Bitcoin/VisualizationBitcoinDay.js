import axios from 'axios';
import react from 'react';
import { useEffect,useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

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
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function VisualizationBitcoinDay()
{
   const path=useParams()
   const navigate=useNavigate()
   console.log(path.day)
   const api_key_ct = 'G___SibJaTwQhtdvqyJAIB645NMQNA23';
   const[transactions,setTransactions]=useState([])
   const[transactionCount,setTransactionCount]=useState([])
   useEffect(()=>{
     async function fetch(){
      const res1=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 00:00:00..${path.day} 00:59:59)&key=${api_key_ct}`)
      const res2=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 01:00:00..${path.day} 01:59:59)&key=${api_key_ct}`)
      const res3=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 02:00:00..${path.day} 02:59:59)&key=${api_key_ct}`)
      const res4=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 03:00:00..${path.day} 03:59:59)&key=${api_key_ct}`)
      const res5=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 04:00:00..${path.day} 04:59:59)&key=${api_key_ct}`)
      const res6=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 05:00:00..${path.day} 05:59:59)&key=${api_key_ct}`)
      const res7=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 06:00:00..${path.day} 06:59:59)&key=${api_key_ct}`)
      const res8=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 07:00:00..${path.day} 07:59:59)&key=${api_key_ct}`)
      const res9=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 08:00:00..${path.day} 08:59:59)&key=${api_key_ct}`)
      const res10=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 09:00:00..${path.day} 09:59:59)&key=${api_key_ct}`)
      const res11=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 10:00:00..${path.day} 10:59:59)&key=${api_key_ct}`)
      const res12=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 11:00:00..${path.day} 11:59:59)&key=${api_key_ct}`)
      const res13=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 12:00:00..${path.day} 12:59:59)&key=${api_key_ct}`)
      const res14=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 13:00:00..${path.day} 13:59:59)&key=${api_key_ct}`)
      const res15=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 14:00:00..${path.day} 14:59:59)&key=${api_key_ct}`)
      const res16=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 15:00:00..${path.day} 15:59:59)&key=${api_key_ct}`)
      const res17=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 16:00:00..${path.day} 16:59:59)&key=${api_key_ct}`)
      const res18=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 17:00:00..${path.day} 17:59:59)&key=${api_key_ct}`)
      const res19=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 18:00:00..${path.day} 18:59:59)&key=${api_key_ct}`)
      const res20=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 19:00:00..${path.day} 19:59:59)&key=${api_key_ct}`)
      const res21=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 20:00:00..${path.day} 20:59:59)&key=${api_key_ct}`)
      const res22=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 21:00:00..${path.day} 21:59:59)&key=${api_key_ct}`)
      const res23=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 22:00:00..${path.day} 22:59:59)&key=${api_key_ct}`)
      const res24=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=sum(output_total_usd)&q=time(${path.day} 23:00:00..${path.day} 23:59:59)&key=${api_key_ct}`)
      const result=[]
      result.push(res1.data.data[0][`sum(output_total_usd)`])
      result.push(res2.data.data[0][`sum(output_total_usd)`])
      result.push(res3.data.data[0][`sum(output_total_usd)`])
      result.push(res4.data.data[0][`sum(output_total_usd)`])
      result.push(res5.data.data[0][`sum(output_total_usd)`])
      result.push(res6.data.data[0][`sum(output_total_usd)`])
      result.push(res7.data.data[0][`sum(output_total_usd)`])
      result.push(res8.data.data[0][`sum(output_total_usd)`])
      result.push(res9.data.data[0][`sum(output_total_usd)`])
      result.push(res10.data.data[0][`sum(output_total_usd)`])
      result.push(res11.data.data[0][`sum(output_total_usd)`])
      result.push(res12.data.data[0][`sum(output_total_usd)`])
      result.push(res13.data.data[0][`sum(output_total_usd)`])
      result.push(res14.data.data[0][`sum(output_total_usd)`])
      result.push(res15.data.data[0][`sum(output_total_usd)`])
      result.push(res16.data.data[0][`sum(output_total_usd)`])
      result.push(res17.data.data[0][`sum(output_total_usd)`])
      result.push(res18.data.data[0][`sum(output_total_usd)`])
      result.push(res19.data.data[0][`sum(output_total_usd)`])
      result.push(res20.data.data[0][`sum(output_total_usd)`])
      result.push(res21.data.data[0][`sum(output_total_usd)`])
      result.push(res22.data.data[0][`sum(output_total_usd)`])
      result.push(res23.data.data[0][`sum(output_total_usd)`])
      result.push(res24.data.data[0][`sum(output_total_usd)`])
      setTransactions(result)
     }
     fetch()
   },[])

   useEffect(()=>{
    async function fetch(){
     const res1=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 00:00:00..${path.day} 00:59:59)&key=${api_key_ct}`)
     const res2=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 01:00:00..${path.day} 01:59:59)&key=${api_key_ct}`)
     const res3=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 02:00:00..${path.day} 02:59:59)&key=${api_key_ct}`)
     const res4=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 03:00:00..${path.day} 03:59:59)&key=${api_key_ct}`)
     const res5=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 04:00:00..${path.day} 04:59:59)&key=${api_key_ct}`)
     const res6=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 05:00:00..${path.day} 05:59:59)&key=${api_key_ct}`)
     const res7=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 06:00:00..${path.day} 06:59:59)&key=${api_key_ct}`)
     const res8=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 07:00:00..${path.day} 07:59:59)&key=${api_key_ct}`)
     const res9=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 08:00:00..${path.day} 08:59:59)&key=${api_key_ct}`)
     const res10=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 09:00:00..${path.day} 09:59:59)&key=${api_key_ct}`)
     const res11=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 10:00:00..${path.day} 10:59:59)&key=${api_key_ct}`)
     const res12=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 11:00:00..${path.day} 11:59:59)&key=${api_key_ct}`)
     const res13=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 12:00:00..${path.day} 12:59:59)&key=${api_key_ct}`)
     const res14=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 13:00:00..${path.day} 13:59:59)&key=${api_key_ct}`)
     const res15=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 14:00:00..${path.day} 14:59:59)&key=${api_key_ct}`)
     const res16=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 15:00:00..${path.day} 15:59:59)&key=${api_key_ct}`)
     const res17=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 16:00:00..${path.day} 16:59:59)&key=${api_key_ct}`)
     const res18=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 17:00:00..${path.day} 17:59:59)&key=${api_key_ct}`)
     const res19=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 18:00:00..${path.day} 18:59:59)&key=${api_key_ct}`)
     const res20=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 19:00:00..${path.day} 19:59:59)&key=${api_key_ct}`)
     const res21=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 20:00:00..${path.day} 20:59:59)&key=${api_key_ct}`)
     const res22=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 21:00:00..${path.day} 21:59:59)&key=${api_key_ct}`)
     const res23=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 22:00:00..${path.day} 22:59:59)&key=${api_key_ct}`)
     const res24=await axios.get(`https://api.blockchair.com/bitcoin/transactions?a=date,count()&q=time(${path.day} 23:00:00..${path.day} 23:59:59)&key=${api_key_ct}`)
     const result=[]
     result.push(res1.data.data[0][`count()`])
     result.push(res2.data.data[0][`count()`])
     result.push(res3.data.data[0][`count()`])
     result.push(res4.data.data[0][`count()`])
     result.push(res5.data.data[0][`count()`])
     result.push(res6.data.data[0][`count()`])
     result.push(res7.data.data[0][`count()`])
     result.push(res8.data.data[0][`count()`])
     result.push(res9.data.data[0][`count()`])
     result.push(res10.data.data[0][`count()`])
     result.push(res11.data.data[0][`count()`])
     result.push(res12.data.data[0][`count()`])
     result.push(res13.data.data[0][`count()`])
     result.push(res14.data.data[0][`count()`])
     result.push(res15.data.data[0][`count()`])
     result.push(res16.data.data[0][`count()`])
     result.push(res17.data.data[0][`count()`])
     result.push(res18.data.data[0][`count()`])
     result.push(res19.data.data[0][`count()`])
     result.push(res20.data.data[0][`count()`])
     result.push(res21.data.data[0][`count()`])
     result.push(res22.data.data[0][`count()`])
     result.push(res23.data.data[0][`count()`])
     result.push(res24.data.data[0][`count()`])
     setTransactionCount(result)
    }
    fetch()
  },[])
   const labels=['00','01','02','03','04','05','06','07','08','09','10',11,12,13,14,15,16,17,18,19,20,21,22,23]
   const data={
    labels,
    datasets: [
        {
          label: 'Volume of transactions',
          data: transactions,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
  }

  const data2={
    labels,
    datasets: [
        {
          label: 'Number of transactions',
          data: transactionCount,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
  }

  const options = {
    onClick: (event, elements) => {
      console.log(event)
      console.log(elements)
      const index=elements[0].index;
      console.log(index);
      let hour=""
      if(labels[index]<=9)
      {
        hour='0'+labels[index]
      }
      else
      {
        hour=`${labels[index]}`
      }
      let start=`${path.day}`+' '+hour+':'+'00'+':'+'00'+'..'
      let end=`${path.day}`+' '+hour+':'+'59'+':'+'59'
      console.log(start)
      console.log(end);
      navigate(`/bitcoin/transactions?q=time(${start}${end})&key=${api_key_ct}`)
      // const chart = elements[0]._chart;
      // const element = chart.getElementAtEvent(event)[0];
      // const dataset = chart.data.datasets[element._datasetIndex];
      // const xLabel = chart.data.labels[element._index];
      // const value = dataset.data[element._index];
      // console.log(dataset.label + " at " + xLabel + ": " + value);
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Volume of Transactions every hour',
      },
      
    },
  };
   return (
    <>
    <Bar width={60} height={20} options={options} data={data}  /><br></br>
    <Bar width={60} height={20} options={{responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Transactions every hour',
      },
      
    }}} data={data2}  />
    </>
   )
}


export default VisualizationBitcoinDay