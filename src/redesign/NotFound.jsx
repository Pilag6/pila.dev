import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./signal.css";
import SignalNav from "./components/SignalNav.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import cvFile from "@/assets/ezequielGonzalez.pdf";

const START_PLAYER = { x: 18, y: 50 };
const START_LIVES = 3;
const PLAYER_SPEED = 58;
const PLAYER_RADIUS = 3.2;
const TOKEN_RADIUS = 1.9;
const ENEMY_RADIUS = 2.6;
const MAX_ENTITIES = 22;
const HIT_COOLDOWN = 650;
const COUNTDOWN_SECONDS = 5;
const GAME_OVER_RETURN_DELAY = 4000;
const FIELD_BOUNDS = {
    minX: 7,
    maxX: 93,
    minY: 12,
    maxY: 88,
};
const ARROW_KEYS = new Set(["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"]);
const ROBOT_FEEDBACK_DURATION = 480;

let nextEntityId = 0;

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

function getDifficulty(score) {
    return Math.min(1 + score / 140, 2.85);
}

function getEnemyChance(score) {
    return Math.min(0.42 + score / 420, 0.74);
}

function getMaxEntities(score) {
    return Math.min(8 + Math.floor(score / 40), MAX_ENTITIES);
}

function getSpawnDelay(score) {
    return Math.max(0.34, 1.16 - score / 360);
}

function createInitialGame() {
    return {
        player: START_PLAYER,
        entities: [],
        score: 0,
        lives: START_LIVES,
        elapsed: 0,
        spawnIn: 0.45,
        countdownRemaining: COUNTDOWN_SECONDS,
        phase: "idle",
        hitUntil: 0,
        feedback: null,
        feedbackUntil: 0,
        feedbackId: 0,
        status: "Game ready. Use the Arrow keys to pilot the assistant robot.",
    };
}

function createEntity(score) {
    const fromLeft = Math.random() > 0.5;
    const difficulty = getDifficulty(score);
    const type = Math.random() > getEnemyChance(score) ? "token" : "enemy";
    const baseSpeed = type === "token" ? randomBetween(13, 20) : randomBetween(17, 27);

    return {
        id: nextEntityId,
        type,
        x: fromLeft ? -8 : 108,
        y: randomBetween(14, 86),
        vx: (fromLeft ? 1 : -1) * baseSpeed * difficulty,
    };
}

function getDistance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function movePlayer(player, pressedKeys, deltaTime) {
    const xDirection = (pressedKeys.has("ArrowRight") ? 1 : 0) - (pressedKeys.has("ArrowLeft") ? 1 : 0);
    const yDirection = (pressedKeys.has("ArrowDown") ? 1 : 0) - (pressedKeys.has("ArrowUp") ? 1 : 0);

    if (xDirection === 0 && yDirection === 0) return player;

    const length = Math.hypot(xDirection, yDirection) || 1;
    return {
        x: clamp(player.x + (xDirection / length) * PLAYER_SPEED * deltaTime, FIELD_BOUNDS.minX, FIELD_BOUNDS.maxX),
        y: clamp(player.y + (yDirection / length) * PLAYER_SPEED * deltaTime, FIELD_BOUNDS.minY, FIELD_BOUNDS.maxY),
    };
}

