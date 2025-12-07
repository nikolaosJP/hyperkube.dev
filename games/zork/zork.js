/**
 * Zork1 Z-machine integration for terminal
 */
(function() {
    let zorkGame = null;
    let gameRunner = null;
    let inputResolver = null;
    let isGameActive = false;
    let outputCallback = null;
    let outputBuffer = '';
    let pendingStatus = '';

    // Flush buffered output
    function flushOutput() {
        if (!outputCallback) {
            outputBuffer = '';
            pendingStatus = '';
            return;
        }

        const cleaned = (outputBuffer || '')
            .replace(/\r/g, '')
            .replace(/^\s*>\s*$/gm, '') // drop lone ">" lines
            .replace(/>\\s*$/g, '') // drop trailing ">" artifacts
            .replace(/\n{3,}/g, '\n\n') // collapse excessive blank lines
            .trim();

        const parts = [];
        if (pendingStatus) parts.push(pendingStatus.trim());
        if (cleaned) parts.push(cleaned);

        if (parts.length) {
            outputCallback(parts.join('\n\n') + '\n');
        }

        outputBuffer = '';
        pendingStatus = '';
    }

    // Load and initialize Zork
    async function loadZork() {
        try {
            const response = await fetch('games/zork/zork1.z3');
            const arrayBuffer = await response.arrayBuffer();
            const gameData = new Uint8Array(arrayBuffer);

            zorkGame = new JSZM(gameData);

            // Set up print handler - called when game outputs text
            // Buffer output to avoid creating too many divs
            zorkGame.print = function*(text, scripting) {
                outputBuffer += text;
            };

            // Set up read handler - called when game requests input
            zorkGame.read = function*(maxlen) {
                // Flush output before requesting input
                flushOutput();

                return yield new Promise((resolve) => {
                    inputResolver = resolve;
                });
            };

            // Optional: status line handler
            zorkGame.updateStatusLine = function*(text, v18, v17) {
                pendingStatus = `${text} (Score: ${v18}, Moves: ${v17})`;
            };

            return true;
        } catch (error) {
            console.error('Failed to load Zork:', error);
            return false;
        }
    }

    // Start the game
    function startGame(onOutput) {
        if (isGameActive) {
            return false;
        }

        outputCallback = onOutput;
        isGameActive = true;

        if (!zorkGame) {
            onOutput('Loading Zork1...\n');
            loadZork().then((success) => {
                if (success) {
                    runGame();
                } else {
                    onOutput('Error: Failed to load Zork1\n');
                    isGameActive = false;
                }
            });
        } else {
            runGame();
        }

        return true;
    }

    // Run the game loop
    function runGame() {
        gameRunner = zorkGame.run();

        // Start the generator
        const advance = (value) => {
            try {
                const result = gameRunner.next(value);

                if (result.done) {
                    isGameActive = false;
                    if (window.exitGameMode) window.exitGameMode();
                    outputCallback('\n[Game ended. Type "zork" to play again]\n');
                } else if (result.value && result.value.then) {
                    // It's a promise (waiting for input)
                    result.value.then(advance);
                } else {
                    // Continue immediately
                    advance(result.value);
                }
            } catch (error) {
                console.error('Game error:', error);
                outputCallback('\n[Game error occurred]\n');
                isGameActive = false;
            }
        };

        advance();
    }

    // Send input to the game
    function sendInput(text) {
        if (isGameActive && inputResolver) {
            const resolver = inputResolver;
            inputResolver = null;
            resolver(text);
            return true;
        }
        return false;
    }

    // Stop the game
    function stopGame() {
        flushOutput();
        isGameActive = false;
        gameRunner = null;
        inputResolver = null;
        outputBuffer = '';
    }

    // Check if game is running
    function isRunning() {
        return isGameActive;
    }

    // Export functions
    window.ZorkGame = {
        start: startGame,
        sendInput: sendInput,
        stop: stopGame,
        isRunning: isRunning
    };
})();
