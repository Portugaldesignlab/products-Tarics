import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────
//  TARIC DATA — categories, products, codes
// ─────────────────────────────────────────────
const TARIC_DATA = [
  {
    id: "s01", section: "I", label: "Live Animals & Animal Products",
    color: "#E8956D", glyph: "🐄",
    categories: [
      { id: "c01", code: "0101", name: "Live Horses, Asses, Mules",
        products: [
          { id: "p001", name: "Live Horse", code: "0101 21 00", sub: "Pure-bred breeding animals" },
          { id: "p002", name: "Live Donkey", code: "0101 30 00", sub: "Domestic asses" },
        ]
      },
      { id: "c02", code: "0201", name: "Meat of Bovine Animals",
        products: [
          { id: "p003", name: "Fresh Beef Carcass", code: "0201 10 00", sub: "Whole or half carcasses" },
          { id: "p004", name: "Boneless Beef", code: "0201 30 00", sub: "Fresh or chilled" },
        ]
      },
      { id: "c03", code: "0302", name: "Fresh Fish",
        products: [
          { id: "p005", name: "Atlantic Salmon", code: "0302 11 80", sub: "Fresh or chilled" },
          { id: "p006", name: "Tuna, Skipjack", code: "0302 35 10", sub: "For industrial processing" },
        ]
      },
    ]
  },
  {
    id: "s02", section: "II", label: "Vegetable Products",
    color: "#6DBF8E", glyph: "🌾",
    categories: [
      { id: "c04", code: "0601", name: "Bulbs, Tubers, Roots",
        products: [
          { id: "p007", name: "Tulip Bulb", code: "0601 10 10", sub: "Dormant bulbs" },
          { id: "p008", name: "Hyacinth Bulb", code: "0601 10 30", sub: "For floriculture" },
        ]
      },
      { id: "c05", code: "0901", name: "Coffee",
        products: [
          { id: "p009", name: "Green Coffee", code: "0901 11 00", sub: "Not roasted, not decaffeinated" },
          { id: "p010", name: "Roasted Coffee", code: "0901 21 00", sub: "Not decaffeinated" },
          { id: "p011", name: "Decaf Roasted Coffee", code: "0901 22 00", sub: "Roasted, decaffeinated" },
        ]
      },
      { id: "c06", code: "1001", name: "Wheat & Meslin",
        products: [
          { id: "p012", name: "Durum Wheat", code: "1001 11 00", sub: "Seed grain" },
          { id: "p013", name: "Common Wheat", code: "1001 99 00", sub: "Other wheat types" },
        ]
      },
    ]
  },
  {
    id: "s03", section: "VI", label: "Chemical Products",
    color: "#6D9BE8", glyph: "⚗️",
    categories: [
      { id: "c07", code: "2801", name: "Halogens, Sulphur",
        products: [
          { id: "p014", name: "Chlorine Gas", code: "2801 10 00", sub: "Industrial grade" },
          { id: "p015", name: "Iodine", code: "2801 20 00", sub: "Pharmaceutical grade" },
        ]
      },
      { id: "c08", code: "2933", name: "N-function Compounds",
        products: [
          { id: "p016", name: "Aspirin (ASA)", code: "2933 19 90", sub: "Acetylsalicylic acid" },
          { id: "p017", name: "Caffeine", code: "2939 51 00", sub: "Pure alkaloid" },
        ]
      },
    ]
  },
  {
    id: "s04", section: "XI", label: "Textiles & Clothing",
    color: "#C46DE8", glyph: "👗",
    categories: [
      { id: "c09", code: "5101", name: "Wool, Fine Animal Hair",
        products: [
          { id: "p018", name: "Greasy Merino Wool", code: "5101 11 00", sub: "Shorn wool" },
          { id: "p019", name: "Cashmere Fibre", code: "5102 11 00", sub: "Raw cashmere" },
        ]
      },
      { id: "c10", code: "6101", name: "Men's Overcoats",
        products: [
          { id: "p020", name: "Wool Overcoat", code: "6101 20 10", sub: "Knitted, men's" },
          { id: "p021", name: "Cotton Jacket", code: "6101 30 10", sub: "Knitted, men's" },
        ]
      },
      { id: "c11", code: "6109", name: "T-Shirts & Singlets",
        products: [
          { id: "p022", name: "Cotton T-Shirt", code: "6109 10 00", sub: "100% cotton knit" },
          { id: "p023", name: "Synthetic T-Shirt", code: "6109 90 20", sub: "Man-made fibres" },
        ]
      },
    ]
  },
  {
    id: "s05", section: "XV", label: "Base Metals",
    color: "#E8D56D", glyph: "⚙️",
    categories: [
      { id: "c12", code: "7201", name: "Pig Iron & Spiegeleisen",
        products: [
          { id: "p024", name: "Non-alloy Pig Iron", code: "7201 10 11", sub: "P ≤ 0.5%" },
          { id: "p025", name: "Alloy Pig Iron", code: "7201 50 10", sub: "Titanium or vanadium" },
        ]
      },
      { id: "c13", code: "7308", name: "Steel Structures",
        products: [
          { id: "p026", name: "Steel Bridge Section", code: "7308 10 00", sub: "Bridges & bridge sections" },
          { id: "p027", name: "Tower Structure", code: "7308 20 00", sub: "Towers, lattice masts" },
        ]
      },
      { id: "c14", code: "7601", name: "Unwrought Aluminium",
        products: [
          { id: "p028", name: "Aluminium Ingot", code: "7601 10 00", sub: "Non-alloy" },
          { id: "p029", name: "Aluminium Alloy", code: "7601 20 20", sub: "Primary alloy" },
        ]
      },
    ]
  },
  {
    id: "s06", section: "XVI", label: "Machinery & Electronics",
    color: "#E86D6D", glyph: "💻",
    categories: [
      { id: "c15", code: "8471", name: "Computers",
        products: [
          { id: "p030", name: "Laptop Computer", code: "8471 30 00", sub: "Portable, weight ≤ 10 kg" },
          { id: "p031", name: "Server Unit", code: "8471 41 00", sub: "Processing unit" },
          { id: "p032", name: "Tablet Computer", code: "8471 30 00", sub: "Battery-operated portable" },
        ]
      },
      { id: "c16", code: "8517", name: "Telephones & Phones",
        products: [
          { id: "p033", name: "Smartphone", code: "8517 13 00", sub: "Cellular networks" },
          { id: "p034", name: "VoIP Phone", code: "8517 18 00", sub: "Other telephone sets" },
        ]
      },
      { id: "c17", code: "8525", name: "Transmission Apparatus",
        products: [
          { id: "p035", name: "Webcam", code: "8525 80 19", sub: "Digital cameras" },
          { id: "p036", name: "CCTV Camera", code: "8525 80 91", sub: "Security cameras" },
        ]
      },
      { id: "c18", code: "8544", name: "Insulated Wire & Cables",
        products: [
          { id: "p037", name: "USB Cable", code: "8544 42 90", sub: "Fitted with connectors" },
          { id: "p038", name: "Coaxial Cable", code: "8544 20 00", sub: "Coaxial electric conductors" },
        ]
      },
    ]
  },
  {
    id: "s07", section: "XVII", label: "Vehicles & Transport",
    color: "#6DD4E8", glyph: "🚗",
    categories: [
      { id: "c19", code: "8703", name: "Passenger Cars",
        products: [
          { id: "p039", name: "Electric Car", code: "8703 80 10", sub: "Purely electric" },
          { id: "p040", name: "Hybrid Car", code: "8703 40 10", sub: "Plug-in hybrid" },
          { id: "p041", name: "Diesel Car", code: "8703 22 19", sub: "< 1500cc engine" },
        ]
      },
      { id: "c20", code: "8711", name: "Motorcycles",
        products: [
          { id: "p042", name: "Electric Motorcycle", code: "8711 60 10", sub: "Power ≤ 4 kW" },
          { id: "p043", name: "Scooter", code: "8711 10 00", sub: "Engine ≤ 50cc" },
        ]
      },
      { id: "c21", code: "8802", name: "Aircraft",
        products: [
          { id: "p044", name: "Commercial Airliner", code: "8802 40 00", sub: "Unladen weight > 15000 kg" },
          { id: "p045", name: "Drone (UAV)", code: "8802 11 00", sub: "Remotely piloted" },
        ]
      },
    ]
  },
  {
    id: "s08", section: "XVIII", label: "Optical & Precision Instruments",
    color: "#E8A06D", glyph: "🔬",
    categories: [
      { id: "c22", code: "9001", name: "Optical Fibres & Lenses",
        products: [
          { id: "p046", name: "Optical Fibre", code: "9001 10 90", sub: "Fibre optic cables" },
          { id: "p047", name: "Contact Lens", code: "9001 30 00", sub: "Contact lenses" },
        ]
      },
      { id: "c23", code: "9006", name: "Cameras",
        products: [
          { id: "p048", name: "Digital SLR Camera", code: "9006 52 00", sub: "With through-lens viewfinder" },
          { id: "p049", name: "Instant Camera", code: "9006 53 00", sub: "Other cameras" },
        ]
      },
    ]
  },
  {
    id: "s09", section: "XX", label: "Miscellaneous Manufactured Articles",
    color: "#B0E86D", glyph: "🪑",
    categories: [
      { id: "c24", code: "9401", name: "Seats & Seating",
        products: [
          { id: "p050", name: "Office Chair", code: "9401 30 00", sub: "Swivel seats" },
          { id: "p051", name: "Garden Chair", code: "9401 69 80", sub: "Other seats, plastic" },
          { id: "p052", name: "Car Seat", code: "9401 20 00", sub: "Motor vehicle seats" },
        ]
      },
      { id: "c25", code: "9503", name: "Toys & Games",
        products: [
          { id: "p053", name: "Video Game Console", code: "9504 50 00", sub: "Video game consoles" },
          { id: "p054", name: "Board Game", code: "9504 90 80", sub: "Other games" },
          { id: "p055", name: "Toy Car", code: "9503 00 21", sub: "Miniature cars" },
        ]
      },
    ]
  },
];

