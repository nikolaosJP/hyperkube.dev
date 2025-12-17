/**
 * terminal-llm.js
 * - Standard Script version
 * - Friendly personality
 * - Robust error handling & "Smart Parsing" for API glitches
 */

(function() {
    const SYSTEM_PROMPT = `
You are a helpful, friendly AI assistant living inside hyperkube's portfolio terminal.
- You are NOT a robot; be natural and conversational.
- Keep responses short (max 2-3 sentences).
- Do not use Markdown formatting.
`.trim();

    // Optimized: Use fixed-size array to avoid repeated slicing
    const MAX_HISTORY = 3; // System + Last 2 messages
    let chatHistory = [
        { role: 'system', content: SYSTEM_PROMPT }
    ];

    /**
     * Tool: Weather Fetcher
     */
    async function handleTools(input) {
        const lower = input.toLowerCase();
        if (lower.includes('weather')) {
            try {
                const parts = input.split(' in ');
                const location = parts.length > 1 ? parts[1].trim() : '';
                const url = location 
                    ? `https://wttr.in/${encodeURIComponent(location)}?format=%l:+%C+%t+%w`
                    : `https://wttr.in/?format=%l:+%C+%t+%w`;

                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.text();
                    return `[System Note: The weather is ${data.trim()}]`;
                }
            } catch (e) {
                // Silent fail - weather tool is non-critical
            }
        }
        return null;
    }

    /**
     * Main Query Function
     * Attached to window for access from index.html
     */
    window.queryLLM = async function(input) {
        try {
            // 1. Tool Check
            const toolData = await handleTools(input);
            const effectivePrompt = toolData ? `${input} ${toolData}` : input;

            // 2. Update History
            chatHistory.push({ role: 'user', content: effectivePrompt });

            // Optimized: Keep history short (System + Last 2 messages) to prevent URL overflow
            if (chatHistory.length > MAX_HISTORY) {
                // More efficient than slicing: keep system message and shift out old messages
                chatHistory.splice(1, chatHistory.length - MAX_HISTORY);
            }

            // 3. Construct URL - Optimized with template literals
            const promptText = chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n');
            const url = `https://text.pollinations.ai/${encodeURIComponent(promptText)}?model=openai`;

            // 4. Fetch
            const response = await fetch(url);
            const rawText = await response.text();

            // 5. Smart Parsing (Fixes JSON return bugs)
            let finalResponse = "";
            
            try {
                // Try to parse as JSON first (sometimes API returns JSON object)
                const json = JSON.parse(rawText);
                
                // Check for empty/broken JSON
                if (json.role === "assistant" && !json.content) {
                    throw new Error("Empty response");
                }
                
                if (json.content) {
                    finalResponse = json.content;
                } else if (json.choices && json.choices[0]) {
                    finalResponse = json.choices[0].message.content;
                } else {
                    finalResponse = rawText; // Fallback to raw
                }
            } catch (e) {
                // If JSON parse fails, it means we got plain text (which is good)
                finalResponse = rawText;
            }

            // Optimized: Clean up Markdown formatting in one pass
            finalResponse = finalResponse.replace(/\*\*/g, '').trim();

            chatHistory.push({ role: 'assistant', content: finalResponse });
            return finalResponse;

        } catch (error) {
            console.error("LLM Error:", error);
            // Reset context on error
            chatHistory = [{ role: 'system', content: SYSTEM_PROMPT }];
            return "Connection glitch detected. I'm back now—what were you saying?";
        }
    };
})();
