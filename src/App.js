import React, { useState } from "react";
import {
  CloudRain,
  ShieldCheck,
  IndianRupee,
  MapPin,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    location: "",
    hours: "",
  });
  const [claims, setClaims] = useState([]);
  const [premium, setPremium] = useState(20);
  const [risk, setRisk] = useState("Low");
  const [earnings, setEarnings] = useState(0);
  const [status, setStatus] = useState("No disruption");

  // 🔥 AI RULE-BASED MODEL
  const aiModel = (location, hours) => {
    let score = 0;

    // Area Risk
    if (location.includes("city")) score += 3;
    if (location.includes("industrial")) score += 2;
    if (location.includes("rural")) score += 1;

    // Weather Risk (simulated deterministic)
    const weatherType = ["low", "medium", "high"];
    const weather = weatherType[location.length % 3]; // stable simulation

    if (weather === "high") score += 3;
    if (weather === "medium") score += 2;
    if (weather === "low") score += 1;

    // Working Hours Risk
    if (hours > 10) score += 3;
    else if (hours > 7) score += 2;
    else score += 1;

    return score;
  };

  const register = () => {
    if (!form.name || !form.location || !form.hours) {
      alert("Enter all details");
      return;
    }

    const loc = form.location.toLowerCase();
    const hrs = parseInt(form.hours);

    const score = aiModel(loc, hrs);

    let premiumValue = 20;
    let riskLevel = "Low";

    // AI decision mapping
    if (score >= 7) {
      premiumValue = 50;
      riskLevel = "High";
    } else if (score >= 5) {
      premiumValue = 35;
      riskLevel = "Medium";
    } else {
      premiumValue = 20;
      riskLevel = "Low";
    }

    setPremium(premiumValue);
    setRisk(riskLevel);
    setUser(form);
  };

  // Claim Logic
  const triggerClaim = (type) => {
    if (claims.length >= 3) {
      alert("⚠️ Fraud detected: Too many claims!");
      return;
    }

    let amount = 0;

    if (type === "rain") {
      amount = 200;
      setStatus("🌧 Heavy Rain Detected");
    }
    if (type === "heat") {
      amount = 150;
      setStatus("☀️ Heatwave Detected");
    }
    if (type === "pollution") {
      amount = 180;
      setStatus("🌫 High Pollution Detected");
    }

    const newClaim = {
      type,
      amount,
      time: new Date().toLocaleTimeString(),
    };

    setClaims((prev) => [...prev, newClaim]);
    setEarnings((prev) => prev + amount);

    alert("💰 Payment Sent via UPI (Simulated)");
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.logo}>GigShield - Grocery Protection</h1>

      {!user ? (
        <div style={styles.card}>
          <h2>AI Insurance for Grocery Delivery Partners</h2>

          <input
            style={styles.input}
            placeholder="Your Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="City / Area"
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Working Hours per Day"
            onChange={(e) =>
              setForm({ ...form, hours: e.target.value })
            }
          />

          <button style={styles.primaryBtn} onClick={register}>
            Get Protected
          </button>
        </div>
      ) : (
        <div style={styles.dashboard}>
          <div style={styles.header}>
            <h2>Welcome, {user.name}</h2>
            <p><MapPin size={16}/> {user.location}</p>
            <p>Working Hours: {user.hours} hrs/day</p>
          </div>

          <h3>{status}</h3>

          <div style={styles.grid}>
            <div style={styles.cardBox}>
              <IndianRupee />
              <h3>Weekly Premium</h3>
              <p>₹{premium}</p>
            </div>

            <div style={styles.cardBox}>
              <ShieldCheck />
              <h3>Coverage</h3>
              <p style={{ color: "#22c55e" }}>Active</p>
            </div>

            <div style={styles.cardBox}>
              <CloudRain />
              <h3>Risk Level</h3>
              <p>{risk}</p>
            </div>

            <div style={styles.cardBox}>
              <IndianRupee />
              <h3>Earnings Protected</h3>
              <p>₹{earnings}</p>
            </div>
          </div>

          <h3>Trigger Disruption</h3>
          <div style={styles.grid}>
            <button style={styles.primaryBtn} onClick={() => triggerClaim("rain")}>
              🌧 Rain
            </button>
            <button style={styles.primaryBtn} onClick={() => triggerClaim("heat")}>
              ☀️ Heatwave
            </button>
            <button style={styles.primaryBtn} onClick={() => triggerClaim("pollution")}>
              🌫 Pollution
            </button>
          </div>

          <div style={styles.claimSection}>
            <h3>Claims History</h3>
            {claims.map((c, i) => (
              <div key={i} style={styles.claimItem}>
                {c.type} → ₹{c.amount} at {c.time}
              </div>
            ))}
          </div>

          <h3>Analytics</h3>
          <BarChart width={400} height={250} data={claims}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" />
          </BarChart>

          <div style={styles.insight}>
            <h3>AI Insights</h3>
            <p>
              AI model calculates risk score using location, weather patterns, and working hours.
              Premium is dynamically assigned based on risk score.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "Inter, sans-serif",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    minHeight: "100vh",
    color: "white",
    textAlign: "center",
    padding: "30px",
  },
  logo: { fontSize: "32px" },
  card: {
    background: "#1e293b",
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
  primaryBtn: {
    padding: "10px 20px",
    margin: "10px",
    background: "#3b82f6",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },
  dashboard: { maxWidth: "1000px", margin: "auto" },
  header: { marginBottom: "20px" },
  grid: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  cardBox: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    minWidth: "180px",
  },
  claimSection: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
  },
  claimItem: {
    background: "#334155",
    padding: "10px",
    margin: "5px",
    borderRadius: "6px",
  },
  insight: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
  },
};

export default App;