import { useState, useEffect, useRef } from "react";

const AGENTS = [
  {
    id: "nexus",
    name: "NEXUS",
    role: "Orchestration Agent",
    icon: "◈",
    color: "#00FFB2",
    description: "Coordinates all sub-agents, routes tasks, and maintains execution context across the entire system.",
    status: "active",
    tasks: 847,
    uptime: "99.97%",
  },
  {
    id: "axiom",
    name: "AXIOM",
    role: "Research & Analysis Agent",
    icon: "⬡",
    color: "#FF6B35",
    description: "Autonomously browses, synthesizes, and structures intelligence from any data source in real time.",
    status: "active",
    tasks: 2341,
    uptime: "99.91%",
  },
  {
    id: "forge",
    name: "FORGE",
    role: "Build & Deploy Agent",
    icon: "◆",
    color: "#7B61FF",
    description: "Writes, tests, and ships production code across stacks with zero human handoff required.",
    status: "active",
    tasks: 1203,
    uptime: "99.88%",
  },
  {
    id: "signal",
    name: "SIGNAL",
    role: "Outreach & Growth Agent",
    icon: "◉",
    color: "#FFD700",
    description: "Executes multi-channel campaigns, qualifies leads, and books meetings — end to end, autonomously.",
    status: "active",
    tasks: 4102,
    uptime: "99.95%",
  },
  {
    id: "ledger",
    name: "LEDGER",
    role: "Finance & Operations Agent",
    icon: "▣",
    color: "#00C2FF",
    description: "Monitors P&L, flags anomalies, runs reports, and manages vendor workflows without intervention.",
    status: "standby",
    tasks: 674,
    uptime: "99.99%",
  },
  {
    id: "oracle",
    name: "ORACLE",
    role: "Decision Intelligence Agent",
    icon: "⬟",
    color: "#FF3CAC",
    description: "Runs scenario models, risk assessments, and strategic recommendations — in seconds, not weeks.",
    status: "active",
    tasks: 388,
    uptime: "99.93%",
  },
];

const LIVE_FEED = [
  { agent: "NEXUS", action: "Routed 14 tasks to sub-agents", time: "0s ago", color: "#00FFB2" },
  { agent: "FORGE", action: "Deployed v2.4.1 to production", time: "3s ago", color: "#7B61FF" },
  { agent: "SIGNAL", action: "Qualified 3 enterprise leads", time: "8s ago", color: "#FFD700" },
  { agent: "AXIOM", action: "Synthesized 47-page market report", time: "12s ago", color: "#FF6B35" },
  { agent: "ORACLE", action: "Flagged 2 high-risk scenarios", time: "19s ago", color: "#FF3CAC" },
  { agent: "LEDGER", action: "Reconciled Q2 vendor invoices", time: "24s ago", color: "#00C2FF" },
  { agent: "FORGE", action: "Refactored auth module — 0 bugs", time: "31s ago", color: "#7B61FF" },
  { agent: "SIGNAL", action: "Sent 200 personalized cold emails", time: "38s ago", color: "#FFD700" },
  { agent: "NEXUS", action: "Spawned 3 new worker threads", time: "44s ago", color: "#00FFB2" },
  { agent: "AXIOM", action: "Extracted data from 23 sources", time: "52s ago", color: "#FF6B35" },
];

const METRICS = [
  { label: "Tasks Executed", value: "9555", suffix: "", delta: "+312 today" },
  { label: "Hours Saved", value: "18400", suffix: "", delta: "+94 this week" },
  { label: "Operators Required", value: "3", suffix: "", delta: "vs 47 traditional" },
  { label: "Output Multiplier", value: "156", suffix: "×", delta: "vs human baseline", divisor: 10 },
];

