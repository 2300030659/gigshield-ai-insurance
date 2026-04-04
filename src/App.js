import React, { useState, useEffect } from "react";
import {
  CloudRain,
  ShieldCheck,
  IndianRupee,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", location: "", hours: "" });

  const [claims, setClaims] = useState([]);
  const [premium, setPremium] = useState(20);
  const [risk, setRisk] = useState("Low");
  const [earnings, setEarnings] = useState(0);
  const [status, setStatus] = useState("Monitoring...");
  const [engineLog, setEngineLog] = useState([]);

  // AI MODEL
  const aiModel = (location, hours) => {
    let score = 0;
    if (location.includes("city")) score += 3;
    else score += 1;
    if (hours > 10) score += 3;
    else if (hours > 7) score += 2;
    else score += 1;
    return score;
  };

  const calculatePremium = (score) => {
    if (score >= 6) return { price: 50, risk: "High" };
    if (score >= 4) return { price: 35, risk: "Medium" };
    return { price: 20, risk: "Low" };
  };

  const register = () => {
    const score = aiModel(
      form.location.toLowerCase(),
      parseInt(form.hours)
    );
    const result = calculatePremium(score);
    setPremium(result.price);
    setRisk(result.risk);
    setUser(form);
  };

  const simulateEnvironment = () => {
    const rand = Math.random();
    if (rand < 0.33) return "rain";
    if (rand < 0.66) return "heat";
    if (rand < 0.85) return "pollution";
    return null;
  };

  const fraudCheck = () => claims.length < 3;

  const payout = (type) => {
    const amounts = { rain: 200, heat: 150, pollution: 180 };
    const newClaim = {
      type,
      amount: amounts[type],
      time: new Date().toLocaleTimeString(),
    };
    setClaims((prev) => [...prev, newClaim]);
    setEarnings((prev) => prev + newClaim.amount);
  };

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const event = simulateEnvironment();
      if (!event) return;

      setEngineLog((prev) => [...prev, `Trigger: ${event}`]);

      if (!fraudCheck()) {
        setStatus("⚠️ Fraud blocked");
        return;
      }

      setStatus(`🚨 ${event.toUpperCase()} detected`);
      payout(event);
    }, 5000);

    return () => clearInterval(interval);
  }, [user, claims]);

  const totalClaims = claims.reduce((sum, c) => sum + c.amount, 0);
  const lossRatio = premium ? (totalClaims / premium).toFixed(2) : 0;

  return (
    <div style={styles.app}>
      <h1 style={styles.logo}>🚀 EarnShield AI</h1>

      {!user ? (
        <div style={styles.card}>
          <h2>Activate Protection</h2>

          <input
            style={styles.input}
            placeholder="Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="Location (city/rural)"
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Working Hours"
            onChange={(e) =>
              setForm({ ...form, hours: e.target.value })
            }
          />

          <button style={styles.btn} onClick={register}>
            Start Coverage
          </button>
        </div>
      ) : (
        <div style={styles.dashboard}>
          <div style={styles.header}>
            <h2>Welcome, {user.name}</h2>
            <p><MapPin size={14}/> {user.location}</p>
          </div>

          <div style={styles.status}>{status}</div>

          <div style={styles.grid}>
            <Card title="Premium" value={`₹${premium}`} />
            <Card title="Risk" value={risk} />
            <Card title="Earnings" value={`₹${earnings}`} />
            <Card title="Loss Ratio" value={lossRatio} />
          </div>

          <div style={styles.section}>
            <h3>📊 Analytics</h3>
            <BarChart width={500} height={250} data={claims}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" />
            </BarChart>
          </div>

          <div style={styles.section}>
            <h3>📜 Claims</h3>
            {claims.map((c, i) => (
              <div key={i} style={styles.claim}>
                {c.type} → ₹{c.amount} ({c.time})
              </div>
            ))}
          </div>

          <div style={styles.section}>
            <h3>⚙️ Engine Logs</h3>
            {engineLog.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const Card = ({ title, value }) => (
  <div style={styles.box}>
    <p>{title}</p>
    <h2>{value}</h2>
  </div>
);

const styles = {
  app: {
    fontFamily: "Inter",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    minHeight: "100vh",
    color: "white",
    padding: "30px",
    textAlign: "center",
  },
  logo: { fontSize: "32px", marginBottom: "20px" },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "15px",
    width: "320px",
    margin: "auto",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px",
    borderRadius: "8px",
    border: "none",
  },
  btn: {
    background: "#3b82f6",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  dashboard: { maxWidth: "1000px", margin: "auto" },
  header: { marginBottom: "20px" },
  status: {
    background: "#22c55e",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  box: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "12px",
    minWidth: "150px",
  },
  section: {
    marginTop: "30px",
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "12px",
  },
  claim: {
    background: "#334155",
    margin: "5px",
    padding: "8px",
    borderRadius: "6px",
  },
};

export default App;