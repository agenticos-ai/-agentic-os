import { useState, useEffect } from "react";

const COLORS = {
  bg: "#FAFAF9",
  bgCard: "#FFFFFF",
  bgLight: "#F5F4F2",
  dark: "#1C1917",
  gold: "#D4A853",
  goldLight: "#F5E6C8",
  border: "#E7E5E4",
  borderStrong: "#D4CFC9",
  text: "#1C1917",
  textSecondary: "#78716C",
  textMuted: "#A8A29E",
  success: "#16A34A",
  error: "#DC2626",
};

const AGENTS = [
  { id: "nexus", name: "NEXUS", role: "Orchestration Agent", icon: "◈", color: COLORS.gold, description: "Coordinates all sub-agents, routes tasks, and maintains execution context across the entire system.", status: "active", tasks: 847, uptime: "99.97%" },
  { id: "axiom", name: "AXIOM", role: "Research & Analysis Agent", icon: "⬡", color: "#C2410C", description: "Autonomously browses, synthesizes, and structures intelligence from any data source in real time.", status: "active", tasks: 2341, uptime: "99.91%" },
  { id: "forge", name: "FORGE", role: "Build & Deploy Agent", icon: "◆", color: "#7C3AED", description: "Writes, tests, and ships production code across stacks with zero human handoff required.", status: "active", tasks: 1203, uptime: "99.88%" },
  { id: "signal", name: "SIGNAL", role: "Outreach & Growth Agent", icon: "◉", color: COLORS.gold, description: "Executes multi-channel campaigns, qualifies leads, and books meetings — end to end, autonomously.", status: "active", tasks: 4102, uptime: "99.95%" },
  { id: "ledger", name: "LEDGER", role: "Finance & Operations Agent", icon: "▣", color: "#0369A1", description: "Monitors P&L, flags anomalies, runs reports, and manages vendor workflows without intervention.", status: "standby", tasks: 674, uptime: "99.99%" },
  { id: "oracle", name: "ORACLE", role: "Decision Intelligence Agent", icon: "⬟", color: "#BE185D", description: "Runs scenario models, risk assessments, and strategic recommendations — in seconds, not weeks.", status: "active", tasks: 388, uptime: "99.93%" },
];

const LIVE_FEED = [
  { agent: "NEXUS", action: "Routed 14 tasks to sub-agents", time: "0s ago", color: COLORS.gold },
  { agent: "FORGE", action: "Deployed v2.4.1 to production", time: "3s ago", color: "#7C3AED" },
  { agent: "SIGNAL", action: "Qualified 3 enterprise leads", time: "8s ago", color: COLORS.gold },
  { agent: "AXIOM", action: "Synthesized 47-page market report", time: "12s ago", color: "#C2410C" },
  { agent: "ORACLE", action: "Flagged 2 high-risk scenarios", time: "19s ago", color: "#BE185D" },
  { agent: "LEDGER", action: "Reconciled Q2 vendor invoices", time: "24s ago", color: "#0369A1" },
  { agent: "FORGE", action: "Refactored auth module — 0 bugs", time: "31s ago", color: "#7C3AED" },
  { agent: "SIGNAL", action: "Sent 200 personalized cold emails", time: "38s ago", color: COLORS.gold },
  { agent: "NEXUS", action: "Spawned 3 new worker threads", time: "44s ago", color: COLORS.gold },
  { agent: "AXIOM", action: "Extracted data from 23 sources", time: "52s ago", color: "#C2410C" },
];

const METRICS = [
  { label: "Tasks Executed", value: "9555", suffix: "", delta: "+312 today" },
  { label: "Hours Saved", value: "18400", suffix: "", delta: "+94 this week" },
  { label: "Operators Required", value: "3", suffix: "", delta: "vs 47 traditional" },
  { label: "Output Multiplier", value: "156", suffix: "×", delta: "vs human baseline", divisor: 10 },
];

const STACK = [
  { layer: "ORCHESTRATION", desc: "NEXUS routes, prioritizes, and delegates every decision across your organization", icon: "◈" },
  { layer: "EXECUTION", desc: "Specialized agents act autonomously in parallel — 24 hours a day, 7 days a week", icon: "⚡" },
  { layer: "MEMORY", desc: "Persistent context across sessions, agents, and time — your business never forgets", icon: "◎" },
  { layer: "INTEGRATION", desc: "Connects to any API, database, or workflow natively without custom development", icon: "⬡" },
  { layer: "GOVERNANCE", desc: "Role-based controls, full audit logs, and enterprise-grade fail-safes built in", icon: "▣" },
];

