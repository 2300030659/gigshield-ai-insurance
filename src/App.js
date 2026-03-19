import React, { useState } from "react";
import { CloudRain, ShieldCheck, IndianRupee, MapPin } from "lucide-react";

function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", location: "" });
  const [claim, setClaim] = useState("");
  const [premium, setPremium] = useState(30);

  const register = () => {
    if (!form.name || !form.location) {
      alert("Enter all details");
      return;
    }

    // Simulated AI pricing
    const dynamicPremium =
      form.location.toLowerCase().includes("city") ? 50 : 30;

    setPremium(dynamicPremium);
    setUser(form);
  };

  const simulateRain = () => {
    setClaim("₹200 credited instantly due to heavy rain 🌧️");
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.logo}>GigShield</h1>

      {!user ? (
        <div style={styles.card}>
          <h2>AI Insurance for Gig Workers</h2>

          <input
            style={styles.input}
            placeholder="Your Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="Your City / Area"
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <button style={styles.primaryBtn} onClick={register}>
            Get Protected
          </button>
        </div>
      ) : (
        <div style={styles.dashboard}>
          {/* Header */}
          <div style={styles.header}>
            <h2>Welcome, {user.name}</h2>
            <p><MapPin size={16}/> {user.location}</p>
          </div>

          {/* Cards */}
          <div style={styles.grid}>
            <div style={styles.cardBox}>
              <IndianRupee />
              <h3>Weekly Premium</h3>
              <p style={styles.value}>₹{premium}</p>
            </div>

            <div style={styles.cardBox}>
              <ShieldCheck />
              <h3>Coverage</h3>
              <p style={{ color: "#22c55e" }}>Active</p>
            </div>

            <div style={styles.cardBox}>
              <CloudRain />
              <h3>Risk Level</h3>
              <p>Medium</p>
            </div>
          </div>

          {/* Action */}
          <button style={styles.primaryBtn} onClick={simulateRain}>
            Simulate Rain → Auto Claim
          </button>

          {/* Claim Box */}
          {claim && <div style={styles.claim}>{claim}</div>}

          {/* Insights */}
          <div style={styles.insight}>
            <h3>AI Insights</h3>
            <p>
              Based on your area, risk of disruption is moderate. Premium adjusted dynamically.
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
    padding: "40px",
  },

  logo: {
    fontSize: "34px",
    fontWeight: "bold",
  },

  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "15px",
    width: "320px",
    margin: "40px auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },

  input: {
    width: "90%",
    padding: "12px",
    margin: "10px",
    borderRadius: "8px",
    border: "none",
  },

  primaryBtn: {
    padding: "12px 25px",
    background: "#3b82f6",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },

  dashboard: {
    maxWidth: "900px",
    margin: "auto",
  },

  header: {
    marginBottom: "20px",
  },

  grid: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
  },

  cardBox: {
    flex: 1,
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
  },

  value: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  claim: {
    marginTop: "20px",
    padding: "15px",
    background: "#22c55e",
    borderRadius: "10px",
  },

  insight: {
    marginTop: "30px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
  },
};

export default App;