const STACK = [
  { layer: "ORCHESTRATION", desc: "NEXUS routes, prioritizes, and delegates every decision", icon: "◈" },
  { layer: "EXECUTION", desc: "Specialized agents act autonomously in parallel", icon: "⚡" },
  { layer: "MEMORY", desc: "Persistent context across sessions, agents, and time", icon: "◎" },
  { layer: "INTEGRATION", desc: "Connects to any API, database, or workflow natively", icon: "⬡" },
  { layer: "GOVERNANCE", desc: "Role-based controls, audit logs, and fail-safes", icon: "▣" },
];

function LiveCounter({ target, suffix = "", divisor = 1 }) {
  const [count, setCount] = useState(0);
  const num = parseInt(target);
  useEffect(() => {
    let start = 0;
    const step = num / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [num]);
  const display = divisor > 1 ? (count / divisor).toFixed(1) : count.toLocaleString();
  return <span>{display}{suffix}</span>;
}

function AgentCard({ agent, selected, onClick }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 1800 + Math.random() * 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div onClick={onClick} style={{
      background: selected
        ? `linear-gradient(135deg, ${agent.color}18 0%, #0a0a0f 100%)`
        : "linear-gradient(135deg, #12121a 0%, #0a0a0f 100%)",
      border: `1px solid ${selected ? agent.color : "#1e1e2e"}`,
      borderRadius: 2, padding: "24px", cursor: "pointer",
      transition: "all 0.25s ease", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0, width: 32, height: 32,
        borderTop: `2px solid ${agent.color}`, borderRight: `2px solid ${agent.color}`,
        opacity: selected ? 1 : 0.3, transition: "opacity 0.3s",
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 28, color: agent.color, filter: `drop-shadow(0 0 8px ${agent.color}88)` }}>
          {agent.icon}
        </span>
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: agent.color, letterSpacing: "0.2em" }}>
            {agent.name}
          </div>
          <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.05em", marginTop: 2 }}>{agent.role}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: agent.status === "active" ? "#00FFB2" : "#555",
            boxShadow: agent.status === "active" ? `0 0 ${pulse ? 10 : 4}px #00FFB2` : "none",
            transition: "box-shadow 0.6s ease",
          }} />
          <span style={{ fontSize: 10, color: agent.status === "active" ? "#00FFB2" : "#555", fontFamily: "monospace", letterSpacing: "0.1em" }}>
            {agent.status.toUpperCase()}
          </span>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "#8888aa", lineHeight: 1.6, margin: "0 0 16px" }}>{agent.description}</p>
      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <div style={{ fontSize: 18, fontFamily: "'Space Mono', monospace", color: "#fff", fontWeight: 700 }}>{agent.tasks.toLocaleString()}</div>
          <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em" }}>TASKS RUN</div>
        </div>
        <div>
          <div style={{ fontSize: 18, fontFamily: "'Space Mono', monospace", color: "#fff", fontWeight: 700 }}>{agent.uptime}</div>
          <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em" }}>UPTIME</div>
        </div>
      </div>
    </div>
  );
}

