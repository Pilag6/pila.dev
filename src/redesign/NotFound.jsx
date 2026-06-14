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
const POWERUP_RADIUS = 2.3;
const MAX_ENTITIES = 22;
const MAX_PARTICLES = 70;
const HIT_COOLDOWN = 650;
const COUNTDOWN_SECONDS = 5;
const GAME_OVER_RETURN_DELAY = 9000;
const FIELD_BOUNDS = {
    minX: 7,
    maxX: 93,
    minY: 12,
    maxY: 88,
};
const ARROW_KEYS = new Set(["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"]);
const ROBOT_FEEDBACK_DURATION = 480;

const BEST_KEY = "sg-notfound-best";

const COMBO_STEP = 4;
const MAX_MULTIPLIER = 8;

const SHIELD_MAX = 1;
const SLOW_DURATION = 4500;
const SLOW_FACTOR = 0.42;
const MAGNET_DURATION = 6000;
const MAGNET_RADIUS = 30;
const MAGNET_PULL = 64;
const DOUBLE_DURATION = 6000;

const HIT_STOP = 75;
const SHAKE_DURATION = 280;
const SHAKE_INTENSITY = 7;

const HOMING_ACCEL = 26;
const HOMING_MAX = 22;

const WAVE_SECONDS = 22;
const WAVE_ANNOUNCE = 2200;

const POPUP_DURATION = 950;
const POPUP_RISE = 9;
const PARTICLE_MAX_LIFE = 0.6;

const POWERUP_TYPES = ["shield", "slow", "magnet", "double"];
const POWERUP_COLORS = {
    shield: "#7fdfff",
    slow: "#9d7bff",
    magnet: "#ffd24d",
    double: "#ff8ad6",
};
const POWERUP_GLYPHS = {
    shield: "S",
    slow: "T",
    magnet: "M",
    double: "2x",
};

let nextEntityId = 0;
let nextParticleId = 0;
let nextPopupId = 0;
let reducedMotion = false;

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

function readBest() {
    try {
        return Number(window.localStorage.getItem(BEST_KEY)) || 0;
    } catch {
        return 0;
    }
}

function getDifficulty(score) {
    return Math.min(1 + score / 140, 2.85);
}

function getEnemyChance(score) {
    return Math.min(0.42 + score / 420, 0.74);
}

function getPowerupChance(score) {
    return Math.min(0.13, 0.05 + score / 3600);
}

function getMaxEntities(score) {
    return Math.min(8 + Math.floor(score / 40), MAX_ENTITIES);
}

function getSpawnDelay(score) {
    return Math.max(0.34, 1.16 - score / 360);
}

function getEnemyBehavior(score) {
    const roll = Math.random();
    if (score > 220 && roll < 0.2) return "homing";
    if (score > 120 && roll < 0.42) return "sine";
    if (score > 60 && roll < 0.58) return "diagonal";
    return "straight";
}

function entityRadius(type) {
    if (type === "enemy") return ENEMY_RADIUS;
    if (type === "token") return TOKEN_RADIUS;
    return POWERUP_RADIUS;
}

function createInitialGame() {
    return {
        player: START_PLAYER,
        entities: [],
        particles: [],
        popups: [],
        score: 0,
        best: readBest(),
        isNewBest: false,
        lives: START_LIVES,
        elapsed: 0,
        spawnIn: 0.45,
        combo: 0,
        multiplier: 1,
        bestCombo: 0,
        wave: 1,
        waveLabel: "",
        waveAnnounceUntil: 0,
        shieldCharges: 0,
        slowUntil: 0,
        magnetUntil: 0,
        doubleUntil: 0,
        shakeUntil: 0,
        shakeX: 0,
        shakeY: 0,
        freezeUntil: 0,
        clock: 0,
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
    const roll = Math.random();

    let type;
    if (roll < getPowerupChance(score)) {
        type = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];
    } else {
        type = Math.random() > getEnemyChance(score) ? "token" : "enemy";
    }

    const isEnemy = type === "enemy";
    const baseSpeed = isEnemy ? randomBetween(17, 27) : randomBetween(12, 19);
    const direction = fromLeft ? 1 : -1;

    let behavior = "straight";
    let vy = 0;

    if (isEnemy) {
        behavior = getEnemyBehavior(score);
        if (behavior === "diagonal" || behavior === "sine") {
            vy = randomBetween(9, 17) * difficulty * (Math.random() > 0.5 ? 1 : -1);
        }
    } else if (Math.random() > 0.7) {
        vy = randomBetween(3, 7) * (Math.random() > 0.5 ? 1 : -1);
    }

    return {
        id: nextEntityId,
        type,
        behavior,
        x: fromLeft ? -8 : 108,
        y: randomBetween(14, 86),
        vx: direction * baseSpeed * difficulty,
        vy,
    };
}

