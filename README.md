# 🚀 GigShield - AI Insurance for Grocery Delivery Partners

## 📌 Problem Statement

Grocery delivery partners (Zepto, Blinkit, Swiggy Instamart) rely on quick deliveries for income.  
External disruptions like heavy rain, heatwaves, and pollution reduce their working hours, causing direct income loss.

Currently, there is **no income protection system** for these workers.

---

## 💡 Solution

GigShield is an **AI-powered parametric insurance platform** that:

- Protects delivery partners from income loss
- Automatically detects disruptions (simulated)
- Triggers instant payouts
- Uses a **weekly subscription model**

---

## 👤 Persona

- Grocery Delivery Partner (Zepto / Blinkit)
- Works daily on quick commerce deliveries
- Income depends on active delivery hours

---

## 🧠 AI Model (Rule-Based)

We implemented a **rule-based AI model** to calculate risk and premium.

### Inputs:
- 📍 Location (city / industrial / rural)
- 🌦 Weather risk (simulated)
- ⏱ Working hours

### Risk Score Calculation:
- Area risk → +1 to +3
- Weather risk → +1 to +3
- Working hours → +1 to +3

### Output:
- Low Risk → ₹20/week
- Medium Risk → ₹35/week
- High Risk → ₹50/week

---

## ⚙️ Features

### ✅ 1. User Registration
- Name
- Location
- Working hours

---

### ✅ 2. AI Risk & Premium Calculation
- Dynamic weekly pricing
- Based on multiple risk factors

---

### ✅ 3. Disruption Detection (Simulated)
- 🌧 Rain
- ☀️ Heatwave
- 🌫 Pollution

---

### ✅ 4. Automatic Claims (Zero-Touch)
- No manual claim process
- Instant trigger on disruption

---

### ✅ 5. Instant Payout (Simulated)
- Example:
  - Rain → ₹200
  - Heat → ₹150
  - Pollution → ₹180

---

### ✅ 6. Fraud Detection
- Maximum 3 claims allowed
- Prevents abuse of system

---

### ✅ 7. Dashboard
- Weekly premium
- Risk level
- Earnings protected
- Claims history
- AI insights

---

### ✅ 8. Analytics
- Bar chart visualization of claims
- Helps track payouts

---

## 🔄 Workflow

1. User registers
2. AI calculates risk score
3. Weekly premium assigned
4. Disruption occurs (simulated)
5. Claim auto-triggered
6. Instant payout credited
7. Data shown in dashboard

---

## 🏗️ Tech Stack

- Frontend: React.js
- Styling: Inline CSS
- Charts: Recharts
- Icons: Lucide React
- AI Model: Rule-based logic (frontend)

---

## ▶️ How to Run

```bash
npm install
npm start