// Flatten for search
const ALL_PRODUCTS = TARIC_DATA.flatMap(s => 
  s.categories.flatMap(c => 
    c.products.map(p => ({
      ...p,
      categoryId: c.id,
      categoryCode: c.code,
      categoryName: c.name,
      sectionId: s.id,
      sectionLabel: s.label,
      sectionColor: s.color,
      sectionGlyph: s.glyph,
    }))
  )
);

const ALL_CATEGORIES = TARIC_DATA.flatMap(s =>
  s.categories.map(c => ({
    ...c,
    sectionId: s.id,
    sectionLabel: s.label,
    sectionColor: s.color,
    sectionGlyph: s.glyph,
  }))
);

// ─────────────────────────────────────────────
//  LAYOUT ENGINE — deterministic positions
// ─────────────────────────────────────────────
function buildLayout() {
  const nodes = [];
  const edges = [];

  // Center hub
  nodes.push({ id: "hub", type: "hub", x: 0, y: 0, label: "TARIC", sublabel: "EU Trade Nomenclature" });

  TARIC_DATA.forEach((section, si) => {
    const sAngle = (si / TARIC_DATA.length) * Math.PI * 2 - Math.PI / 2;
    const sR = 520;
    const sx = Math.cos(sAngle) * sR;
    const sy = Math.sin(sAngle) * sR;

    nodes.push({
      id: section.id, type: "section",
      x: sx, y: sy,
      label: `§ ${section.section}`,
      sublabel: section.label,
      color: section.color,
      glyph: section.glyph,
    });
    edges.push({ id: `e-hub-${section.id}`, from: "hub", to: section.id, type: "section", color: section.color });

    section.categories.forEach((cat, ci) => {
      const spread = Math.PI / 3.5;
      const cAngle = sAngle + (ci - (section.categories.length - 1) / 2) * (spread / Math.max(section.categories.length, 1));
      const cR = 980;
      const cx = Math.cos(cAngle) * cR;
      const cy = Math.sin(cAngle) * cR;

      nodes.push({
        id: cat.id, type: "category",
        x: cx, y: cy,
        label: cat.code,
        sublabel: cat.name,
        color: section.color,
        sectionId: section.id,
      });
      edges.push({ id: `e-${section.id}-${cat.id}`, from: section.id, to: cat.id, type: "category", color: section.color });

      cat.products.forEach((prod, pi) => {
        const pSpread = Math.PI / 7;
        const pAngle = cAngle + (pi - (cat.products.length - 1) / 2) * (pSpread / Math.max(cat.products.length, 1));
        const pR = 1380;
        const px = Math.cos(pAngle) * pR;
        const py = Math.sin(pAngle) * pR;

        nodes.push({
          id: prod.id, type: "product",
          x: px, y: py,
          label: prod.name,
          sublabel: prod.code,
          color: section.color,
          categoryId: cat.id,
          data: { ...prod, categoryName: cat.name, sectionLabel: section.label },
        });
        edges.push({ id: `e-${cat.id}-${prod.id}`, from: cat.id, to: prod.id, type: "product", color: section.color });
      });
    });
  });

  return { nodes, edges };
}

