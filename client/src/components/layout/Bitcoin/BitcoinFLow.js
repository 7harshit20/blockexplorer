import ReactFlow, { Controls, Background,applyNodeChanges,applyEdgeChanges,ConnectionLineType, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import {useState,useCallback,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { searchTransactions } from '../../../apis/bitcoin';
import dagre from 'dagre'


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 60;
const nodeHeight = 16;

const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};



function BitcoinFlow() {

    

    const [nodes,setNodes]=useState([])
    const[edges,setEdges]=useState([]);
    const[hoveredNode,setHoveredNode]=useState(null)
    const {transaction}=useParams()
    console.log(transaction)
    const [hoveredEdge,setHoveredEdge]=useState(null)
    useEffect(()=>{
      async function fetch()
      {
          const res=await searchTransactions(transaction)
          const intitalNodes=[
            {
            id:transaction,
            elementType:"node",
            position:{x:500,y:500},
            data:{hash:transaction},
            style:{backgroundColor:'blue',width:"2%",borderRadius:'50%'},
            
            }
            ]
            const initialEdges=[]
            res.inputs.map((input)=>{
              intitalNodes.push({
                id:input.transaction_hash,
                elementType:"node",
                position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
                data:{hash:input.transaction_hash},
                style:{backgroundColor:'white',width:'2%',borderRadius:'50%'}
              })

              initialEdges.push({
                id:`${transaction}-${input.transaction_hash}-${Math.random()}`,
                source:input.transaction_hash,
                target:transaction,
                style:{strokeWidth:Math.min(10,Math.max(input.value/1e9,1)),arrowHeadType:'arrow'},
                animated:true,
                data:input.recipient,
              
              })
            })

            res.outputs.map((output)=>{
              if(output.is_spent===true) {
              intitalNodes.push({
                id:output.spending_transaction_hash,
                elementType:"node",
                position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
                data:{hash:output.spending_transaction_hash},
                style:{backgroundColor:'white',width:'2%',borderRadius:'50%'}
              })

              initialEdges.push({
                id:`${output.spending_transaction_hash}-${transaction}-${Math.random()}`,
                target:output.spending_transaction_hash,
                source:transaction,
                style:{strokeWidth:Math.min(10,Math.max(output.value/1e9,1)),arrowHeadType:'arrow'},

                data:output.recipient,
                type:  'smoothstep', animated: true
              })
            }

            else{
              
              let ID=Date.now().toString()+Math.random();
              console.log(ID)
              intitalNodes.push({
                id:ID,
                elementType:"node",
                position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
                data:{hash:ID},
                style:{backgroundColor:'black',width:"2%",borderRadius:'50%'}
              })

              initialEdges.push({
                id:`${ID}-${transaction}`,
                target:ID,
                source:transaction,
                style:{arrowHeadType:'arrow'},
           
                type:  'smoothstep', animated: true
              })
            }

            
            })
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
              intitalNodes,
              initialEdges
            );
            setNodes(layoutedNodes)
            setEdges(layoutedEdges)
      }
      fetch()
      
    },[])
  

  
  

 
  
  // console.log(nodes)
  // console.log(edges)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const NodeisPresent=(nodeId)=>{
    return nodes.some((node) => node.id === nodeId);
  }
  const onNodeClick=(async (event,node)=>{
    //const { offsetX, offsetY } = event;
    if(node.style.backgroundColor!=='blue'){
    console.log(nodes)
  console.log(edges)
    const initialNodes=[...nodes]
    const initialEdges=[...edges]
    
    // console.log(initialNodes)
    // console.log("A")
    // console.log(initialEdges)
    let obj=nodes.find((n,i)=>{
      if(nodes[i].id===node.id)
      {
       nodes[i].style={backgroundColor:'blue',width:"2%",borderRadius:'50%'}
       return true;
      }
    })
    const res=await searchTransactions(node.id);
    
    res.inputs.map((input)=>{
      
      if(NodeisPresent(input.transaction_hash)===false){
        console.log("AA")
      initialNodes.push({
        id:input.transaction_hash,
        elementType:"node",
        position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
        data:{hash:input.transaction_hash,},
        style:{width:"2%",borderRadius:'50%'}
      })

      initialEdges.push({
        id:`${node.id}-${input.transaction_hash}-${Date.now().toString()}-${Math.random()}`,
        source:input.transaction_hash,
        target:node.id,
        style:{strokeWidth:Math.min(10,Math.max(input.value/1e9,1)),arrowHeadType:'arrow'},
        
        data:input.recipient,
        type:  'smoothstep', animated: true
      })

      }
      
    })

    res.outputs.map((output)=>{
      console.log("Y")
      if(output.is_spent===true){
        console.log("BB");
      if(NodeisPresent(output.spending_transaction_hash)===false) {
      initialNodes.push({
        id:output.spending_transaction_hash,
        elementType:"node",
        position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
        data:{hash:output.spending_transaction_hash},
        style:{width:"2%",borderRadius:'50%'}
      })

      initialEdges.push({
        id:`${output.spending_transaction_hash}-${node.id}-${Date.now().toString()}-${Math.random()}`,
        target:output.spending_transaction_hash,
        source:node.id,
        style:{strokeWidth:Math.min(10,Math.max(output.value/1e9,1)),arrowHeadType:'arrow'},
        
        data:output.recipient,
        type:  'smoothstep', animated: true
      })
    }

    else{
      
      console.log("X")
      initialEdges.push({
        id:`${output.spending_transaction_hash}-${node.id}-${Date.now().toString()}-${Math.random()}`,
        target:output.spending_transaction_hash,
        source:node.id,
        style:{strokeWidth:Math.min(10,Math.max(output.value/1e9,1)),arrowHeadType:'arrow'},
        
        data:output.recipient,
        type:  'smoothstep', animated: true
      })
    }
    }
    else
    {
      let ID=Date.now().toString()+Math.random();
      console.log(ID)
      initialNodes.push({
        id:ID,
        elementType:"node",
        position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
        data:{hash:ID},
        style:{backgroundColor:'black',width:"2%",borderRadius:'50%'}
      })

      initialEdges.push({
        id:`${ID}-${node.id}`,
        target:ID,
        source:node.id,
        style:{arrowHeadType:'arrow'},
    
      })
    }

    
    })

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );
    setNodes(layoutedNodes)
    setEdges(layoutedEdges)
    }
   
})

const onLayout = useCallback(
  (direction) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      direction
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  },
  [nodes, edges]
);
  const onNodeMouseEnter=(event,node)=>{
    setHoveredNode(node)
  }

  // const onNodeMouseLeave=(event,node)=>{
  //   setHoveredNode(null)
  // }

  
  return (<>
  
   
    {hoveredNode && (
      <div style={{position:"left"}}>
        <h6>TransactionHash: {hoveredNode.data.hash}</h6>
      
        {/* Render additional data for the hovered node */}
      </div>
    )}
    <br></br>  <div style={{ height: '1000px',width:'100%' }}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}  onNodeClick={onNodeClick} connectionLineType={ConnectionLineType.SmoothStep}
      fitView onNodeMouseEnter={onNodeMouseEnter} >
        <Background />
        <Controls />
       
        <Panel position="top-right">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>
    
      </ReactFlow>
      
    </div></>
  );
}

export default BitcoinFlow;