function TerminalFeed() {
  const [items, setItems] = useState(LIVE_FEED);
  useEffect(() => {
    const t = setInterval(() => {
      setItems(prev => {
        const newItem = {
          ...LIVE_FEED[Math.floor(Math.random() * LIVE_FEED.length)],
          time: "just now",
        };
        return [newItem, ...prev.slice(0, 14)];
      });
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      background: "#06060a", border: "1px solid #1a1a2e", borderRadius: 2,
      padding: "20px", height: 320, overflowY: "auto",
      fontFamily: "'Space Mono', monospace",
    }}>
      <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.2em", marginBottom: 16 }}>// LIVE EXECUTION STREAM</div>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", gap: 12, alignItems: "baseline", marginBottom: 8,
          opacity: Math.max(0.15, 1 - i * 0.06), transition: "opacity 0.4s",
        }}>
          <span style={{ fontSize: 10, color: "#333", minWidth: 60 }}>{item.time}</span>
          <span style={{ fontSize: 11, color: item.color, minWidth: 60, fontWeight: 700 }}>{item.agent}</span>
          <span style={{ fontSize: 11, color: "#6666aa" }}>→</span>
          <span style={{ fontSize: 11, color: "#8888bb" }}>{item.action}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [taskInput, setTaskInput] = useState("");
  const [taskResult, setTaskResult] = useState(null);
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskHistory, setTaskHistory] = useState([]);

  async function runTask() {
    if (!taskInput.trim() || taskLoading) return;
    setTaskLoading(true);
    setTaskResult(null);
    const userTask = taskInput;
    setTaskInput("");

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: userTask }),
      });
      const parsed = await response.json();
      if (parsed.error) {
        setTaskResult({ error: parsed.error });
      } else {
        setTaskResult(parsed);
        setTaskHistory(h => [{ task: userTask, result: parsed }, ...h.slice(0, 4)]);
      }
    } catch (e) {
      setTaskResult({ error: "Agent execution failed. Please try again." });
    }
    setTaskLoading(false);
  }

  const nav = [
    { id: "dashboard", label: "DASHBOARD" },
    { id: "agents", label: "AGENTS" },
    { id: "execute", label: "EXECUTE" },
    { id: "stack", label: "STACK" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#07070d", color: "#e0e0ff", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a12; }
        ::-webkit-scrollbar-thumb { background: #2a2a4a; border-radius: 2px; }
        @keyframes gridScroll { 0% { transform: translateY(0); } 100% { transform: translateY(60px); } }
        @keyframes scanline { 0% { top: -10%; } 100% { top: 110%; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 20px #00FFB244; } 50% { box-shadow: 0 0 40px #00FFB288; } }
      `}</style>

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,255,178,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px", animation: "gridScroll 8s linear infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, transparent, rgba(0,255,178,0.08), transparent)",
        animation: "scanline 6s linear infinite", zIndex: 1, pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", top: -200, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse, rgba(0,255,178,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* NAV */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 40px", borderBottom: "1px solid #12122a",
          background: "rgba(7,7,13,0.9)", backdropFilter: "blur(12px)",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 34, height: 34, border: "2px solid #00FFB2",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, color: "#00FFB2", animation: "pulseGlow 3s ease infinite",
            }}>◈</div>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.15em", color: "#fff" }}>
                AGENTIC<span style={{ color: "#00FFB2" }}>OS</span>
              </div>
              <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.3em" }}>AUTONOMOUS SYSTEMS PLATFORM</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {nav.map(n => (
              <button key={n.id} onClick={() => setActiveSection(n.id)} style={{
                background: activeSection === n.id ? "#00FFB214" : "transparent",
                border: activeSection === n.id ? "1px solid #00FFB244" : "1px solid transparent",
                color: activeSection === n.id ? "#00FFB2" : "#666",
                padding: "7px 16px", borderRadius: 2, cursor: "pointer",
                fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.15em",
                transition: "all 0.2s",
              }}>{n.label}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FFB2", boxShadow: "0 0 10px #00FFB2" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00FFB2", letterSpacing: "0.1em" }}>ALL SYSTEMS NOMINAL</span>
          </div>
        </nav>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>

          {/* DASHBOARD */}
          {activeSection === "dashboard" && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <div style={{ padding: "64px 0 48px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00FFB2", letterSpacing: "0.4em", marginBottom: 20 }}>
                  // THE NEXT FRONTIER OF BUSINESS
                </div>
                <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 8vw, 96px)", lineHeight: 0.95, letterSpacing: "0.03em", marginBottom: 24, color: "#fff" }}>
                  SYSTEMS THAT<br />
                  <span style={{ color: "#00FFB2", textShadow: "0 0 40px #00FFB266" }}>ACT.</span>{" "}
                  <span style={{ color: "#7B61FF", textShadow: "0 0 40px #7B61FF66" }}>DECIDE.</span>{" "}
                  <span style={{ color: "#FF6B35", textShadow: "0 0 40px #FF6B3566" }}>EXECUTE.</span>
                </h1>
                <p style={{ fontSize: 15, color: "#7777aa", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
                  One operator. Six autonomous agents. Disproportionate output.<br />
                  This is how small teams beat enterprises.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button onClick={() => setActiveSection("execute")} style={{
                    background: "#00FFB2", color: "#000", border: "none",
                    padding: "13px 32px", borderRadius: 2, cursor: "pointer",
                    fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                    boxShadow: "0 0 24px #00FFB244",
                  }}>DEPLOY A TASK →</button>
                  <button onClick={() => setActiveSection("agents")} style={{
                    background: "transparent", color: "#7777aa", border: "1px solid #2a2a4a",
                    padding: "13px 32px", borderRadius: 2, cursor: "pointer",
                    fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.1em",
                  }}>VIEW AGENTS</button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
                {METRICS.map((m, i) => (
                  <div key={i} style={{ background: "#0d0d18", border: "1px solid #1a1a2e", borderRadius: 2, padding: "24px", borderTop: "2px solid #00FFB244" }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 38, color: "#fff", letterSpacing: "0.03em", lineHeight: 1 }}>
                      <LiveCounter target={m.value} suffix={m.suffix} divisor={m.divisor || 1} />
                    </div>
                    <div style={{ fontSize: 10, color: "#00FFB2", fontFamily: "monospace", letterSpacing: "0.15em", margin: "6px 0 4px" }}>{m.delta}</div>
                    <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.08em" }}>{m.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.2em", marginBottom: 12 }}>LIVE EXECUTION STREAM</div>
                  <TerminalFeed />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444", letterSpacing: "0.2em", marginBottom: 12 }}>AGENT STATUS GRID</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {AGENTS.map(a => (
                      <div key={a.id} style={{ background: "#0d0d18", border: `1px solid ${a.color}22`, borderRadius: 2, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 20, color: a.color }}>{a.icon}</span>
                        <div>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: a.color, fontWeight: 700 }}>{a.name}</div>
                          <div style={{ fontSize: 10, color: "#444" }}>{a.tasks.toLocaleString()} tasks</div>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: a.status === "active" ? "#00FFB2" : "#333" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AGENTS */}
          {activeSection === "agents" && (
            <div style={{ animation: "fadeUp 0.4s ease", paddingTop: 48 }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00FFB2", letterSpacing: "0.3em", marginBottom: 12 }}>// AUTONOMOUS AGENT ROSTER</div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: "#fff", letterSpacing: "0.05em" }}>SIX AGENTS. ZERO BOTTLENECKS.</h2>
                <p style={{ color: "#666", fontSize: 13, marginTop: 8 }}>Each agent operates independently, in parallel, 24/7 — with NEXUS as the brain routing decisions.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {AGENTS.map(agent => (
                  <AgentCard key={agent.id} agent={agent} selected={selectedAgent === agent.id} onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)} />
                ))}
              </div>
              <div style={{ marginTop: 24, padding: "20px 24px", background: "#0d0d18", border: "1px solid #1a1a2e", borderRadius: 2, display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 28, color: "#00FFB2" }}>◈</span>
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00FFB2", marginBottom: 4 }}>ORCHESTRATION PROTOCOL</div>
                  <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>NEXUS receives every inbound task and autonomously delegates to the right agent(s), manages dependencies, retries on failure, and aggregates outputs — no human needed in the loop.</div>
                </div>
              </div>
            </div>
          )}

          {/* EXECUTE */}
          {activeSection === "execute" && (
            <div style={{ animation: "fadeUp 0.4s ease", paddingTop: 48 }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00FFB2", letterSpacing: "0.3em", marginBottom: 12 }}>// AGENT EXECUTION INTERFACE — POWERED BY LIVE AI</div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: "#fff", letterSpacing: "0.05em" }}>GIVE A TASK. AGENTS EXECUTE.</h2>
                <p style={{ color: "#666", fontSize: 13, marginTop: 8 }}>Type any business task below. NEXUS will assign it, break it into steps, and return an execution plan — live.</p>
              </div>

              <div style={{ background: "#0d0d18", border: "1px solid #1a1a2e", borderRadius: 2, padding: "28px" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#333", letterSpacing: "0.2em", marginBottom: 16 }}>// INPUT TASK DIRECTIVE</div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <input
                      value={taskInput}
                      onChange={e => setTaskInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && runTask()}
                      placeholder="e.g. Research top 5 competitors in the SaaS fintech space and summarize their pricing..."
                      style={{ width: "100%", background: "#06060a", border: "1px solid #2a2a4a", borderRadius: 2, padding: "14px 16px", color: "#ccc", fontSize: 13, fontFamily: "'DM Sans', sans-serif", outline: "none" }}
                    />
                  </div>
                  <button onClick={runTask} disabled={taskLoading || !taskInput.trim()} style={{
                    background: taskLoading ? "#1a1a2e" : "#00FFB2", color: taskLoading ? "#666" : "#000",
                    border: "none", borderRadius: 2, padding: "0 28px", cursor: taskLoading ? "not-allowed" : "pointer",
                    fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", whiteSpace: "nowrap", transition: "all 0.2s",
                  }}>{taskLoading ? "EXECUTING..." : "DEPLOY →"}</button>
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    "Write a cold email campaign for enterprise B2B leads",
                    "Analyze our burn rate and forecast 6-month runway",
                    "Build a landing page for our new SaaS product",
                    "Find 10 investor contacts in Series A fintech",
                  ].map((s, i) => (
                    <button key={i} onClick={() => setTaskInput(s)} style={{ background: "transparent", border: "1px solid #2a2a4a", color: "#555", borderRadius: 2, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{s}</button>
                  ))}
                </div>
              </div>

              {taskLoading && (
                <div style={{ marginTop: 20, background: "#0d0d18", border: "1px solid #00FFB222", borderRadius: 2, padding: "28px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#00FFB2", letterSpacing: "0.15em", marginBottom: 8 }}>◈ NEXUS ORCHESTRATING...</div>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FFB2", animation: `blink 1s ${i * 0.3}s ease infinite` }} />
                    ))}
                  </div>
                </div>
              )}

              {taskResult && !taskResult.error && (
                <div style={{ marginTop: 20, background: "#0d0d18", border: "1px solid #00FFB233", borderRadius: 2, padding: "28px", animation: "fadeUp 0.4s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00FFB2", letterSpacing: "0.2em" }}>◈ EXECUTION PLAN READY</div>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
                      <span style={{ fontFamily: "monospace", fontSize: 11, color: "#7B61FF" }}>CONFIDENCE: {taskResult.confidence}%</span>
                      <span style={{ fontFamily: "monospace", fontSize: 11, color: "#00FFB2" }}>TIME SAVED: {taskResult.time_saved}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                    {(taskResult.assigned_to || []).map((a, i) => {
                      const agent = AGENTS.find(ag => ag.name === a) || { color: "#00FFB2", icon: "◈" };
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: `${agent.color}14`, border: `1px solid ${agent.color}44`, borderRadius: 2, padding: "4px 12px" }}>
                          <span style={{ color: agent.color, fontSize: 14 }}>{agent.icon}</span>
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: agent.color }}>{a}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 10, color: "#444", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 10 }}>EXECUTION STEPS</div>
                    {(taskResult.steps || []).map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid #12121e" }}>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00FFB2", minWidth: 20 }}>{String(i + 1).padStart(2, "0")}</span>
                        <span style={{ fontSize: 13, color: "#9999cc" }}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#06060a", border: "1px solid #1a1a2e", borderRadius: 2, padding: "16px" }}>
                    <div style={{ fontSize: 10, color: "#444", letterSpacing: "0.15em", fontFamily: "monospace", marginBottom: 8 }}>OUTPUT</div>
                    <p style={{ fontSize: 13, color: "#aaaacc", lineHeight: 1.7 }}>{taskResult.result}</p>
                  </div>
                </div>
              )}

              {taskResult?.error && (
                <div style={{ marginTop: 20, padding: "16px 20px", background: "#1a0a0a", border: "1px solid #ff444433", borderRadius: 2 }}>
                  <span style={{ color: "#ff4444", fontFamily: "monospace", fontSize: 12 }}>⚠ {taskResult.error}</span>
                </div>
              )}

              {taskHistory.length > 0 && (
                <div style={{ marginTop: 32 }}>
                  <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 12 }}>// TASK HISTORY</div>
                  {taskHistory.map((h, i) => (
                    <div key={i} style={{ padding: "10px 16px", background: "#0a0a14", border: "1px solid #12121e", borderRadius: 2, marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 14, color: "#00FFB244" }}>◈</span>
                      <span style={{ fontSize: 12, color: "#555" }}>{h.task}</span>
                      <span style={{ marginLeft: "auto", fontSize: 11, color: "#7B61FF", fontFamily: "monospace" }}>{h.result.time_saved} saved</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STACK */}
          {activeSection === "stack" && (
            <div style={{ animation: "fadeUp 0.4s ease", paddingTop: 48 }}>
              <div style={{ marginBottom: 48 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00FFB2", letterSpacing: "0.3em", marginBottom: 12 }}>// ARCHITECTURE</div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: "#fff", letterSpacing: "0.05em" }}>THE AGENTIC STACK</h2>
                <p style={{ color: "#666", fontSize: 13, marginTop: 8, maxWidth: 540 }}>Five layers. Each one compounding the leverage of the last. Built for operators who want output at machine speed.</p>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 28, top: 40, bottom: 40, width: 1, background: "linear-gradient(180deg, #00FFB2, #7B61FF, #FF6B35, #FFD700, #00C2FF)", opacity: 0.4 }} />
                {STACK.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 32, alignItems: "flex-start", marginBottom: 24, position: "relative", animation: `fadeUp 0.4s ${i * 0.08}s both ease` }}>
                    <div style={{ width: 56, height: 56, flexShrink: 0, background: "#0d0d18", border: "1px solid #2a2a4a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#00FFB2", borderRadius: 2, zIndex: 2 }}>{s.icon}</div>
                    <div style={{ flex: 1, background: "#0d0d18", border: "1px solid #1a1a2e", borderRadius: 2, padding: "20px 24px", borderLeft: "3px solid #00FFB244" }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00FFB2", letterSpacing: "0.2em", marginBottom: 6 }}>LAYER {i + 1} — {s.layer}</div>
                      <div style={{ fontSize: 13, color: "#8888aa", lineHeight: 1.6 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 48, padding: "48px", background: "linear-gradient(135deg, #0d1a14 0%, #0a0a0f 100%)", border: "1px solid #00FFB233", borderRadius: 2, textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#fff", marginBottom: 12 }}>
                  THOSE WHO APPLY THIS EARLY<br /><span style={{ color: "#00FFB2" }}>CAPTURE DISPROPORTIONATE VALUE.</span>
                </div>
                <p style={{ color: "#666", fontSize: 13, marginBottom: 28, lineHeight: 1.7 }}>AgenticOS gives a team of 3 the leverage of a team of 50.<br />The window to lead is now.</p>
                <button onClick={() => setActiveSection("execute")} style={{ background: "#00FFB2", color: "#000", border: "none", padding: "14px 40px", borderRadius: 2, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", boxShadow: "0 0 32px #00FFB244" }}>DEPLOY YOUR FIRST TASK →</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