const PLANS = [
  {
    name: "Starter",
    price: "$149",
    period: "/month",
    description: "For solo investors, agents, and small business owners.",
    features: [
      "50 agent tasks per month",
      "All 6 AI agents included",
      "Deal analysis & research",
      "Content and email drafting",
      "48-hour email support",
      "7-day free trial",
    ],
    cta: "Start Free Trial",
    highlighted: false,
    priceId: "starter",
  },
  {
    name: "Pro",
    price: "$399",
    period: "/month",
    description: "For teams, brokers, agencies, and multi-location businesses.",
    features: [
      "Unlimited agent tasks",
      "All 6 AI agents included",
      "Everything in Starter",
      "Custom task templates",
      "Priority 24-hour support",
      "7-day free trial",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    priceId: "pro",
  },
];

// Simple auth state management
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("agenticos_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch (e) {}
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("agenticos_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agenticos_user");
  };

  return { user, loading, login, logout };
}

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
  return (
    <div onClick={onClick} style={{ background: COLORS.bgCard, border: `1px solid ${selected ? agent.color : COLORS.border}`, borderRadius: 8, padding: "24px", cursor: "pointer", transition: "all 0.2s ease", position: "relative", overflow: "hidden", boxShadow: selected ? `0 4px 20px ${agent.color}22` : "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: selected ? agent.color : "transparent", transition: "background 0.2s" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 26, color: agent.color }}>{agent.icon}</span>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: COLORS.dark, letterSpacing: "0.15em" }}>{agent.name}</div>
          <div style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 2 }}>{agent.role}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: agent.status === "active" ? COLORS.success : COLORS.textMuted }} />
          <span style={{ fontSize: 10, color: agent.status === "active" ? COLORS.success : COLORS.textMuted, fontFamily: "monospace" }}>{agent.status.toUpperCase()}</span>
        </div>
      </div>
      <p style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.6, margin: "0 0 16px" }}>{agent.description}</p>
      <div style={{ display: "flex", gap: 24 }}>
        <div>
          <div style={{ fontSize: 18, fontFamily: "monospace", color: COLORS.dark, fontWeight: 700 }}>{agent.tasks.toLocaleString()}</div>
          <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.1em", marginTop: 2 }}>TASKS RUN</div>
        </div>
        <div>
          <div style={{ fontSize: 18, fontFamily: "monospace", color: COLORS.dark, fontWeight: 700 }}>{agent.uptime}</div>
          <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.1em", marginTop: 2 }}>UPTIME</div>
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
        const newItem = { ...LIVE_FEED[Math.floor(Math.random() * LIVE_FEED.length)], time: "just now" };
        return [newItem, ...prev.slice(0, 14)];
      });
    }, 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ background: COLORS.dark, borderRadius: 8, padding: "20px", height: 300, overflowY: "auto", fontFamily: "monospace" }}>
      <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.2em", marginBottom: 14 }}>// LIVE EXECUTION STREAM</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 8, opacity: Math.max(0.2, 1 - i * 0.06) }}>
          <span style={{ fontSize: 10, color: COLORS.textMuted, minWidth: 60 }}>{item.time}</span>
          <span style={{ fontSize: 11, color: item.color, minWidth: 60, fontWeight: 700 }}>{item.agent}</span>
          <span style={{ fontSize: 11, color: COLORS.textMuted }}>→</span>
          <span style={{ fontSize: 11, color: "#D6D3D1" }}>{item.action}</span>
        </div>
      ))}
    </div>
  );
}

