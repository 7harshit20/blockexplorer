import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import axios from "axios";
import coseBilkent from "cytoscape-cose-bilkent";

cytoscape.use(coseBilkent);

const GraphComponent = () => {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchGraphData = async () => {
    const res = await axios.get(
      `https://api.blockchair.com/ethereum/transactions?q=recipient(0x4e7b110335511f662fdbb01bf958a7844118c0d4)&s=value_usd(desc)&limit=20`
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
    nodes.push({ data: { id: txs[0].recipient } });
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
      console.log("mouse over edge", edge);
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

  const addTxsOnClick = () => {
    cyRef.current.on("click", "node", (event) => {
      console.log("id of clicked node", event.target.id());
      navigator.clipboard.writeText(event.target.id());
      setLoading(true);
      const newTxs = axios
        .get(
          `https://api.blockchair.com/ethereum/transactions?q=recipient(${event.target.id()})&limit=20`
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
      console.log("id of clicked edge", event.target.id());
      navigator.clipboard.writeText(event.target.id());
    });
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  useEffect(() => {
    initialiseGraph();
    // cyRef.current.on("dblclick", "node", addTxsOnClick);
    addTxsOnClick();
    handleClickOnEdge();

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
    // cyRef.current.pan({
    //   x: 100,
    //   y: 100,
    // });
  };

  return (
    <div>
      {loading ? <div>Loading...</div> : null}
      <div ref={containerRef} style={{ height: "800px" }} />
      <button onClick={resetZoom}>Reset Zoom</button>
    </div>
  );
};

export default GraphComponent;