function advanceGame(currentGame, deltaTime, now, pressedKeys) {
    if (currentGame.phase !== "playing") return currentGame;

    const elapsed = currentGame.elapsed + deltaTime;
    const player = movePlayer(currentGame.player, pressedKeys, deltaTime);
    const movedEntities = currentGame.entities
        .map((entity) => ({ ...entity, x: entity.x + entity.vx * deltaTime }))
        .filter((entity) => entity.x > -14 && entity.x < 114);

    let spawnIn = currentGame.spawnIn - deltaTime;
    const entities = [...movedEntities];
    while (spawnIn <= 0 && entities.length < getMaxEntities(currentGame.score)) {
        entities.push(createEntity(currentGame.score));
        nextEntityId += 1;
        spawnIn += getSpawnDelay(currentGame.score) + randomBetween(0, 0.3);
    }

    let score = currentGame.score;
    let lives = currentGame.lives;
    let status = currentGame.status;
    let hitUntil = currentGame.hitUntil;
    let feedback = currentGame.feedbackUntil > now ? currentGame.feedback : null;
    let feedbackUntil = currentGame.feedbackUntil > now ? currentGame.feedbackUntil : 0;
    let feedbackId = currentGame.feedbackId;
    let wasHit = false;

    const remainingEntities = entities.filter((entity) => {
        const radius = entity.type === "token" ? TOKEN_RADIUS : ENEMY_RADIUS;
        const didCollide = getDistance(player, entity) <= PLAYER_RADIUS + radius;

        if (!didCollide) return true;

        if (entity.type === "token") {
            score += 10;
            status = `Token collected. Score ${score}.`;
            feedback = "token";
            feedbackUntil = now + ROBOT_FEEDBACK_DURATION;
            feedbackId += 1;
            return false;
        }

        if (now < hitUntil || wasHit) return true;

        lives = Math.max(0, lives - 1);
        hitUntil = now + HIT_COOLDOWN;
        feedback = "hit";
        feedbackUntil = now + ROBOT_FEEDBACK_DURATION;
        feedbackId += 1;
        wasHit = true;
        status = lives === 0 ? "Game over. The route stayed unresolved." : `Glitch hit. ${lives} lives remaining.`;
        return false;
    });

    return {
        player,
        entities: remainingEntities,
        score,
        lives,
        elapsed,
        spawnIn,
        phase: lives === 0 ? "gameOver" : "playing",
        hitUntil,
        feedback,
        feedbackUntil,
        feedbackId,
        status,
    };
}