function AuthModal({ mode, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", plan: "starter" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentMode, setCurrentMode] = useState(mode);

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (currentMode === "signup" && !form.name) { setError("Please enter your name."); return; }
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 800));
    const userData = {
      name: form.name || form.email.split("@")[0],
      email: form.email,
      plan: form.plan,
      trialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    };
    onSuccess(userData);
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,25,23,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: COLORS.bgCard, borderRadius: 12, padding: "40px", width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ width: 28, height: 28, background: COLORS.dark, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.gold, fontSize: 12 }}>◈</div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em" }}>AGENTIC<span style={{ color: COLORS.gold }}>OS</span></span>
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500, color: COLORS.dark, marginBottom: 8 }}>
          {currentMode === "signup" ? "Start your free trial" : "Welcome back"}
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textSecondary, marginBottom: 28 }}>
          {currentMode === "signup" ? "7 days free, then $149/month or $399/month. Cancel anytime." : "Sign in to your AgenticOS account."}
        </p>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 14px", marginBottom: 16 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: COLORS.error, margin: 0 }}>{error}</p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {currentMode === "signup" && (
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>FULL NAME</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Frances Nwokoro" style={{ width: "100%", background: COLORS.bgLight, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "11px 14px", fontSize: 13, fontFamily: "'Inter', sans-serif", color: COLORS.dark, outline: "none" }} />
            </div>
          )}

          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>EMAIL ADDRESS</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" style={{ width: "100%", background: COLORS.bgLight, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "11px 14px", fontSize: 13, fontFamily: "'Inter', sans-serif", color: COLORS.dark, outline: "none" }} />
          </div>

          <div>
            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>PASSWORD</label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" style={{ width: "100%", background: COLORS.bgLight, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "11px 14px", fontSize: 13, fontFamily: "'Inter', sans-serif", color: COLORS.dark, outline: "none" }} />
          </div>

          {currentMode === "signup" && (
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>SELECT PLAN</label>
              <select value={form.plan} onChange={e => setForm(f => ({ ...f, plan: e.target.value }))} style={{ width: "100%", background: COLORS.bgLight, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "11px 14px", fontSize: 13, fontFamily: "'Inter', sans-serif", color: COLORS.dark, outline: "none" }}>
                <option value="starter">Starter — $149/month (50 tasks)</option>
                <option value="pro">Pro — $399/month (Unlimited tasks)</option>
              </select>
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} style={{ background: COLORS.dark, color: COLORS.gold, border: "none", borderRadius: 6, padding: "13px", fontSize: 13, fontFamily: "'Inter', sans-serif", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", marginTop: 8, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Please wait..." : currentMode === "signup" ? "Start 7-Day Free Trial →" : "Sign In →"}
          </button>
        </div>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>
            {currentMode === "signup" ? "Already have an account? " : "Don't have an account? "}
            <button onClick={() => setCurrentMode(currentMode === "signup" ? "login" : "signup")} style={{ background: "none", border: "none", color: COLORS.gold, cursor: "pointer", fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              {currentMode === "signup" ? "Sign in" : "Start free trial"}
            </button>
          </span>
        </div>

        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: COLORS.textMuted, fontSize: 18 }}>✕</button>
      </div>
    </div>
  );
}

