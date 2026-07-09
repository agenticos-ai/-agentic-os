module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { task } = req.body;

  if (!task || typeof task !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid task' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1000,
        system: `You are NEXUS, the orchestration agent for an Agentic AI company platform. When given a business task, you:
1. Identify which agent(s) should handle it (NEXUS, AXIOM, FORGE, SIGNAL, LEDGER, or ORACLE)
2. Break it into 3-5 autonomous execution steps
3. Provide a concise result/output simulation
4. State the time saved vs manual execution

Respond ONLY in this exact JSON format — no markdown, no backticks, no preamble:
{"assigned_to":["AGENT_NAME"],"steps":["step 1","step 2","step 3"],"result":"Concise simulated result","time_saved":"X hours","confidence":97}`,
        messages: [{ role: 'user', content: task }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      return res.status(response.status).json({ error: 'Claude API request failed' });
    }

    const data = await response.json();
    const rawText = data.content?.find((b) => b.type === 'text')?.text || '{}';
    const clean = rawText.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (e) {
      parsed = { error: 'Could not parse agent response' };
    }

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
