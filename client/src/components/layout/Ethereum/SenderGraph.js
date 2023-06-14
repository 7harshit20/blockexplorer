import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import axios from "axios";
import coseBilkent from "cytoscape-cose-bilkent";
import { useParams, useLocation } from "react-router-dom";

cytoscape.use(coseBilkent);

const GraphComponent = () => {
  const { address } = useParams();
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const fetchGraphData = async () => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q");
    const s = queryParams.get("s");
    const res = await axios.get(
      `https://api.blockchair.com/ethereum/transactions?q=value_usd(1000000..),time(2020-05-20..)&s=time(asc)&limit=100`
    );
    console.log(res.data.data);
    setTxs(res.data.data);
  };

  const initialiseNodes = (txs) => {
    const nodes = [];
    if (txs.length === 0) return nodes;
    txs.forEach((tx) => {
      nodes.push({ data: { id: tx.sender } });
    });
    txs.forEach((tx) => {
      nodes.push({ data: { id: tx.recipient } });
    });
    return nodes;
  };

  const initialiseEdges = (txs) => {
    const edges = [];
    if (txs.length === 0) return edges;
    txs.forEach((tx) => {
      edges.push({
        data: {
          id: tx.hash,
          label: tx.hash,
          source: tx.sender,
          target: tx.recipient,
          weight: tx.value_usd,
        },
      });
    });
    return edges;
  };

  const initialiseGraph = () => {
    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: initialiseNodes(txs).concat(initialiseEdges(txs)),
      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            label: "", // Hide the label by default
            "text-opacity": 0,
          },
        },

        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#a8eb34",
            "target-arrow-color": "#34eb55",
            "target-arrow-shape": "triangle",
            "curve-style": "straight",
          },
        },
      ],
      layout: {
        layout: {
          name: "cose-bilkent", // Specify the layout algorithm (Cose-Bilkent in this example)
          // Other layout options can be defined here if needed
        },
      },
    });
    cyRef.current.on("mouseover", "node", (event) => {
      const node = event.target;
      node.style("label", node.id()); // Show the label on hovering
      node.style("text-opacity", 1);
    });

    cyRef.current.on("mouseout", "node", (event) => {
      const node = event.target;
      node.style("label", ""); // Hide the label when mouseout
      node.style("text-opacity", 0);
    });

    cyRef.current.on("mouseover", "edge", (event) => {
      const edge = event.target;
      edge.style(
        "label",
        `${edge.id().substring(0, 5)}...${edge
          .id()
          .substring(edge.id().length - 3)}, $${edge.data("weight")}`
      ); // Show the label on hovering
      edge.style("text-opacity", 1);
    });
    cyRef.current.on("mouseout", "edge", (event) => {
      const edge = event.target;
      edge.style("label", ""); // Hide the label when mouseout
      edge.style("text-opacity", 0);
    });
  };

  function hasCycle(cy, startNode) {
    var visited = new Set(); // Set to keep track of visited nodes
    var recursionStack = new Set(); // Set to keep track of nodes in recursion stack

    function dfs(node) {
      visited.add(node);
      recursionStack.add(node);

      var neighbors = node.neighborhood().nodes();
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (!visited.has(neighbor)) {
          if (dfs(neighbor)) {
            return true; // Cycle detected
          }
        } else if (recursionStack.has(neighbor)) {
          return true; // Cycle detected
        }
      }

      recursionStack.delete(node);
      return false;
    }

    return dfs(startNode);
  }

  function findCycles(cy) {
    var visited = new Set(); // Set to keep track of visited nodes
    var recursionStack = new Set(); // Set to keep track of nodes in recursion stack
    var cycles = []; // Array to store the cycles found

    function dfs(node, cycle) {
      visited.add(node);
      recursionStack.add(node);
      console.log(
        "node findning...",
        node.id(),
        "neighbors",
        node.outgoers().nodes()
      );
      var neighbors = node.outgoers().nodes();
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (!visited.has(neighbor)) {
          dfs(neighbor, [...cycle, neighbor]); // Pass the cycle path to the recursive call
        } else if (recursionStack.has(neighbor)) {
          // Cycle found
          var cycleNodes = [...cycle, neighbor];
          cycles.push(cycleNodes);
          for (var j = 0; j < cycleNodes.length; j++) {
            console.log("id", cycleNodes[j].id());
          }
        }
      }

      recursionStack.delete(node);
    }

    var nodes = cy.nodes();
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (!visited.has(node)) {
        dfs(node, [node]);
      }
    }

    return cycles;
  }

  function colorCycles(cy, cycles) {
    var colors = ["red", "blue", "green", "orange", "purple"]; // Array of colors for cycle highlighting

    for (var i = 0; i < cycles.length; i++) {
      var cycleNodes = cycles[i];
      var color = colors[i % colors.length];

      for (var j = 0; j < cycleNodes.length; j++) {
        var node = cycleNodes[j];
        node.style("background-color", "red");
      }
    }
  }

  const addTxsOnClick = () => {
    cyRef.current.on("click", "node", (event) => {
      // console.log("id of clicked node", event.target.id());
      navigator.clipboard.writeText(event.target.id());
      setLoading(true);
      const newTxs = axios
        .get(
          `https://api.blockchair.com/ethereum/transactions?q=sender(${event.target.id()})&limit=100`
        )
        .then((res) => {
          console.log(res.data.data);
          cyRef.current.add(
            initialiseNodes(res.data.data).concat(
              initialiseEdges(res.data.data)
            )
          );
          const layout = cyRef.current.layout({ name: "cose-bilkent" });
          layout.run();
          setLoading(false);
        });
    });
  };

  const handleClickOnEdge = () => {
    cyRef.current.on("click", "edge", (event) => {
      // console.log("id of clicked edge", event.target.id());
      navigator.clipboard.writeText(event.target.id());
    });
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  useEffect(() => {
    initialiseGraph();
    const layout = cyRef.current.layout({ name: "cose-bilkent" });
    layout.run();
    // cyRef.current.on("dblclick", "node", addTxsOnClick);
    addTxsOnClick();
    handleClickOnEdge();
    console.log(cyRef.current.nodes()[0]);
    // if (hasCycle(cyRef.current, cyRef.current.nodes()[0])) {
    //   console.log("Cycle detected");
    // } else {
    //   console.log("No cycle detected");
    // }
    const cycles = findCycles(cyRef.current);
    console.log("cycles", cycles);
    colorCycles(cyRef.current, cycles);

    // cyRef.current.on("click", "node", () => {
    //   cyRef.current.add([
    //     { group: "nodes", data: { id: "n0" } },
    //     {
    //       group: "nodes",
    //       data: { id: `${++cnt}` },
    //       position: { x: 200, y: 200 },
    //     },
    //     {
    //       group: "edges",
    //       data: { id: "e1", source: "two", target: "three" },
    //     },
    //   ]);
    // });

    return () => {
      cyRef.current && cyRef.current.destroy();
    };
  }, [txs]);

  const resetZoom = () => {
    cyRef.current.fit(); // Reset the zoom level of the graph to fit the viewport
  };

  return (
    <div>
      {loading ? <div>Loading...</div> : null}
      <div ref={containerRef} style={{ height: "1000px" }} />
      <button onClick={resetZoom}>Reset Zoom</button>
    </div>
  );
};

export default GraphComponent;