function PricingPage({ onSignup }) {
  return (
    <div style={{ animation: "fadeUp 0.4s ease", paddingTop: 56 }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{ display: "inline-block", background: COLORS.goldLight, border: `1px solid ${COLORS.gold}44`, borderRadius: 20, padding: "4px 16px", marginBottom: 20 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.gold, letterSpacing: "0.2em", fontWeight: 500 }}>SIMPLE PRICING</span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, color: COLORS.dark, fontWeight: 500, marginBottom: 12 }}>Start Free. Scale Fast.</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textSecondary, fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>7 days free on any plan. No credit card required to start. Cancel anytime.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 800, margin: "0 auto 56px" }}>
        {PLANS.map((plan) => (
          <div key={plan.name} style={{ background: plan.highlighted ? COLORS.dark : COLORS.bgCard, border: `1px solid ${plan.highlighted ? COLORS.gold : COLORS.border}`, borderRadius: 12, padding: "36px", position: "relative", boxShadow: plan.highlighted ? "0 8px 40px rgba(212,168,83,0.2)" : "0 1px 4px rgba(0,0,0,0.06)" }}>
            {plan.highlighted && (
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: COLORS.gold, color: COLORS.dark, fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", padding: "4px 16px", borderRadius: 20 }}>MOST POPULAR</div>
            )}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: plan.highlighted ? COLORS.gold : COLORS.textMuted, letterSpacing: "0.15em", marginBottom: 8 }}>{plan.name.toUpperCase()}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 500, color: plan.highlighted ? "#fff" : COLORS.dark }}>{plan.price}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: plan.highlighted ? COLORS.textMuted : COLORS.textSecondary }}>{plan.period}</span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: plan.highlighted ? "#A8A29E" : COLORS.textSecondary, lineHeight: 1.6 }}>{plan.description}</p>
            </div>

            <div style={{ marginBottom: 28 }}>
              {plan.features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: COLORS.gold, fontSize: 14, flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: plan.highlighted ? "#D6D3D1" : COLORS.textSecondary }}>{f}</span>
                </div>
              ))}
            </div>

            <button onClick={() => onSignup(plan.priceId)} style={{ width: "100%", background: plan.highlighted ? COLORS.gold : COLORS.dark, color: plan.highlighted ? COLORS.dark : COLORS.gold, border: "none", borderRadius: 6, padding: "13px", fontSize: 13, fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer", letterSpacing: "0.03em" }}>
              {plan.cta} →
            </button>
          </div>
        ))}
      </div>

      <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "24px 32px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6 }}>
          <strong style={{ color: COLORS.dark }}>Enterprise?</strong> For custom deployments, compliance integrations, or white-label solutions, contact us at{" "}
          <a href="mailto:team.agenticos@gmail.com" style={{ color: COLORS.gold, textDecoration: "none" }}>team.agenticos@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const { user, loading, login, logout } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [taskInput, setTaskInput] = useState("");
  const [taskResult, setTaskResult] = useState(null);
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskHistory, setTaskHistory] = useState([]);
  const [authModal, setAuthModal] = useState(null);

  const handleAuthSuccess = (userData) => {
    login(userData);
    setAuthModal(null);
    setActiveSection("execute");
  };

  const openSignup = (plan = "starter") => {
    setAuthModal({ mode: "signup", plan });
  };

  const trialDaysLeft = user ? Math.max(0, Math.ceil((new Date(user.trialEnd) - new Date()) / (1000 * 60 * 60 * 24))) : 0;
  const trialActive = user && trialDaysLeft > 0;

  async function runTask() {
    if (!taskInput.trim() || taskLoading) return;
    if (!user) { setAuthModal({ mode: "signup" }); return; }
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
      if (parsed.error) { setTaskResult({ error: parsed.error }); }
      else { setTaskResult(parsed); setTaskHistory(h => [{ task: userTask, result: parsed }, ...h.slice(0, 4)]); }
    } catch (e) {
      setTaskResult({ error: "Agent execution failed. Please try again." });
    }
    setTaskLoading(false);
  }

  const nav = [
    { id: "dashboard", label: "Dashboard" },
    { id: "agents", label: "Agents" },
    { id: "execute", label: "Execute" },
    { id: "stack", label: "Stack" },
    { id: "pricing", label: "Pricing" },
  ];

  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: COLORS.bg, fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textMuted }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Georgia', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bgLight}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.borderStrong}; border-radius: 2px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        input:focus { border-color: ${COLORS.gold} !important; box-shadow: 0 0 0 3px ${COLORS.goldLight}; }
        select:focus { border-color: ${COLORS.gold} !important; }
      `}</style>

      {authModal && (
        <AuthModal mode={authModal.mode} onClose={() => setAuthModal(null)} onSuccess={handleAuthSuccess} />
      )}

      {/* TRIAL BANNER */}
      {user && trialActive && (
        <div style={{ background: COLORS.goldLight, borderBottom: `1px solid ${COLORS.gold}44`, padding: "8px 48px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: COLORS.dark }}>
            ◈ Your free trial ends in <strong>{trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""}</strong>. Add a payment method to keep access.
          </span>
          <button onClick={() => setActiveSection("pricing")} style={{ background: COLORS.dark, color: COLORS.gold, border: "none", borderRadius: 4, padding: "4px 12px", fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 500, cursor: "pointer" }}>Upgrade Now</button>
        </div>
      )}

      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 64, borderBottom: `1px solid ${COLORS.border}`, background: COLORS.bgCard, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, background: COLORS.dark, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: COLORS.gold }}>◈</div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.08em", color: COLORS.dark }}>AGENTIC<span style={{ color: COLORS.gold }}>OS</span></div>
            <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: "0.25em", fontFamily: "'Inter', sans-serif" }}>AUTONOMOUS SYSTEMS</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setActiveSection(n.id)} style={{ background: activeSection === n.id ? COLORS.bgLight : "transparent", border: "none", color: activeSection === n.id ? COLORS.dark : COLORS.textSecondary, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: activeSection === n.id ? 500 : 400, transition: "all 0.15s" }}>{n.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, background: COLORS.goldLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: COLORS.gold }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: COLORS.dark }}>{user.name.split(" ")[0]}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.textMuted, textTransform: "capitalize" }}>{user.plan} plan</div>
                </div>
              </div>
              <button onClick={logout} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 12px", fontSize: 12, fontFamily: "'Inter', sans-serif", color: COLORS.textSecondary, cursor: "pointer" }}>Sign out</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setAuthModal({ mode: "login" })} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 16px", fontSize: 12, fontFamily: "'Inter', sans-serif", color: COLORS.textSecondary, cursor: "pointer" }}>Sign in</button>
              <button onClick={() => openSignup()} style={{ background: COLORS.dark, border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 12, fontFamily: "'Inter', sans-serif", color: COLORS.gold, cursor: "pointer", fontWeight: 500 }}>Start Free Trial</button>
            </div>
          )}
        </div>
      </nav>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 48px 80px" }}>

        {/* DASHBOARD */}
        {activeSection === "dashboard" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ padding: "72px 0 56px", textAlign: "center" }}>
              <div style={{ display: "inline-block", background: COLORS.goldLight, border: `1px solid ${COLORS.gold}44`, borderRadius: 20, padding: "4px 16px", marginBottom: 24 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.gold, letterSpacing: "0.2em", fontWeight: 500 }}>THE NEXT FRONTIER OF BUSINESS</span>
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 500, lineHeight: 0.95, letterSpacing: "-0.01em", marginBottom: 28, color: COLORS.dark }}>
                Systems That<br />
                <span style={{ color: COLORS.gold }}>Act.</span> <span style={{ color: "#7C3AED" }}>Decide.</span> <span style={{ color: "#C2410C" }}>Execute.</span>
              </h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: COLORS.textSecondary, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 300 }}>One operator. Six autonomous agents. Disproportionate output.<br />This is how small teams beat enterprises.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                {user ? (
                  <button onClick={() => setActiveSection("execute")} style={{ background: COLORS.dark, color: COLORS.gold, border: "none", padding: "13px 32px", borderRadius: 6, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500 }}>Deploy a Task →</button>
                ) : (
                  <button onClick={() => openSignup()} style={{ background: COLORS.dark, color: COLORS.gold, border: "none", padding: "13px 32px", borderRadius: 6, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500 }}>Start Free Trial →</button>
                )}
                <button onClick={() => setActiveSection("pricing")} style={{ background: "transparent", color: COLORS.textSecondary, border: `1px solid ${COLORS.border}`, padding: "13px 32px", borderRadius: 6, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 13 }}>View Pricing</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
              {METRICS.map((m, i) => (
                <div key={i} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "24px", borderTop: `3px solid ${COLORS.gold}` }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, color: COLORS.dark, fontWeight: 500, lineHeight: 1 }}>
                    <LiveCounter target={m.value} suffix={m.suffix} divisor={m.divisor || 1} />
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.gold, margin: "6px 0 4px", fontWeight: 500 }}>{m.delta}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.06em" }}>{m.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.2em", marginBottom: 12, fontWeight: 500 }}>LIVE EXECUTION STREAM</div>
                <TerminalFeed />
              </div>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.2em", marginBottom: 12, fontWeight: 500 }}>AGENT STATUS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {AGENTS.map(a => (
                    <div key={a.id} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18, color: a.color }}>{a.icon}</span>
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.dark, fontWeight: 700 }}>{a.name}</div>
                        <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 2 }}>{a.tasks.toLocaleString()} tasks</div>
                      </div>
                      <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: a.status === "active" ? COLORS.success : COLORS.textMuted }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AGENTS */}
        {activeSection === "agents" && (
          <div style={{ animation: "fadeUp 0.4s ease", paddingTop: 56 }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.gold, letterSpacing: "0.3em", marginBottom: 12, fontWeight: 500 }}>AUTONOMOUS AGENT ROSTER</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, color: COLORS.dark, fontWeight: 500 }}>Six Agents. Zero Bottlenecks.</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textSecondary, fontSize: 14, marginTop: 10, maxWidth: 540, lineHeight: 1.6 }}>Each agent operates independently, in parallel, around the clock — with NEXUS as the intelligence routing every decision.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {AGENTS.map(agent => (
                <AgentCard key={agent.id} agent={agent} selected={selectedAgent === agent.id} onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)} />
              ))}
            </div>
            <div style={{ marginTop: 24, padding: "20px 24px", background: COLORS.dark, borderRadius: 8, display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: 24, color: COLORS.gold }}>◈</span>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.gold, marginBottom: 6, letterSpacing: "0.1em", fontWeight: 500 }}>ORCHESTRATION PROTOCOL</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#D6D3D1", lineHeight: 1.6 }}>NEXUS receives every inbound task and autonomously delegates to the right agent, manages dependencies, retries on failure, and aggregates outputs — no human needed in the loop.</div>
              </div>
            </div>
          </div>
        )}

        {/* EXECUTE */}
        {activeSection === "execute" && (
          <div style={{ animation: "fadeUp 0.4s ease", paddingTop: 56 }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.gold, letterSpacing: "0.3em", marginBottom: 12, fontWeight: 500 }}>AGENT EXECUTION INTERFACE — POWERED BY LIVE AI</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, color: COLORS.dark, fontWeight: 500 }}>Give a Task. Agents Execute.</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textSecondary, fontSize: 14, marginTop: 10, lineHeight: 1.6 }}>Type any business task below. NEXUS will assign it, break it into steps, and return an execution plan — live.</p>
            </div>

            {!user && (
              <div style={{ background: COLORS.goldLight, border: `1px solid ${COLORS.gold}44`, borderRadius: 8, padding: "24px 28px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: COLORS.dark, marginBottom: 4 }}>Sign up to deploy tasks</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textSecondary }}>Create a free account to access the full execution engine. 7 days free, no credit card required.</div>
                </div>
                <button onClick={() => openSignup()} style={{ background: COLORS.dark, color: COLORS.gold, border: "none", borderRadius: 6, padding: "11px 24px", fontSize: 13, fontFamily: "'Inter', sans-serif", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>Start Free Trial →</button>
              </div>
            )}

            <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "28px", marginBottom: 16 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.2em", marginBottom: 14, fontWeight: 500 }}>INPUT TASK DIRECTIVE</div>
              <div style={{ display: "flex", gap: 12 }}>
                <input value={taskInput} onChange={e => setTaskInput(e.target.value)} onKeyDown={e => e.key === "Enter" && runTask()}
                  placeholder="e.g. Analyze this investment property: 123 Main St, asking $380k, estimated rent $2,800/month..."
                  style={{ flex: 1, background: COLORS.bgLight, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "13px 16px", color: COLORS.dark, fontSize: 13, fontFamily: "'Inter', sans-serif", outline: "none" }} />
                <button onClick={runTask} disabled={taskLoading || !taskInput.trim()} style={{ background: taskLoading ? COLORS.bgLight : COLORS.dark, color: taskLoading ? COLORS.textMuted : COLORS.gold, border: "none", borderRadius: 6, padding: "0 28px", cursor: taskLoading ? "not-allowed" : "pointer", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", transition: "all 0.2s" }}>
                  {taskLoading ? "Executing..." : user ? "Deploy →" : "Sign up to Deploy →"}
                </button>
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Write a cold email campaign for enterprise B2B leads", "Analyze our burn rate and forecast 6-month runway", "Research top 5 competitors and summarize their pricing", "Find 10 investor contacts in Series A fintech"].map((s, i) => (
                  <button key={i} onClick={() => setTaskInput(s)} style={{ background: "transparent", border: `1px solid ${COLORS.border}`, color: COLORS.textSecondary, borderRadius: 20, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>{s}</button>
                ))}
              </div>
            </div>

            <div style={{ background: COLORS.bgLight, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.textSecondary, lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: COLORS.dark }}>⚠ AI-Generated Output:</strong> Results are produced by artificial intelligence and are for informational purposes only. AgenticOS does not provide legal, financial, investment, or professional advice. Always consult a qualified professional before acting on any AI-generated analysis. <a href="/disclaimer" style={{ color: COLORS.gold, textDecoration: "none" }}>Read full disclaimer →</a>
              </p>
            </div>

            {taskLoading && (
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "32px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.gold, letterSpacing: "0.1em", marginBottom: 12, animation: "shimmer 1.5s ease infinite" }}>◈ NEXUS Orchestrating...</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                  {[0, 1, 2].map(i => (<div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.gold, opacity: 0.4, animation: `shimmer 1s ${i * 0.3}s ease infinite` }} />))}
                </div>
              </div>
            )}

            {taskResult && !taskResult.error && (
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "28px", animation: "fadeUp 0.4s ease", borderTop: `3px solid ${COLORS.gold}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.gold, letterSpacing: "0.15em", fontWeight: 500 }}>◈ EXECUTION PLAN READY</div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: "#7C3AED" }}>Confidence: {taskResult.confidence}%</span>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.gold }}>Time saved: {taskResult.time_saved}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                  {(taskResult.assigned_to || []).map((a, i) => {
                    const agent = AGENTS.find(ag => ag.name === a) || { color: COLORS.gold, icon: "◈" };
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.bgLight, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "4px 14px" }}>
                        <span style={{ color: agent.color, fontSize: 12 }}>{agent.icon}</span>
                        <span style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.dark, fontWeight: 600 }}>{a}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.15em", marginBottom: 10, fontWeight: 500 }}>EXECUTION STEPS</div>
                  {(taskResult.steps || []).map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "baseline", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: COLORS.gold, minWidth: 20, fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5 }}>{step}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: COLORS.bgLight, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "16px 20px" }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 500 }}>OUTPUT</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.7, margin: 0 }}>{taskResult.result}</p>
                </div>
              </div>
            )}

            {taskResult?.error && (
              <div style={{ padding: "14px 18px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6 }}>
                <span style={{ color: COLORS.error, fontFamily: "'Inter', sans-serif", fontSize: 12 }}>⚠ {taskResult.error}</span>
              </div>
            )}

            {taskHistory.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.2em", marginBottom: 12, fontWeight: 500 }}>TASK HISTORY</div>
                {taskHistory.map((h, i) => (
                  <div key={i} style={{ padding: "10px 16px", background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 6, marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, color: COLORS.gold }}>◈</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: COLORS.textSecondary }}>{h.task}</span>
                    <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 11, color: "#7C3AED" }}>{h.result.time_saved} saved</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STACK */}
        {activeSection === "stack" && (
          <div style={{ animation: "fadeUp 0.4s ease", paddingTop: 56 }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.gold, letterSpacing: "0.3em", marginBottom: 12, fontWeight: 500 }}>ARCHITECTURE</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, color: COLORS.dark, fontWeight: 500 }}>The Agentic Stack</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", color: COLORS.textSecondary, fontSize: 14, marginTop: 10, maxWidth: 540, lineHeight: 1.6 }}>Five layers. Each one compounding the leverage of the last. Built for operators who demand output at machine speed.</p>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 27, top: 40, bottom: 40, width: 1, background: `linear-gradient(180deg, ${COLORS.gold}, #7C3AED, #C2410C, #0369A1, #BE185D)`, opacity: 0.3 }} />
              {STACK.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 28, alignItems: "flex-start", marginBottom: 20, position: "relative", animation: `fadeUp 0.4s ${i * 0.08}s both ease` }}>
                  <div style={{ width: 54, height: 54, flexShrink: 0, background: COLORS.dark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: COLORS.gold, borderRadius: 8, zIndex: 2 }}>{s.icon}</div>
                  <div style={{ flex: 1, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "20px 24px", borderLeft: `3px solid ${COLORS.gold}` }}>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: COLORS.gold, letterSpacing: "0.2em", marginBottom: 6, fontWeight: 700 }}>LAYER {i + 1} — {s.layer}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 48, padding: "48px", background: COLORS.dark, borderRadius: 8, textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, color: "#fff", marginBottom: 12, fontWeight: 500 }}>
                Those who apply this early<br /><span style={{ color: COLORS.gold }}>capture disproportionate value.</span>
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", color: "#A8A29E", fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>AgenticOS gives a team of 3 the leverage of a team of 50.<br />The window to lead is now.</p>
              <button onClick={() => user ? setActiveSection("execute") : openSignup()} style={{ background: COLORS.gold, color: COLORS.dark, border: "none", padding: "14px 40px", borderRadius: 6, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>{user ? "Deploy Your First Task →" : "Start Free Trial →"}</button>
            </div>
          </div>
        )}

        {/* PRICING */}
        {activeSection === "pricing" && (
          <PricingPage onSignup={openSignup} />
        )}

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${COLORS.border}`, background: COLORS.bgCard, padding: "24px 48px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: COLORS.textMuted }}>© 2026 AgenticOS. All rights reserved.</div>
          <div style={{ display: "flex", gap: 24 }}>
            {[["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["AI Disclaimer", "/disclaimer"]].map(([label, href]) => (
              <a key={href} href={href} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: COLORS.textSecondary, textDecoration: "none" }}>{label}</a>
            ))}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: COLORS.textMuted }}>myagentic-os.com</div>
        </div>
      </footer>
    </div>
  );
}
