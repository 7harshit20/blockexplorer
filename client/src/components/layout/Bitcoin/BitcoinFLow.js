import ReactFlow, { Controls, Background,applyNodeChanges,applyEdgeChanges,ConnectionLineType,
  Panel,Handle,
  useNodesState,
  useEdgesState, } from 'reactflow';
import 'reactflow/dist/style.css';
import {useState,useCallback,useEffect} from 'react';
import { searchTransactions } from '../../../apis/bitcoin';
import dagre from 'dagre'

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 10;
const nodeHeight = 16;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
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
    const [hoveredEdge,setHoveredEdge]=useState(null)
    useEffect(()=>{
      async function fetch()
      {
          const res=await searchTransactions('61496f70f57cc826af8aa7c22c546029242fd24f3269d9683815f3bc1bd66a25')
          const intitalNodes=[
            {
            id:'61496f70f57cc826af8aa7c22c546029242fd24f3269d9683815f3bc1bd66a25',
            elementType:"node",
            position:{x:500,y:500},
            data:{hash:'61496f70f57cc826af8aa7c22c546029242fd24f3269d9683815f3bc1bd66a25'},
            style:{backgroundColor:'blue',width:"2%"},
            
            }
            ]
            const initialEdges=[]
            res.inputs.map((input)=>{
              intitalNodes.push({
                id:input.transaction_hash,
                elementType:"node",
                position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
                data:{hash:input.transaction_hash},
                style:{backgroundColor:'white',width:'2%'}
              })

              initialEdges.push({
                id:`61496f70f57cc826af8aa7c22c546029242fd24f3269d9683815f3bc1bd66a25-${input.transaction_hash}`,
                source:input.transaction_hash,
                target:'61496f70f57cc826af8aa7c22c546029242fd24f3269d9683815f3bc1bd66a25',
                style:{arrowHeadType:'arrow'},
        
                type: 'smoothstep', animated: true
              })
            })

            res.outputs.map((output)=>{
              if(output.is_spent===true) {
              intitalNodes.push({
                id:output.spending_transaction_hash,
                elementType:"node",
                position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
                data:{hash:output.spending_transaction_hash},
                style:{backgroundColor:'white',width:'2%'}
              })

              initialEdges.push({
                id:`${output.spending_transaction_hash}-61496f70f57cc826af8aa7c22c546029242fd24f3269d9683815f3bc1bd66a25`,
                target:output.spending_transaction_hash,
                source:'61496f70f57cc826af8aa7c22c546029242fd24f3269d9683815f3bc1bd66a25',
                style:{arrowHeadType:'arrow'},
            
                type:  'smoothstep', animated: true
              })
            }

            else{
              const ID=Date.now().toString();
              intitalNodes.push({
                id:ID,
                elementType:"node",
                position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
                data:{hash:ID},
                style:{backgroundColor:'black',width:"2%"}
              })

              initialEdges.push({
                id:`${ID}-61496f70f57cc826af8aa7c22c546029242fd24f3269d9683815f3bc1bd66a25`,
                target:ID,
                source:'61496f70f57cc826af8aa7c22c546029242fd24f3269d9683815f3bc1bd66a25',
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
    console.log(nodes)
  console.log(edges)
    const initialNodes=[...nodes]
    const initialEdges=[...edges]
    
    console.log(initialNodes)
    console.log("A")
    console.log(initialEdges)
    let obj=nodes.find((n,i)=>{
      if(nodes[i].id===node.id)
      {
       nodes[i].style={backgroundColor:'blue',width:"2%"}
       return true;
      }
    })
    const res=await searchTransactions(node.id);

    res.inputs.map((input)=>{

      if(NodeisPresent(input.transaction_hash)===false){
      initialNodes.push({
        id:input.transaction_hash,
        elementType:"node",
        position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
        data:{hash:input.transaction_hash},
        style:{width:"2%"}
      })

      initialEdges.push({
        id:`${node.id}-${input.transaction_hash}`,
        source:input.transaction_hash,
        target:node.id,
        style:{arrowHeadType:'arrow'},
    
        type:  'smoothstep', animated: true
      })

      }
      else
      {
        console.log(true);
      }
    })

    res.outputs.map((output)=>{
      if(NodeisPresent(output.transaction_hash)===false){
      if(output.is_spent===true) {
      initialNodes.push({
        id:output.spending_transaction_hash,
        elementType:"node",
        position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
        data:{hash:output.spending_transaction_hash},
        style:{width:"2%"}
      })

      initialEdges.push({
        id:`${output.spending_transaction_hash}-${node.id}`,
        target:output.spending_transaction_hash,
        source:node.id,
        style:{arrowHeadType:'arrow'},
        
        type:  'smoothstep', animated: true
      })
    }

    else{
      const ID=Date.now().toString();
      initialNodes.push({
        id:ID,
        elementType:"node",
        position:{x:Math.floor(Math.random() * 800),y:Math.floor(Math.random() * 500)},
        data:{hash:ID},
        style:{backgroundColor:'black',width:"2%"}
      })

      initialEdges.push({
        id:`${ID}-${node.id}`,
        target:ID,
        source:node.id,
        style:{arrowHeadType:'arrow'},
    
      })
    }
    }
    else
    {
      console.log("AA")
    }

    
    })

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );
    setNodes(layoutedNodes)
    setEdges(layoutedEdges)
   
})

// const onLayout = useCallback(
//   (direction) => {
//     const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
//       nodes,
//       edges,
//       direction
//     );

//     setNodes([...layoutedNodes]);
//     setEdges([...layoutedEdges]);
//   },
//   [nodes, edges]
// );
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

{hoveredEdge && (
      <div style={{position:"right"}}>
        <h6>TransactionHash: {hoveredEdge.id}</h6>
      
        {/* Render additional data for the hovered node */}
      </div>
    )} 
    <div style={{ height: '1000px',width:'100%' }}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}  onNodeClick={onNodeClick} connectionLineType={ConnectionLineType.SmoothStep}
      fitView onNodeMouseEnter={onNodeMouseEnter} >
        <Background />
        <Controls />
        <Panel position="top-right">
       
      </Panel>
      </ReactFlow>
      
    </div></>
  );
}

export default BitcoinFlow;
