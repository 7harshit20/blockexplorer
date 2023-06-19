const axios=require('axios')
const api_key_ct = 'G___SibJaTwQhtdvqyJAIB645NMQNA23';

const {Pool}=require('pg')
const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:'crypto-analysis',
    password:'Broadsword619',
    port:5432
});


const Blocks=[556460,556461,556462,556463,556464,556465,556466,556467,556468,556469,556470
];



async function getUnique(inputs){
   const array=[];
   inputs.map((input)=>{
     array.push(input.recipient);
   })

   const uniqueArray = [...new Set(array)];
   return Promise.resolve(uniqueArray);
}

async function Check(vis,uniqueAddress)
{
    uniqueAddress.map(async (add)=>{
        if(vis.has(add))
        {
            return Promise.resolve({result:true,index:vis.get(add)})
        }
        
    })

    return Promise.resolve({result:false,index:-1});
}


async function fetch(){
    const clustering=new Map();
    const vis=new Map();
    let key=-1;

await Promise.all(Blocks.map(async (block_no)=>{
    
 const response = await axios.get(
    `https://api.blockchair.com/bitcoin/dashboards/block/${block_no}?key=${api_key_ct}`
  );
  const transactions=response.data.data[block_no].transactions;
  

  await Promise.all(transactions.map(async(tx)=>{
    const res = await axios.get(
        `https://api.blockchair.com/bitcoin/dashboards/transaction/${tx}?key=${api_key_ct}`
      );
      const inputs=res.data.data[`${tx}`].inputs
      const uniqueAddress=await getUnique(inputs)
      if(uniqueAddress.length>1){

        if(key===-1)
        {
            clustering.set(key+1,uniqueAddress);
            key=key+1;
        }
        else{
    //   for(let i=0;i<uniqueAddress.length;i++){
        //console.log(key)
            const res=await Check(vis,uniqueAddress)
            if(res.result===true)
            {
                const newArray=[...uniqueAddress,...Array.from(clustering.get(res.index))];
                const uniqueNew=[...new Set(newArray)]
                clustering.set(res.index,uniqueNew)
                
            }
            else{
                clustering.set(key+1,uniqueAddress)
                key=key+1;
            }
          
      
    }
      
    }
    console.log(clustering)
  })
  )

  
})
)

// for(const[key,value] of clustering){
//     console.log(Array.from(value))
// }
for (const [key, value] of clustering) {
    const addresses = Array.from(value);
    console.log(key);
  
    // for (const address of addresses) {
    //   try {
    //     await pool.query('INSERT INTO test_cluster (address, cluster_no) VALUES ($1, $2)', [address, key]);
    //     console.log('Data inserted successfully');
    //   } catch (error) {
    //     console.error('Error executing query', error);
    //   }
    // }
  }
  

pool.end();

// pool.query('SELECT usename AS username, client_addr AS host FROM pg_stat_activity WHERE pid = pg_backend_pid()', (error, result) => {
//     if (error) {
//       console.error('Error executing query', error);
//       return;
//     }
  
//     const { username, host } = result.rows[0];
//     console.log(`Username: ${username}`);
//     console.log(`Host: ${host}`);
//   });


}


async function Clustering(){
 fetch()
//await addTodb()
console.log("Last")
}

Clustering()