function spawnParticles(x, y, color, count) {
    if (reducedMotion) return [];
    const particles = [];
    for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = randomBetween(18, 54);
        particles.push({
            id: nextParticleId,
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: randomBetween(0.35, PARTICLE_MAX_LIFE),
            color,
        });
        nextParticleId += 1;
    }
    return particles;
}

function makePopup(x, y, text, kind, now) {
    const popup = { id: nextPopupId, x, y, text, kind, until: now + POPUP_DURATION };
    nextPopupId += 1;
    return popup;
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
    if (now < currentGame.freezeUntil) return currentGame;

    const elapsed = currentGame.elapsed + deltaTime;
    const player = movePlayer(currentGame.player, pressedKeys, deltaTime);
    const timeScale = currentGame.slowUntil > now ? SLOW_FACTOR : 1;
    const magnetActive = currentGame.magnetUntil > now;

    const movedEntities = currentGame.entities
        .map((entity) => {
            let { vx, vy } = entity;
            let x = entity.x + vx * deltaTime * timeScale;
            let y = entity.y + vy * deltaTime * timeScale;

            if (entity.behavior === "homing" && entity.type === "enemy") {
                const direction = Math.sign(player.y - y);
                vy = clamp(vy + direction * HOMING_ACCEL * deltaTime, -HOMING_MAX, HOMING_MAX);
            }

            if (y < 10) {
                y = 10;
                vy = Math.abs(vy);
            } else if (y > 90) {
                y = 90;
                vy = -Math.abs(vy);
            }

            if (entity.type === "token" && magnetActive) {
                const distance = getDistance(player, { x, y });
                if (distance < MAGNET_RADIUS && distance > 0.001) {
                    const pull = Math.min(MAGNET_PULL * deltaTime, distance);
                    x += ((player.x - x) / distance) * pull;
                    y += ((player.y - y) / distance) * pull;
                }
            }

            return { ...entity, x, y, vx, vy };
        })
        .filter((entity) => entity.x > -14 && entity.x < 114);

    let spawnIn = currentGame.spawnIn - deltaTime;
    const spawnable = [...movedEntities];
    while (spawnIn <= 0 && spawnable.length < getMaxEntities(currentGame.score)) {
        spawnable.push(createEntity(currentGame.score));
        nextEntityId += 1;
        spawnIn += getSpawnDelay(currentGame.score) + randomBetween(0, 0.3);
    }

    let score = currentGame.score;
    let best = currentGame.best;
    let isNewBest = currentGame.isNewBest;
    let lives = currentGame.lives;
    let combo = currentGame.combo;
    let multiplier = currentGame.multiplier;
    let bestCombo = currentGame.bestCombo;
    let shieldCharges = currentGame.shieldCharges;
    let slowUntil = currentGame.slowUntil;
    let magnetUntil = currentGame.magnetUntil;
    let doubleUntil = currentGame.doubleUntil;
    let shakeUntil = currentGame.shakeUntil;
    let freezeUntil = currentGame.freezeUntil;
    let status = currentGame.status;
    let hitUntil = currentGame.hitUntil;
    let feedback = currentGame.feedbackUntil > now ? currentGame.feedback : null;
    let feedbackUntil = currentGame.feedbackUntil > now ? currentGame.feedbackUntil : 0;
    let feedbackId = currentGame.feedbackId;
    let wasHit = false;

    let particles = currentGame.particles
        .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx * deltaTime,
            y: particle.y + particle.vy * deltaTime,
            life: particle.life - deltaTime,
        }))
        .filter((particle) => particle.life > 0);
    let popups = currentGame.popups
        .filter((popup) => popup.until > now)
        .map((popup) => ({ ...popup, y: popup.y - POPUP_RISE * deltaTime }));

    const remainingEntities = [];
    for (const entity of spawnable) {
        const radius = entityRadius(entity.type);
        const didCollide = getDistance(player, entity) <= PLAYER_RADIUS + radius;

        if (!didCollide) {
            remainingEntities.push(entity);
            continue;
        }

        if (entity.type === "token") {
            combo += 1;
            bestCombo = Math.max(bestCombo, combo);
            multiplier = Math.min(MAX_MULTIPLIER, 1 + Math.floor(combo / COMBO_STEP));
            let points = 10 * multiplier;
            if (doubleUntil > now) points *= 2;
            score += points;
            if (score > best) {
                best = score;
                isNewBest = true;
            }
            const label = multiplier > 1 ? `+${points} x${multiplier}` : `+${points}`;
            status = `Token ${label}. Score ${score}.`;
            feedback = "token";
            feedbackUntil = now + ROBOT_FEEDBACK_DURATION;
            feedbackId += 1;
            particles = particles.concat(spawnParticles(entity.x, entity.y, "#4de1c1", 9));
            popups = popups.concat(makePopup(entity.x, entity.y, label, "token", now));
            continue;
        }

        if (entity.type !== "enemy") {
            const points = doubleUntil > now ? 10 : 5;
            score += points;
            if (score > best) {
                best = score;
                isNewBest = true;
            }
            let label = "";
            if (entity.type === "shield") {
                shieldCharges = SHIELD_MAX;
                label = "Shield online";
            } else if (entity.type === "slow") {
                slowUntil = now + SLOW_DURATION;
                label = "Time dilation";
            } else if (entity.type === "magnet") {
                magnetUntil = now + MAGNET_DURATION;
                label = "Token magnet";
            } else if (entity.type === "double") {
                doubleUntil = now + DOUBLE_DURATION;
                label = "Double points";
            }
            status = `${label}. Score ${score}.`;
            feedback = "token";
            feedbackUntil = now + ROBOT_FEEDBACK_DURATION;
            feedbackId += 1;
            particles = particles.concat(spawnParticles(entity.x, entity.y, POWERUP_COLORS[entity.type], 12));
            popups = popups.concat(makePopup(entity.x, entity.y, label, entity.type, now));
            continue;
        }

        if (now < hitUntil || wasHit) {
            remainingEntities.push(entity);
            continue;
        }

        if (shieldCharges > 0) {
            shieldCharges -= 1;
            hitUntil = now + HIT_COOLDOWN;
            feedback = "shield";
            feedbackUntil = now + ROBOT_FEEDBACK_DURATION;
            feedbackId += 1;
            wasHit = true;
            status = "Shield absorbed the glitch.";
            particles = particles.concat(spawnParticles(player.x, player.y, POWERUP_COLORS.shield, 14));
            popups = popups.concat(makePopup(player.x, player.y - 6, "Shield!", "shield", now));
            continue;
        }

        lives = Math.max(0, lives - 1);
        hitUntil = now + HIT_COOLDOWN;
        feedback = "hit";
        feedbackUntil = now + ROBOT_FEEDBACK_DURATION;
        feedbackId += 1;
        wasHit = true;
        combo = 0;
        multiplier = 1;
        shakeUntil = now + SHAKE_DURATION;
        freezeUntil = now + HIT_STOP;
        particles = particles.concat(spawnParticles(player.x, player.y, "#ff5c38", 14));
        popups = popups.concat(makePopup(player.x, player.y - 6, lives === 0 ? "Signal lost" : "-1 life", "hit", now));
        status = lives === 0 ? "Game over. The route stayed unresolved." : `Glitch hit. ${lives} lives remaining.`;
    }

    if (particles.length > MAX_PARTICLES) {
        particles = particles.slice(particles.length - MAX_PARTICLES);
    }

    let wave = currentGame.wave;
    let waveLabel = currentGame.waveLabel;
    let waveAnnounceUntil = currentGame.waveAnnounceUntil;
    const nextWave = Math.floor(elapsed / WAVE_SECONDS) + 1;
    if (nextWave > wave) {
        wave = nextWave;
        waveLabel = `Wave ${wave}`;
        waveAnnounceUntil = now + WAVE_ANNOUNCE;
        status = `Wave ${wave}. The signal accelerates.`;
    }

    const shaking = shakeUntil > now && !reducedMotion;
    const shakeX = shaking ? randomBetween(-SHAKE_INTENSITY, SHAKE_INTENSITY) : 0;
    const shakeY = shaking ? randomBetween(-SHAKE_INTENSITY, SHAKE_INTENSITY) : 0;

    return {
        player,
        entities: remainingEntities,
        particles,
        popups,
        score,
        best,
        isNewBest,
        lives,
        elapsed,
        spawnIn,
        combo,
        multiplier,
        bestCombo,
        wave,
        waveLabel,
        waveAnnounceUntil,
        shieldCharges,
        slowUntil,
        magnetUntil,
        doubleUntil,
        shakeUntil,
        shakeX,
        shakeY,
        freezeUntil,
        clock: now,
        countdownRemaining: 0,
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
    const draggingRef = useRef(false);
    const gameStateRef = useRef(createInitialGame());
    const [game, setGame] = useState(gameStateRef.current);

    useEffect(() => {
        window.scrollTo(0, 0);
        reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!ARROW_KEYS.has(event.key)) return;
            const phase = gameStateRef.current.phase;
            if (phase !== "playing") return;

            event.preventDefault();
            pressedKeysRef.current.add(event.key);
        };

        const handleKeyUp = (event) => {
            if (!ARROW_KEYS.has(event.key)) return;
            const phase = gameStateRef.current.phase;
            if (phase !== "playing") return;

            event.preventDefault();
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
            status: "Game started. Arrow keys move, drag to glide. Esc pauses.",
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
            status: `Get ready. Game starts in ${COUNTDOWN_SECONDS} seconds. Collect green tokens, grab power-ups, dodge red glitch packets.`,
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
                        ? `Get ready. Game starts in ${countdownRemaining} seconds. Collect green tokens, grab power-ups, dodge red glitch packets.`
                        : "Starting game.",
            };
            gameStateRef.current = updatedGame;
            setGame(updatedGame);
        }, 200);

        countdownTimeoutRef.current = window.setTimeout(startPlaying, COUNTDOWN_SECONDS * 1000);
    }, [clearCountdownTimers, startPlaying]);

    const playGame = useCallback(() => {
        startCountdown();
    }, [startCountdown]);

    const pauseGame = useCallback(() => {
        const currentGame = gameStateRef.current;
        if (currentGame.phase !== "playing") return;
        pressedKeysRef.current.clear();
        draggingRef.current = false;
        const nextGame = { ...currentGame, phase: "paused", status: "Paused. Press Esc or P to resume." };
        gameStateRef.current = nextGame;
        setGame(nextGame);
    }, []);

    const resumeGame = useCallback(() => {
        const currentGame = gameStateRef.current;
        if (currentGame.phase !== "paused") return;
        lastFrameRef.current = performance.now();
        const nextGame = { ...currentGame, phase: "playing", status: "Resumed." };
        gameStateRef.current = nextGame;
        setGame(nextGame);
        gameRef.current?.focus({ preventScroll: true });
    }, []);

    useEffect(() => {
        const handleControlKey = (event) => {
            const phase = gameStateRef.current.phase;
            if (event.key === "Escape" || event.key === "p" || event.key === "P") {
                if (phase === "playing") {
                    event.preventDefault();
                    pauseGame();
                } else if (phase === "paused") {
                    event.preventDefault();
                    resumeGame();
                }
                return;
            }
            if ((event.key === "Enter" || event.key === " ") && phase === "gameOver") {
                event.preventDefault();
                playGame();
            }
        };

        const handleBlurPause = () => {
            if (gameStateRef.current.phase === "playing") pauseGame();
        };

        window.addEventListener("keydown", handleControlKey);
        window.addEventListener("blur", handleBlurPause);

        return () => {
            window.removeEventListener("keydown", handleControlKey);
            window.removeEventListener("blur", handleBlurPause);
        };
    }, [pauseGame, resumeGame, playGame]);

    useEffect(() => {
        return () => {
            clearCountdownTimers();
            if (gameOverTimeoutRef.current) window.clearTimeout(gameOverTimeoutRef.current);
        };
    }, [clearCountdownTimers]);

    useEffect(() => {
        if (game.phase !== "gameOver") return undefined;

        try {
            window.localStorage.setItem(BEST_KEY, String(game.best));
        } catch {
            /* ignore storage errors */
        }

        if (gameOverTimeoutRef.current) window.clearTimeout(gameOverTimeoutRef.current);
        gameOverTimeoutRef.current = window.setTimeout(returnToIntro, GAME_OVER_RETURN_DELAY);

        return () => {
            if (gameOverTimeoutRef.current) {
                window.clearTimeout(gameOverTimeoutRef.current);
                gameOverTimeoutRef.current = null;
            }
        };
    }, [game.phase, game.best, returnToIntro]);

    const pointerToField = (event) => {
        const rect = gameRef.current.getBoundingClientRect();
        return {
            x: clamp(((event.clientX - rect.left) / rect.width) * 100, FIELD_BOUNDS.minX, FIELD_BOUNDS.maxX),
            y: clamp(((event.clientY - rect.top) / rect.height) * 100, FIELD_BOUNDS.minY, FIELD_BOUNDS.maxY),
        };
    };

    const updatePlayerFromPointer = (event) => {
        const nextGame = { ...gameStateRef.current, player: pointerToField(event) };
        gameStateRef.current = nextGame;
        setGame(nextGame);
    };

    const handlePointerDown = (event) => {
        if (!gameRef.current || gameStateRef.current.phase !== "playing") return;
        draggingRef.current = true;
        try {
            gameRef.current.setPointerCapture(event.pointerId);
        } catch {
            /* pointer capture is best-effort */
        }
        updatePlayerFromPointer(event);
        gameRef.current.focus({ preventScroll: true });
    };

    const handlePointerMove = (event) => {
        if (!draggingRef.current || gameStateRef.current.phase !== "playing") return;
        updatePlayerFromPointer(event);
    };

    const handlePointerUp = (event) => {
        draggingRef.current = false;
        try {
            gameRef.current?.releasePointerCapture(event.pointerId);
        } catch {
            /* pointer release is best-effort */
        }
    };

    const isIdle = game.phase === "idle";
    const isCountdown = game.phase === "countdown";
    const isPlaying = game.phase === "playing";
    const isPaused = game.phase === "paused";
    const isGameOver = game.phase === "gameOver";
    const isHit = game.feedback === "hit";

    const clock = game.clock;
    const hasShield = game.shieldCharges > 0;
    const hasSlow = game.slowUntil > clock;
    const hasMagnet = game.magnetUntil > clock;
    const hasDouble = game.doubleUntil > clock;
    const showWave = game.waveAnnounceUntil > clock && (isPlaying || isPaused);

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
                                    Collect route tokens, chain combos, grab power-ups and dodge red glitch packets as the signal accelerates.
                                </p>
                            </div>

                            <div className="sg-not-found__controls">
                                <div className="sg-not-found__progress" aria-hidden="true">
                                    <span>Best</span>
                                    <strong>{game.best}</strong>
                                    <span>Score</span>
                                    <strong>{game.score}</strong>
                                    <span>Lives</span>
                                    <strong>{game.lives}/{START_LIVES}</strong>
                                </div>

                                <ul className="sg-not-found__legend" aria-hidden="true">
                                    <li><span className="sg-not-found__chip sg-not-found__chip--token" /> Token +10 (combo multiplies)</li>
                                    <li><span className="sg-not-found__chip sg-not-found__chip--shield">S</span> Shield absorbs one hit</li>
                                    <li><span className="sg-not-found__chip sg-not-found__chip--slow">T</span> Time dilation slows packets</li>
                                    <li><span className="sg-not-found__chip sg-not-found__chip--magnet">M</span> Magnet pulls tokens</li>
                                    <li><span className="sg-not-found__chip sg-not-found__chip--double">2x</span> Double points</li>
                                    <li><span className="sg-not-found__chip sg-not-found__chip--enemy" /> Glitch packet costs a life</li>
                                </ul>

                                <p className="sg-not-found__instructions">
                                    Arrow keys move, drag or tap to glide the robot. Press Esc or P to pause.
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
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                        >
                            <p id="not-found-game-instructions" className="sg-visually-hidden">
                                {isPlaying
                                    ? "Arrow keys move. Drag or tap the field to reposition. Press Escape to pause."
                                    : "Press Play to start the arcade game."}
                            </p>
                        {!isIdle && (
                                <div className="sg-not-found__overlay" aria-label="Game status">
                                    <div className="sg-not-found__progress" aria-live="polite">
                                        <span>Score</span>
                                        <strong>{game.score}</strong>
                                        <span>Best</span>
                                        <strong>{game.best}</strong>
                                        <span>Lives</span>
                                        <strong>{game.lives}/{START_LIVES}</strong>
                                        {game.multiplier > 1 && (
                                            <>
                                                <span>Combo</span>
                                                <strong className="sg-not-found__combo">x{game.multiplier}</strong>
                                            </>
                                        )}
                                    </div>

                                    {(hasShield || hasSlow || hasMagnet || hasDouble) && (
                                        <div className="sg-not-found__effects" aria-hidden="true">
                                            {hasShield && <span className="sg-not-found__effect sg-not-found__effect--shield">Shield</span>}
                                            {hasSlow && <span className="sg-not-found__effect sg-not-found__effect--slow">Slow</span>}
                                            {hasMagnet && <span className="sg-not-found__effect sg-not-found__effect--magnet">Magnet</span>}
                                            {hasDouble && <span className="sg-not-found__effect sg-not-found__effect--double">2x</span>}
                                        </div>
                                    )}

                                    <nav className="sg-not-found__overlay-actions" aria-label="Recovery links">
                                        {isPlaying && (
                                            <button type="button" className="sg-btn" onClick={pauseGame} data-cursor="view">
                                                Pause
                                            </button>
                                        )}
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
                                    <p>Arrow keys or drag to move. Chain tokens for combos, grab power-ups, dodge red packets. You have 3 lives.</p>
                                </div>
                            )}
                            {showWave && (
                                <div className="sg-not-found__wave" role="status" aria-live="polite">
                                    <span className="sg-mono-label">{game.waveLabel}</span>
                                    <strong>Signal accelerating</strong>
                                </div>
                            )}
                            {isPaused && (
                                <div className="sg-not-found__pause" role="status" aria-live="assertive">
                                    <span className="sg-mono-label">Paused</span>
                                    <button type="button" className="sg-btn sg-btn--solid" onClick={resumeGame} data-cursor="view">
                                        Resume
                                    </button>
                                    <p>Press Esc or P to resume.</p>
                                </div>
                            )}
                            <div
                                className="sg-not-found__stage"
                                aria-hidden="true"
                                style={{ transform: `translate(${game.shakeX}px, ${game.shakeY}px)` }}
                            >
                                <div className="sg-not-found__lanes">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                {game.entities.map((entity) => (
                                    <span
                                        key={entity.id}
                                        className={`sg-not-found__entity sg-not-found__entity--${entity.type}`}
                                        style={{
                                            "--entity-x": `${entity.x}%`,
                                            "--entity-y": `${entity.y}%`,
                                        }}
                                    >
                                        {POWERUP_GLYPHS[entity.type] ?? null}
                                    </span>
                                ))}
                                {game.particles.map((particle) => (
                                    <span
                                        key={particle.id}
                                        className="sg-not-found__particle"
                                        style={{
                                            "--particle-x": `${particle.x}%`,
                                            "--particle-y": `${particle.y}%`,
                                            "--particle-color": particle.color,
                                            opacity: clamp(particle.life / PARTICLE_MAX_LIFE, 0, 1),
                                        }}
                                    />
                                ))}
                                {game.popups.map((popup) => (
                                    <span
                                        key={popup.id}
                                        className={`sg-not-found__popup sg-not-found__popup--${popup.kind}`}
                                        style={{
                                            "--popup-x": `${popup.x}%`,
                                            "--popup-y": `${popup.y}%`,
                                            opacity: clamp((popup.until - clock) / POPUP_DURATION, 0, 1),
                                        }}
                                    >
                                        {popup.text}
                                    </span>
                                ))}
                                <div
                                    key={`robot-${game.feedbackId}`}
                                    className="sg-not-found__robot"
                                    data-shield={hasShield}
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
                            </div>
                            {isGameOver && (
                                <div className="sg-not-found__gameover" role="status" aria-live="assertive">
                                    {game.isNewBest && <span className="sg-not-found__newbest">New high score</span>}
                                    <strong>Game over</strong>
                                    <p>Score {game.score} · Best {game.best} · Best combo x{Math.min(MAX_MULTIPLIER, 1 + Math.floor(game.bestCombo / COMBO_STEP))}</p>
                                    <div className="sg-not-found__gameover-actions">
                                        <button type="button" className="sg-btn sg-btn--solid" onClick={playGame} data-cursor="view">
                                            Play again
                                        </button>
                                        <Link to="/" className="sg-btn" data-cursor="view">
                                            Home
                                        </Link>
                                    </div>
                                    <span className="sg-not-found__gameover-hint">Press Enter to play again</span>
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