const { nodes: NODES, edges: EDGES } = buildLayout();

const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]));

// ─────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────
export default function TaricPlatform() {
  const canvasRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.38 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlightedIds, setHighlightedIds] = useState(new Set());
  const [showPanel, setShowPanel] = useState(false);
  const [panelData, setPanelData] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Center on hub
    const w = window.innerWidth;
    const h = window.innerHeight;
    setTransform({ x: w / 2, y: h / 2, scale: 0.38 });
    setTimeout(() => setMounted(true), 100);
  }, []);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHighlightedIds(new Set());
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = ALL_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.sectionLabel.toLowerCase().includes(q) ||
      p.sub.toLowerCase().includes(q)
    ).slice(0, 12);
    setSearchResults(results);

    // Highlight matched nodes + their ancestors
    const ids = new Set();
    results.forEach(r => {
      ids.add(r.id);
      ids.add(r.categoryId);
      ids.add(r.sectionId);
      ids.add("hub");
    });
    setHighlightedIds(ids);
  }, [searchQuery]);

  // Navigate to node
  const flyTo = useCallback((nodeId) => {
    const node = nodeMap[nodeId];
    if (!node) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const targetScale = 1.1;
    setTransform({
      x: w / 2 - node.x * targetScale,
      y: h / 2 - node.y * targetScale,
      scale: targetScale,
    });
  }, []);

  const selectResult = useCallback((prod) => {
    setSearchQuery(prod.name);
    setSearchOpen(false);
    setSelected(prod.id);
    flyTo(prod.id);
    const ids = new Set([prod.id, prod.categoryId, prod.sectionId, "hub"]);
    setHighlightedIds(ids);
    setPanelData(prod);
    setShowPanel(true);
  }, [flyTo]);

  // Pan
  const onMouseDown = useCallback((e) => {
    if (e.target.closest("[data-node]")) return;
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
    setLastPos({ x: e.clientX, y: e.clientY });
  }, [dragging, lastPos]);

  const onMouseUp = useCallback(() => setDragging(false), []);

  // Zoom
  const onWheel = useCallback((e) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setTransform(t => {
      const ns = Math.min(Math.max(t.scale * factor, 0.12), 3);
      return {
        scale: ns,
        x: mx - (mx - t.x) * (ns / t.scale),
        y: my - (my - t.y) * (ns / t.scale),
      };
    });
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  // Node click
  const handleNodeClick = useCallback((node) => {
    setSelected(node.id);
    if (node.type === "product" && node.data) {
      setPanelData(node.data);
      setShowPanel(true);
    } else if (node.type === "section") {
      const prods = ALL_PRODUCTS.filter(p => p.sectionId === node.id);
      setPanelData({ type: "section", node, prods });
      setShowPanel(true);
    } else if (node.type === "category") {
      const prods = ALL_PRODUCTS.filter(p => p.categoryId === node.id);
      const cat = ALL_CATEGORIES.find(c => c.id === node.id);
      setPanelData({ type: "category", node, cat, prods });
      setShowPanel(true);
    }
  }, []);

  const hasHighlight = highlightedIds.size > 0;

  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden", background: "#080A12",
      fontFamily: "'DM Mono', 'Fira Mono', 'Courier New', monospace",
      cursor: dragging ? "grabbing" : "grab",
      userSelect: "none",
    }}>
      {/* ── CANVAS ── */}
      <div
        ref={canvasRef}
        style={{ width: "100%", height: "100%", position: "relative" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <svg
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible" }}
        >
          <defs>
            {TARIC_DATA.map(s => (
              <filter key={s.id} id={`glow-${s.id}`}>
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            ))}
            <filter id="glow-hub">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
            {/* Edges */}
            {EDGES.map(edge => {
              const fromN = nodeMap[edge.from];
              const toN = nodeMap[edge.to];
              if (!fromN || !toN) return null;
              const active = !hasHighlight || (highlightedIds.has(edge.from) && highlightedIds.has(edge.to));
              const w = edge.type === "section" ? 2.5 : edge.type === "category" ? 1.5 : 1;
              const dash = edge.type === "product" ? "8 6" : edge.type === "category" ? "none" : "none";
              return (
                <line
                  key={edge.id}
                  x1={fromN.x} y1={fromN.y} x2={toN.x} y2={toN.y}
                  stroke={active ? edge.color : "#1a1e2e"}
                  strokeWidth={w}
                  strokeDasharray={dash}
                  opacity={active ? (edge.type === "product" ? 0.4 : 0.7) : 0.08}
                  style={{ transition: "opacity 0.3s, stroke 0.3s" }}
                />
              );
            })}
          </g>
        </svg>

        {/* Nodes (HTML for easier text + interaction) */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 0, height: 0 }}>
          {NODES.map(node => {
            const tx = transform.x + node.x * transform.scale;
            const ty = transform.y + node.y * transform.scale;
            const isSelected = selected === node.id;
            const isHovered = hovered === node.id;
            const isDimmed = hasHighlight && !highlightedIds.has(node.id);
            const visible = transform.scale > 0.15 || node.type !== "product";

            let size, bg, border, fontSize, minW;
            if (node.type === "hub") {
              size = 80; bg = "linear-gradient(135deg,#1a2a6c,#b21f1f,#fdbb2d)";
              border = "2px solid #fdbb2d"; fontSize = 18; minW = 80;
            } else if (node.type === "section") {
              size = 54; bg = `${node.color}22`; border = `2px solid ${node.color}`;
              fontSize = 13; minW = 140;
            } else if (node.type === "category") {
              size = 38; bg = `${node.color}15`; border = `1.5px solid ${node.color}88`;
              fontSize = 11; minW = 120;
            } else {
              size = 26; bg = "#0e1120"; border = `1px solid ${node.color}55`;
              fontSize = 10; minW = 100;
            }

            if (!visible) return null;

            return (
              <div
                key={node.id}
                data-node="true"
                style={{
                  position: "absolute",
                  left: tx, top: ty,
                  transform: "translate(-50%,-50%)",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  cursor: "pointer",
                  opacity: isDimmed ? 0.08 : (mounted ? 1 : 0),
                  transition: "opacity 0.3s, transform 0.2s",
                  zIndex: isSelected ? 100 : isHovered ? 50 : node.type === "hub" ? 40 : node.type === "section" ? 30 : node.type === "category" ? 20 : 10,
                }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(node); flyTo(node.id); }}
              >
                {/* Node bubble */}
                <div style={{
                  width: size, height: size, borderRadius: "50%",
                  background: bg, border: isSelected ? `2px solid ${node.color || "#fdbb2d"}` : border,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: isSelected || isHovered
                    ? `0 0 20px ${node.color || "#fdbb2d"}88, 0 0 40px ${node.color || "#fdbb2d"}44`
                    : "0 2px 12px #0006",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  transform: `scale(${isHovered ? 1.15 : 1})`,
                  fontSize: node.type === "hub" ? 26 : node.type === "section" ? 22 : node.type === "category" ? 16 : 12,
                }}>
                  {node.type === "hub" ? <span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>⚖️</span>
                    : node.glyph ? <span>{node.glyph}</span>
                    : node.type === "product" ? <span style={{ color: node.color, opacity: 0.8, fontSize: 8 }}>◆</span>
                    : <span style={{ color: node.color, fontSize: 10 }}>●</span>}
                </div>

                {/* Label */}
                {(node.type !== "product" || transform.scale > 0.5) && (
                  <div style={{
                    marginTop: 4, textAlign: "center",
                    maxWidth: minW, pointerEvents: "none",
                  }}>
                    <div style={{
                      color: node.color || "#fdbb2d",
                      fontSize: fontSize * transform.scale < 8 ? 0 : fontSize,
                      fontWeight: node.type === "hub" || node.type === "section" ? 700 : 500,
                      letterSpacing: "0.05em",
                      textShadow: `0 0 10px ${node.color || "#fdbb2d"}88`,
                      whiteSpace: node.type === "hub" ? "nowrap" : "normal",
                      lineHeight: 1.2,
                    }}>
                      {node.label}
                    </div>
                    {node.sublabel && fontSize * transform.scale >= 8 && (
                      <div style={{
                        color: "#888", fontSize: Math.max(fontSize - 2, 8),
                        marginTop: 1, lineHeight: 1.2,
                        wordBreak: "break-word",
                      }}>
                        {node.sublabel}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── HEADER ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        padding: "0 24px",
        height: 64,
        background: "linear-gradient(180deg,#080A12ee 60%,transparent)",
        display: "flex", alignItems: "center", gap: 16,
        zIndex: 200,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg,#1a2a6c,#b21f1f,#fdbb2d)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>⚖️</div>
          <div>
            <div style={{ color: "#fdbb2d", fontWeight: 800, fontSize: 15, letterSpacing: "0.1em" }}>TARIC·NET</div>
            <div style={{ color: "#555", fontSize: 10, letterSpacing: "0.08em" }}>EU PRODUCT DESIGN PLATFORM</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 520, position: "relative", marginLeft: 20 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "#0e1120", border: "1.5px solid #1e2840",
            borderRadius: 8, padding: "8px 14px",
          }}>
            <span style={{ color: "#555", fontSize: 14 }}>🔍</span>
            <input
              type="text"
              placeholder="Search products, categories, or TARIC codes…"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              style={{
                flex: 1, background: "none", border: "none", outline: "none",
                color: "#dde", fontFamily: "inherit", fontSize: 13,
              }}
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(""); setHighlightedIds(new Set()); setSearchOpen(false); }}
                style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>✕</button>
            )}
          </div>

          {/* Dropdown */}
          {searchOpen && searchResults.length > 0 && (
            <div style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
              background: "#0c0f1e", border: "1px solid #1e2840", borderRadius: 8,
              maxHeight: 360, overflowY: "auto", zIndex: 300,
              boxShadow: "0 20px 60px #00000099",
            }}>
              {searchResults.map(r => (
                <div key={r.id} onClick={() => selectResult(r)}
                  style={{
                    padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #12152280",
                    display: "flex", alignItems: "center", gap: 10,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1a2040"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{ fontSize: 18 }}>{r.sectionGlyph}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#dde", fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                    <div style={{ color: "#666", fontSize: 11 }}>{r.categoryName}</div>
                  </div>
                  <div style={{
                    background: `${r.sectionColor}22`, border: `1px solid ${r.sectionColor}55`,
                    borderRadius: 4, padding: "2px 6px",
                    color: r.sectionColor, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", whiteSpace: "nowrap",
                  }}>
                    {r.code}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 20, marginLeft: "auto" }}>
          {[
            { v: TARIC_DATA.length, l: "Sections" },
            { v: ALL_CATEGORIES.length, l: "Categories" },
            { v: ALL_PRODUCTS.length, l: "Products" },
          ].map(({ v, l }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: "#fdbb2d", fontSize: 16, fontWeight: 800 }}>{v}</div>
              <div style={{ color: "#555", fontSize: 9, letterSpacing: "0.08em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SIDE PANEL ── */}
      {showPanel && panelData && (
        <div style={{
          position: "fixed", right: 0, top: 0, bottom: 0, width: 360,
          background: "#080A12f5", borderLeft: "1px solid #1e2840",
          zIndex: 250, display: "flex", flexDirection: "column",
          animation: "slideIn 0.25s ease",
          overflow: "hidden",
        }}>
          <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
          <div style={{
            padding: "20px 20px 14px", borderBottom: "1px solid #1e2840",
            display: "flex", alignItems: "flex-start", gap: 12,
          }}>
            <div style={{ flex: 1 }}>
              {panelData.type === "section" ? (
                <>
                  <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.1em", marginBottom: 4 }}>SECTION</div>
                  <div style={{ color: panelData.node.color, fontSize: 18, fontWeight: 800 }}>{panelData.node.sublabel}</div>
                  <div style={{ color: "#555", fontSize: 11, marginTop: 4 }}>{panelData.prods.length} products in this section</div>
                </>
              ) : panelData.type === "category" ? (
                <>
                  <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.1em", marginBottom: 4 }}>CATEGORY · {panelData.node.label}</div>
                  <div style={{ color: panelData.node.color, fontSize: 16, fontWeight: 800 }}>{panelData.cat?.name}</div>
                  <div style={{ color: "#555", fontSize: 11, marginTop: 4 }}>{panelData.prods.length} products</div>
                </>
              ) : (
                <>
                  <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.1em", marginBottom: 4 }}>PRODUCT</div>
                  <div style={{ color: "#dde", fontSize: 18, fontWeight: 700 }}>{panelData.name}</div>
                </>
              )}
            </div>
            <button onClick={() => setShowPanel(false)}
              style={{ background: "#1a2040", border: "none", color: "#888", cursor: "pointer", borderRadius: 6, width: 30, height: 30, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
            {panelData.type === "section" || panelData.type === "category" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {panelData.prods.map(p => (
                  <div key={p.id}
                    onClick={() => selectResult(p)}
                    style={{
                      background: "#0e1120", border: `1px solid ${p.sectionColor}33`,
                      borderRadius: 8, padding: "12px 14px", cursor: "pointer",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#141830"; e.currentTarget.style.borderColor = `${p.sectionColor}88`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#0e1120"; e.currentTarget.style.borderColor = `${p.sectionColor}33`; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ color: "#dde", fontSize: 13, fontWeight: 600, flex: 1 }}>{p.name}</div>
                      <span style={{
                        background: `${p.sectionColor}22`, border: `1px solid ${p.sectionColor}55`,
                        borderRadius: 4, padding: "2px 6px", color: p.sectionColor, fontSize: 9, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap",
                      }}>{p.code}</span>
                    </div>
                    <div style={{ color: "#555", fontSize: 11, marginTop: 4 }}>{p.sub}</div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* TARIC Code Card */}
                <div style={{
                  background: `${panelData.sectionColor}11`, border: `1px solid ${panelData.sectionColor}33`,
                  borderRadius: 10, padding: 16, marginBottom: 16,
                }}>
                  <div style={{ color: "#888", fontSize: 10, letterSpacing: "0.1em", marginBottom: 8 }}>TARIC CODE</div>
                  <div style={{
                    color: panelData.sectionColor, fontSize: 28, fontWeight: 900,
                    letterSpacing: "0.15em", fontFamily: "'DM Mono',monospace",
                  }}>{panelData.code}</div>
                  <div style={{ color: "#668", fontSize: 11, marginTop: 6 }}>{panelData.sub}</div>
                </div>

                {[
                  { label: "Product Name", value: panelData.name },
                  { label: "Category", value: panelData.categoryName },
                  { label: "Section", value: panelData.sectionLabel },
                ].map(({ label, value }) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <div style={{ color: "#555", fontSize: 10, letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
                    <div style={{ color: "#ccd", fontSize: 13 }}>{value}</div>
                  </div>
                ))}

                <div style={{ marginTop: 20, padding: 14, background: "#0e1120", borderRadius: 8, border: "1px solid #1e2840" }}>
                  <div style={{ color: "#555", fontSize: 10, letterSpacing: "0.08em", marginBottom: 8 }}>CODE STRUCTURE</div>
                  {[
                    { part: panelData.code.slice(0, 2), desc: "Chapter" },
                    { part: panelData.code.slice(0, 4), desc: "Heading" },
                    { part: panelData.code.replace(/\s/g, "").slice(0, 6), desc: "Subheading" },
                    { part: panelData.code.replace(/\s/g, ""), desc: "Full TARIC" },
                  ].map(({ part, desc }) => (
                    <div key={desc} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: panelData.sectionColor, fontFamily: "monospace", fontSize: 12 }}>{part}</span>
                      <span style={{ color: "#555", fontSize: 11 }}>{desc}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 16, padding: 14, background: "#060810", borderRadius: 8, border: "1px solid #1a2040" }}>
                  <div style={{ color: "#555", fontSize: 10, letterSpacing: "0.08em", marginBottom: 8 }}>LINKS</div>
                  <a href={`https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=en&Taric=${panelData.code.replace(/[\s.]/g, "")}&expand=true`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ color: "#6D9BE8", fontSize: 12, textDecoration: "none", display: "block", marginBottom: 6 }}>
                    → EU TARIC Consultation Portal ↗
                  </a>
                  <a href={`https://www.trade-tariff.service.gov.uk/commodities/${panelData.code.replace(/[\s.]/g, "").padEnd(10, "0")}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ color: "#6D9BE8", fontSize: 12, textDecoration: "none" }}>
                    → UK Global Tariff ↗
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── LEGEND ── */}
      <div style={{
        position: "fixed", bottom: 20, left: 20, zIndex: 200,
        background: "#0c0f1eee", border: "1px solid #1e2840",
        borderRadius: 10, padding: "12px 16px",
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        <div style={{ color: "#555", fontSize: 9, letterSpacing: "0.12em", marginBottom: 4 }}>NETWORK LEGEND</div>
        {[
          { shape: "●", color: "#fdbb2d", label: "Hub — TARIC Root" },
          { shape: "●", color: "#E86D6D", label: "Section" },
          { shape: "●", color: "#aaa", label: "Category (HS Code)" },
          { shape: "◆", color: "#666", label: "Product" },
        ].map(({ shape, color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color, fontSize: shape === "◆" ? 10 : 12 }}>{shape}</span>
            <span style={{ color: "#666", fontSize: 11 }}>{label}</span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid #1e2840", marginTop: 4, paddingTop: 6, color: "#444", fontSize: 10 }}>
          Scroll to zoom · Drag to pan · Click to explore
        </div>
      </div>

      {/* ── ZOOM CONTROLS ── */}
      <div style={{
        position: "fixed", bottom: 20, right: showPanel ? 380 : 20, zIndex: 200,
        display: "flex", flexDirection: "column", gap: 4,
        transition: "right 0.25s",
      }}>
        {[
          { label: "+", action: () => setTransform(t => ({ ...t, scale: Math.min(t.scale * 1.25, 3) })) },
          { label: "⌂", action: () => setTransform({ x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 0.38 }) },
          { label: "−", action: () => setTransform(t => ({ ...t, scale: Math.max(t.scale * 0.8, 0.12) })) },
        ].map(({ label, action }) => (
          <button key={label} onClick={action} style={{
            width: 36, height: 36, borderRadius: 6,
            background: "#0c0f1e", border: "1px solid #1e2840",
            color: "#888", fontSize: label === "⌂" ? 16 : 20,
            cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#fdbb2d"; e.currentTarget.style.color = "#fdbb2d"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2840"; e.currentTarget.style.color = "#888"; }}
          >{label}</button>
        ))}
      </div>

      {/* ── SECTION QUICK-NAV ── */}
      <div style={{
        position: "fixed", left: 20, top: "50%", transform: "translateY(-50%)",
        zIndex: 200, display: "flex", flexDirection: "column", gap: 4,
      }}>
        {TARIC_DATA.map(s => {
          const node = nodeMap[s.id];
          return (
            <button key={s.id}
              title={s.label}
              onClick={() => { flyTo(s.id); setSelected(s.id); const n = nodeMap[s.id]; handleNodeClick(n); }}
              style={{
                width: 32, height: 32, borderRadius: 6,
                background: `${s.color}15`, border: `1px solid ${s.color}44`,
                cursor: "pointer", fontSize: 14, transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${s.color}33`; e.currentTarget.style.borderColor = s.color; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${s.color}15`; e.currentTarget.style.borderColor = `${s.color}44`; }}
            >{s.glyph}</button>
          );
        })}
      </div>
    </div>
  );
}