export default function NotFound() {
    const gameRef = useRef(null);
    const pressedKeysRef = useRef(new Set());
    const frameRef = useRef(null);
    const lastFrameRef = useRef(null);
    const countdownIntervalRef = useRef(null);
    const countdownTimeoutRef = useRef(null);
    const gameOverTimeoutRef = useRef(null);
    const gameStateRef = useRef(createInitialGame());
    const [game, setGame] = useState(gameStateRef.current);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!ARROW_KEYS.has(event.key)) return;
            const phase = gameStateRef.current.phase;
            if (phase !== "playing" && phase !== "countdown") return;

            event.preventDefault();
            if (phase !== "playing") return;
            pressedKeysRef.current.add(event.key);
        };

        const handleKeyUp = (event) => {
            if (!ARROW_KEYS.has(event.key)) return;
            const phase = gameStateRef.current.phase;
            if (phase !== "playing" && phase !== "countdown") return;

            event.preventDefault();
            if (phase !== "playing") return;
            pressedKeysRef.current.delete(event.key);
        };

        const handleWindowBlur = () => {
            pressedKeysRef.current.clear();
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", handleWindowBlur);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("blur", handleWindowBlur);
        };
    }, []);

    useEffect(() => {
        const tick = (now) => {
            const previousFrame = lastFrameRef.current ?? now;
            const deltaTime = Math.min((now - previousFrame) / 1000, 0.05);
            lastFrameRef.current = now;

            const nextGame = advanceGame(gameStateRef.current, deltaTime, now, pressedKeysRef.current);
            if (nextGame !== gameStateRef.current) {
                gameStateRef.current = nextGame;
                setGame(nextGame);
            }

            frameRef.current = window.requestAnimationFrame(tick);
        };

        frameRef.current = window.requestAnimationFrame(tick);

        return () => {
            if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
        };
    }, []);

    const clearCountdownTimers = useCallback(() => {
        if (countdownIntervalRef.current) {
            window.clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }
        if (countdownTimeoutRef.current) {
            window.clearTimeout(countdownTimeoutRef.current);
            countdownTimeoutRef.current = null;
        }
    }, []);

    const returnToIntro = useCallback(() => {
        clearCountdownTimers();
        if (gameOverTimeoutRef.current) {
            window.clearTimeout(gameOverTimeoutRef.current);
            gameOverTimeoutRef.current = null;
        }
        const nextGame = createInitialGame();
        pressedKeysRef.current.clear();
        lastFrameRef.current = null;
        gameStateRef.current = nextGame;
        setGame(nextGame);
    }, [clearCountdownTimers]);

    const startPlaying = useCallback(() => {
        clearCountdownTimers();
        const nextGame = {
            ...gameStateRef.current,
            phase: "playing",
            countdownRemaining: 0,
            status: "Game started. Use the Arrow keys to pilot the assistant robot.",
        };
        pressedKeysRef.current.clear();
        lastFrameRef.current = performance.now();
        gameStateRef.current = nextGame;
        setGame(nextGame);
        gameRef.current?.focus({ preventScroll: true });
    }, [clearCountdownTimers]);

    const startCountdown = useCallback(() => {
        clearCountdownTimers();
        if (gameOverTimeoutRef.current) {
            window.clearTimeout(gameOverTimeoutRef.current);
            gameOverTimeoutRef.current = null;
        }
        const nextGame = {
            ...createInitialGame(),
            phase: "countdown",
            countdownRemaining: COUNTDOWN_SECONDS,
            status: `Get ready. Game starts in ${COUNTDOWN_SECONDS} seconds. Arrow keys move, collect green tokens, dodge red glitch packets, 3 lives.`,
        };
        pressedKeysRef.current.clear();
        lastFrameRef.current = null;
        gameStateRef.current = nextGame;
        setGame(nextGame);
        gameRef.current?.focus({ preventScroll: true });

        const countdownEndsAt = Date.now() + COUNTDOWN_SECONDS * 1000;
        countdownIntervalRef.current = window.setInterval(() => {
            const countdownRemaining = Math.max(0, Math.ceil((countdownEndsAt - Date.now()) / 1000));
            const currentGame = gameStateRef.current;

            if (currentGame.phase !== "countdown") {
                clearCountdownTimers();
                return;
            }

            const updatedGame = {
                ...currentGame,
                countdownRemaining,
                status:
                    countdownRemaining > 0
                        ? `Get ready. Game starts in ${countdownRemaining} seconds. Arrow keys move, collect green tokens, dodge red glitch packets, 3 lives.`
                        : "Starting game.",
            };
            gameStateRef.current = updatedGame;
            setGame(updatedGame);
        }, 200);

        countdownTimeoutRef.current = window.setTimeout(startPlaying, COUNTDOWN_SECONDS * 1000);
    }, [clearCountdownTimers, startPlaying]);

    useEffect(() => {
        return () => {
            clearCountdownTimers();
            if (gameOverTimeoutRef.current) window.clearTimeout(gameOverTimeoutRef.current);
        };
    }, [clearCountdownTimers]);

    useEffect(() => {
        if (game.phase !== "gameOver") return undefined;

        if (gameOverTimeoutRef.current) window.clearTimeout(gameOverTimeoutRef.current);
        gameOverTimeoutRef.current = window.setTimeout(returnToIntro, GAME_OVER_RETURN_DELAY);

        return () => {
            if (gameOverTimeoutRef.current) {
                window.clearTimeout(gameOverTimeoutRef.current);
                gameOverTimeoutRef.current = null;
            }
        };
    }, [game.phase, returnToIntro]);

    const playGame = useCallback(() => {
        startCountdown();
    }, [startCountdown]);

    const handlePointerDown = (event) => {
        if (!gameRef.current || gameStateRef.current.phase !== "playing") return;

        const rect = gameRef.current.getBoundingClientRect();
        const nextGame = {
            ...gameStateRef.current,
            player: {
                x: clamp(((event.clientX - rect.left) / rect.width) * 100, FIELD_BOUNDS.minX, FIELD_BOUNDS.maxX),
                y: clamp(((event.clientY - rect.top) / rect.height) * 100, FIELD_BOUNDS.minY, FIELD_BOUNDS.maxY),
            },
        };
        gameStateRef.current = nextGame;
        setGame(nextGame);
        gameRef.current.focus({ preventScroll: true });
    };

    const isIdle = game.phase === "idle";
    const isCountdown = game.phase === "countdown";
    const isPlaying = game.phase === "playing";
    const isGameOver = game.phase === "gameOver";
    const isHit = game.feedback === "hit";

    return (
        <div className="signal-root sg-not-found">
            <CustomCursor />
            <SignalNav cvHref={cvFile} />

            <main className="sg-not-found__main">
                <section className="sg-shell sg-section sg-not-found__section" aria-label="404 arcade game">
                    <div className="sg-not-found__visual" data-phase={game.phase}>
                        {isIdle && (
                            <div className="sg-not-found__hud">
                            <div className="sg-not-found__copy">
                                <span className="sg-mono-label">404 / Lost signal</span>
                                <h1 id="not-found-title" className="sg-display sg-not-found__title">
                                    Debug the missing route.
                                </h1>
                                <p className="sg-lead sg-not-found__lead">
                                    Collect route tokens and dodge red glitch packets as the signal accelerates.
                                </p>
                            </div>

                            <div className="sg-not-found__controls">
                                <div className="sg-not-found__progress" aria-hidden="true">
                                    <span>Score</span>
                                    <strong>{game.score}</strong>
                                    <span>Lives</span>
                                    <strong>{game.lives}/{START_LIVES}</strong>
                                </div>

                                <p className="sg-not-found__instructions">
                                    Press Play to start. During the game, Arrow keys move and click or tap repositions the robot.
                                </p>

                                <p className="sg-not-found__status">
                                    {game.status}
                                </p>

                                <nav className="sg-not-found__actions" aria-label="Recovery links">
                                    <button type="button" className="sg-btn sg-btn--solid" onClick={playGame} data-cursor="view">
                                        Play
                                    </button>
                                    <Link to="/" className="sg-btn sg-btn--solid" data-cursor="view">
                                        Return home
                                    </Link>
                                    <Link to="/#work" className="sg-btn" data-cursor="view">
                                        View work
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        )}

                        <div
                            ref={gameRef}
                            className="sg-not-found__field sg-not-found__game"
                            role="group"
                            tabIndex={0}
                            aria-label="404 arcade game: collect tokens and avoid glitch packets"
                            aria-describedby="not-found-game-instructions"
                            data-hit={isHit}
                            data-feedback={game.feedback ?? "none"}
                            data-game-over={isGameOver}
                            data-phase={game.phase}
                            onPointerDown={handlePointerDown}
                        >
                            <p id="not-found-game-instructions" className="sg-visually-hidden">
                                {isPlaying
                                    ? "Arrow keys move. Click or tap the field to reposition."
                                    : "Press Play to start the arcade game."}
                            </p>
                        {!isIdle && (
                                <div className="sg-not-found__overlay" aria-label="Game status">
                                    <div className="sg-not-found__progress" aria-live="polite">
                                        <span>Score</span>
                                        <strong>{game.score}</strong>
                                        <span>Lives</span>
                                        <strong>{game.lives}/{START_LIVES}</strong>
                                    </div>

                                    <nav className="sg-not-found__overlay-actions" aria-label="Recovery links">
                                        <button type="button" className="sg-btn" onClick={playGame} data-cursor="view">
                                            Reset
                                        </button>
                                        <Link to="/" className="sg-btn" data-cursor="view">
                                            Home
                                        </Link>
                                        <Link to="/#work" className="sg-btn" data-cursor="view">
                                            Work
                                        </Link>
                                    </nav>
                                </div>
                            )}
                            <p className="sg-visually-hidden" aria-live="polite">
                                {game.status}
                            </p>
                            {isCountdown && (
                                <div className="sg-not-found__countdown" role="status" aria-live="assertive">
                                    <span className="sg-mono-label">Get ready</span>
                                    <strong>{game.countdownRemaining}</strong>
                                    <p>Arrow keys move. Collect green tokens (+10). Dodge red glitch packets. You have 3 lives.</p>
                                </div>
                            )}
                            <div className="sg-not-found__lanes" aria-hidden="true">
                                <span />
                                <span />
                                <span />
                            </div>
                            {game.entities.map((entity) => (
                                <span
                                    key={entity.id}
                                    className={`sg-not-found__entity sg-not-found__entity--${entity.type}`}
                                    aria-hidden="true"
                                    style={{
                                        "--entity-x": `${entity.x}%`,
                                        "--entity-y": `${entity.y}%`,
                                    }}
                                />
                            ))}
                            <div
                                key={`robot-${game.feedbackId}`}
                                className="sg-not-found__robot"
                                aria-hidden="true"
                                style={{
                                    "--robot-x": `${game.player.x}%`,
                                    "--robot-y": `${game.player.y}%`,
                                }}
                            >
                                <div className="sg-not-found__robot-antenna" />
                                <div className="sg-not-found__robot-screen">
                                    <span />
                                    <span />
                                </div>
                                <div className="sg-not-found__robot-terminal">&gt;_</div>
                            </div>
                            {isGameOver && (
                                <div className="sg-not-found__restored">
                                    Game over · Score {game.score} · Returning to intro
                                </div>
                            )}
                            <p className="sg-not-found__code">{isIdle ? "404" : game.score}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
