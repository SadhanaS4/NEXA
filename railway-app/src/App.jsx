import React from "react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The Future of Railway Travel
        </motion.h1>
        <motion.div
          className="rail-lines"
          animate={{ x: [0, 20, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.button
          className="cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Experience Journexa
        </motion.button>
        <motion.div
          className="train"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          🚆
        </motion.div>
      </section>

      {/* Smart Railway Pass */}
      <section className="smart-pass">
        <h2>Smart Railway Pass</h2>
        <motion.div
          className="pass-card"
          whileHover={{ rotateY: 10, scale: 1.05 }}
        >
          <div className="qr">■ ■ ■</div>
          <div className="details">
            <p>Passenger: Sana</p>
            <p>Seat: 12A</p>
            <p>Valid Until: 2026</p>
          </div>
        </motion.div>
      </section>

      {/* AI Journey Companion */}
      <section className="ai-companion">
        <h2>AI Journey Companion</h2>
        <div className="chat-ui">
          <motion.div className="bubble" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            Platform guidance: Proceed to Gate 3
          </motion.div>
          <motion.div className="bubble" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            Delay alert: Train arriving 5 mins late
          </motion.div>
        </div>
      </section>

      {/* Live Journey Experience */}
      <section className="journey">
        <h2>Live Journey Experience</h2>
        <div className="route">
          <div className="station">Station A</div>
          <motion.div
            className="train-icon"
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            🚆
          </motion.div>
          <div className="station">Station B</div>
        </div>
        <p>ETA: 15 mins</p>
      </section>

      {/* Station Intelligence */}
      <section className="station-intel">
        <h2>Station Intelligence</h2>
        <div className="metrics">
          <motion.div className="metric" whileHover={{ scale: 1.05 }}>
            Crowd Density: Medium
          </motion.div>
          <motion.div className="metric" whileHover={{ scale: 1.05 }}>
            Flow Rate: 1200 passengers/hr
          </motion.div>
        </div>
      </section>

      {/* Mobile Experience */}
      <section className="mobile">
        <h2>Mobile Experience</h2>
        <motion.div
          className="phone-mockup"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="screen">
            <p>Boarding Alert: Train departs in 5 mins</p>
          </div>
        </motion.div>
      </section>

      {/* Impact Section */}
      <section className="impact">
        <h2>Impact</h2>
        <div className="stats">
          <motion.div className="stat" whileInView={{ opacity: 1 }}>
            <h3>50%</h3>
            <p>Faster Boarding</p>
          </motion.div>
          <motion.div className="stat" whileInView={{ opacity: 1 }}>
            <h3>70%</h3>
            <p>Reduced Crowding</p>
          </motion.div>
          <motion.div className="stat" whileInView={{ opacity: 1 }}>
            <h3>90%</h3>
            <p>Better Experience</p>
          </motion.div>
        </div>
        <motion.button
          className="cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Journexa
        </motion.button>
      </section>
    </div>
  );
}

export default App;
