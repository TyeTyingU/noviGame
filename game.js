// ============================================
// CONSTANTS & CONFIGURATION
// ============================================
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 1000;
const GRAVITY = 0.6;
const PLAYER_SPEED = 3;
const JUMP_FORCE = -15;
const DOUBLE_JUMP_FORCE = -18;
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 30;
const PLAYER_RADIUS = 15;
const COYOTE_TIME = 100;
const JUMP_BUFFER_TIME = 100;
const GROUND_COLOR = '#4a5568';
const PLATFORM_COLOR = '#2d3748';
const PLAYER_COLOR = '#48bb78';
const SPIKE_COLOR = '#e53e3e';
const GOAL_COLOR = '#f6e05e';
const MOVING_PLATFORM_COLOR = '#805ad5';

// Gem & Store System
let playerGems = 0;
let playerCoins = 0;
const COIN_TO_GEM_THRESHOLD = 1000;
const COIN_TO_GEM_REWARD = 70;
let ownedSkins = ['default'];
let currentSkin = 'default';
let usedCodes = [];

const SKINS = {
    default: { name: 'Classic Green', price: 0, color: '#48bb78', gradient: null },
    magma: { name: 'Magma Dot', price: 100, color: '#e53e3e', gradient: ['#e53e3e', '#f6ad55'] },
    ice: { name: 'Ice Crystal', price: 100, color: '#63b3ed', gradient: ['#63b3ed', '#e9d8fd'] },
    gold: { name: 'Golden Glory', price: 250, color: '#f6e05e', gradient: ['#f6e05e', '#ecc94b'] },
    shadow: { name: 'Shadow Realm', price: 150, color: '#4a5568', gradient: ['#2d3748', '#1a202c'] },
    rainbow: { name: 'Rainbow Star', price: 500, color: 'rainbow', gradient: null },
    galaxy: { name: 'Galaxy Voyager', price: 300, color: '#805ad5', gradient: ['#805ad5', '#4c51bf'] },
    fire: { name: 'Fire Spirit', price: 200, color: '#ed8936', gradient: ['#ed8936', '#f56565'] },
    crystal: { name: 'Crystal Gem', price: 350, color: '#4fd1c5', gradient: ['#4fd1c5', '#38b2ac'] },
    void: { name: 'Void Walker', price: 750, color: '#1a202c', gradient: ['#000000', '#4a5568'] },
    neon: { name: 'Neon Glow', price: 400, color: '#00ff00', gradient: ['#00ff00', '#00cc00'] },
    pink: { name: 'Pink Blossom', price: 150, color: '#ed64a6', gradient: ['#ed64a6', '#f687b3'] },
    ocean: { name: 'Ocean Wave', price: 250, color: '#3182ce', gradient: ['#3182ce', '#63b3ed'] },
    nature: { name: 'Nature Spirit', price: 200, color: '#48bb78', gradient: ['#38a169', '#68d391'] },
    blood: { name: 'Blood Moon', price: 350, color: '#9b2c2c', gradient: ['#9b2c2c', '#c53030'] },
    snow: { name: 'Snowflake', price: 180, color: '#e2e8f0', gradient: ['#e2e8f0', '#cbd5e0'] },
    venom: { name: 'Venom', price: 450, color: '#805ad5', gradient: ['#6b46c1', '#9f7aea'] },
    sunrise: { name: 'Sunrise', price: 300, color: '#dd6b20', gradient: ['#dd6b20', '#f6ad55'] },
    midnight: { name: 'Midnight', price: 500, color: '#1a365d', gradient: ['#1a365d', '#2c5282'] },
    plasma: { name: 'Plasma Core', price: 800, color: '#e53e3e', gradient: ['#e53e3e', '#805ad5'] },
};

const HATS = {
    none: { name: 'No Hat', price: 0, emoji: '🚫' },
    crown: { name: 'Royal Crown', price: 200, emoji: '👑' },
    wizard: { name: 'Wizard Hat', price: 150, emoji: '🧙' },
    cowboy: { name: 'Cowboy Hat', price: 100, emoji: '🤠' },
    tophat: { name: 'Top Hat', price: 120, emoji: '🎩' },
    party: { name: 'Party Hat', price: 80, emoji: '🎉' },
    chef: { name: 'Chef Hat', price: 100, emoji: '👨‍🍳' },
    police: { name: 'Police Cap', price: 90, emoji: '👮' },
    piranha: { name: 'Piranha', price: 500, emoji: '🐟' },
    robot: { name: 'Robot', price: 300, emoji: '🤖' },
    alien: { name: 'Alien', price: 400, emoji: '👽' },
    skull: { name: 'Skull', price: 250, emoji: '💀' },
    devil: { name: 'Devil Horns', price: 200, emoji: '😈' },
    angel: { name: 'Halo', price: 200, emoji: '😇' },
    ninja: { name: 'Ninja Mask', price: 150, emoji: '🥷' },
    vampire: { name: 'Vampire', price: 350, emoji: '🧛' },
    pirate: { name: 'Pirate Hat', price: 180, emoji: '🏴‍☠️' },
    bunny: { name: 'Bunny Ears', price: 120, emoji: '🐰' },
    cat: { name: 'Cat Ears', price: 120, emoji: '🐱' },
    bear: { name: 'Bear Ears', price: 120, emoji: '🐻' },
    headphones: { name: 'Headphones', price: 150, emoji: '🎧' },
    cap: { name: 'Baseball Cap', price: 80, emoji: '🧢' },
    flower: { name: 'Flower Crown', price: 100, emoji: '💐' },
    sunglasses: { name: 'Cool Shades', price: 120, emoji: '😎' },
    bow: { name: 'Pink Bow', price: 80, emoji: '🎀' },
    sword: { name: 'Sword', price: 500, emoji: '⚔️' },
    shield: { name: 'Shield', price: 400, emoji: '🛡️' },
    wings: { name: 'Angel Wings', price: 600, emoji: '🪽' },
    batwings: { name: 'Bat Wings', price: 600, emoji: '🦇' },
    flame: { name: 'Flame Aura', price: 450, emoji: '🔥' },
    icecrown: { name: 'Ice Crown', price: 400, emoji: '❄️' },
};

let ownedHats = ['none'];
let currentHat = 'none';
let canDash = false;
const DASH_COOLDOWN_TIME = 5000;
let dashCooldown = DASH_COOLDOWN_TIME;
const DASH_FORCE = 20;

let oneLifeChallenge = false;

const EASTER_EGGS = [
    { trigger: 'upupdowndown', message: '⭐ KONAMI CODE! +500 GEMS!' },
    { trigger: 'iddqd', message: '🛡️ GOD MODE ACTIVATED (just kidding)' },
    { trigger: 'banana', message: '🍌 You found a banana! Wait, this isn\'t that game...' },
    { trigger: 'wizard', message: '🧙‍♂️ You feel magical...' },
    { trigger: { type: 'secret', level: 3, x: 720, y: 500 }, message: '🎉 SECRET FOUND! +100 GEMS!' },
    { trigger: { type: 'jump50' }, message: '🏆 50 JUMPS! Here have 50 gems!' },
    { trigger: 'bbgzeinbbgzeinerzeins17381738', message: '🚪 SECRET ROOM DISCOVERED!', action: 'secretRoom' },
];

const DECORATIONS = [
    { name: 'sparkle', emoji: '✨' },
    { name: 'gem', emoji: '💎' },
    { name: 'star', emoji: '⭐' },
    { name: 'moon', emoji: '🌙' },
    { name: 'glitter', emoji: '✨' },
];

// ============================================
// INPUT HANDLER
// ============================================
class InputHandler {
    constructor() {
        this.keys = {};
        this.mouseButtons = {};
        this.keySequence = '';
        this.jumpCount = 0;
        this.leftClickPressed = false;
        this.isMobile = this.detectMobile();
        this.touchJumpCount = 0;
        this.lastJumpTime = 0;
        this.swipeStartX = 0;
        this.swipeStartY = 0;
        this.swipeStartTime = 0;
        
        if (this.isMobile) {
            this.setupMobileControls();
        }
        
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        window.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === ' ') {
                e.preventDefault();
            }
            this.keys[e.key] = true;
            this.keys[e.code] = true;
            
            if (e.key === 'f' || e.key === 'F') {
                this.keys['Dash'] = true;
            }
            
            if (e.key === 'p' || e.key === 'P') {
                this.keys['Portal'] = true;
            }
            
            if (e.key === 'u' || e.key === 'U') {
                this.keys['Rewind'] = true;
            }
            
            this.keySequence += e.key.toLowerCase();
            if (this.keySequence.length > 20) {
                this.keySequence = this.keySequence.slice(-20);
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
            this.keys[e.code] = false;
            
            if (e.key === 'f' || e.key === 'F') {
                this.keys['Dash'] = false;
            }
            
            if (e.key === 'p' || e.key === 'P') {
                this.keys['Portal'] = false;
            }
            
            if (e.key === 'u' || e.key === 'U') {
                this.keys['Rewind'] = false;
            }
        });
        
        window.addEventListener('mousedown', (e) => {
            this.mouseButtons[e.button] = true;
            if (e.button === 0) {
                this.leftClickPressed = true;
            }
        });
        
        window.addEventListener('mouseup', (e) => {
            this.mouseButtons[e.button] = false;
            if (e.button === 0) {
                this.leftClickPressed = false;
            }
        });
    }
    
    isKeyDown(key) {
        return this.keys[key] === true;
    }
    
    isDashPressed() {
        return this.keys['Dash'] === true && this.leftClickPressed === true;
    }
    
    isPortalPressed() {
        return (this.keys['Portal'] === true || this.keys['p'] === true || this.keys['P'] === true) && 
               (this.keys['Shift'] === true || this.keys['ShiftLeft'] === true || this.keys['ShiftRight'] === true);
    }
    
    isRewindPressed() {
        return (this.keys['Rewind'] === true || this.keys['u'] === true || this.keys['U'] === true) && 
               (this.keys['Control'] === true || this.keys['ControlLeft'] === true || this.keys['ControlRight'] === true);
    }
    
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    }
    
    checkEasterEgg() {
        for (const egg of EASTER_EGGS) {
            if (typeof egg.trigger === 'string') {
                if (this.keySequence.includes(egg.trigger)) {
                    this.keySequence = '';
                    return egg;
                }
            }
        }
        return null;
    }
    
    setupMobileControls() {
        const btnLeft = document.getElementById('btnLeft');
        const btnRight = document.getElementById('btnRight');
        const btnJump = document.getElementById('btnJump');
        
        if (btnLeft) {
            btnLeft.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.keys['ArrowLeft'] = true;
                this.keys['a'] = true;
                btnLeft.classList.add('pressed');
            });
            btnLeft.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys['ArrowLeft'] = false;
                this.keys['a'] = false;
                btnLeft.classList.remove('pressed');
            });
        }
        
        if (btnRight) {
            btnRight.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.keys['ArrowRight'] = true;
                this.keys['d'] = true;
                btnRight.classList.add('pressed');
            });
            btnRight.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys['ArrowRight'] = false;
                this.keys['d'] = false;
                btnRight.classList.remove('pressed');
            });
        }
        
        if (btnJump) {
            btnJump.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.keys['ArrowUp'] = true;
                this.keys['w'] = true;
                this.keys[' '] = true;
                btnJump.classList.add('pressed');
                
                const now = Date.now();
                if (now - this.lastJumpTime > 300) {
                    this.touchJumpCount++;
                    this.lastJumpTime = now;
                }
            });
            btnJump.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys['ArrowUp'] = false;
                this.keys['w'] = false;
                this.keys[' '] = false;
                btnJump.classList.remove('pressed');
            });
            
            btnJump.addEventListener('dblclick', (e) => {
                e.preventDefault();
            });
        }
        
        const mobileControls = document.getElementById('mobileControls');
        if (mobileControls) {
            mobileControls.classList.add('visible');
        }
        
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.swipeStartX = touch.clientX;
            this.swipeStartY = touch.clientY;
            this.swipeStartTime = Date.now();
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (canDash && this.swipeStartTime > 0) {
                const touch = e.changedTouches[0];
                const deltaX = touch.clientX - this.swipeStartX;
                const deltaY = touch.clientY - this.swipeStartY;
                const deltaTime = Date.now() - this.swipeStartTime;
                
                if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) && deltaTime < 300) {
                    this.keys['SwipeDash'] = true;
                    setTimeout(() => {
                        this.keys['SwipeDash'] = false;
                    }, 100);
                }
            }
        }, { passive: true });
    }
}

// ============================================
// PARTICLE SYSTEM
// ============================================
class Particle {
    constructor(x, y, color, size = 5) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        this.life = 1;
        this.decay = 0.02 + Math.random() * 0.02;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1;
        this.life -= this.decay;
        this.size *= 0.98;
    }
    
    draw(ctx) {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }
    
    emit(x, y, color, count = 10) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }
    
    update() {
        this.particles = this.particles.filter(p => p.life > 0);
        this.particles.forEach(p => p.update());
    }
    
    draw(ctx) {
        this.particles.forEach(p => p.draw(ctx));
    }
}

// ============================================
// DECORATION CLASS
// ============================================
class Decoration {
    constructor(x, y, type = DECORATIONS[0]) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.emoji = type.emoji || '✨';
    }
    
    draw(ctx) {
        ctx.font = '20px Arial';
        ctx.fillText(this.emoji, this.x, this.y);
    }
}

// ============================================
// PLAYER CLASS
// ============================================
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.vx = 0;
        this.vy = 0;
        this.onGround = false;
        this.canDoubleJump = true;
        this.lastGroundedTime = 0;
        this.jumpBufferTime = 0;
        this.jumpKeyHeld = false;
        this.facingDirection = 1;
        this.gravity = 1;
        this.slowMo = false;
        this.ghostMode = false;
        this.trail = [];
        this.trailColor = '#48bb78';
        this.hasShield = false;
        this.speedBoost = 1;
        this.speedBoostTimer = 0;
        this.magnetPull = null;
        this.wallHanging = false;
        this.wallHangSide = 0;
        this.wallHangTimer = 0;
        this.wallHangDuration = 45;
        this.wallX = 0;
        this.wallY = 0;
        this.wallClimbing = false;
        this.wallClimbTimer = 0;
    }
    
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.onGround = false;
        this.canDoubleJump = true;
        this.jumpKeyHeld = false;
        this.trail = [];
    }
    
    update(deltaTime, particles, input) {
        const leftPressed = input.isKeyDown('ArrowLeft') || input.isKeyDown('a') || input.isKeyDown('A');
        const rightPressed = input.isKeyDown('ArrowRight') || input.isKeyDown('d') || input.isKeyDown('D');
        const jumpKey = input.keys['ArrowUp'] || input.keys['w'] || input.keys['W'] || input.keys[' '];
        
        if (leftPressed && !rightPressed) {
            this.vx = -PLAYER_SPEED;
            this.facingDirection = -1;
        } else if (rightPressed && !leftPressed) {
            this.vx = PLAYER_SPEED;
            this.facingDirection = 1;
        } else {
            this.vx = 0;
        }
        
        // Simple jump - if on ground, jump. If in air and haven't double jumped, double jump
        if (jumpKey && !this.jumpKeyHeld) {
            if (this.onGround) {
                // Normal jump
                this.vy = JUMP_FORCE;
                this.onGround = false;
                this.canDoubleJump = true;
                particles.emit(this.x + this.width/2, this.y + this.height, '#fff', 5);
            } else if (this.canDoubleJump) {
                // Double jump
                this.vy = DOUBLE_JUMP_FORCE;
                this.canDoubleJump = false;
                particles.emit(this.x + this.width/2, this.y + this.height, '#f6e05e', 10);
            }
        }
        this.jumpKeyHeld = jumpKey;
        
        // Apply gravity (with slowMo and gravity flip support)
        let gravityMod = this.slowMo ? 0.3 : 1;
        this.vy += GRAVITY * this.gravity * gravityMod;
        
        // Apply velocity (scaled by deltaTime for consistent speed)
        const timeScale = deltaTime / 16;
        this.x += this.vx * timeScale;
        this.y += this.vy * timeScale;
        
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
        
        // Ceiling collision - hit your head
        if (this.y < 0) {
            this.y = 0;
            this.vy = 0;
        }
        
        // Floor collision for upside-down gravity
        if (this.y + this.height > CANVAS_HEIGHT) {
            if (this.gravity < 0) {
                this.y = CANVAS_HEIGHT - this.height;
                this.vy = 0;
                this.onGround = true;
                this.lastGroundedTime = Date.now();
            }
        }
        
        // Update trail
        if (Math.abs(this.vx) > 1 || Math.abs(this.vy) > 1) {
            this.trail.push({
                x: this.x + this.width / 2,
                y: this.y + this.height / 2,
                alpha: 0.6,
                size: this.width * 0.4
            });
        }
        
        // Fade trail
        this.trail = this.trail.filter(t => {
            t.alpha -= 0.05;
            t.size *= 0.95;
            return t.alpha > 0;
        });
        
        if (this.onGround) {
            this.canDoubleJump = true;
        }
        
        if (canDash) {
            dashCooldown -= deltaTime;
            if ((input.isDashPressed() || input.keys['SwipeDash']) && dashCooldown <= 0) {
                const dashDirection = this.vx !== 0 ? (this.vx >= 0 ? 1 : -1) : this.facingDirection;
                this.vx = DASH_FORCE * dashDirection;
                this.vy = -5;
                dashCooldown = DASH_COOLDOWN_TIME;
                particles.emit(this.x + this.width/2, this.y + this.height/2, '#63b3ed', 15);
            }
        }
    }
    
    draw(ctx) {
        const skin = SKINS[currentSkin];
        
        if (skin.gradient) {
            const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
            if (currentSkin === 'rainbow') {
                gradient.addColorStop(0, `hsl(${Date.now() % 360}, 100%, 50%)`);
                gradient.addColorStop(1, `hsl(${(Date.now() + 180) % 360}, 100%, 50%)`);
            } else {
                gradient.addColorStop(0, skin.gradient[0]);
                gradient.addColorStop(1, skin.gradient[1]);
            }
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = skin.color;
        }
        
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, PLAYER_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 - 5, this.y + this.height/2 - 3, 4, 0, Math.PI * 2);
        ctx.arc(this.x + this.width/2 + 5, this.y + this.height/2 - 3, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 - 5, this.y + this.height/2 - 3, 2, 0, Math.PI * 2);
        ctx.arc(this.x + this.width/2 + 5, this.y + this.height/2 - 3, 2, 0, Math.PI * 2);
        ctx.fill();
        
        if (currentHat !== 'none') {
            const hat = HATS[currentHat];
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(hat.emoji, this.x + this.width/2, this.y - 5);
            ctx.textAlign = 'left';
        }
    }
}

// ============================================
// PLATFORM CLASS
// ============================================
class Platform {
    constructor(x, y, width, height, isMoving = false, moveRange = 0, moveSpeed = 0, moveVertical = false, isSecret = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isMoving = isMoving;
        this.moveRange = moveRange;
        this.moveSpeed = moveSpeed;
        this.moveVertical = moveVertical;
        this.isSecret = isSecret;
        this.discovered = false;
        this.startX = x;
        this.startY = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.direction = 1;
    }
    
    update() {
        if (this.isMoving) {
            if (this.moveVertical) {
                this.velocityX = 0;
                this.velocityY = this.moveSpeed * this.direction;
                this.y += this.velocityY;
                
                if (this.y > this.startY + this.moveRange) {
                    this.direction = -1;
                } else if (this.y < this.startY - this.moveRange) {
                    this.direction = 1;
                }
            } else {
                this.velocityX = this.moveSpeed * this.direction;
                this.velocityY = 0;
                this.x += this.velocityX;
                
                if (this.x > this.startX + this.moveRange) {
                    this.direction = -1;
                } else if (this.x < this.startX - this.moveRange) {
                    this.direction = 1;
                }
            }
        }
    }
    
    draw(ctx) {
        if (this.isSecret && !this.discovered) {
            ctx.globalAlpha = 0.3;
        }
        
        if (this.isMoving) {
            ctx.fillStyle = MOVING_PLATFORM_COLOR;
        } else {
            ctx.fillStyle = PLATFORM_COLOR;
        }
        
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(this.x, this.y, this.width, 4);
        
        ctx.globalAlpha = 1;
    }
}

// ============================================
// SPIKE CLASS
// ============================================
class Spike {
    constructor(x, y, width = 30) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 20;
    }
    
    draw(ctx) {
        ctx.fillStyle = SPIKE_COLOR;
        ctx.beginPath();
        
        const spikeCount = Math.floor(this.width / 10);
        const spikeWidth = this.width / spikeCount;
        
        for (let i = 0; i < spikeCount; i++) {
            ctx.moveTo(this.x + i * spikeWidth, this.y + this.height);
            ctx.lineTo(this.x + i * spikeWidth + spikeWidth/2, this.y);
            ctx.lineTo(this.x + (i + 1) * spikeWidth, this.y + this.height);
        }
        
        ctx.fill();
    }
}

// ============================================
// SAW CLASS (Geometry Dash inspired)
// ============================================
class Saw {
    constructor(x, y, radius = 30, moveRange = 0, moveSpeed = 0, moveVertical = false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rotation = 0;
        this.rotationSpeed = 0.3;
        this.moveRange = moveRange;
        this.moveSpeed = moveSpeed;
        this.moveVertical = moveVertical;
        this.startX = x;
        this.startY = y;
        this.direction = 1;
        this.glowColor = '#ff0000';
        this.glowIntensity = 0;
    }
    
    update() {
        this.rotation += this.rotationSpeed;
        this.glowIntensity = 0.5 + Math.sin(Date.now() / 100) * 0.3;
        
        if (this.moveRange > 0) {
            if (this.moveVertical) {
                this.y += this.moveSpeed * this.direction;
                if (this.y > this.startY + this.moveRange) this.direction = -1;
                else if (this.y < this.startY - this.moveRange) this.direction = 1;
            } else {
                this.x += this.moveSpeed * this.direction;
                if (this.x > this.startX + this.moveRange) this.direction = -1;
                else if (this.x < this.startX - this.moveRange) this.direction = 1;
            }
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Glow effect
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 15 * this.glowIntensity;
        
        // Saw body
        ctx.fillStyle = '#888888';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Saw teeth
        ctx.fillStyle = this.glowColor;
        const teeth = 12;
        for (let i = 0; i < teeth; i++) {
            const angle = (i / teeth) * Math.PI * 2;
            ctx.save();
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(this.radius - 5, -8);
            ctx.lineTo(this.radius + 8, 0);
            ctx.lineTo(this.radius - 5, 8);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        
        // Center
        ctx.fillStyle = '#444444';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
    
    checkCollision(player) {
        const dx = (this.x + this.radius/2) - (player.x + player.width/2);
        const dy = (this.y + this.radius/2) - (player.y + player.height/2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius * 0.7 + player.width/2;
    }
}

// ============================================
// GLOWING PLATFORM CLASS
// ============================================
class GlowingPlatform {
    constructor(x, y, width, height, color = '#00ffff', isMoving = false, moveRange = 0, moveSpeed = 0, moveVertical = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.isMoving = isMoving;
        this.moveRange = moveRange;
        this.moveSpeed = moveSpeed;
        this.moveVertical = moveVertical;
        this.startX = x;
        this.startY = y;
        this.direction = 1;
        this.glowPhase = Math.random() * Math.PI * 2;
    }
    
    update() {
        this.glowPhase += 0.05;
        
        if (this.isMoving) {
            if (this.moveVertical) {
                this.y += this.moveSpeed * this.direction;
                if (this.y > this.startY + this.moveRange) this.direction = -1;
                else if (this.y < this.startY - this.moveRange) this.direction = 1;
            } else {
                this.x += this.moveSpeed * this.direction;
                if (this.x > this.startX + this.moveRange) this.direction = -1;
                else if (this.x < this.startX - this.moveRange) this.direction = 1;
            }
        }
    }
    
    draw(ctx) {
        const glowIntensity = 0.5 + Math.sin(this.glowPhase) * 0.3;
        
        // Outer glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20 * glowIntensity;
        
        // Main platform
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Inner highlight
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.3;
        ctx.fillRect(this.x, this.y, this.width, 3);
        ctx.globalAlpha = 1;
        
        ctx.shadowBlur = 0;
    }
    
    checkCollision(player) {
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }
}

// ============================================
// ROTATING SPIKE CLASS
// ============================================
class RotatingSpike {
    constructor(x, y, radius = 25, rotationSpeed = 0.05, moveRange = 0, moveSpeed = 0) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rotation = 0;
        this.rotationSpeed = rotationSpeed;
        this.moveRange = moveRange;
        this.moveSpeed = moveSpeed;
        this.startX = x;
        this.startY = y;
        this.direction = 1;
        this.glowColor = '#ff4444';
    }
    
    update() {
        this.rotation += this.rotationSpeed;
        
        if (this.moveRange > 0) {
            this.x += this.moveSpeed * this.direction;
            if (this.x > this.startX + this.moveRange) this.direction = -1;
            else if (this.x < this.startX - this.moveRange) this.direction = 1;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Glow
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 10;
        
        // Spike triangle
        ctx.fillStyle = SPIKE_COLOR;
        ctx.beginPath();
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(this.radius * 0.866, this.radius * 0.5);
        ctx.lineTo(-this.radius * 0.866, this.radius * 0.5);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    checkCollision(player) {
        const dx = this.x - (player.x + player.width/2);
        const dy = this.y - (player.y + player.height/2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius * 0.7;
    }
}

// ============================================
// ORB CLASS ( grants special ability)
// ============================================
class Orb {
    constructor(x, y, type = 'doubleJump') {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.type = type;
        this.bobPhase = Math.random() * Math.PI * 2;
        this.collected = false;
        
        if (type === 'doubleJump') {
            this.color = '#00ff00';
            this.emoji = '⬆️';
        } else if (type === 'dash') {
            this.color = '#ffff00';
            this.emoji = '⚡';
        } else if (type === 'slowMo') {
            this.color = '#00ffff';
            this.emoji = '⏱️';
        } else if (type === 'ghost') {
            this.color = '#ff00ff';
            this.emoji = '👻';
        } else {
            this.color = '#ffffff';
            this.emoji = '⭐';
        }
    }
    
    update() {
        this.bobPhase += 0.08;
    }
    
    draw(ctx) {
        if (this.collected) return;
        
        const bobY = this.y + Math.sin(this.bobPhase) * 5;
        
        // Glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15 + Math.sin(this.bobPhase * 2) * 5;
        
        // Orb
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, bobY, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner ring
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, bobY, this.radius * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        
        // Emoji
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.emoji, this.x, bobY + 6);
        ctx.textAlign = 'left';
    }
    
    checkCollision(player) {
        if (this.collected) return false;
        const dx = this.x - (player.x + player.width/2);
        const dy = this.y - (player.y + player.height/2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + player.width/2;
    }
}

// ============================================
// GRAVITY FLIPPER
// ============================================
class GravityFlipper {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.arrowPhase = 0;
    }
    
    update() {
        this.arrowPhase += 0.1;
    }
    
    draw(ctx) {
        const arrowY = this.y + Math.sin(this.arrowPhase) * 3;
        
        // Glow
        ctx.shadowColor = '#ff00ff';
        ctx.shadowBlur = 15;
        
        // Box
        ctx.fillStyle = '#ff00ff';
        ctx.fillRect(this.x, arrowY, this.width, this.height);
        
        // Arrow
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.fillText('⇅', this.x + 5, arrowY + 22);
        
        ctx.shadowBlur = 0;
    }
    
    checkCollision(player) {
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }
}

// ============================================
// TELEPORTAL
// ============================================
class Teleporter {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.width = 40;
        this.height = 60;
        this.phase = 0;
        this.cooldown = 0;
    }
    
    update() {
        this.phase += 0.08;
        if (this.cooldown > 0) this.cooldown -= 16;
    }
    
    draw(ctx) {
        if (this.cooldown > 0) return;
        
        const pulseSize = Math.sin(this.phase) * 5;
        
        // Glow
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 20;
        
        // Portal frame
        ctx.fillStyle = '#228b22';
        ctx.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
        
        // Portal inner
        const gradient = ctx.createRadialGradient(
            this.x + this.width/2, this.y + this.height/2, 0,
            this.x + this.width/2, this.y + this.height/2, this.width/2 + pulseSize
        );
        gradient.addColorStop(0, '#00ff00');
        gradient.addColorStop(0.5, '#00aa00');
        gradient.addColorStop(1, '#004400');
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Swirl effect
        ctx.strokeStyle = '#aaffaa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            const angle = this.phase + (i * Math.PI * 2 / 3);
            const rx = this.width/2 + Math.cos(angle) * 10;
            const ry = this.height/2 + Math.sin(angle) * 15;
            ctx.arc(this.x + this.width/2, this.y + this.height/2, rx, 0, Math.PI * 2);
        }
        ctx.stroke();
        
        ctx.shadowBlur = 0;
    }
    
    checkCollision(player) {
        if (this.cooldown > 0) return false;
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }
    
    teleport(player) {
        if (this.cooldown > 0) return false;
        player.x = this.targetX;
        player.y = this.targetY;
        this.cooldown = 2000;
        return true;
    }
}

// ============================================
// GOAL CLASS
// ============================================
class Goal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
    }
    
    draw(ctx) {
        ctx.fillStyle = '#744210';
        ctx.fillRect(this.x, this.y + 10, 6, this.height - 10);
        
        ctx.fillStyle = GOAL_COLOR;
        ctx.beginPath();
        ctx.moveTo(this.x + 6, this.y + 10);
        ctx.lineTo(this.x + this.width, this.y + 20);
        ctx.lineTo(this.x + 6, this.y + 30);
        ctx.fill();
    }
}

// ============================================
// BOUNCER CLASS (Spring pad like Geometry Dash)
// ============================================
class Bouncer {
    constructor(x, y, width = 50, jumpForce = -22) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 15;
        this.jumpForce = jumpForce;
        this.bouncePhase = 0;
        this.activated = false;
    }
    
    update() {
        if (this.activated) {
            this.bouncePhase += 0.3;
            if (this.bouncePhase > 1) {
                this.activated = false;
                this.bouncePhase = 0;
            }
        }
    }
    
    draw(ctx) {
        const squash = this.activated ? Math.sin(this.bouncePhase * Math.PI) * 10 : 0;
        
        // Glow
        ctx.shadowColor = '#ff00ff';
        ctx.shadowBlur = 15;
        
        // Base
        ctx.fillStyle = '#6b46c1';
        ctx.fillRect(this.x, this.y + squash, this.width, this.height - squash);
        
        // Spring top
        ctx.fillStyle = '#9f7aea';
        ctx.fillRect(this.x + 5, this.y + squash - 5, this.width - 10, 8);
        
        // Arrows
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Arial';
        ctx.fillText('⬆', this.x + this.width/2 - 8, this.y + 12);
        
        ctx.shadowBlur = 0;
    }
    
    checkCollision(player) {
        return player.x + player.width > this.x &&
               player.x < this.x + this.width &&
               player.y + player.height >= this.y &&
               player.y + player.height <= this.y + this.height + 10;
    }
    
    bounce(player) {
        if (!this.activated) {
            player.vy = this.jumpForce;
            player.onGround = false;
            player.canDoubleJump = true;
            this.activated = true;
            this.bouncePhase = 0;
            particles.emit(player.x + player.width/2, player.y + player.height, '#9f7aea', 15);
        }
    }
}

// ============================================
// FALLING BLOCK CLASS
// ============================================
class FallingBlock {
    constructor(x, y, width = 40, height = 40, delay = 500, moveRange = 0, moveSpeed = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.delay = delay;
        this.triggered = false;
        this.falling = false;
        this.vy = 0;
        this.startY = y;
        this.triggerTime = 0;
        this.moveRange = moveRange;
        this.moveSpeed = moveSpeed;
        this.startX = x;
        this.direction = 1;
    }
    
    update() {
        if (!this.triggered) {
            // Check if player is nearby to trigger
            return;
        }
        
        if (!this.falling) {
            if (Date.now() - this.triggerTime > this.delay) {
                this.falling = true;
                this.vy = 2;
            }
        } else {
            this.vy += 0.5;
            this.y += this.vy;
        }
        
        // Horizontal movement
        if (this.moveRange > 0) {
            this.x += this.moveSpeed * this.direction;
            if (this.x > this.startX + this.moveRange) this.direction = -1;
            else if (this.x < this.startX - this.moveRange) this.direction = 1;
        }
    }
    
    draw(ctx) {
        if (this.triggered && !this.falling) {
            ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 100) * 0.3;
        }
        
        // Block body
        ctx.fillStyle = '#c53030';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Warning stripes
        ctx.fillStyle = '#fc8181';
        for (let i = 0; i < this.width; i += 10) {
            ctx.fillRect(this.x + i, this.y, 5, this.height);
        }
        
        // Skull if triggered
        if (this.triggered && !this.falling) {
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px Arial';
            ctx.fillText('💀', this.x + 10, this.y + 28);
        }
        
        ctx.globalAlpha = 1;
    }
    
    checkTrigger(player) {
        if (this.triggered) return;
        if (player.x + player.width > this.x - 20 &&
            player.x < this.x + this.width + 20 &&
            player.y + player.height > this.y - 50 &&
            player.y < this.y + this.height + 50) {
            this.triggered = true;
            this.triggerTime = Date.now();
        }
    }
    
    checkCollision(player) {
        return player.x + player.width > this.x &&
               player.x < this.x + this.width &&
               player.y + player.height > this.y &&
               player.y < this.y + this.height;
    }
}

// ============================================
// MINI PORTAL CLASS
// ============================================
class MiniPortal {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.width = 30;
        this.height = 40;
        this.phase = 0;
        this.cooldown = 0;
    }
    
    update() {
        this.phase += 0.1;
        if (this.cooldown > 0) this.cooldown -= 16;
    }
    
    draw(ctx) {
        if (this.cooldown > 0) return;
        
        const pulseSize = Math.sin(this.phase) * 3;
        
        // Glow
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15;
        
        // Portal frame
        ctx.fillStyle = '#0891b2';
        ctx.fillRect(this.x - 3, this.y - 3, this.width + 6, this.height + 6);
        
        // Portal inner
        const gradient = ctx.createRadialGradient(
            this.x + this.width/2, this.y + this.height/2, 0,
            this.x + this.width/2, this.y + this.height/2, this.width/2
        );
        gradient.addColorStop(0, '#00ffff');
        gradient.addColorStop(1, '#06b6d4');
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.shadowBlur = 0;
    }
    
    checkCollision(player) {
        if (this.cooldown > 0) return false;
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }
    
    teleport(player) {
        if (this.cooldown > 0) return false;
        player.x = this.targetX;
        player.y = this.targetY;
        this.cooldown = 1500;
        return true;
    }
}

// ============================================
// SMOKE EFFECT CLASS
// ============================================
class SmokeEffect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
    }
    
    update() {
        for (let i = 0; i < 2; i++) {
            this.particles.push({
                x: this.x + (Math.random() - 0.5) * 20,
                y: this.y + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 2,
                vy: -Math.random() * 2 - 1,
                size: Math.random() * 15 + 5,
                alpha: 0.5,
                decay: 0.02
            });
        }
        
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.size += 0.3;
            p.alpha -= p.decay;
            return p.alpha > 0;
        });
    }
    
    draw(ctx) {
        this.particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = '#718096';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
    }
}

// ============================================
// SPEED RING - Boost speed temporarily
// ============================================
class SpeedRing {
    constructor(x, y, radius = 25, speedBoost = 2, duration = 120) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedBoost = speedBoost;
        this.duration = duration;
        this.active = true;
        this.pulsePhase = 0;
    }
    
    update() {
        this.pulsePhase += 0.1;
    }
    
    draw(ctx) {
        if (!this.active) return;
        const pulse = Math.sin(this.pulsePhase) * 3;
        
        ctx.save();
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 20;
        
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + pulse, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(0, 255, 136, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#00ff88';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('>>>', this.x, this.y);
        
        ctx.restore();
    }
    
    checkCollision(player) {
        if (!this.active) return false;
        const dx = player.x + player.width/2 - this.x;
        const dy = player.y + player.height/2 - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < this.radius + player.width/2) {
            this.active = false;
            return true;
        }
        return false;
    }
}

// ============================================
// JUMP RING (Yellow) - Extra jump boost
// ============================================
class JumpRing {
    constructor(x, y, radius = 22, jumpBoost = -28) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.jumpBoost = jumpBoost;
        this.active = true;
        this.rotation = 0;
    }
    
    update() {
        this.rotation += 0.05;
    }
    
    draw(ctx) {
        if (!this.active) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.shadowColor = '#ffdd00';
        ctx.shadowBlur = 15;
        
        ctx.strokeStyle = '#ffdd00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = '#ffdd00';
        ctx.beginPath();
        ctx.moveTo(0, -this.radius - 8);
        ctx.lineTo(-6, -this.radius + 2);
        ctx.lineTo(6, -this.radius + 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    checkCollision(player) {
        if (!this.active) return false;
        const dx = player.x + player.width/2 - this.x;
        const dy = player.y + player.height/2 - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        return dist < this.radius + player.width/2;
    }
}

// ============================================
// REVERSE GRAVITY RING (Green) - Flip gravity
// ============================================
class GravityRing {
    constructor(x, y, radius = 25) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.active = true;
        this.pulsePhase = 0;
    }
    
    update() {
        this.pulsePhase += 0.08;
    }
    
    draw(ctx) {
        if (!this.active) return;
        const pulse = Math.sin(this.pulsePhase) * 3;
        
        ctx.save();
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 20;
        
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + pulse, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x - 8, this.y + 10);
        ctx.lineTo(this.x, this.y - 10);
        ctx.lineTo(this.x + 8, this.y + 10);
        ctx.stroke();
        
        ctx.restore();
    }
    
    checkCollision(player) {
        if (!this.active) return false;
        const dx = player.x + player.width/2 - this.x;
        const dy = player.y + player.height/2 - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < this.radius + player.width/2) {
            this.active = false;
            return true;
        }
        return false;
    }
}

// ============================================
// INVISIBLE PLATFORM - Shows when player approaches
// ============================================
class InvisiblePlatform {
    constructor(x, y, width, height, revealDistance = 100) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.revealDistance = revealDistance;
        this.visible = false;
        this.alpha = 0;
    }
    
    update(player) {
        const dx = player.x + player.width/2 - (this.x + this.width/2);
        const dy = player.y + player.height/2 - (this.y + this.height/2);
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        this.visible = dist < this.revealDistance;
        
        if (this.visible && this.alpha < 1) {
            this.alpha += 0.1;
        } else if (!this.visible && this.alpha > 0) {
            this.alpha -= 0.05;
        }
    }
    
    draw(ctx) {
        if (this.alpha <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#8b5cf6';
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 10;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
    
    checkCollision(player) {
        if (this.alpha < 0.5) return false;
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }
}

// ============================================
// CRUMBLING PLATFORM - Falls after contact
// ============================================
class CrumblingPlatform {
    constructor(x, y, width, height, delay = 30, fallSpeed = 3) {
        this.x = x;
        this.y = y;
        this.originalY = y;
        this.width = width;
        this.height = height;
        this.delay = delay;
        this.fallSpeed = fallSpeed;
        this.triggered = false;
        this.timer = 0;
        this.falling = false;
        this.crumbleParticles = [];
    }
    
    update() {
        if (this.triggered) {
            this.timer++;
            if (this.timer >= this.delay && !this.falling) {
                this.falling = true;
            }
        }
        
        if (this.falling) {
            this.y += this.fallSpeed;
            this.fallSpeed += 0.2;
            
            if (Math.random() > 0.7) {
                this.crumbleParticles.push({
                    x: this.x + Math.random() * this.width,
                    y: this.y + this.height,
                    vx: (Math.random() - 0.5) * 3,
                    vy: -Math.random() * 2,
                    size: Math.random() * 6 + 2,
                    alpha: 1
                });
            }
        }
        
        this.crumbleParticles = this.crumbleParticles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.03;
            return p.alpha > 0;
        });
    }
    
    draw(ctx) {
        ctx.fillStyle = this.triggered ? '#dc2626' : '#92400e';
        if (this.falling) ctx.fillStyle = '#b91c1c';
        
        ctx.shadowColor = this.triggered ? '#ef4444' : '#d97706';
        ctx.shadowBlur = this.triggered ? 10 : 5;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
        
        if (this.triggered && !this.falling) {
            const shake = Math.sin(this.timer * 0.5) * 2;
            ctx.fillRect(this.x + shake, this.y, this.width, this.height);
        }
        
        ctx.fillStyle = '#fbbf24';
        this.crumbleParticles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        ctx.globalAlpha = 1;
    }
    
    checkCollision(player) {
        if (this.falling) return false;
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y + player.height > this.y &&
               player.y + player.height < this.y + 10;
    }
    
    trigger() {
        if (!this.triggered) {
            this.triggered = true;
        }
    }
}

// ============================================
// DASH PAD - Diagonal jump launch
// ============================================
class DashPad {
    constructor(x, y, width = 40, height = 10, direction = 'right', force = 15) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.force = force;
        this.active = true;
        this.arrowRotation = direction === 'right' ? 0 : Math.PI;
    }
    
    update() {}
    
    draw(ctx) {
        if (!this.active) return;
        
        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.arrowRotation);
        
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 15;
        
        ctx.fillStyle = '#f97316';
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        
        ctx.fillStyle = '#fdba74';
        ctx.beginPath();
        ctx.moveTo(this.width/2 - 5, 0);
        ctx.lineTo(this.width/2 - 15, -8);
        ctx.lineTo(this.width/2 - 15, 8);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    checkCollision(player) {
        if (!this.active) return false;
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y + player.height > this.y &&
               player.y < this.y + this.height;
    }
}

// ============================================
// COLOR CUBE - Can pass through same color barriers
// ============================================
class ColorCube {
    constructor(x, y, width = 30, height = 30, color = '#3b82f6') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.rotation = 0;
        this.glowIntensity = 0;
    }
    
    update() {
        this.rotation += 0.02;
        this.glowIntensity = 0.5 + Math.sin(Date.now() / 200) * 0.3;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.rotation);
        
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15 * this.glowIntensity;
        
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeRect(-this.width/2 + 4, -this.height/2 + 4, this.width - 8, this.height - 8);
        
        ctx.restore();
    }
}

// ============================================
// SLOW MOTION ZONE - Slows time in area
// ============================================
class SlowMotionZone {
    constructor(x, y, width = 80, height = 150, slowFactor = 0.3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.slowFactor = slowFactor;
        this.active = true;
        this.particles = [];
    }
    
    update() {
        if (Math.random() > 0.8) {
            this.particles.push({
                x: this.x + Math.random() * this.width,
                y: this.y + this.height,
                vy: -Math.random() * 2 - 1,
                size: Math.random() * 4 + 2,
                alpha: 0.5
            });
        }
        
        this.particles = this.particles.filter(p => {
            p.y += p.vy;
            p.alpha -= 0.02;
            return p.alpha > 0 && p.y > this.y;
        });
    }
    
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'rgba(147, 197, 253, 0.15)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.setLineDash([]);
        
        this.particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = '#93c5fd';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        
        ctx.fillStyle = '#60a5fa';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SLOW', this.x + this.width/2, this.y + this.height/2);
        ctx.restore();
    }
    
    checkCollision(player) {
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }
}

// ============================================
// MOVING SPIKE - Spikes that move back and forth
// ============================================
class MovingSpike {
    constructor(x, y, width = 30, height = 30, moveRange = 50, speed = 2, vertical = false) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.width = width;
        this.height = height;
        this.moveRange = moveRange;
        this.speed = speed;
        this.vertical = vertical;
        this.direction = 1;
    }
    
    update() {
        if (this.vertical) {
            this.y += this.speed * this.direction;
            if (this.y > this.startY + this.moveRange) this.direction = -1;
            else if (this.y < this.startY - this.moveRange) this.direction = 1;
        } else {
            this.x += this.speed * this.direction;
            if (this.x > this.startX + this.moveRange) this.direction = -1;
            else if (this.x < this.startX - this.moveRange) this.direction = 1;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        
        ctx.fillStyle = '#dc2626';
        
        const spikeCount = Math.floor(this.width / 15);
        const spikeWidth = this.width / spikeCount;
        
        for (let i = 0; i < spikeCount; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x + i * spikeWidth, this.y + this.height);
            ctx.lineTo(this.x + i * spikeWidth + spikeWidth/2, this.y);
            ctx.lineTo(this.x + (i + 1) * spikeWidth, this.y + this.height);
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.restore();
    }
    
    checkCollision(player) {
        const hitbox = {
            x: this.x + 5,
            y: this.y + 5,
            width: this.width - 10,
            height: this.height - 10
        };
        
        return player.x < hitbox.x + hitbox.width &&
               player.x + player.width > hitbox.x &&
               player.y < hitbox.y + hitbox.height &&
               player.y + player.height > hitbox.y;
    }
}

// ============================================
// SWINGING AXE - Pendulum hazard
// ============================================
class SwingingAxe {
    constructor(x, y, length = 100, swingAngle = Math.PI/3, speed = 0.03) {
        this.anchorX = x;
        this.anchorY = y;
        this.length = length;
        this.swingAngle = swingAngle;
        this.speed = speed;
        this.angle = 0;
        this.rotation = 0;
        this.radius = 25;
    }
    
    get x() {
        return this.anchorX + Math.sin(this.angle) * this.length;
    }
    
    get y() {
        return this.anchorY + Math.cos(this.angle) * this.length;
    }
    
    update() {
        this.angle = Math.sin(Date.now() * this.speed) * this.swingAngle;
        this.rotation += 0.1;
    }
    
    draw(ctx) {
        ctx.strokeStyle = '#71717a';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.anchorX, this.anchorY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        
        ctx.fillStyle = '#71717a';
        ctx.beginPath();
        ctx.arc(this.anchorX, this.anchorY, 8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.shadowColor = '#dc2626';
        ctx.shadowBlur = 15;
        
        ctx.fillStyle = '#991b1b';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2;
            const r = i % 2 === 0 ? this.radius : this.radius * 0.4;
            ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    checkCollision(player) {
        const dx = player.x + player.width/2 - this.x;
        const dy = player.y + player.height/2 - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        return dist < this.radius + player.width/2 - 5;
    }
}

// ============================================
// LASER - Laser beam hazard
// ============================================
class Laser {
    constructor(x, y, width = 100, height = 8, vertical = false, moveRange = 0, moveSpeed = 0) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.width = width;
        this.height = height;
        this.vertical = vertical;
        this.moveRange = moveRange;
        this.moveSpeed = moveSpeed;
        this.direction = 1;
        this.active = true;
        this.warningTime = 60;
        this.firing = false;
        this.timer = 0;
    }
    
    update() {
        this.timer++;
        
        if (this.moveRange > 0) {
            if (this.vertical) {
                this.y += this.moveSpeed * this.direction;
                if (this.y > this.startY + this.moveRange) this.direction = -1;
                else if (this.y < this.startY - this.moveRange) this.direction = 1;
            } else {
                this.x += this.moveSpeed * this.direction;
                if (this.x > this.startX + this.moveRange) this.direction = -1;
                else if (this.x < this.startX - this.moveRange) this.direction = 1;
            }
        }
        
        if (this.timer % 180 < this.warningTime) {
            this.firing = false;
        } else {
            this.firing = true;
        }
    }
    
    draw(ctx) {
        const warning = !this.firing && this.timer % 180 < this.warningTime;
        
        if (warning) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
            if (this.vertical) {
                ctx.fillRect(this.x - 5, this.y, this.width + 10, this.height);
            } else {
                ctx.fillRect(this.x, this.y - 5, this.width, this.height + 10);
            }
        }
        
        if (this.firing) {
            ctx.save();
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = 20;
            
            const gradient = ctx.createLinearGradient(
                this.vertical ? this.x : this.x,
                this.vertical ? this.y : this.y,
                this.vertical ? this.x + this.width : this.x,
                this.vertical ? this.y : this.y + this.height
            );
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.5, '#ef4444');
            gradient.addColorStop(1, '#ffffff');
            
            ctx.fillStyle = gradient;
            if (this.vertical) {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            } else {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            
            ctx.restore();
        }
    }
    
    checkCollision(player) {
        if (!this.firing) return false;
        
        if (this.vertical) {
            return player.x < this.x + this.width &&
                   player.x + player.width > this.x &&
                   player.y < this.y + this.height &&
                   player.y + player.height > this.y;
        } else {
            return player.x < this.x + this.width &&
                   player.x + player.width > this.x &&
                   player.y < this.y + this.height &&
                   player.y + player.height > this.y;
        }
    }
}

// ============================================
// SHIELD POWER-UP - Protects from one hit
// ============================================
class Shield {
    constructor(x, y, radius = 20) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.active = true;
        this.rotation = 0;
    }
    
    update() {
        this.rotation += 0.03;
    }
    
    draw(ctx) {
        if (!this.active) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.shadowColor = '#22d3ee';
        ctx.shadowBlur = 15;
        
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(34, 211, 238, 0.3)';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius - 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#22d3ee';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('S', 0, 0);
        
        ctx.restore();
    }
    
    checkCollision(player) {
        if (!this.active) return false;
        const dx = player.x + player.width/2 - this.x;
        const dy = player.y + player.height/2 - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < this.radius + player.width/2) {
            this.active = false;
            return true;
        }
        return false;
    }
}

// ============================================
// MAGNET - Attracts to goal
// ============================================
class Magnet {
    constructor(x, y, radius = 25, pullStrength = 2) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.pullStrength = pullStrength;
        this.active = true;
        this.pulsePhase = 0;
    }
    
    update() {
        this.pulsePhase += 0.1;
    }
    
    draw(ctx) {
        if (!this.active) return;
        
        const pulse = Math.sin(this.pulsePhase) * 3;
        
        ctx.save();
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 20;
        
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + pulse, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#fdf2f8';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ec4899';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('M', this.x, this.y);
        
        ctx.restore();
    }
    
    checkCollision(player) {
        if (!this.active) return false;
        const dx = player.x + player.width/2 - this.x;
        const dy = player.y + player.height/2 - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        return dist < this.radius + player.width/2;
    }
    
    getPullVector(player, goal) {
        const dx = goal.x + 20 - (player.x + player.width/2);
        const dy = goal.y + 20 - (player.y + player.height/2);
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        return {
            x: (dx / dist) * this.pullStrength,
            y: (dy / dist) * this.pullStrength
        };
    }
}

// ============================================
// COIN - Collectible
// ============================================
class Coin {
    constructor(x, y, radius = 12, value = 1) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.value = value;
        this.active = true;
        this.rotation = 0;
        this.bobOffset = Math.random() * Math.PI * 2;
    }
    
    update() {
        this.rotation += 0.05;
    }
    
    draw(ctx) {
        if (!this.active) return;
        
        const bob = Math.sin(Date.now() / 200 + this.bobOffset) * 3;
        
        ctx.save();
        ctx.translate(this.x, this.y + bob);
        
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 15;
        
        const scaleX = Math.cos(this.rotation);
        ctx.scale(scaleX, 1);
        
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#fcd34d';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 1);
        
        ctx.restore();
    }
    
    checkCollision(player) {
        if (!this.active) return false;
        const dx = player.x + player.width/2 - this.x;
        const dy = player.y + player.height/2 - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < this.radius + player.width/2) {
            this.active = false;
            return true;
        }
        return false;
    }
}

// ============================================
// KEY - Opens special doors
// ============================================
class Key {
    constructor(x, y, color = '#fbbf24') {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 30;
        this.color = color;
        this.active = true;
        this.rotation = 0;
    }
    
    update() {
        this.rotation = Math.sin(Date.now() / 300) * 0.2;
    }
    
    draw(ctx) {
        if (!this.active) return;
        
        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.rotation);
        
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, -8, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(-3, 0, 6, 20);
        ctx.fillRect(-3, 12, 10, 4);
        ctx.fillRect(-3, 18, 7, 4);
        
        ctx.restore();
    }
    
    checkCollision(player) {
        if (!this.active) return false;
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }
}

// ============================================
// BOSS CLASS
// ============================================
class Boss {
    constructor() {
        this.x = 600;
        this.y = 150;
        this.width = 80;
        this.height = 80;
        this.health = 100;
        this.maxHealth = 100;
        this.phase = 'laser';
        this.phaseTimer = 0;
        this.attackCooldown = 0;
        this.lasers = [];
        this.slams = [];
    }
    
    update(player, deltaTime) {
        this.phaseTimer += deltaTime;
        this.attackCooldown -= deltaTime;
        
        if (this.health <= 0) {
            return 'defeated';
        }
        
        if (this.phaseTimer > 5000) {
            this.phaseTimer = 0;
            const phases = ['laser', 'slam', 'doubleLaser'];
            this.phase = phases[Math.floor(Math.random() * phases.length)];
        }
        
        if (this.attackCooldown <= 0) {
            this.attackCooldown = 2000;
            
            if (this.phase === 'laser') {
                this.lasers.push({
                    x: 50,
                    y: Math.random() * (CANVAS_HEIGHT - 100) + 50,
                    width: 10,
                    height: 80,
                    vx: 8
                });
            } else if (this.phase === 'slam') {
                this.slams.push({
                    x: player.x,
                    y: 0,
                    width: 60,
                    height: 60,
                    vy: 15
                });
            } else if (this.phase === 'doubleLaser') {
                for (let i = 0; i < 2; i++) {
                    this.lasers.push({
                        x: 50,
                        y: 100 + i * 200 + Math.random() * 100,
                        width: 10,
                        height: 60,
                        vx: 10
                    });
                }
            }
        }
        
        this.lasers = this.lasers.filter(l => {
            l.x += l.vx;
            return l.x < CANVAS_WIDTH;
        });
        
        this.slams = this.slams.filter(s => {
            s.y += s.vy;
            s.vy += 0.5;
            return s.y < CANVAS_HEIGHT;
        });
        
        return 'active';
    }
    
    draw(ctx) {
        ctx.fillStyle = '#9b2c2c';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.fillStyle = '#fc8181';
        ctx.fillRect(this.x + 10, this.y + 15, 20, 20);
        ctx.fillRect(this.x + 50, this.y + 15, 20, 20);
        
        ctx.fillStyle = '#742a2a';
        ctx.fillRect(this.x + 20, this.y + 50, 40, 15);
        
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = '#742a2a';
        ctx.fillRect(this.x, this.y - 20, this.width, 10);
        ctx.fillStyle = '#e53e3e';
        ctx.fillRect(this.x, this.y - 20, this.width * healthPercent, 10);
        
        ctx.fillStyle = 'rgba(229, 62, 62, 0.5)';
        this.lasers.forEach(l => {
            ctx.fillRect(l.x, l.y, l.width, l.height);
        });
        
        ctx.fillStyle = 'rgba(183, 28, 28, 0.7)';
        this.slams.forEach(s => {
            ctx.fillRect(s.x, s.y, s.width, s.height);
        });
    }
}

// ============================================
// LEVEL MANAGER
// ============================================
class LevelManager {
    constructor() {
        this.platforms = [];
        this.spikes = [];
        this.decorations = [];
        this.saws = [];
        this.glowingPlatforms = [];
        this.rotatingSpikes = [];
        this.orbs = [];
        this.gravityFlippers = [];
        this.teleporters = [];
        this.bouncers = [];
        this.fallingBlocks = [];
        this.miniPortals = [];
        this.smokeEffects = [];
        this.speedRings = [];
        this.jumpRings = [];
        this.gravityRings = [];
        this.invisiblePlatforms = [];
        this.crumblingPlatforms = [];
        this.dashPads = [];
        this.movingSpikes = [];
        this.swingingAxes = [];
        this.lasers = [];
        this.shields = [];
        this.magnets = [];
        this.coins = [];
        this.keyItems = [];
        this.slowMotionZones = [];
        this.colorCubes = [];
        this.playerStart = { x: 50, y: 700 };
        this.goal = null;
        this.boss = null;
        this.hasBoss = false;
        this.currentLevel = 0;
        this.isHardMode = false;
        this.isInsaneMode = false;
        this.isExtremeMode = false;
    }
    
    loadLevel(levelIndex, hardMode = false, insaneMode = false, extremeMode = false) {
        this.currentLevel = levelIndex;
        this.isHardMode = hardMode;
        this.isInsaneMode = insaneMode;
        this.isExtremeMode = extremeMode;
        if (window.game) {
            window.game.isTestingCustom = false;
        }
        let levels;
        if (extremeMode) {
            levels = EXTREME_LEVELS;
        } else if (insaneMode) {
            levels = INSANE_LEVELS;
        } else if (hardMode) {
            levels = HARD_LEVELS;
        } else {
            levels = LEVELS;
        }
        const level = levels[levelIndex];
        
        this.platforms = level.platforms.map(p => new Platform(
            p.x, p.y, p.width, p.height,
            p.moving || false, p.range || 0, p.speed || 0, p.vertical || false, p.secret || false
        ));
        
        this.spikes = level.spikes.map(s => new Spike(s.x, s.y, s.width));
        
        this.goal = new Goal(level.goal.x, level.goal.y);
        
        this.decorations = [];
        if (level.decorations) {
            this.decorations = level.decorations.map(d => {
                const type = DECORATIONS.find(dec => dec.name === d.type) || DECORATIONS[0];
                return new Decoration(d.x, d.y, type);
            });
        }
        
        // Load saws
        this.saws = [];
        if (level.saws) {
            this.saws = level.saws.map(s => new Saw(
                s.x, s.y, s.radius || 30, s.range || 0, s.speed || 0, s.vertical || false
            ));
        }
        
        // Load glowing platforms
        this.glowingPlatforms = [];
        if (level.glowingPlatforms) {
            this.glowingPlatforms = level.glowingPlatforms.map(p => new GlowingPlatform(
                p.x, p.y, p.width, p.height, p.color || '#00ffff',
                p.moving || false, p.range || 0, p.speed || 0, p.vertical || false
            ));
        }
        
        // Load rotating spikes
        this.rotatingSpikes = [];
        if (level.rotatingSpikes) {
            this.rotatingSpikes = level.rotatingSpikes.map(s => new RotatingSpike(
                s.x, s.y, s.radius || 25, s.rotationSpeed || 0.05, s.range || 0, s.speed || 0
            ));
        }
        
        // Load orbs
        this.orbs = [];
        if (level.orbs) {
            this.orbs = level.orbs.map(o => new Orb(o.x, o.y, o.type || 'doubleJump'));
        }
        
        // Load gravity flippers
        this.gravityFlippers = [];
        if (level.gravityFlippers) {
            this.gravityFlippers = level.gravityFlippers.map(g => new GravityFlipper(g.x, g.y));
        }
        
        // Load teleporters
        this.teleporters = [];
        if (level.teleporters) {
            this.teleporters = level.teleporters.map(t => new Teleporter(t.x, t.y, t.targetX, t.targetY));
        }
        
        // Load bouncers
        this.bouncers = [];
        if (level.bouncers) {
            this.bouncers = level.bouncers.map(b => new Bouncer(b.x, b.y, b.width || 50, b.jumpForce || -22));
        }
        
        // Load falling blocks
        this.fallingBlocks = [];
        if (level.fallingBlocks) {
            this.fallingBlocks = level.fallingBlocks.map(f => new FallingBlock(
                f.x, f.y, f.width || 40, f.height || 40, f.delay || 500, f.range || 0, f.speed || 0
            ));
        }
        
        // Load mini portals
        this.miniPortals = [];
        if (level.miniPortals) {
            this.miniPortals = level.miniPortals.map(m => new MiniPortal(m.x, m.y, m.targetX, m.targetY));
        }
        
        // Load smoke effects
        this.smokeEffects = [];
        if (level.smokeEffects) {
            this.smokeEffects = level.smokeEffects.map(s => new SmokeEffect(s.x, s.y));
        }
        
        // Load speed rings
        this.speedRings = [];
        if (level.speedRings) {
            this.speedRings = level.speedRings.map(s => new SpeedRing(s.x, s.y, s.radius || 25, s.speedBoost || 2, s.duration || 120));
        }
        
        // Load jump rings
        this.jumpRings = [];
        if (level.jumpRings) {
            this.jumpRings = level.jumpRings.map(j => new JumpRing(j.x, j.y, j.radius || 22, j.jumpBoost || -28));
        }
        
        // Load gravity rings
        this.gravityRings = [];
        if (level.gravityRings) {
            this.gravityRings = level.gravityRings.map(g => new GravityRing(g.x, g.y, g.radius || 25));
        }
        
        // Load invisible platforms
        this.invisiblePlatforms = [];
        if (level.invisiblePlatforms) {
            this.invisiblePlatforms = level.invisiblePlatforms.map(p => new InvisiblePlatform(
                p.x, p.y, p.width, p.height, p.revealDistance || 100
            ));
        }
        
        // Load crumbling platforms
        this.crumblingPlatforms = [];
        if (level.crumblingPlatforms) {
            this.crumblingPlatforms = level.crumblingPlatforms.map(c => new CrumblingPlatform(
                c.x, c.y, c.width, c.height, c.delay || 30, c.fallSpeed || 3
            ));
        }
        
        // Load dash pads
        this.dashPads = [];
        if (level.dashPads) {
            this.dashPads = level.dashPads.map(d => new DashPad(d.x, d.y, d.width || 40, d.height || 10, d.direction || 'right', d.force || 15));
        }
        
        // Load moving spikes
        this.movingSpikes = [];
        if (level.movingSpikes) {
            this.movingSpikes = level.movingSpikes.map(m => new MovingSpike(m.x, m.y, m.width || 30, m.height || 30, m.moveRange || 50, m.speed || 2, m.vertical || false));
        }
        
        // Load swinging axes
        this.swingingAxes = [];
        if (level.swingingAxes) {
            this.swingingAxes = level.swingingAxes.map(a => new SwingingAxe(a.x, a.y, a.length || 100, a.swingAngle || Math.PI/3, a.speed || 0.03));
        }
        
        // Load lasers
        this.lasers = [];
        if (level.lasers) {
            this.lasers = level.lasers.map(l => new Laser(l.x, l.y, l.width || 100, l.height || 8, l.vertical || false, l.moveRange || 0, l.moveSpeed || 0));
        }
        
        // Load shields
        this.shields = [];
        if (level.shields) {
            this.shields = level.shields.map(s => new Shield(s.x, s.y, s.radius || 20));
        }
        
        // Load magnets
        this.magnets = [];
        if (level.magnets) {
            this.magnets = level.magnets.map(m => new Magnet(m.x, m.y, m.radius || 25, m.pullStrength || 2));
        }
        
        // Load coins
        this.coins = [];
        if (level.coins) {
            this.coins = level.coins.map(c => new Coin(c.x, c.y, c.radius || 12, c.value || 1));
        }
        
        // Load keys
        this.keyItems = [];
        if (level.keys) {
            this.keyItems = level.keys.map(k => new Key(k.x, k.y, k.color || '#fbbf24'));
        }
        
        this.hasBoss = level.hasBoss || false;
        if (this.hasBoss && !bossDefeated) {
            this.boss = new Boss();
        } else {
            this.boss = null;
        }
        
        this.playerStart = level.playerStart;
        return level.playerStart;
    }
    
    update(player, deltaTime) {
        player.onGround = false;
        
        this.platforms.forEach(p => p.update());
        
        this.platforms.forEach(platform => {
            if (player.x + player.width > platform.x &&
                player.x < platform.x + platform.width &&
                player.y + player.height > platform.y &&
                player.y + player.height < platform.y + platform.height + 10 &&
                player.vy >= 0) {
                
                player.y = platform.y - player.height;
                player.vy = 0;
                player.onGround = true;
                player.lastGroundedTime = Date.now();
                
                if (platform.velocityX !== 0) {
                    player.x += platform.velocityX;
                }
            }
        });
        
        // Allow falling off bottom of screen (void death)
        // Removed the ground collision at bottom
        
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > CANVAS_WIDTH) player.x = CANVAS_WIDTH - player.width;
        
        for (const spike of this.spikes) {
            if (player.x + player.width > spike.x + 5 &&
                player.x < spike.x + spike.width - 5 &&
                player.y + player.height > spike.y &&
                player.y < spike.y + spike.height) {
                return 'dead';
            }
        }
        
        // Update and check saws
        for (const saw of this.saws) {
            saw.update();
            if (saw.checkCollision(player)) {
                return 'dead';
            }
        }
        
        // Update and check rotating spikes
        for (const spike of this.rotatingSpikes) {
            spike.update();
            if (spike.checkCollision(player)) {
                return 'dead';
            }
        }
        
        // Update glowing platforms
        this.glowingPlatforms.forEach(p => p.update());
        
        // Check glowing platform collision
        for (const platform of this.glowingPlatforms) {
            if (player.x + player.width > platform.x &&
                player.x < platform.x + platform.width &&
                player.y + player.height > platform.y &&
                player.y + player.height < platform.y + platform.height + 10 &&
                player.vy >= 0) {
                player.y = platform.y - player.height;
                player.vy = 0;
                player.onGround = true;
                player.lastGroundedTime = Date.now();
            }
        }
        
        // Update orbs
        this.orbs.forEach(orb => {
            orb.update();
            if (orb.checkCollision(player)) {
                orb.collected = true;
                // Apply orb effect
                if (orb.type === 'doubleJump') {
                    player.canDoubleJump = true;
                } else if (orb.type === 'dash') {
                    canDash = true;
                    dashCooldown = 0;
                } else if (orb.type === 'slowMo') {
                    player.slowMo = true;
                    setTimeout(() => { player.slowMo = false; }, 5000);
                } else if (orb.type === 'ghost') {
                    player.ghostMode = true;
                    setTimeout(() => { player.ghostMode = false; }, 5000);
                }
            }
        });
        
        // Update gravity flippers
        this.gravityFlippers.forEach(gf => {
            gf.update();
            if (gf.checkCollision(player)) {
                player.gravity = -player.gravity;
                player.vy = player.gravity > 0 ? -10 : 10;
            }
        });
        
        // Update teleporters
        this.teleporters.forEach(tp => {
            tp.update();
            if (tp.checkCollision(player)) {
                tp.teleport(player);
            }
        });
        
        // Update bouncers
        this.bouncers.forEach(b => {
            b.update();
            if (b.checkCollision(player) && player.vy >= 0) {
                b.bounce(player);
            }
        });
        
        // Update falling blocks
        this.fallingBlocks.forEach(fb => {
            fb.checkTrigger(player);
            fb.update();
            if (fb.checkCollision(player)) {
                return 'dead';
            }
        });
        
        // Update mini portals
        this.miniPortals.forEach(mp => {
            mp.update();
            if (mp.checkCollision(player)) {
                mp.teleport(player);
            }
        });
        
        // Update smoke effects
        this.smokeEffects.forEach(s => s.update());
        
        // Update new hazards
        this.speedRings.forEach(s => s.update());
        this.jumpRings.forEach(j => j.update());
        this.gravityRings.forEach(g => g.update());
        this.invisiblePlatforms.forEach(p => p.update(player));
        this.crumblingPlatforms.forEach(c => c.update());
        this.dashPads.forEach(d => d.update());
        this.movingSpikes.forEach(m => m.update());
        this.swingingAxes.forEach(a => a.update());
        this.lasers.forEach(l => l.update());
        this.shields.forEach(s => s.update());
        this.magnets.forEach(m => m.update());
        this.coins.forEach(c => c.update());
        this.keyItems.forEach(k => k.update());
        
        // Check moving spike collisions
        for (const spike of this.movingSpikes) {
            if (spike.checkCollision(player)) {
                return 'dead';
            }
        }
        
        // Check swinging axe collisions
        for (const axe of this.swingingAxes) {
            if (axe.checkCollision(player)) {
                return 'dead';
            }
        }
        
        // Check laser collisions
        for (const laser of this.lasers) {
            if (laser.checkCollision(player)) {
                return 'dead';
            }
        }
        
        // Check crumbling platform collisions (they trigger when player lands)
        for (const platform of this.crumblingPlatforms) {
            if (platform.checkCollision(player)) {
                platform.trigger();
            }
        }
        
        // Check invisible platform collisions
        for (const platform of this.invisiblePlatforms) {
            if (platform.checkCollision(player)) {
                player.y = platform.y - player.height;
                player.vy = 0;
                player.onGround = true;
            }
        }
        
        // Check dash pad collisions
        for (const pad of this.dashPads) {
            if (pad.checkCollision(player)) {
                if (pad.direction === 'right') {
                    player.vx = 10;
                    player.vy = -10;
                } else {
                    player.vx = -10;
                    player.vy = -10;
                }
            }
        }
        
        // Check gravity ring collisions
        for (const ring of this.gravityRings) {
            if (ring.checkCollision(player)) {
                player.gravity = -player.gravity;
                player.vy = player.gravity > 0 ? -10 : 10;
            }
        }
        
        // Check jump ring collisions
        for (const ring of this.jumpRings) {
            if (ring.active && ring.checkCollision(player)) {
                ring.active = false;
                player.vy = ring.jumpBoost;
                player.onGround = false;
            }
        }
        
        // Check speed ring collisions
        for (const ring of this.speedRings) {
            if (ring.checkCollision(player)) {
                player.vx *= ring.speedBoost;
                if (Math.abs(player.vx) > 15) player.vx = Math.sign(player.vx) * 15;
            }
        }
        
        // Check shield collisions (collect shield)
        for (const shield of this.shields) {
            if (shield.checkCollision(player)) {
                player.hasShield = true;
            }
        }
        
        // Check magnet collisions
        for (const magnet of this.magnets) {
            if (magnet.checkCollision(player)) {
                const pull = magnet.getPullVector(player, this.goal);
                player.x += pull.x;
                player.y += pull.y;
            }
        }
        
        // Check coin collisions
        for (const coin of this.coins) {
            if (coin.checkCollision(player)) {
                playerCoins += coin.value;
                if (typeof updateCoinDisplay === 'function') updateCoinDisplay();
            }
        }
        
        // Check key collisions
        for (const key of this.keyItems) {
            if (key.checkCollision(player)) {
                // Key collected - could unlock doors
            }
        }
        
        if (this.hasBoss && this.boss) {
            const bossResult = this.boss.update(player, deltaTime);
            
            if (bossResult === 'defeated') {
                bossDefeated = true;
                this.hasBoss = false;
                this.boss = null;
                return 'bossDefeated';
            }
            
            for (const laser of this.boss.lasers) {
                if (player.x + player.width > laser.x &&
                    player.x < laser.x + laser.width &&
                    player.y + player.height > laser.y &&
                    player.y < laser.y + laser.height) {
                    return 'dead';
                }
            }
            
            for (const slam of this.boss.slams) {
                if (player.x + player.width > slam.x &&
                    player.x < slam.x + slam.width &&
                    player.y + player.height > slam.y &&
                    player.y < slam.y + slam.height) {
                    return 'dead';
                }
            }
            
            if (player.x + player.width > this.boss.x &&
                player.x < this.boss.x + this.boss.width &&
                player.y + player.height > this.boss.y &&
                player.y < this.boss.y + this.boss.height) {
                
                this.boss.health -= 1;
                player.vy = -10;
                
                if (this.boss.health <= 0) {
                    bossDefeated = true;
                }
            }
        }
        
        if (this.goal &&
            player.x + player.width > this.goal.x &&
            player.x < this.goal.x + this.goal.width &&
            player.y + player.height > this.goal.y &&
            player.y < this.goal.y + this.goal.height) {
            
            if (this.hasBoss) {
                return 'win';
            }
            return 'win';
        }
        
        return 'playing';
    }
    
    draw(ctx) {
        this.decorations.forEach(d => d.draw(ctx));
        this.spikes.forEach(s => s.draw(ctx));
        this.platforms.forEach(p => p.draw(ctx));
        this.glowingPlatforms.forEach(p => p.draw(ctx));
        this.saws.forEach(s => s.draw(ctx));
        this.rotatingSpikes.forEach(s => s.draw(ctx));
        this.orbs.forEach(o => o.draw(ctx));
        this.gravityFlippers.forEach(g => g.draw(ctx));
        this.teleporters.forEach(t => t.draw(ctx));
        this.bouncers.forEach(b => b.draw(ctx));
        this.fallingBlocks.forEach(fb => fb.draw(ctx));
        this.miniPortals.forEach(mp => mp.draw(ctx));
        this.smokeEffects.forEach(s => s.draw(ctx));
        this.speedRings.forEach(s => s.draw(ctx));
        this.jumpRings.forEach(j => j.draw(ctx));
        this.gravityRings.forEach(g => g.draw(ctx));
        this.invisiblePlatforms.forEach(p => p.draw(ctx));
        this.crumblingPlatforms.forEach(c => c.draw(ctx));
        this.dashPads.forEach(d => d.draw(ctx));
        this.movingSpikes.forEach(m => m.draw(ctx));
        this.swingingAxes.forEach(a => a.draw(ctx));
        this.lasers.forEach(l => l.draw(ctx));
        this.shields.forEach(s => s.draw(ctx));
        this.magnets.forEach(m => m.draw(ctx));
        this.coins.forEach(c => c.draw(ctx));
        this.keyItems.forEach(k => k.draw(ctx));
        if (this.goal) this.goal.draw(ctx);
        if (this.boss) this.boss.draw(ctx);
    }
    
    getLevelName() {
        let levels;
        if (this.isExtremeMode) {
            levels = EXTREME_LEVELS;
        } else if (this.isInsaneMode) {
            levels = INSANE_LEVELS;
        } else if (this.isHardMode) {
            levels = HARD_LEVELS;
        } else {
            levels = LEVELS;
        }
        return levels[this.currentLevel]?.name || 'Unknown';
    }
    
    isInHardMode() {
        return this.isHardMode;
    }
    
    isInInsaneMode() {
        return this.isInsaneMode;
    }
    
    isInExtremeMode() {
        return this.isExtremeMode;
    }
    
    nextLevel() {
        const levels = this.isHardMode ? (this.isInsaneMode ? INSANE_LEVELS : HARD_LEVELS) : LEVELS;
        return this.currentLevel + 1 < levels.length ? this.currentLevel + 1 : 0;
    }
}

let bossDefeated = false;
let hardModeUnlocked = false;
const LEVELS = [
    {
        name: "The Beginning",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 200, height: 40 },
            { x: 250, y: 720, width: 80, height: 20 },
            { x: 380, y: 680, width: 80, height: 20 },
            { x: 520, y: 640, width: 80, height: 20 },
            { x: 660, y: 600, width: 80, height: 20 },
            { x: 800, y: 560, width: 80, height: 20 },
            { x: 940, y: 520, width: 80, height: 20 },
            { x: 1080, y: 480, width: 80, height: 20 },
            { x: 200, y: 440, width: 100, height: 20 },
            { x: 350, y: 400, width: 100, height: 20 },
            { x: 500, y: 360, width: 100, height: 20 },
            { x: 650, y: 320, width: 100, height: 20 },
            { x: 800, y: 280, width: 100, height: 20 },
            { x: 950, y: 240, width: 100, height: 20 },
            { x: 1100, y: 200, width: 80, height: 20 },
        ],
        spikes: [
            { x: 200, y: 740, width: 50 },
            { x: 400, y: 740, width: 80 },
            { x: 600, y: 740, width: 80 },
            { x: 800, y: 740, width: 80 },
            { x: 1000, y: 740, width: 80 },
            { x: 250, y: 700, width: 20 },
            { x: 520, y: 620, width: 20 },
            { x: 800, y: 540, width: 20 },
            { x: 1080, y: 460, width: 20 },
            { x: 350, y: 380, width: 20 },
            { x: 650, y: 300, width: 20 },
            { x: 950, y: 220, width: 20 },
        ],
        decorations: [
            { x: 300, y: 200, type: 'gem' },
            { x: 600, y: 150, type: 'star' },
            { x: 900, y: 100, type: 'sparkle' },
        ],
        goal: { x: 1110, y: 140 },
    },
    {
        name: "The Long Climb",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 150, height: 40 },
            { x: 180, y: 720, width: 60, height: 20, moving: true, range: 30, speed: 2 },
            { x: 300, y: 680, width: 60, height: 20, moving: true, range: 35, speed: 2.5 },
            { x: 420, y: 640, width: 60, height: 20, moving: true, range: 40, speed: 3 },
            { x: 540, y: 600, width: 60, height: 20, moving: true, range: 45, speed: 3.5 },
            { x: 660, y: 560, width: 60, height: 20, moving: true, range: 50, speed: 4 },
            { x: 780, y: 520, width: 60, height: 20, moving: true, range: 45, speed: 4.5 },
            { x: 900, y: 480, width: 60, height: 20, moving: true, range: 40, speed: 5 },
            { x: 1020, y: 440, width: 60, height: 20, moving: true, range: 35, speed: 5.5 },
            { x: 200, y: 400, width: 80, height: 20 },
            { x: 350, y: 360, width: 80, height: 20 },
            { x: 500, y: 320, width: 80, height: 20 },
            { x: 650, y: 280, width: 80, height: 20 },
            { x: 800, y: 240, width: 80, height: 20 },
            { x: 950, y: 200, width: 80, height: 20 },
            { x: 1100, y: 160, width: 80, height: 20 },
        ],
        spikes: [
            { x: 150, y: 740, width: 30 },
            { x: 250, y: 740, width: 50 },
            { x: 450, y: 740, width: 50 },
            { x: 650, y: 740, width: 50 },
            { x: 850, y: 740, width: 50 },
            { x: 1050, y: 740, width: 50 },
            { x: 180, y: 650, width: 20 },
            { x: 540, y: 530, width: 20 },
            { x: 900, y: 410, width: 20 },
        ],
        decorations: [
            { x: 400, y: 150, type: 'gem' },
            { x: 800, y: 100, type: 'star' },
        ],
        goal: { x: 1110, y: 100 },
    },
    {
        name: "The Gauntlet",
        playerStart: { x: 30, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 80, height: 40 },
            { x: 100, y: 720, width: 50, height: 18, moving: true, range: 25, speed: 3 },
            { x: 180, y: 680, width: 50, height: 18, moving: true, range: 30, speed: 3.5 },
            { x: 260, y: 640, width: 50, height: 18, moving: true, range: 35, speed: 4 },
            { x: 340, y: 600, width: 50, height: 18, moving: true, range: 40, speed: 4.5 },
            { x: 420, y: 560, width: 50, height: 18, moving: true, range: 45, speed: 5 },
            { x: 500, y: 520, width: 50, height: 18, moving: true, range: 50, speed: 5.5 },
            { x: 580, y: 480, width: 50, height: 18, moving: true, range: 45, speed: 6 },
            { x: 660, y: 440, width: 50, height: 18, moving: true, range: 40, speed: 6.5 },
            { x: 740, y: 400, width: 50, height: 18, moving: true, range: 35, speed: 7 },
            { x: 820, y: 360, width: 50, height: 18, moving: true, range: 30, speed: 7.5 },
            { x: 900, y: 320, width: 50, height: 18, moving: true, range: 25, speed: 8 },
            { x: 980, y: 280, width: 50, height: 18, moving: true, range: 20, speed: 8.5 },
            { x: 1060, y: 240, width: 50, height: 18, moving: true, range: 15, speed: 9 },
            { x: 1140, y: 200, width: 50, height: 18 },
        ],
        spikes: [
            { x: 80, y: 740, width: 20 },
            { x: 150, y: 740, width: 30 },
            { x: 230, y: 740, width: 30 },
            { x: 310, y: 740, width: 30 },
            { x: 390, y: 740, width: 30 },
            { x: 470, y: 740, width: 30 },
            { x: 550, y: 740, width: 30 },
            { x: 630, y: 740, width: 30 },
            { x: 710, y: 740, width: 30 },
            { x: 790, y: 740, width: 30 },
            { x: 870, y: 740, width: 30 },
            { x: 950, y: 740, width: 30 },
            { x: 1030, y: 740, width: 30 },
            { x: 100, y: 620, width: 15 },
            { x: 340, y: 520, width: 15 },
            { x: 580, y: 400, width: 15 },
            { x: 820, y: 280, width: 15 },
        ],
        decorations: [
            { x: 500, y: 100, type: 'gem' },
            { x: 1000, y: 80, type: 'star' },
        ],
        goal: { x: 1150, y: 140 },
    },
    {
        name: "Island Hopping",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 120, height: 40 },
            { x: 150, y: 700, width: 60, height: 20 },
            { x: 250, y: 640, width: 60, height: 20 },
            { x: 350, y: 580, width: 60, height: 20 },
            { x: 450, y: 520, width: 60, height: 20 },
            { x: 550, y: 460, width: 60, height: 20 },
            { x: 650, y: 400, width: 60, height: 20 },
            { x: 750, y: 340, width: 60, height: 20 },
            { x: 850, y: 280, width: 60, height: 20 },
            { x: 950, y: 220, width: 60, height: 20 },
            { x: 1050, y: 160, width: 60, height: 20 },
            { x: 1150, y: 120, width: 40, height: 20 },
            { x: 200, y: 500, width: 50, height: 15 },
            { x: 350, y: 420, width: 50, height: 15 },
            { x: 500, y: 340, width: 50, height: 15 },
            { x: 650, y: 260, width: 50, height: 15 },
            { x: 800, y: 180, width: 50, height: 15 },
            { x: 950, y: 120, width: 50, height: 15 },
        ],
        spikes: [
            { x: 120, y: 740, width: 30 },
            { x: 220, y: 740, width: 30 },
            { x: 320, y: 740, width: 30 },
            { x: 420, y: 740, width: 30 },
            { x: 520, y: 740, width: 30 },
            { x: 620, y: 740, width: 30 },
            { x: 720, y: 740, width: 30 },
            { x: 820, y: 740, width: 30 },
            { x: 920, y: 740, width: 30 },
            { x: 1020, y: 740, width: 30 },
            { x: 150, y: 580, width: 15 },
            { x: 500, y: 380, width: 15 },
            { x: 800, y: 220, width: 15 },
        ],
        decorations: [
            { x: 400, y: 150, type: 'gem' },
            { x: 800, y: 100, type: 'star' },
        ],
        goal: { x: 1160, y: 60 },
    },
    {
        name: "The Tower",
        playerStart: { x: 600, y: 700 },
        platforms: [
            { x: 550, y: 760, width: 100, height: 40 },
            { x: 700, y: 700, width: 50, height: 20 },
            { x: 600, y: 620, width: 50, height: 20 },
            { x: 500, y: 540, width: 50, height: 20 },
            { x: 400, y: 460, width: 50, height: 20 },
            { x: 500, y: 380, width: 50, height: 20 },
            { x: 600, y: 300, width: 50, height: 20 },
            { x: 700, y: 220, width: 50, height: 20 },
            { x: 800, y: 160, width: 50, height: 20 },
            { x: 950, y: 160, width: 50, height: 20 },
            { x: 1050, y: 200, width: 50, height: 20 },
            { x: 1100, y: 280, width: 50, height: 20 },
            { x: 1050, y: 360, width: 50, height: 20 },
            { x: 950, y: 440, width: 50, height: 20 },
            { x: 850, y: 520, width: 50, height: 20 },
            { x: 750, y: 600, width: 50, height: 20 },
            { x: 650, y: 680, width: 50, height: 20 },
            { x: 550, y: 760, width: 50, height: 20 },
        ],
        spikes: [
            { x: 650, y: 740, width: 50 },
            { x: 750, y: 740, width: 50 },
            { x: 850, y: 740, width: 50 },
            { x: 950, y: 740, width: 50 },
            { x: 600, y: 500, width: 15 },
            { x: 400, y: 360, width: 15 },
            { x: 800, y: 280, width: 15 },
        ],
        decorations: [
            { x: 600, y: 100, type: 'gem' },
            { x: 900, y: 80, type: 'star' },
        ],
        goal: { x: 1060, y: 300 },
    },
    {
        name: "Double Jump Master",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 100, height: 40 },
            { x: 150, y: 680, width: 60, height: 20 },
            { x: 300, y: 580, width: 60, height: 20 },
            { x: 450, y: 480, width: 60, height: 20 },
            { x: 600, y: 380, width: 60, height: 20 },
            { x: 750, y: 280, width: 60, height: 20 },
            { x: 900, y: 180, width: 60, height: 20 },
            { x: 1050, y: 100, width: 60, height: 20 },
            { x: 200, y: 500, width: 50, height: 15 },
            { x: 350, y: 400, width: 50, height: 15 },
            { x: 500, y: 300, width: 50, height: 15 },
            { x: 650, y: 200, width: 50, height: 15 },
            { x: 800, y: 120, width: 50, height: 15 },
            { x: 950, y: 60, width: 50, height: 15 },
            { x: 1100, y: 40, width: 80, height: 15 },
        ],
        spikes: [
            { x: 100, y: 740, width: 50 },
            { x: 250, y: 740, width: 50 },
            { x: 400, y: 740, width: 50 },
            { x: 550, y: 740, width: 50 },
            { x: 700, y: 740, width: 50 },
            { x: 850, y: 740, width: 50 },
            { x: 1000, y: 740, width: 50 },
        ],
        decorations: [
            { x: 400, y: 150, type: 'gem' },
            { x: 800, y: 80, type: 'star' },
        ],
        goal: { x: 1110, y: 0 },
    },
    {
        name: "The Snake",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 120, height: 40 },
            { x: 100, y: 700, width: 60, height: 20, moving: true, range: 50, speed: 3 },
            { x: 200, y: 620, width: 60, height: 20, moving: true, range: 60, speed: 3.5 },
            { x: 300, y: 540, width: 60, height: 20, moving: true, range: 70, speed: 4 },
            { x: 400, y: 460, width: 60, height: 20, moving: true, range: 80, speed: 4.5 },
            { x: 500, y: 380, width: 60, height: 20, moving: true, range: 90, speed: 5 },
            { x: 600, y: 300, width: 60, height: 20, moving: true, range: 80, speed: 5.5 },
            { x: 700, y: 220, width: 60, height: 20, moving: true, range: 70, speed: 6 },
            { x: 800, y: 140, width: 60, height: 20, moving: true, range: 60, speed: 6.5 },
            { x: 900, y: 80, width: 60, height: 20, moving: true, range: 50, speed: 7 },
            { x: 1000, y: 60, width: 80, height: 20 },
            { x: 1120, y: 60, width: 60, height: 20 },
        ],
        spikes: [
            { x: 120, y: 740, width: 80 },
            { x: 280, y: 740, width: 80 },
            { x: 440, y: 740, width: 80 },
            { x: 600, y: 740, width: 80 },
            { x: 760, y: 740, width: 80 },
            { x: 920, y: 740, width: 80 },
        ],
        decorations: [
            { x: 500, y: 100, type: 'gem' },
            { x: 1000, y: 50, type: 'star' },
        ],
        goal: { x: 1130, y: 0 },
    },
    {
        name: "Timing is Everything",
        playerStart: { x: 50, y: 500 },
        platforms: [
            { x: 0, y: 560, width: 100, height: 40 },
            { x: 120, y: 500, width: 40, height: 18, moving: true, range: 20, speed: 5 },
            { x: 220, y: 500, width: 40, height: 18, moving: true, range: 25, speed: 5.5 },
            { x: 320, y: 500, width: 40, height: 18, moving: true, range: 30, speed: 6 },
            { x: 420, y: 500, width: 40, height: 18, moving: true, range: 35, speed: 6.5 },
            { x: 520, y: 500, width: 40, height: 18, moving: true, range: 40, speed: 7 },
            { x: 620, y: 500, width: 40, height: 18, moving: true, range: 35, speed: 7.5 },
            { x: 720, y: 500, width: 40, height: 18, moving: true, range: 30, speed: 8 },
            { x: 820, y: 500, width: 40, height: 18, moving: true, range: 25, speed: 8.5 },
            { x: 920, y: 500, width: 40, height: 18, moving: true, range: 20, speed: 9 },
            { x: 1020, y: 500, width: 40, height: 18, moving: true, range: 15, speed: 9.5 },
            { x: 1120, y: 440, width: 60, height: 20 },
            { x: 200, y: 380, width: 50, height: 15 },
            { x: 350, y: 320, width: 50, height: 15 },
            { x: 500, y: 260, width: 50, height: 15 },
            { x: 650, y: 200, width: 50, height: 15 },
            { x: 800, y: 140, width: 50, height: 15 },
            { x: 950, y: 80, width: 50, height: 15 },
            { x: 1100, y: 40, width: 80, height: 15 },
        ],
        spikes: [
            { x: 100, y: 540, width: 100 },
            { x: 300, y: 540, width: 100 },
            { x: 500, y: 540, width: 100 },
            { x: 700, y: 540, width: 100 },
            { x: 900, y: 540, width: 100 },
            { x: 200, y: 420, width: 20 },
            { x: 500, y: 280, width: 20 },
            { x: 800, y: 160, width: 20 },
        ],
        decorations: [
            { x: 400, y: 100, type: 'gem' },
            { x: 800, y: 60, type: 'star' },
        ],
        goal: { x: 1110, y: 0 },
    },
    {
        name: "The Zigzag",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 100, height: 40 },
            { x: 100, y: 700, width: 60, height: 20 },
            { x: 200, y: 640, width: 60, height: 20 },
            { x: 350, y: 580, width: 60, height: 20 },
            { x: 500, y: 520, width: 60, height: 20 },
            { x: 650, y: 460, width: 60, height: 20 },
            { x: 800, y: 400, width: 60, height: 20 },
            { x: 950, y: 340, width: 60, height: 20 },
            { x: 1100, y: 280, width: 60, height: 20 },
            { x: 200, y: 340, width: 60, height: 20 },
            { x: 350, y: 280, width: 60, height: 20 },
            { x: 500, y: 220, width: 60, height: 20 },
            { x: 650, y: 160, width: 60, height: 20 },
            { x: 800, y: 120, width: 60, height: 20 },
            { x: 950, y: 80, width: 60, height: 20 },
            { x: 1100, y: 60, width: 80, height: 20 },
        ],
        spikes: [
            { x: 100, y: 740, width: 100 },
            { x: 300, y: 740, width: 100 },
            { x: 500, y: 740, width: 100 },
            { x: 700, y: 740, width: 100 },
            { x: 900, y: 740, width: 100 },
        ],
        decorations: [
            { x: 300, y: 100, type: 'gem' },
            { x: 700, y: 80, type: 'star' },
            { x: 1050, y: 40, type: 'moon' },
        ],
        goal: { x: 1110, y: 0 },
    },
    {
        name: "The Great Descent",
        playerStart: { x: 600, y: 50 },
        platforms: [
            { x: 550, y: 80, width: 100, height: 20 },
            { x: 700, y: 140, width: 60, height: 20 },
            { x: 600, y: 200, width: 60, height: 20 },
            { x: 500, y: 260, width: 60, height: 20 },
            { x: 400, y: 320, width: 60, height: 20 },
            { x: 300, y: 380, width: 60, height: 20 },
            { x: 200, y: 440, width: 60, height: 20 },
            { x: 100, y: 500, width: 60, height: 20 },
            { x: 200, y: 560, width: 60, height: 20 },
            { x: 300, y: 620, width: 60, height: 20 },
            { x: 400, y: 680, width: 60, height: 20 },
            { x: 500, y: 740, width: 60, height: 20 },
            { x: 650, y: 680, width: 60, height: 20 },
            { x: 750, y: 620, width: 60, height: 20 },
            { x: 850, y: 560, width: 60, height: 20 },
            { x: 950, y: 500, width: 60, height: 20 },
            { x: 1050, y: 440, width: 60, height: 20 },
            { x: 1150, y: 380, width: 40, height: 20 },
        ],
        spikes: [
            { x: 0, y: 340, width: 200 },
            { x: 300, y: 340, width: 150 },
            { x: 550, y: 340, width: 150 },
            { x: 800, y: 340, width: 150 },
            { x: 0, y: 740, width: 500 },
            { x: 600, y: 740, width: 200 },
            { x: 900, y: 740, width: 200 },
        ],
        decorations: [
            { x: 300, y: 100, type: 'gem' },
            { x: 700, y: 150, type: 'star' },
            { x: 1100, y: 200, type: 'moon' },
        ],
        goal: { x: 1160, y: 320 },
    },
    {
        name: "The Long Bridge",
        playerStart: { x: 30, y: 400 },
        platforms: [
            { x: 0, y: 440, width: 80, height: 20 },
            { x: 100, y: 440, width: 50, height: 15 },
            { x: 180, y: 440, width: 50, height: 15 },
            { x: 260, y: 440, width: 50, height: 15 },
            { x: 340, y: 440, width: 50, height: 15 },
            { x: 420, y: 440, width: 50, height: 15 },
            { x: 500, y: 440, width: 50, height: 15 },
            { x: 580, y: 440, width: 50, height: 15 },
            { x: 660, y: 440, width: 50, height: 15 },
            { x: 740, y: 440, width: 50, height: 15 },
            { x: 820, y: 440, width: 50, height: 15 },
            { x: 900, y: 440, width: 50, height: 15 },
            { x: 980, y: 440, width: 50, height: 15 },
            { x: 1060, y: 440, width: 50, height: 15 },
            { x: 1140, y: 440, width: 50, height: 15 },
            { x: 0, y: 760, width: 1200, height: 40 },
        ],
        spikes: [
            { x: 80, y: 740, width: 1120 },
        ],
        decorations: [
            { x: 300, y: 150, type: 'gem' },
            { x: 600, y: 100, type: 'star' },
            { x: 900, y: 150, type: 'moon' },
        ],
        goal: { x: 1150, y: 380 },
    },
    {
        name: "The Gauntlet II",
        playerStart: { x: 30, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 60, height: 40 },
            { x: 80, y: 700, width: 45, height: 18, moving: true, range: 25, speed: 4 },
            { x: 160, y: 640, width: 45, height: 18, moving: true, range: 30, speed: 4.5 },
            { x: 240, y: 580, width: 45, height: 18, moving: true, range: 35, speed: 5 },
            { x: 320, y: 520, width: 45, height: 18, moving: true, range: 40, speed: 5.5 },
            { x: 400, y: 460, width: 45, height: 18, moving: true, range: 45, speed: 6 },
            { x: 480, y: 400, width: 45, height: 18, moving: true, range: 50, speed: 6.5 },
            { x: 560, y: 340, width: 45, height: 18, moving: true, range: 45, speed: 7 },
            { x: 640, y: 280, width: 45, height: 18, moving: true, range: 40, speed: 7.5 },
            { x: 720, y: 220, width: 45, height: 18, moving: true, range: 35, speed: 8 },
            { x: 800, y: 160, width: 45, height: 18, moving: true, range: 30, speed: 8.5 },
            { x: 880, y: 100, width: 45, height: 18, moving: true, range: 25, speed: 9 },
            { x: 960, y: 60, width: 45, height: 18, moving: true, range: 20, speed: 9.5 },
            { x: 1040, y: 40, width: 60, height: 18 },
            { x: 1140, y: 40, width: 50, height: 18 },
        ],
        spikes: [
            { x: 60, y: 740, width: 20 },
            { x: 120, y: 740, width: 40 },
            { x: 200, y: 740, width: 40 },
            { x: 280, y: 740, width: 40 },
            { x: 360, y: 740, width: 40 },
            { x: 440, y: 740, width: 40 },
            { x: 520, y: 740, width: 40 },
            { x: 600, y: 740, width: 40 },
            { x: 680, y: 740, width: 40 },
            { x: 760, y: 740, width: 40 },
            { x: 840, y: 740, width: 40 },
            { x: 920, y: 740, width: 40 },
            { x: 1000, y: 740, width: 40 },
        ],
        decorations: [
            { x: 500, y: 80, type: 'gem' },
            { x: 1000, y: 40, type: 'star' },
        ],
        goal: { x: 1150, y: 0 },
    },
    {
        name: "Wave Runner",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 100, height: 40 },
            { x: 120, y: 700, width: 60, height: 20, moving: true, range: 40, speed: 3 },
            { x: 240, y: 620, width: 60, height: 20, moving: true, range: 50, speed: 3.5 },
            { x: 360, y: 540, width: 60, height: 20, moving: true, range: 60, speed: 4 },
            { x: 480, y: 460, width: 60, height: 20, moving: true, range: 70, speed: 4.5 },
            { x: 600, y: 380, width: 60, height: 20, moving: true, range: 60, speed: 5 },
            { x: 720, y: 300, width: 60, height: 20, moving: true, range: 50, speed: 5.5 },
            { x: 840, y: 220, width: 60, height: 20, moving: true, range: 40, speed: 6 },
            { x: 960, y: 140, width: 60, height: 20, moving: true, range: 30, speed: 6.5 },
            { x: 1080, y: 80, width: 100, height: 20 },
            { x: 200, y: 500, width: 50, height: 15 },
            { x: 350, y: 400, width: 50, height: 15 },
            { x: 500, y: 300, width: 50, height: 15 },
            { x: 650, y: 200, width: 50, height: 15 },
            { x: 800, y: 120, width: 50, height: 15 },
            { x: 950, y: 60, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 740, width: 80 },
            { x: 280, y: 740, width: 80 },
            { x: 460, y: 740, width: 80 },
            { x: 640, y: 740, width: 80 },
            { x: 820, y: 740, width: 80 },
            { x: 1000, y: 740, width: 80 },
            { x: 150, y: 520, width: 20 },
            { x: 400, y: 360, width: 20 },
            { x: 650, y: 220, width: 20 },
            { x: 900, y: 100, width: 20 },
        ],
        decorations: [
            { x: 400, y: 120, type: 'gem' },
            { x: 800, y: 80, type: 'star' },
        ],
        goal: { x: 1100, y: 20 },
    },
    {
        name: "The Spiral",
        playerStart: { x: 600, y: 700 },
        platforms: [
            { x: 550, y: 760, width: 100, height: 40 },
            { x: 700, y: 700, width: 50, height: 18 },
            { x: 650, y: 620, width: 50, height: 18 },
            { x: 550, y: 540, width: 50, height: 18 },
            { x: 450, y: 460, width: 50, height: 18 },
            { x: 350, y: 380, width: 50, height: 18 },
            { x: 250, y: 300, width: 50, height: 18 },
            { x: 150, y: 220, width: 50, height: 18 },
            { x: 100, y: 140, width: 50, height: 18 },
            { x: 150, y: 80, width: 50, height: 18 },
            { x: 250, y: 50, width: 50, height: 18 },
            { x: 350, y: 80, width: 50, height: 18 },
            { x: 450, y: 120, width: 50, height: 18 },
            { x: 550, y: 160, width: 50, height: 18 },
            { x: 650, y: 200, width: 50, height: 18 },
            { x: 750, y: 160, width: 50, height: 18 },
            { x: 850, y: 120, width: 50, height: 18 },
            { x: 950, y: 80, width: 50, height: 18 },
            { x: 1050, y: 60, width: 50, height: 18 },
            { x: 1150, y: 60, width: 40, height: 18 },
        ],
        spikes: [
            { x: 650, y: 740, width: 50 },
            { x: 450, y: 740, width: 50 },
            { x: 250, y: 740, width: 50 },
            { x: 200, y: 200, width: 50 },
            { x: 400, y: 200, width: 50 },
            { x: 600, y: 280, width: 50 },
            { x: 800, y: 280, width: 50 },
        ],
        decorations: [
            { x: 300, y: 100, type: 'gem' },
            { x: 700, y: 80, type: 'star' },
            { x: 1100, y: 40, type: 'moon' },
        ],
        goal: { x: 1160, y: 0 },
    },
    {
        name: "The Gauntlet III",
        playerStart: { x: 30, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 60, height: 40 },
            { x: 70, y: 700, width: 40, height: 16, moving: true, range: 20, speed: 5 },
            { x: 140, y: 640, width: 40, height: 16, moving: true, range: 25, speed: 5.5 },
            { x: 210, y: 580, width: 40, height: 16, moving: true, range: 30, speed: 6 },
            { x: 280, y: 520, width: 40, height: 16, moving: true, range: 35, speed: 6.5 },
            { x: 350, y: 460, width: 40, height: 16, moving: true, range: 40, speed: 7 },
            { x: 420, y: 400, width: 40, height: 16, moving: true, range: 45, speed: 7.5 },
            { x: 490, y: 340, width: 40, height: 16, moving: true, range: 50, speed: 8 },
            { x: 560, y: 280, width: 40, height: 16, moving: true, range: 45, speed: 8.5 },
            { x: 630, y: 220, width: 40, height: 16, moving: true, range: 40, speed: 9 },
            { x: 700, y: 160, width: 40, height: 16, moving: true, range: 35, speed: 9.5 },
            { x: 770, y: 100, width: 40, height: 16, moving: true, range: 30, speed: 10 },
            { x: 840, y: 60, width: 40, height: 16, moving: true, range: 25, speed: 10.5 },
            { x: 910, y: 40, width: 40, height: 16, moving: true, range: 20, speed: 11 },
            { x: 980, y: 40, width: 50, height: 16 },
            { x: 1070, y: 40, width: 50, height: 16 },
            { x: 1160, y: 40, width: 30, height: 16 },
        ],
        spikes: [
            { x: 60, y: 740, width: 20 },
            { x: 110, y: 740, width: 30 },
            { x: 180, y: 740, width: 30 },
            { x: 250, y: 740, width: 30 },
            { x: 320, y: 740, width: 30 },
            { x: 390, y: 740, width: 30 },
            { x: 460, y: 740, width: 30 },
            { x: 100, y: 580, width: 15 },
            { x: 350, y: 420, width: 15 },
            { x: 600, y: 260, width: 15 },
            { x: 850, y: 120, width: 15 },
        ],
        decorations: [
            { x: 500, y: 60, type: 'gem' },
            { x: 1000, y: 40, type: 'star' },
        ],
        goal: { x: 1170, y: 0 },
    },
    {
        name: "The Long Climb II",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 100, height: 40 },
            { x: 130, y: 720, width: 70, height: 20, moving: true, range: 30, speed: 3 },
            { x: 250, y: 680, width: 70, height: 20, moving: true, range: 35, speed: 3.5 },
            { x: 370, y: 640, width: 70, height: 20, moving: true, range: 40, speed: 4 },
            { x: 490, y: 600, width: 70, height: 20, moving: true, range: 45, speed: 4.5 },
            { x: 610, y: 560, width: 70, height: 20, moving: true, range: 50, speed: 5 },
            { x: 730, y: 520, width: 70, height: 20, moving: true, range: 45, speed: 5.5 },
            { x: 850, y: 480, width: 70, height: 20, moving: true, range: 40, speed: 6 },
            { x: 970, y: 440, width: 70, height: 20, moving: true, range: 35, speed: 6.5 },
            { x: 1090, y: 400, width: 70, height: 20, moving: true, range: 30, speed: 7 },
            { x: 200, y: 360, width: 80, height: 20 },
            { x: 350, y: 320, width: 80, height: 20 },
            { x: 500, y: 280, width: 80, height: 20 },
            { x: 650, y: 240, width: 80, height: 20 },
            { x: 800, y: 200, width: 80, height: 20 },
            { x: 950, y: 160, width: 80, height: 20 },
            { x: 1100, y: 120, width: 80, height: 20 },
        ],
        spikes: [
            { x: 100, y: 740, width: 30 },
            { x: 200, y: 740, width: 50 },
            { x: 350, y: 740, width: 50 },
            { x: 500, y: 740, width: 50 },
            { x: 650, y: 740, width: 50 },
            { x: 800, y: 740, width: 50 },
            { x: 950, y: 740, width: 50 },
            { x: 1100, y: 740, width: 80 },
        ],
        decorations: [
            { x: 400, y: 100, type: 'gem' },
            { x: 800, y: 80, type: 'star' },
        ],
        goal: { x: 1110, y: 60 },
    },
    {
        name: "Sky Islands",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 100, height: 40 },
            { x: 150, y: 700, width: 60, height: 20 },
            { x: 280, y: 640, width: 60, height: 20 },
            { x: 410, y: 580, width: 60, height: 20 },
            { x: 540, y: 520, width: 60, height: 20 },
            { x: 670, y: 460, width: 60, height: 20 },
            { x: 800, y: 400, width: 60, height: 20 },
            { x: 930, y: 340, width: 60, height: 20 },
            { x: 1060, y: 280, width: 60, height: 20 },
            { x: 200, y: 500, width: 50, height: 15 },
            { x: 350, y: 420, width: 50, height: 15 },
            { x: 500, y: 340, width: 50, height: 15 },
            { x: 650, y: 260, width: 50, height: 15 },
            { x: 800, y: 180, width: 50, height: 15 },
            { x: 950, y: 120, width: 50, height: 15 },
            { x: 1100, y: 80, width: 80, height: 15 },
        ],
        spikes: [
            { x: 100, y: 740, width: 50 },
            { x: 230, y: 740, width: 50 },
            { x: 360, y: 740, width: 50 },
            { x: 490, y: 740, width: 50 },
            { x: 620, y: 740, width: 50 },
            { x: 750, y: 740, width: 50 },
            { x: 880, y: 740, width: 50 },
            { x: 1010, y: 740, width: 50 },
        ],
        decorations: [
            { x: 400, y: 150, type: 'gem' },
            { x: 800, y: 100, type: 'star' },
        ],
        goal: { x: 1110, y: 20 },
    },
    {
        name: "The Path of Pain",
        playerStart: { x: 30, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 80, height: 40 },
            { x: 100, y: 700, width: 50, height: 18, moving: true, range: 30, speed: 4 },
            { x: 180, y: 640, width: 50, height: 18, moving: true, range: 35, speed: 4.5 },
            { x: 260, y: 580, width: 50, height: 18, moving: true, range: 40, speed: 5 },
            { x: 340, y: 520, width: 50, height: 18, moving: true, range: 45, speed: 5.5 },
            { x: 420, y: 460, width: 50, height: 18, moving: true, range: 50, speed: 6 },
            { x: 500, y: 400, width: 50, height: 18, moving: true, range: 45, speed: 6.5 },
            { x: 580, y: 340, width: 50, height: 18, moving: true, range: 40, speed: 7 },
            { x: 660, y: 280, width: 50, height: 18, moving: true, range: 35, speed: 7.5 },
            { x: 740, y: 220, width: 50, height: 18, moving: true, range: 30, speed: 8 },
            { x: 820, y: 160, width: 50, height: 18, moving: true, range: 25, speed: 8.5 },
            { x: 900, y: 100, width: 50, height: 18, moving: true, range: 20, speed: 9 },
            { x: 980, y: 60, width: 50, height: 18, moving: true, range: 15, speed: 9.5 },
            { x: 1060, y: 40, width: 60, height: 18 },
            { x: 1160, y: 40, width: 30, height: 18 },
        ],
        spikes: [
            { x: 80, y: 740, width: 20 },
            { x: 140, y: 740, width: 40 },
            { x: 220, y: 740, width: 40 },
            { x: 300, y: 740, width: 40 },
            { x: 380, y: 740, width: 40 },
            { x: 460, y: 740, width: 40 },
            { x: 540, y: 740, width: 40 },
            { x: 620, y: 740, width: 40 },
            { x: 700, y: 740, width: 40 },
            { x: 780, y: 740, width: 40 },
            { x: 860, y: 740, width: 40 },
            { x: 940, y: 740, width: 40 },
        ],
        decorations: [
            { x: 500, y: 80, type: 'gem' },
            { x: 1000, y: 40, type: 'star' },
        ],
        goal: { x: 1170, y: 0 },
    },
    {
        name: "The Endless Stairs",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 100, height: 40 },
            { x: 80, y: 720, width: 60, height: 20 },
            { x: 160, y: 680, width: 60, height: 20 },
            { x: 240, y: 640, width: 60, height: 20 },
            { x: 320, y: 600, width: 60, height: 20 },
            { x: 400, y: 560, width: 60, height: 20 },
            { x: 480, y: 520, width: 60, height: 20 },
            { x: 560, y: 480, width: 60, height: 20 },
            { x: 640, y: 440, width: 60, height: 20 },
            { x: 720, y: 400, width: 60, height: 20 },
            { x: 800, y: 360, width: 60, height: 20 },
            { x: 880, y: 320, width: 60, height: 20 },
            { x: 960, y: 280, width: 60, height: 20 },
            { x: 1040, y: 240, width: 60, height: 20 },
            { x: 1120, y: 200, width: 60, height: 20 },
            { x: 200, y: 440, width: 50, height: 15 },
            { x: 300, y: 380, width: 50, height: 15 },
            { x: 400, y: 320, width: 50, height: 15 },
            { x: 500, y: 260, width: 50, height: 15 },
            { x: 600, y: 200, width: 50, height: 15 },
            { x: 700, y: 140, width: 50, height: 15 },
            { x: 800, y: 80, width: 50, height: 15 },
            { x: 950, y: 80, width: 50, height: 15 },
            { x: 1050, y: 60, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 740, width: 60 },
            { x: 220, y: 740, width: 60 },
            { x: 340, y: 740, width: 60 },
            { x: 460, y: 740, width: 60 },
            { x: 580, y: 740, width: 60 },
            { x: 700, y: 740, width: 60 },
            { x: 820, y: 740, width: 60 },
            { x: 940, y: 740, width: 60 },
        ],
        decorations: [
            { x: 400, y: 100, type: 'gem' },
            { x: 800, y: 60, type: 'star' },
        ],
        goal: { x: 1060, y: 0 },
    },
    {
        name: "The Boss Fight",
        playerStart: { x: 50, y: 400 },
        hasBoss: true,
        bossHealth: 100,
        platforms: [
            { x: 0, y: 440, width: 120, height: 40 },
            { x: 180, y: 380, width: 60, height: 20 },
            { x: 300, y: 320, width: 60, height: 20 },
            { x: 420, y: 260, width: 60, height: 20 },
            { x: 540, y: 200, width: 60, height: 20 },
            { x: 660, y: 160, width: 60, height: 20 },
            { x: 780, y: 120, width: 60, height: 20 },
            { x: 900, y: 80, width: 60, height: 20 },
            { x: 1020, y: 60, width: 60, height: 20 },
            { x: 1140, y: 40, width: 50, height: 20 },
            { x: 0, y: 760, width: 200, height: 40 },
            { x: 300, y: 760, width: 200, height: 40 },
            { x: 600, y: 760, width: 200, height: 40 },
            { x: 900, y: 760, width: 300, height: 40 },
        ],
        spikes: [
            { x: 200, y: 740, width: 100 },
            { x: 500, y: 740, width: 100 },
            { x: 800, y: 740, width: 100 },
            { x: 150, y: 320, width: 30 },
            { x: 350, y: 260, width: 30 },
            { x: 550, y: 200, width: 30 },
            { x: 750, y: 140, width: 30 },
        ],
        decorations: [
            { x: 400, y: 100, type: 'gem' },
            { x: 800, y: 60, type: 'star' },
        ],
        goal: { x: 350, y: 250 },
    },
    {
        name: "Victory Lap",
        playerStart: { x: 30, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 100, height: 40 },
            { x: 120, y: 700, width: 60, height: 20, moving: true, range: 35, speed: 3 },
            { x: 240, y: 640, width: 60, height: 20, moving: true, range: 45, speed: 3.5 },
            { x: 360, y: 580, width: 60, height: 20, moving: true, range: 55, speed: 4 },
            { x: 480, y: 520, width: 60, height: 20, moving: true, range: 65, speed: 4.5 },
            { x: 600, y: 460, width: 60, height: 20, moving: true, range: 55, speed: 5 },
            { x: 720, y: 400, width: 60, height: 20, moving: true, range: 45, speed: 5.5 },
            { x: 840, y: 340, width: 60, height: 20, moving: true, range: 35, speed: 6 },
            { x: 960, y: 280, width: 60, height: 20, moving: true, range: 25, speed: 6.5 },
            { x: 1080, y: 220, width: 100, height: 20 },
            { x: 200, y: 400, width: 50, height: 15 },
            { x: 350, y: 320, width: 50, height: 15 },
            { x: 500, y: 240, width: 50, height: 15 },
            { x: 650, y: 160, width: 50, height: 15 },
            { x: 800, y: 100, width: 50, height: 15 },
            { x: 950, y: 60, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 740, width: 50 },
            { x: 200, y: 740, width: 50 },
            { x: 350, y: 740, width: 50 },
            { x: 500, y: 740, width: 50 },
            { x: 650, y: 740, width: 50 },
            { x: 800, y: 740, width: 50 },
            { x: 950, y: 740, width: 50 },
        ],
        decorations: [
            { x: 400, y: 120, type: 'gem' },
            { x: 800, y: 80, type: 'star' },
            { x: 1100, y: 40, type: 'moon' },
        ],
        goal: { x: 1100, y: 0 },
    },
    {
        name: "The Maze",
        playerStart: { x: 50, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 100, height: 40 },
            { x: 80, y: 700, width: 40, height: 20 },
            { x: 80, y: 600, width: 40, height: 20 },
            { x: 80, y: 500, width: 40, height: 20 },
            { x: 180, y: 500, width: 40, height: 20 },
            { x: 280, y: 500, width: 40, height: 20 },
            { x: 380, y: 420, width: 40, height: 20 },
            { x: 480, y: 420, width: 40, height: 20 },
            { x: 580, y: 340, width: 40, height: 20 },
            { x: 680, y: 340, width: 40, height: 20 },
            { x: 780, y: 260, width: 40, height: 20 },
            { x: 880, y: 260, width: 40, height: 20 },
            { x: 980, y: 180, width: 40, height: 20 },
            { x: 1080, y: 180, width: 40, height: 20 },
            { x: 1180, y: 120, width: 20, height: 20 },
        ],
        spikes: [
            { x: 80, y: 740, width: 80 },
            { x: 180, y: 580, width: 80 },
            { x: 280, y: 580, width: 80 },
            { x: 380, y: 500, width: 80 },
            { x: 480, y: 500, width: 80 },
            { x: 580, y: 420, width: 80 },
            { x: 680, y: 420, width: 80 },
            { x: 780, y: 340, width: 80 },
            { x: 880, y: 340, width: 80 },
            { x: 980, y: 260, width: 80 },
        ],
        decorations: [
            { x: 200, y: 120, type: 'gem' },
            { x: 600, y: 100, type: 'star' },
            { x: 1000, y: 80, type: 'moon' },
        ],
        goal: { x: 1190, y: 60 },
    },
    {
        name: "The Final Test",
        playerStart: { x: 30, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 60, height: 40 },
            { x: 70, y: 700, width: 45, height: 18, moving: true, range: 20, speed: 5 },
            { x: 140, y: 640, width: 45, height: 18, moving: true, range: 25, speed: 5.5 },
            { x: 210, y: 580, width: 45, height: 18, moving: true, range: 30, speed: 6 },
            { x: 280, y: 520, width: 45, height: 18, moving: true, range: 35, speed: 6.5 },
            { x: 350, y: 460, width: 45, height: 18, moving: true, range: 40, speed: 7 },
            { x: 420, y: 400, width: 45, height: 18, moving: true, range: 45, speed: 7.5 },
            { x: 490, y: 340, width: 45, height: 18, moving: true, range: 50, speed: 8 },
            { x: 560, y: 280, width: 45, height: 18, moving: true, range: 45, speed: 8.5 },
            { x: 630, y: 220, width: 45, height: 18, moving: true, range: 40, speed: 9 },
            { x: 700, y: 160, width: 45, height: 18, moving: true, range: 35, speed: 9.5 },
            { x: 770, y: 100, width: 45, height: 18, moving: true, range: 30, speed: 10 },
            { x: 840, y: 60, width: 45, height: 18, moving: true, range: 25, speed: 10.5 },
            { x: 910, y: 40, width: 45, height: 18, moving: true, range: 20, speed: 11 },
            { x: 980, y: 40, width: 50, height: 18 },
            { x: 1070, y: 40, width: 50, height: 18 },
            { x: 1160, y: 40, width: 30, height: 18 },
        ],
        spikes: [
            { x: 60, y: 740, width: 20 },
            { x: 110, y: 740, width: 30 },
            { x: 180, y: 740, width: 30 },
            { x: 250, y: 740, width: 30 },
            { x: 320, y: 740, width: 30 },
            { x: 390, y: 740, width: 30 },
            { x: 460, y: 740, width: 30 },
            { x: 530, y: 740, width: 30 },
            { x: 600, y: 740, width: 30 },
            { x: 670, y: 740, width: 30 },
            { x: 740, y: 740, width: 30 },
            { x: 810, y: 740, width: 30 },
            { x: 880, y: 740, width: 30 },
            { x: 950, y: 740, width: 30 },
        ],
        decorations: [
            { x: 500, y: 60, type: 'gem' },
            { x: 1000, y: 40, type: 'star' },
        ],
        goal: { x: 1170, y: 0 },
    },
    {
        name: "The Ultimate Challenge",
        playerStart: { x: 30, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 60, height: 40 },
            { x: 70, y: 700, width: 40, height: 16, moving: true, range: 15, speed: 6 },
            { x: 140, y: 640, width: 40, height: 16, moving: true, range: 20, speed: 6.5 },
            { x: 210, y: 580, width: 40, height: 16, moving: true, range: 25, speed: 7 },
            { x: 280, y: 520, width: 40, height: 16, moving: true, range: 30, speed: 7.5 },
            { x: 350, y: 460, width: 40, height: 16, moving: true, range: 35, speed: 8 },
            { x: 420, y: 400, width: 40, height: 16, moving: true, range: 40, speed: 8.5 },
            { x: 490, y: 340, width: 40, height: 16, moving: true, range: 45, speed: 9 },
            { x: 560, y: 280, width: 40, height: 16, moving: true, range: 50, speed: 9.5 },
            { x: 630, y: 220, width: 40, height: 16, moving: true, range: 45, speed: 10 },
            { x: 700, y: 160, width: 40, height: 16, moving: true, range: 40, speed: 10.5 },
            { x: 770, y: 100, width: 40, height: 16, moving: true, range: 35, speed: 11 },
            { x: 840, y: 60, width: 40, height: 16, moving: true, range: 30, speed: 11.5 },
            { x: 910, y: 40, width: 40, height: 16, moving: true, range: 25, speed: 12 },
            { x: 980, y: 40, width: 40, height: 16, moving: true, range: 20, speed: 12.5 },
            { x: 1050, y: 40, width: 50, height: 16 },
            { x: 1140, y: 40, width: 50, height: 16 },
        ],
        spikes: [
            { x: 60, y: 740, width: 20 },
            { x: 110, y: 740, width: 30 },
            { x: 180, y: 740, width: 30 },
            { x: 250, y: 740, width: 30 },
            { x: 320, y: 740, width: 30 },
            { x: 390, y: 740, width: 30 },
            { x: 460, y: 740, width: 30 },
            { x: 530, y: 740, width: 30 },
            { x: 600, y: 740, width: 30 },
            { x: 670, y: 740, width: 30 },
            { x: 740, y: 740, width: 30 },
            { x: 810, y: 740, width: 30 },
            { x: 880, y: 740, width: 30 },
            { x: 950, y: 740, width: 30 },
        ],
        decorations: [
            { x: 500, y: 50, type: 'gem' },
            { x: 1000, y: 30, type: 'star' },
        ],
        goal: { x: 1150, y: 0 },
    },
    {
        name: "Victory Road",
        playerStart: { x: 30, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 80, height: 40 },
            { x: 100, y: 700, width: 60, height: 20, moving: true, range: 30, speed: 3.5 },
            { x: 200, y: 640, width: 60, height: 20, moving: true, range: 40, speed: 4 },
            { x: 300, y: 580, width: 60, height: 20, moving: true, range: 50, speed: 4.5 },
            { x: 400, y: 520, width: 60, height: 20, moving: true, range: 60, speed: 5 },
            { x: 500, y: 460, width: 60, height: 20, moving: true, range: 70, speed: 5.5 },
            { x: 600, y: 400, width: 60, height: 20, moving: true, range: 60, speed: 6 },
            { x: 700, y: 340, width: 60, height: 20, moving: true, range: 50, speed: 6.5 },
            { x: 800, y: 280, width: 60, height: 20, moving: true, range: 40, speed: 7 },
            { x: 900, y: 220, width: 60, height: 20, moving: true, range: 30, speed: 7.5 },
            { x: 1000, y: 160, width: 60, height: 20, moving: true, range: 25, speed: 8 },
            { x: 1100, y: 100, width: 80, height: 20 },
            { x: 200, y: 440, width: 50, height: 15 },
            { x: 350, y: 360, width: 50, height: 15 },
            { x: 500, y: 280, width: 50, height: 15 },
            { x: 650, y: 200, width: 50, height: 15 },
            { x: 800, y: 140, width: 50, height: 15 },
            { x: 950, y: 80, width: 50, height: 15 },
        ],
        spikes: [
            { x: 80, y: 740, width: 40 },
            { x: 160, y: 740, width: 50 },
            { x: 260, y: 740, width: 50 },
            { x: 360, y: 740, width: 50 },
            { x: 460, y: 740, width: 50 },
            { x: 560, y: 740, width: 50 },
            { x: 660, y: 740, width: 50 },
            { x: 760, y: 740, width: 50 },
            { x: 860, y: 740, width: 50 },
            { x: 960, y: 740, width: 50 },
        ],
        decorations: [
            { x: 400, y: 100, type: 'gem' },
            { x: 800, y: 60, type: 'star' },
            { x: 1100, y: 40, type: 'moon' },
        ],
        goal: { x: 1120, y: 40 },
    },
    {
        name: "The End",
        playerStart: { x: 30, y: 700 },
        platforms: [
            { x: 0, y: 760, width: 100, height: 40 },
            { x: 120, y: 700, width: 70, height: 20 },
            { x: 240, y: 640, width: 70, height: 20 },
            { x: 360, y: 580, width: 70, height: 20 },
            { x: 480, y: 520, width: 70, height: 20 },
            { x: 600, y: 460, width: 70, height: 20 },
            { x: 720, y: 400, width: 70, height: 20 },
            { x: 840, y: 340, width: 70, height: 20 },
            { x: 960, y: 280, width: 70, height: 20 },
            { x: 1080, y: 220, width: 100, height: 20 },
            { x: 200, y: 420, width: 60, height: 15 },
            { x: 350, y: 340, width: 60, height: 15 },
            { x: 500, y: 260, width: 60, height: 15 },
            { x: 650, y: 180, width: 60, height: 15 },
            { x: 800, y: 120, width: 60, height: 15 },
            { x: 950, y: 60, width: 60, height: 15 },
            { x: 1100, y: 40, width: 80, height: 15 },
        ],
        spikes: [
            { x: 100, y: 740, width: 60 },
            { x: 220, y: 740, width: 60 },
            { x: 340, y: 740, width: 60 },
            { x: 460, y: 740, width: 60 },
            { x: 580, y: 740, width: 60 },
            { x: 700, y: 740, width: 60 },
            { x: 820, y: 740, width: 60 },
            { x: 940, y: 740, width: 60 },
        ],
        decorations: [
            { x: 400, y: 100, type: 'gem' },
            { x: 800, y: 60, type: 'star' },
            { x: 1100, y: 30, type: 'moon' },
        ],
        goal: { x: 1110, y: 0 },
    },
];

const HARD_LEVELS = [
    {
        name: "Hard Mode: Velocity",
        playerStart: { x: 30, y: 500 },
        platforms: [
            { x: 0, y: 560, width: 50, height: 40 },
            { x: 100, y: 500, width: 40, height: 20 },
            { x: 200, y: 440, width: 40, height: 20 },
            { x: 300, y: 380, width: 40, height: 20 },
            { x: 400, y: 320, width: 40, height: 20 },
            { x: 500, y: 260, width: 40, height: 20 },
            { x: 600, y: 200, width: 40, height: 20 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 50, y: 540, width: 50 },
            { x: 150, y: 540, width: 50 },
            { x: 250, y: 540, width: 50 },
            { x: 350, y: 540, width: 50 },
            { x: 450, y: 540, width: 50 },
            { x: 550, y: 540, width: 50 },
        ],
        saws: [
            { x: 150, y: 470, radius: 25, moveRange: 60, moveSpeed: 3 },
            { x: 350, y: 350, radius: 25, moveRange: 70, moveSpeed: 3.5 },
            { x: 550, y: 230, radius: 25, moveRange: 80, moveSpeed: 4 },
        ],
        goal: { x: 730, y: 140 },
    },
    {
        name: "Hard Mode: Precision",
        playerStart: { x: 30, y: 500 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 80, y: 500, width: 30, height: 15 },
            { x: 150, y: 440, width: 30, height: 15 },
            { x: 220, y: 380, width: 30, height: 15 },
            { x: 290, y: 320, width: 30, height: 15 },
            { x: 360, y: 260, width: 30, height: 15 },
            { x: 430, y: 200, width: 30, height: 15 },
            { x: 500, y: 140, width: 30, height: 15 },
            { x: 570, y: 80, width: 30, height: 15 },
            { x: 640, y: 140, width: 30, height: 15 },
            { x: 710, y: 200, width: 50, height: 15 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 40, y: 540, width: 40 },
            { x: 110, y: 540, width: 40 },
            { x: 180, y: 540, width: 40 },
            { x: 250, y: 540, width: 40 },
            { x: 320, y: 540, width: 40 },
            { x: 390, y: 540, width: 40 },
            { x: 460, y: 540, width: 40 },
            { x: 530, y: 540, width: 40 },
            { x: 600, y: 540, width: 40 },
        ],
        rotatingSpikes: [
            { x: 110, y: 420, radius: 20, rotationSpeed: 0.08 },
            { x: 290, y: 300, radius: 20, rotationSpeed: 0.1 },
            { x: 500, y: 180, radius: 20, rotationSpeed: 0.12 },
        ],
        goal: { x: 730, y: 140 },
    },
    {
        name: "Hard Mode: Chaos",
        playerStart: { x: 30, y: 500 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 80, y: 520, width: 35, height: 15, moving: true, range: 30, speed: 6 },
            { x: 180, y: 480, width: 35, height: 15, moving: true, range: 40, speed: 6.5 },
            { x: 280, y: 440, width: 35, height: 15, moving: true, range: 50, speed: 7 },
            { x: 380, y: 400, width: 35, height: 15, moving: true, range: 60, speed: 7.5 },
            { x: 480, y: 360, width: 35, height: 15, moving: true, range: 50, speed: 8 },
            { x: 580, y: 320, width: 35, height: 15, moving: true, range: 40, speed: 8.5 },
            { x: 680, y: 280, width: 35, height: 15, moving: true, range: 30, speed: 9 },
            { x: 750, y: 340, width: 50, height: 15 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 40, y: 540, width: 40 },
            { x: 120, y: 540, width: 60 },
            { x: 220, y: 540, width: 60 },
            { x: 320, y: 540, width: 60 },
            { x: 420, y: 540, width: 60 },
            { x: 520, y: 540, width: 60 },
            { x: 620, y: 540, width: 60 },
        ],
        rotatingSpikes: [
            { x: 180, y: 380, radius: 18, rotationSpeed: 0.1 },
            { x: 380, y: 300, radius: 18, rotationSpeed: 0.12 },
            { x: 580, y: 220, radius: 18, rotationSpeed: 0.14 },
        ],
        goal: { x: 770, y: 280 },
    },
    {
        name: "Hard Mode: The Climb",
        playerStart: { x: 400, y: 540 },
        platforms: [
            { x: 350, y: 560, width: 100, height: 40 },
            { x: 200, y: 480, width: 50, height: 15, moving: true, range: 40, speed: 5 },
            { x: 350, y: 400, width: 50, height: 15, moving: true, range: 50, speed: 5.5 },
            { x: 500, y: 320, width: 50, height: 15, moving: true, range: 60, speed: 6 },
            { x: 350, y: 240, width: 50, height: 15, moving: true, range: 70, speed: 6.5 },
            { x: 200, y: 160, width: 50, height: 15, moving: true, range: 60, speed: 7 },
            { x: 350, y: 80, width: 50, height: 15, moving: true, range: 50, speed: 7.5 },
            { x: 550, y: 120, width: 50, height: 15 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 0, y: 540, width: 350 },
            { x: 450, y: 540, width: 250 },
        ],
        saws: [
            { x: 275, y: 380, radius: 22, moveRange: 50, moveSpeed: 4 },
            { x: 425, y: 280, radius: 22, moveRange: 60, moveSpeed: 4.5 },
            { x: 275, y: 180, radius: 22, moveRange: 50, moveSpeed: 5 },
        ],
        goal: { x: 570, y: 60 },
    },
    {
        name: "Hard Mode: Gauntlet",
        playerStart: { x: 30, y: 300 },
        platforms: [
            { x: 0, y: 340, width: 50, height: 20 },
            { x: 80, y: 300, width: 30, height: 12, moving: true, range: 25, speed: 7 },
            { x: 160, y: 260, width: 30, height: 12, moving: true, range: 30, speed: 7.5 },
            { x: 240, y: 220, width: 30, height: 12, moving: true, range: 35, speed: 8 },
            { x: 320, y: 180, width: 30, height: 12, moving: true, range: 40, speed: 8.5 },
            { x: 400, y: 220, width: 30, height: 12, moving: true, range: 35, speed: 9 },
            { x: 480, y: 260, width: 30, height: 12, moving: true, range: 30, speed: 9.5 },
            { x: 560, y: 300, width: 30, height: 12, moving: true, range: 25, speed: 10 },
            { x: 640, y: 340, width: 30, height: 12, moving: true, range: 30, speed: 10.5 },
            { x: 720, y: 380, width: 60, height: 20 },
            { x: 0, y: 560, width: 800, height: 40 },
        ],
        spikes: [
            { x: 50, y: 540, width: 80 },
            { x: 170, y: 540, width: 70 },
            { x: 290, y: 540, width: 70 },
            { x: 410, y: 540, width: 70 },
            { x: 530, y: 540, width: 70 },
            { x: 650, y: 540, width: 70 },
        ],
        rotatingSpikes: [
            { x: 120, y: 180, radius: 20, rotationSpeed: 0.12 },
            { x: 320, y: 100, radius: 20, rotationSpeed: 0.14 },
            { x: 520, y: 180, radius: 20, rotationSpeed: 0.16 },
        ],
        goal: { x: 740, y: 320 },
    },
    {
        name: "Hard Mode: Impossible",
        playerStart: { x: 5, y: 540 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 70, y: 520, width: 25, height: 12, moving: true, range: 15, speed: 7 },
            { x: 130, y: 480, width: 25, height: 12, moving: true, range: 20, speed: 7.5 },
            { x: 190, y: 440, width: 25, height: 12, moving: true, range: 25, speed: 8 },
            { x: 250, y: 400, width: 25, height: 12, moving: true, range: 30, speed: 8.5 },
            { x: 310, y: 360, width: 25, height: 12, moving: true, range: 35, speed: 9 },
            { x: 370, y: 320, width: 25, height: 12, moving: true, range: 30, speed: 9.5 },
            { x: 430, y: 280, width: 25, height: 12, moving: true, range: 25, speed: 10 },
            { x: 490, y: 240, width: 25, height: 12, moving: true, range: 20, speed: 10.5 },
            { x: 550, y: 200, width: 25, height: 12, moving: true, range: 15, speed: 11 },
            { x: 610, y: 160, width: 25, height: 12, moving: true, range: 20, speed: 11.5 },
            { x: 670, y: 120, width: 40, height: 12, moving: true, range: 15, speed: 12 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 45, y: 540, width: 30 },
            { x: 100, y: 540, width: 30 },
            { x: 160, y: 540, width: 30 },
            { x: 220, y: 540, width: 30 },
            { x: 280, y: 540, width: 30 },
            { x: 340, y: 540, width: 30 },
            { x: 400, y: 540, width: 30 },
            { x: 460, y: 540, width: 30 },
            { x: 520, y: 540, width: 30 },
            { x: 580, y: 540, width: 30 },
            { x: 640, y: 540, width: 30 },
        ],
        goal: { x: 730, y: 60 },
    },
    {
        name: "Hard Mode: Thunder",
        playerStart: { x: 5, y: 540 },
        platforms: [
            { x: 0, y: 560, width: 50, height: 40 },
            { x: 80, y: 500, width: 30, height: 15, moving: true, range: 25, speed: 6 },
            { x: 160, y: 440, width: 30, height: 15, moving: true, range: 35, speed: 6.5 },
            { x: 240, y: 380, width: 30, height: 15, moving: true, range: 45, speed: 7 },
            { x: 320, y: 320, width: 30, height: 15, moving: true, range: 55, speed: 7.5 },
            { x: 400, y: 260, width: 30, height: 15, moving: true, range: 65, speed: 8 },
            { x: 480, y: 200, width: 30, height: 15, moving: true, range: 55, speed: 8.5 },
            { x: 560, y: 140, width: 30, height: 15, moving: true, range: 45, speed: 9 },
            { x: 640, y: 80, width: 40, height: 15, moving: true, range: 35, speed: 9.5 },
            { x: 720, y: 50, width: 60, height: 15 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 55, y: 540, width: 30 },
            { x: 120, y: 540, width: 40 },
            { x: 200, y: 540, width: 40 },
            { x: 280, y: 540, width: 40 },
            { x: 360, y: 540, width: 40 },
            { x: 440, y: 540, width: 40 },
            { x: 520, y: 540, width: 40 },
            { x: 600, y: 540, width: 40 },
        ],
        goal: { x: 730, y: 0 },
    },
    {
        name: "Hard Mode: Lightning",
        playerStart: { x: 400, y: 540 },
        platforms: [
            { x: 350, y: 560, width: 100, height: 40 },
            { x: 200, y: 480, width: 50, height: 15, moving: true, range: 40, speed: 8 },
            { x: 350, y: 400, width: 50, height: 15, moving: true, range: 50, speed: 8.5 },
            { x: 500, y: 320, width: 50, height: 15, moving: true, range: 60, speed: 9 },
            { x: 350, y: 240, width: 50, height: 15, moving: true, range: 70, speed: 9.5 },
            { x: 200, y: 160, width: 50, height: 15, moving: true, range: 60, speed: 10 },
            { x: 350, y: 80, width: 50, height: 15, moving: true, range: 50, speed: 10.5 },
            { x: 550, y: 120, width: 60, height: 15 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 0, y: 540, width: 350 },
            { x: 450, y: 540, width: 250 },
        ],
        saws: [
            { x: 275, y: 380, radius: 25, moveRange: 40, moveSpeed: 5 },
            { x: 425, y: 260, radius: 25, moveRange: 50, moveSpeed: 5.5 },
        ],
        goal: { x: 570, y: 60 },
    },
    {
        name: "Hard Mode: Storm",
        playerStart: { x: 30, y: 300 },
        platforms: [
            { x: 0, y: 340, width: 50, height: 20 },
            { x: 70, y: 280, width: 30, height: 12, moving: true, range: 20, speed: 9 },
            { x: 140, y: 220, width: 30, height: 12, moving: true, range: 25, speed: 9.5 },
            { x: 210, y: 160, width: 30, height: 12, moving: true, range: 30, speed: 10 },
            { x: 280, y: 100, width: 30, height: 12, moving: true, range: 35, speed: 10.5 },
            { x: 350, y: 140, width: 30, height: 12, moving: true, range: 30, speed: 11 },
            { x: 420, y: 180, width: 30, height: 12, moving: true, range: 25, speed: 11.5 },
            { x: 490, y: 220, width: 30, height: 12, moving: true, range: 20, speed: 12 },
            { x: 560, y: 260, width: 30, height: 12, moving: true, range: 25, speed: 12.5 },
            { x: 630, y: 300, width: 30, height: 12, moving: true, range: 20, speed: 13 },
            { x: 700, y: 340, width: 50, height: 12 },
            { x: 0, y: 560, width: 800, height: 40 },
        ],
        spikes: [
            { x: 50, y: 540, width: 50 },
            { x: 170, y: 540, width: 50 },
            { x: 290, y: 540, width: 50 },
            { x: 410, y: 540, width: 50 },
            { x: 530, y: 540, width: 50 },
            { x: 650, y: 540, width: 50 },
        ],
        rotatingSpikes: [
            { x: 140, y: 120, radius: 22, rotationSpeed: 0.15 },
            { x: 350, y: 60, radius: 22, rotationSpeed: 0.18 },
            { x: 560, y: 140, radius: 22, rotationSpeed: 0.2 },
        ],
        goal: { x: 720, y: 280 },
    },
    {
        name: "Hard Mode: Hurricane",
        playerStart: { x: 5, y: 540 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 60, y: 510, width: 25, height: 12, moving: true, range: 12, speed: 8 },
            { x: 110, y: 465, width: 25, height: 12, moving: true, range: 16, speed: 8.5 },
            { x: 160, y: 420, width: 25, height: 12, moving: true, range: 20, speed: 9 },
            { x: 210, y: 375, width: 25, height: 12, moving: true, range: 24, speed: 9.5 },
            { x: 260, y: 330, width: 25, height: 12, moving: true, range: 28, speed: 10 },
            { x: 310, y: 285, width: 25, height: 12, moving: true, range: 32, speed: 10.5 },
            { x: 360, y: 240, width: 25, height: 12, moving: true, range: 28, speed: 11 },
            { x: 410, y: 195, width: 25, height: 12, moving: true, range: 24, speed: 11.5 },
            { x: 460, y: 150, width: 25, height: 12, moving: true, range: 20, speed: 12 },
            { x: 510, y: 105, width: 25, height: 12, moving: true, range: 16, speed: 12.5 },
            { x: 560, y: 60, width: 25, height: 12, moving: true, range: 12, speed: 13 },
            { x: 610, y: 30, width: 30, height: 12, moving: true, range: 15, speed: 10 },
            { x: 700, y: 80, width: 50, height: 12 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 45, y: 540, width: 20 },
            { x: 80, y: 540, width: 30 },
            { x: 140, y: 540, width: 30 },
            { x: 200, y: 540, width: 30 },
            { x: 260, y: 540, width: 30 },
            { x: 320, y: 540, width: 30 },
            { x: 380, y: 540, width: 30 },
            { x: 440, y: 540, width: 30 },
            { x: 500, y: 540, width: 30 },
            { x: 560, y: 540, width: 30 },
            { x: 620, y: 540, width: 30 },
        ],
        goal: { x: 720, y: 20 },
    },
    {
        name: "Hard Mode: Tornado",
        playerStart: { x: 400, y: 540 },
        platforms: [
            { x: 350, y: 560, width: 100, height: 40 },
            { x: 150, y: 480, width: 45, height: 15, moving: true, range: 35, speed: 9 },
            { x: 300, y: 400, width: 45, height: 15, moving: true, range: 45, speed: 9.5 },
            { x: 450, y: 320, width: 45, height: 15, moving: true, range: 55, speed: 10 },
            { x: 300, y: 240, width: 45, height: 15, moving: true, range: 65, speed: 10.5 },
            { x: 150, y: 160, width: 45, height: 15, moving: true, range: 55, speed: 11 },
            { x: 300, y: 80, width: 45, height: 15, moving: true, range: 45, speed: 11.5 },
            { x: 500, y: 120, width: 50, height: 15 },
            { x: 650, y: 80, width: 50, height: 15 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 0, y: 540, width: 350 },
            { x: 450, y: 540, width: 250 },
        ],
        saws: [
            { x: 225, y: 360, radius: 28, moveRange: 35, moveSpeed: 4.5 },
            { x: 375, y: 200, radius: 28, moveRange: 45, moveSpeed: 5 },
        ],
        goal: { x: 680, y: 20 },
    },
    {
        name: "Hard Mode: Avalanche",
        playerStart: { x: 5, y: 540 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 60, y: 520, width: 25, height: 12, moving: true, range: 10, speed: 9 },
            { x: 110, y: 480, width: 25, height: 12, moving: true, range: 15, speed: 9.5 },
            { x: 160, y: 440, width: 25, height: 12, moving: true, range: 20, speed: 10 },
            { x: 210, y: 400, width: 25, height: 12, moving: true, range: 25, speed: 10.5 },
            { x: 260, y: 360, width: 25, height: 12, moving: true, range: 30, speed: 11 },
            { x: 310, y: 320, width: 25, height: 12, moving: true, range: 25, speed: 11.5 },
            { x: 360, y: 280, width: 25, height: 12, moving: true, range: 20, speed: 12 },
            { x: 410, y: 240, width: 25, height: 12, moving: true, range: 15, speed: 12.5 },
            { x: 460, y: 200, width: 25, height: 12, moving: true, range: 10, speed: 13 },
            { x: 510, y: 160, width: 25, height: 12, moving: true, range: 15, speed: 11 },
            { x: 560, y: 120, width: 25, height: 12, moving: true, range: 20, speed: 11.5 },
            { x: 610, y: 80, width: 25, height: 12, moving: true, range: 25, speed: 12 },
            { x: 660, y: 40, width: 40, height: 12, moving: true, range: 20, speed: 10 },
            { x: 730, y: 60, width: 60, height: 15 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 45, y: 540, width: 20 },
            { x: 90, y: 540, width: 20 },
            { x: 140, y: 540, width: 20 },
            { x: 190, y: 540, width: 20 },
            { x: 240, y: 540, width: 20 },
            { x: 290, y: 540, width: 20 },
            { x: 340, y: 540, width: 20 },
            { x: 390, y: 540, width: 20 },
            { x: 440, y: 540, width: 20 },
            { x: 490, y: 540, width: 20 },
            { x: 540, y: 540, width: 20 },
            { x: 590, y: 540, width: 20 },
            { x: 640, y: 540, width: 20 },
        ],
        goal: { x: 740, y: 0 },
    },
    {
        name: "Hard Mode: Inferno",
        playerStart: { x: 30, y: 540 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 60, y: 515, width: 25, height: 12, moving: true, range: 12, speed: 9 },
            { x: 110, y: 470, width: 25, height: 12, moving: true, range: 16, speed: 9.5 },
            { x: 160, y: 425, width: 25, height: 12, moving: true, range: 20, speed: 10 },
            { x: 210, y: 380, width: 25, height: 12, moving: true, range: 24, speed: 10.5 },
            { x: 260, y: 335, width: 25, height: 12, moving: true, range: 28, speed: 11 },
            { x: 310, y: 290, width: 25, height: 12, moving: true, range: 32, speed: 11.5 },
            { x: 360, y: 245, width: 25, height: 12, moving: true, range: 36, speed: 12 },
            { x: 410, y: 200, width: 25, height: 12, moving: true, range: 32, speed: 12.5 },
            { x: 460, y: 155, width: 25, height: 12, moving: true, range: 28, speed: 13 },
            { x: 510, y: 110, width: 25, height: 12, moving: true, range: 24, speed: 13.5 },
            { x: 560, y: 65, width: 25, height: 12, moving: true, range: 20, speed: 14 },
            { x: 610, y: 40, width: 30, height: 12, moving: true, range: 15, speed: 12 },
            { x: 680, y: 60, width: 50, height: 12 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 40, y: 540, width: 20 },
            { x: 85, y: 540, width: 25 },
            { x: 135, y: 540, width: 25 },
            { x: 185, y: 540, width: 25 },
            { x: 235, y: 540, width: 25 },
            { x: 285, y: 540, width: 25 },
            { x: 335, y: 540, width: 25 },
            { x: 385, y: 540, width: 25 },
            { x: 435, y: 540, width: 25 },
            { x: 485, y: 540, width: 25 },
            { x: 535, y: 540, width: 25 },
            { x: 585, y: 540, width: 25 },
            { x: 635, y: 540, width: 25 },
        ],
        goal: { x: 700, y: 0 },
    },
    {
        name: "Hard Mode: Blizzard",
        playerStart: { x: 400, y: 540 },
        platforms: [
            { x: 350, y: 560, width: 100, height: 40 },
            { x: 150, y: 480, width: 45, height: 15, moving: true, range: 40, speed: 9 },
            { x: 300, y: 400, width: 45, height: 15, moving: true, range: 50, speed: 9.5 },
            { x: 450, y: 320, width: 45, height: 15, moving: true, range: 60, speed: 10 },
            { x: 300, y: 240, width: 45, height: 15, moving: true, range: 70, speed: 10.5 },
            { x: 150, y: 160, width: 45, height: 15, moving: true, range: 60, speed: 11 },
            { x: 300, y: 80, width: 45, height: 15, moving: true, range: 50, speed: 11.5 },
            { x: 500, y: 140, width: 50, height: 15, moving: true, range: 30, speed: 9 },
            { x: 650, y: 80, width: 50, height: 15 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 0, y: 540, width: 350 },
            { x: 450, y: 540, width: 250 },
        ],
        rotatingSpikes: [
            { x: 225, y: 320, radius: 20, rotationSpeed: 0.12 },
            { x: 375, y: 180, radius: 20, rotationSpeed: 0.14 },
            { x: 575, y: 100, radius: 20, rotationSpeed: 0.16 },
        ],
        goal: { x: 680, y: 20 },
    },
    {
        name: "Hard Mode: Earthquake",
        playerStart: { x: 30, y: 540 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 60, y: 510, width: 25, height: 12, moving: true, range: 10, speed: 10 },
            { x: 110, y: 465, width: 25, height: 12, moving: true, range: 14, speed: 10.5 },
            { x: 160, y: 420, width: 25, height: 12, moving: true, range: 18, speed: 11 },
            { x: 210, y: 375, width: 25, height: 12, moving: true, range: 22, speed: 11.5 },
            { x: 260, y: 330, width: 25, height: 12, moving: true, range: 26, speed: 12 },
            { x: 310, y: 285, width: 25, height: 12, moving: true, range: 30, speed: 12.5 },
            { x: 360, y: 240, width: 25, height: 12, moving: true, range: 34, speed: 13 },
            { x: 410, y: 195, width: 25, height: 12, moving: true, range: 30, speed: 13.5 },
            { x: 460, y: 150, width: 25, height: 12, moving: true, range: 26, speed: 14 },
            { x: 510, y: 105, width: 25, height: 12, moving: true, range: 22, speed: 14.5 },
            { x: 560, y: 60, width: 25, height: 12, moving: true, range: 18, speed: 15 },
            { x: 610, y: 30, width: 30, height: 12, moving: true, range: 12, speed: 12 },
            { x: 680, y: 50, width: 50, height: 12 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 40, y: 540, width: 20 },
            { x: 85, y: 540, width: 25 },
            { x: 135, y: 540, width: 25 },
            { x: 185, y: 540, width: 25 },
            { x: 235, y: 540, width: 25 },
            { x: 285, y: 540, width: 25 },
            { x: 335, y: 540, width: 25 },
            { x: 385, y: 540, width: 25 },
            { x: 435, y: 540, width: 25 },
            { x: 485, y: 540, width: 25 },
            { x: 535, y: 540, width: 25 },
            { x: 585, y: 540, width: 25 },
            { x: 635, y: 540, width: 25 },
        ],
        goal: { x: 700, y: 0 },
    },
    {
        name: "Hard Mode: Meteor",
        playerStart: { x: 30, y: 540 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 55, y: 515, width: 25, height: 12, moving: true, range: 10, speed: 10 },
            { x: 100, y: 470, width: 25, height: 12, moving: true, range: 14, speed: 10.5 },
            { x: 145, y: 425, width: 25, height: 12, moving: true, range: 18, speed: 11 },
            { x: 190, y: 380, width: 25, height: 12, moving: true, range: 22, speed: 11.5 },
            { x: 235, y: 335, width: 25, height: 12, moving: true, range: 26, speed: 12 },
            { x: 280, y: 290, width: 25, height: 12, moving: true, range: 30, speed: 12.5 },
            { x: 325, y: 245, width: 25, height: 12, moving: true, range: 34, speed: 13 },
            { x: 370, y: 200, width: 25, height: 12, moving: true, range: 30, speed: 13.5 },
            { x: 415, y: 155, width: 25, height: 12, moving: true, range: 26, speed: 14 },
            { x: 460, y: 110, width: 25, height: 12, moving: true, range: 22, speed: 14.5 },
            { x: 505, y: 65, width: 25, height: 12, moving: true, range: 18, speed: 15 },
            { x: 550, y: 35, width: 25, height: 12, moving: true, range: 14, speed: 13 },
            { x: 595, y: 50, width: 25, height: 12, moving: true, range: 10, speed: 12 },
            { x: 640, y: 80, width: 30, height: 12, moving: true, range: 15, speed: 11 },
            { x: 700, y: 100, width: 50, height: 12 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 40, y: 540, width: 15 },
            { x: 78, y: 540, width: 22 },
            { x: 123, y: 540, width: 22 },
            { x: 168, y: 540, width: 22 },
            { x: 213, y: 540, width: 22 },
            { x: 258, y: 540, width: 22 },
            { x: 303, y: 540, width: 22 },
            { x: 348, y: 540, width: 22 },
            { x: 393, y: 540, width: 22 },
            { x: 438, y: 540, width: 22 },
            { x: 483, y: 540, width: 22 },
            { x: 528, y: 540, width: 22 },
            { x: 573, y: 540, width: 22 },
            { x: 618, y: 540, width: 22 },
        ],
        goal: { x: 720, y: 40 },
    },
    {
        name: "Hard Mode: Eclipse",
        playerStart: { x: 400, y: 540 },
        platforms: [
            { x: 350, y: 560, width: 100, height: 40 },
            { x: 150, y: 480, width: 45, height: 15, moving: true, range: 45, speed: 10 },
            { x: 300, y: 400, width: 45, height: 15, moving: true, range: 55, speed: 10.5 },
            { x: 450, y: 320, width: 45, height: 15, moving: true, range: 65, speed: 11 },
            { x: 300, y: 240, width: 45, height: 15, moving: true, range: 75, speed: 11.5 },
            { x: 150, y: 160, width: 45, height: 15, moving: true, range: 65, speed: 12 },
            { x: 300, y: 80, width: 45, height: 15, moving: true, range: 55, speed: 12.5 },
            { x: 500, y: 120, width: 45, height: 15, moving: true, range: 35, speed: 10 },
            { x: 650, y: 80, width: 50, height: 15 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 0, y: 540, width: 350 },
            { x: 450, y: 540, width: 250 },
        ],
        saws: [
            { x: 225, y: 340, radius: 25, moveRange: 40, moveSpeed: 5 },
            { x: 375, y: 200, radius: 25, moveRange: 50, moveSpeed: 5.5 },
        ],
        rotatingSpikes: [
            { x: 550, y: 80, radius: 18, rotationSpeed: 0.15 },
        ],
        goal: { x: 680, y: 20 },
    },
    {
        name: "Hard Mode: Supernova",
        playerStart: { x: 30, y: 540 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 55, y: 515, width: 25, height: 12, moving: true, range: 8, speed: 11 },
            { x: 100, y: 470, width: 25, height: 12, moving: true, range: 12, speed: 11.5 },
            { x: 145, y: 425, width: 25, height: 12, moving: true, range: 16, speed: 12 },
            { x: 190, y: 380, width: 25, height: 12, moving: true, range: 20, speed: 12.5 },
            { x: 235, y: 335, width: 25, height: 12, moving: true, range: 24, speed: 13 },
            { x: 280, y: 290, width: 25, height: 12, moving: true, range: 28, speed: 13.5 },
            { x: 325, y: 245, width: 25, height: 12, moving: true, range: 32, speed: 14 },
            { x: 370, y: 200, width: 25, height: 12, moving: true, range: 28, speed: 14.5 },
            { x: 415, y: 155, width: 25, height: 12, moving: true, range: 24, speed: 15 },
            { x: 460, y: 110, width: 25, height: 12, moving: true, range: 20, speed: 15.5 },
            { x: 505, y: 65, width: 25, height: 12, moving: true, range: 16, speed: 16 },
            { x: 550, y: 40, width: 25, height: 12, moving: true, range: 12, speed: 14 },
            { x: 595, y: 50, width: 25, height: 12, moving: true, range: 8, speed: 13 },
            { x: 640, y: 70, width: 30, height: 12, moving: true, range: 12, speed: 12 },
            { x: 695, y: 80, width: 50, height: 12 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 40, y: 540, width: 15 },
            { x: 78, y: 540, width: 22 },
            { x: 123, y: 540, width: 22 },
            { x: 168, y: 540, width: 22 },
            { x: 213, y: 540, width: 22 },
            { x: 258, y: 540, width: 22 },
            { x: 303, y: 540, width: 22 },
            { x: 348, y: 540, width: 22 },
            { x: 393, y: 540, width: 22 },
            { x: 438, y: 540, width: 22 },
            { x: 483, y: 540, width: 22 },
            { x: 528, y: 540, width: 22 },
            { x: 573, y: 540, width: 22 },
            { x: 618, y: 540, width: 22 },
        ],
        goal: { x: 720, y: 20 },
    },
    {
        name: "Hard Mode: Black Hole",
        playerStart: { x: 30, y: 540 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 50, y: 520, width: 25, height: 12, moving: true, range: 8, speed: 12 },
            { x: 90, y: 480, width: 25, height: 12, moving: true, range: 12, speed: 12.5 },
            { x: 130, y: 440, width: 25, height: 12, moving: true, range: 16, speed: 13 },
            { x: 170, y: 400, width: 25, height: 12, moving: true, range: 20, speed: 13.5 },
            { x: 210, y: 360, width: 25, height: 12, moving: true, range: 24, speed: 14 },
            { x: 250, y: 320, width: 25, height: 12, moving: true, range: 28, speed: 14.5 },
            { x: 290, y: 280, width: 25, height: 12, moving: true, range: 32, speed: 15 },
            { x: 330, y: 240, width: 25, height: 12, moving: true, range: 28, speed: 15.5 },
            { x: 370, y: 200, width: 25, height: 12, moving: true, range: 24, speed: 16 },
            { x: 410, y: 160, width: 25, height: 12, moving: true, range: 20, speed: 16.5 },
            { x: 450, y: 120, width: 25, height: 12, moving: true, range: 16, speed: 17 },
            { x: 490, y: 80, width: 25, height: 12, moving: true, range: 12, speed: 17.5 },
            { x: 530, y: 50, width: 25, height: 12, moving: true, range: 8, speed: 16 },
            { x: 570, y: 40, width: 30, height: 12, moving: true, range: 12, speed: 15 },
            { x: 620, y: 50, width: 35, height: 12, moving: true, range: 15, speed: 14 },
            { x: 680, y: 70, width: 50, height: 12 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 40, y: 540, width: 10 },
            { x: 68, y: 540, width: 22 },
            { x: 108, y: 540, width: 22 },
            { x: 148, y: 540, width: 22 },
            { x: 188, y: 540, width: 22 },
            { x: 228, y: 540, width: 22 },
            { x: 268, y: 540, width: 22 },
            { x: 308, y: 540, width: 22 },
            { x: 348, y: 540, width: 22 },
            { x: 388, y: 540, width: 22 },
            { x: 428, y: 540, width: 22 },
            { x: 468, y: 540, width: 22 },
            { x: 508, y: 540, width: 22 },
            { x: 548, y: 540, width: 22 },
            { x: 588, y: 540, width: 22 },
            { x: 628, y: 540, width: 22 },
        ],
        goal: { x: 700, y: 10 },
    },
    {
        name: "Hard Mode: Final Stand",
        playerStart: { x: 30, y: 540 },
        platforms: [
            { x: 0, y: 560, width: 40, height: 40 },
            { x: 50, y: 520, width: 25, height: 12, moving: true, range: 8, speed: 13 },
            { x: 90, y: 480, width: 25, height: 12, moving: true, range: 12, speed: 13.5 },
            { x: 130, y: 440, width: 25, height: 12, moving: true, range: 16, speed: 14 },
            { x: 170, y: 400, width: 25, height: 12, moving: true, range: 20, speed: 14.5 },
            { x: 210, y: 360, width: 25, height: 12, moving: true, range: 24, speed: 15 },
            { x: 250, y: 320, width: 25, height: 12, moving: true, range: 28, speed: 15.5 },
            { x: 290, y: 280, width: 25, height: 12, moving: true, range: 32, speed: 16 },
            { x: 330, y: 240, width: 25, height: 12, moving: true, range: 28, speed: 16.5 },
            { x: 370, y: 200, width: 25, height: 12, moving: true, range: 24, speed: 17 },
            { x: 410, y: 160, width: 25, height: 12, moving: true, range: 20, speed: 17.5 },
            { x: 450, y: 120, width: 25, height: 12, moving: true, range: 16, speed: 18 },
            { x: 490, y: 80, width: 25, height: 12, moving: true, range: 12, speed: 18.5 },
            { x: 530, y: 50, width: 25, height: 12, moving: true, range: 8, speed: 17 },
            { x: 570, y: 40, width: 30, height: 12, moving: true, range: 10, speed: 16 },
            { x: 620, y: 45, width: 35, height: 12, moving: true, range: 12, speed: 15 },
            { x: 680, y: 60, width: 50, height: 12 },
            { x: 700, y: 560, width: 100, height: 40 },
        ],
        spikes: [
            { x: 40, y: 540, width: 10 },
            { x: 68, y: 540, width: 22 },
            { x: 108, y: 540, width: 22 },
            { x: 148, y: 540, width: 22 },
            { x: 188, y: 540, width: 22 },
            { x: 228, y: 540, width: 22 },
            { x: 268, y: 540, width: 22 },
            { x: 308, y: 540, width: 22 },
            { x: 348, y: 540, width: 22 },
            { x: 388, y: 540, width: 22 },
            { x: 428, y: 540, width: 22 },
            { x: 468, y: 540, width: 22 },
            { x: 508, y: 540, width: 22 },
            { x: 548, y: 540, width: 22 },
            { x: 588, y: 540, width: 22 },
            { x: 628, y: 540, width: 22 },
        ],
        goal: { x: 700, y: 0 },
    },
];

const INSANE_LEVELS = [
    {
        name: "INSANE: The Beginning",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 200, height: 40 },
            { x: 250, y: 900, width: 80, height: 20 },
            { x: 400, y: 840, width: 70, height: 18 },
            { x: 550, y: 780, width: 70, height: 18 },
            { x: 700, y: 720, width: 70, height: 18, moving: true, range: 30, speed: 4 },
            { x: 850, y: 660, width: 60, height: 16, moving: true, range: 40, speed: 4.5 },
            { x: 1000, y: 600, width: 60, height: 16, moving: true, range: 50, speed: 5 },
            { x: 1150, y: 540, width: 60, height: 16, moving: true, range: 45, speed: 5.5 },
            { x: 1300, y: 480, width: 60, height: 16, moving: true, range: 40, speed: 6 },
            { x: 1450, y: 420, width: 60, height: 16, moving: true, range: 35, speed: 6.5 },
            { x: 200, y: 380, width: 80, height: 15 },
            { x: 380, y: 320, width: 70, height: 15 },
            { x: 550, y: 260, width: 70, height: 15, moving: true, range: 30, speed: 7 },
            { x: 730, y: 200, width: 60, height: 15, moving: true, range: 40, speed: 7.5 },
            { x: 900, y: 150, width: 60, height: 15, moving: true, range: 35, speed: 8 },
            { x: 1080, y: 100, width: 60, height: 15, moving: true, range: 30, speed: 8.5 },
            { x: 1250, y: 80, width: 60, height: 15, moving: true, range: 25, speed: 9 },
            { x: 1420, y: 60, width: 80, height: 15 },
        ],
        spikes: [
            { x: 200, y: 940, width: 50 },
            { x: 400, y: 940, width: 80 },
            { x: 600, y: 940, width: 80 },
            { x: 800, y: 940, width: 80 },
            { x: 1000, y: 940, width: 80 },
            { x: 1200, y: 940, width: 80 },
            { x: 1400, y: 940, width: 80 },
            { x: 250, y: 820, width: 20 },
            { x: 700, y: 640, width: 20 },
            { x: 1150, y: 460, width: 20 },
            { x: 550, y: 180, width: 15 },
            { x: 900, y: 70, width: 15 },
            { x: 1250, y: 0, width: 15 },
        ],
        decorations: [
            { x: 400, y: 150, type: 'gem' },
            { x: 800, y: 100, type: 'star' },
            { x: 1200, y: 50, type: 'moon' },
        ],
        saws: [
            { x: 500, y: 750, radius: 25, range: 50, speed: 3 },
            { x: 1100, y: 450, radius: 30, range: 40, speed: 4 },
        ],
        glowingPlatforms: [
            { x: 1600, y: 300, width: 80, height: 15, color: '#00ffff', moving: true, range: 30, speed: 5 },
        ],
        rotatingSpikes: [
            { x: 700, y: 600, radius: 20, rotationSpeed: 0.08 },
            { x: 1200, y: 350, radius: 25, rotationSpeed: 0.1 },
        ],
        orbs: [
            { x: 550, y: 700, type: 'doubleJump' },
            { x: 1000, y: 500, type: 'dash' },
        ],
        goal: { x: 1430, y: 0 },
    },
    {
        name: "INSANE: Gauntlet Run",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 80, height: 40 },
            { x: 100, y: 900, width: 50, height: 18, moving: true, range: 25, speed: 6 },
            { x: 180, y: 840, width: 45, height: 16, moving: true, range: 30, speed: 6.5 },
            { x: 260, y: 780, width: 45, height: 16, moving: true, range: 35, speed: 7 },
            { x: 340, y: 720, width: 45, height: 16, moving: true, range: 40, speed: 7.5 },
            { x: 420, y: 660, width: 45, height: 16, moving: true, range: 45, speed: 8 },
            { x: 500, y: 600, width: 45, height: 16, moving: true, range: 50, speed: 8.5 },
            { x: 580, y: 540, width: 45, height: 16, moving: true, range: 45, speed: 9 },
            { x: 660, y: 480, width: 45, height: 16, moving: true, range: 40, speed: 9.5 },
            { x: 740, y: 420, width: 45, height: 16, moving: true, range: 35, speed: 10 },
            { x: 820, y: 360, width: 45, height: 16, moving: true, range: 30, speed: 10.5 },
            { x: 900, y: 300, width: 45, height: 16, moving: true, range: 25, speed: 11 },
            { x: 980, y: 240, width: 45, height: 16, moving: true, range: 20, speed: 11.5 },
            { x: 1060, y: 180, width: 45, height: 16, moving: true, range: 15, speed: 12 },
            { x: 1140, y: 120, width: 60, height: 16 },
            { x: 1250, y: 80, width: 60, height: 16 },
            { x: 1350, y: 60, width: 80, height: 16 },
        ],
        spikes: [
            { x: 80, y: 940, width: 20 },
            { x: 150, y: 940, width: 30 },
            { x: 230, y: 940, width: 30 },
            { x: 310, y: 940, width: 30 },
            { x: 390, y: 940, width: 30 },
            { x: 470, y: 940, width: 30 },
            { x: 550, y: 940, width: 30 },
            { x: 630, y: 940, width: 30 },
            { x: 710, y: 940, width: 30 },
            { x: 790, y: 940, width: 30 },
            { x: 870, y: 940, width: 30 },
            { x: 950, y: 940, width: 30 },
            { x: 1030, y: 940, width: 30 },
            { x: 1110, y: 940, width: 30 },
            { x: 100, y: 780, width: 15 },
            { x: 340, y: 640, width: 15 },
            { x: 580, y: 480, width: 15 },
            { x: 820, y: 300, width: 15 },
        ],
        decorations: [
            { x: 600, y: 100, type: 'gem' },
            { x: 1200, y: 50, type: 'star' },
        ],
        goal: { x: 1370, y: 0 },
    },
    {
        name: "INSANE: The Climb",
        playerStart: { x: 800, y: 900 },
        platforms: [
            { x: 750, y: 960, width: 100, height: 40 },
            { x: 900, y: 880, width: 60, height: 18, moving: true, range: 40, speed: 5 },
            { x: 800, y: 780, width: 55, height: 16, moving: true, range: 50, speed: 5.5 },
            { x: 700, y: 680, width: 55, height: 16, moving: true, range: 60, speed: 6 },
            { x: 600, y: 580, width: 55, height: 16, moving: true, range: 70, speed: 6.5 },
            { x: 500, y: 480, width: 55, height: 16, moving: true, range: 60, speed: 7 },
            { x: 400, y: 380, width: 55, height: 16, moving: true, range: 50, speed: 7.5 },
            { x: 300, y: 280, width: 55, height: 16, moving: true, range: 40, speed: 8 },
            { x: 200, y: 200, width: 55, height: 16, moving: true, range: 30, speed: 8.5 },
            { x: 150, y: 140, width: 50, height: 15 },
            { x: 300, y: 100, width: 50, height: 15, moving: true, range: 25, speed: 9 },
            { x: 450, y: 80, width: 50, height: 15, moving: true, range: 30, speed: 9.5 },
            { x: 600, y: 60, width: 50, height: 15, moving: true, range: 25, speed: 10 },
            { x: 750, y: 60, width: 50, height: 15, moving: true, range: 20, speed: 10.5 },
            { x: 900, y: 80, width: 50, height: 15, moving: true, range: 25, speed: 11 },
            { x: 1050, y: 100, width: 50, height: 15, moving: true, range: 30, speed: 11.5 },
            { x: 1200, y: 120, width: 50, height: 15, moving: true, range: 25, speed: 12 },
            { x: 1350, y: 140, width: 60, height: 15, moving: true, range: 20, speed: 12.5 },
            { x: 1500, y: 160, width: 80, height: 15 },
        ],
        spikes: [
            { x: 850, y: 940, width: 50 },
            { x: 950, y: 940, width: 50 },
            { x: 700, y: 800, width: 20 },
            { x: 500, y: 600, width: 20 },
            { x: 300, y: 400, width: 20 },
            { x: 200, y: 250, width: 20 },
            { x: 450, y: 30, width: 15 },
            { x: 750, y: 10, width: 15 },
            { x: 1050, y: 50, width: 15 },
            { x: 1350, y: 80, width: 15 },
        ],
        decorations: [
            { x: 400, y: 100, type: 'gem' },
            { x: 800, y: 50, type: 'star' },
            { x: 1200, y: 80, type: 'moon' },
        ],
        goal: { x: 1520, y: 100 },
    },
    {
        name: "INSANE: Snake Path",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 100, height: 40 },
            { x: 100, y: 900, width: 60, height: 20, moving: true, range: 50, speed: 5 },
            { x: 200, y: 820, width: 60, height: 20, moving: true, range: 60, speed: 5.5 },
            { x: 300, y: 740, width: 60, height: 20, moving: true, range: 70, speed: 6 },
            { x: 400, y: 660, width: 60, height: 20, moving: true, range: 80, speed: 6.5 },
            { x: 500, y: 580, width: 60, height: 20, moving: true, range: 90, speed: 7 },
            { x: 600, y: 500, width: 60, height: 20, moving: true, range: 100, speed: 7.5 },
            { x: 700, y: 420, width: 60, height: 20, moving: true, range: 90, speed: 8 },
            { x: 800, y: 340, width: 60, height: 20, moving: true, range: 80, speed: 8.5 },
            { x: 900, y: 260, width: 60, height: 20, moving: true, range: 70, speed: 9 },
            { x: 1000, y: 180, width: 60, height: 20, moving: true, range: 60, speed: 9.5 },
            { x: 1100, y: 120, width: 60, height: 20, moving: true, range: 50, speed: 10 },
            { x: 1200, y: 80, width: 60, height: 20, moving: true, range: 40, speed: 10.5 },
            { x: 1300, y: 60, width: 60, height: 20, moving: true, range: 30, speed: 11 },
            { x: 1400, y: 60, width: 60, height: 20, moving: true, range: 25, speed: 11.5 },
            { x: 1500, y: 80, width: 80, height: 20 },
        ],
        spikes: [
            { x: 100, y: 940, width: 80 },
            { x: 300, y: 940, width: 80 },
            { x: 500, y: 940, width: 80 },
            { x: 700, y: 940, width: 80 },
            { x: 900, y: 940, width: 80 },
            { x: 1100, y: 940, width: 80 },
            { x: 1300, y: 940, width: 80 },
            { x: 150, y: 780, width: 25 },
            { x: 400, y: 620, width: 25 },
            { x: 700, y: 400, width: 25 },
            { x: 1000, y: 180, width: 25 },
            { x: 1300, y: 20, width: 25 },
        ],
        decorations: [
            { x: 500, y: 150, type: 'gem' },
            { x: 1000, y: 100, type: 'star' },
            { x: 1400, y: 50, type: 'moon' },
        ],
        goal: { x: 1520, y: 20 },
    },
    {
        name: "INSANE: Wave Rider",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 100, height: 40 },
            { x: 120, y: 900, width: 60, height: 20, moving: true, range: 40, speed: 4 },
            { x: 240, y: 820, width: 55, height: 18, moving: true, range: 50, speed: 4.5 },
            { x: 360, y: 740, width: 55, height: 18, moving: true, range: 60, speed: 5 },
            { x: 480, y: 660, width: 55, height: 18, moving: true, range: 70, speed: 5.5 },
            { x: 600, y: 580, width: 50, height: 16, moving: true, range: 60, speed: 6 },
            { x: 720, y: 500, width: 50, height: 16, moving: true, range: 70, speed: 6.5 },
            { x: 840, y: 420, width: 50, height: 16, moving: true, range: 80, speed: 7 },
            { x: 960, y: 340, width: 50, height: 16, moving: true, range: 70, speed: 7.5 },
            { x: 1080, y: 260, width: 50, height: 16, moving: true, range: 60, speed: 8 },
            { x: 1200, y: 180, width: 50, height: 16, moving: true, range: 50, speed: 8.5 },
            { x: 1320, y: 120, width: 50, height: 16, moving: true, range: 40, speed: 9 },
            { x: 1440, y: 80, width: 50, height: 16, moving: true, range: 30, speed: 9.5 },
            { x: 1560, y: 60, width: 40, height: 16 },
        ],
        spikes: [
            { x: 100, y: 940, width: 50 },
            { x: 200, y: 940, width: 60 },
            { x: 350, y: 940, width: 60 },
            { x: 500, y: 940, width: 60 },
            { x: 650, y: 940, width: 60 },
            { x: 800, y: 940, width: 60 },
            { x: 950, y: 940, width: 60 },
            { x: 1100, y: 940, width: 60 },
            { x: 1250, y: 940, width: 60 },
            { x: 1400, y: 940, width: 60 },
            { x: 120, y: 780, width: 20 },
            { x: 360, y: 620, width: 20 },
            { x: 600, y: 460, width: 20 },
            { x: 840, y: 300, width: 20 },
            { x: 1080, y: 140, width: 20 },
        ],
        decorations: [
            { x: 400, y: 150, type: 'gem' },
            { x: 800, y: 100, type: 'star' },
            { x: 1300, y: 60, type: 'moon' },
        ],
        goal: { x: 1570, y: 0 },
    },
    {
        name: "INSANE: Spiral Tower",
        playerStart: { x: 800, y: 950 },
        platforms: [
            { x: 750, y: 980, width: 100, height: 20 },
            { x: 700, y: 900, width: 50, height: 15, moving: true, range: 30, speed: 5 },
            { x: 800, y: 820, width: 50, height: 15, moving: true, range: 40, speed: 5.5 },
            { x: 900, y: 740, width: 50, height: 15, moving: true, range: 50, speed: 6 },
            { x: 1000, y: 660, width: 45, height: 15, moving: true, range: 45, speed: 6.5 },
            { x: 1100, y: 580, width: 45, height: 15, moving: true, range: 50, speed: 7 },
            { x: 1200, y: 500, width: 45, height: 15, moving: true, range: 55, speed: 7.5 },
            { x: 1300, y: 420, width: 40, height: 15, moving: true, range: 50, speed: 8 },
            { x: 1400, y: 340, width: 40, height: 15, moving: true, range: 45, speed: 8.5 },
            { x: 1500, y: 260, width: 40, height: 15, moving: true, range: 40, speed: 9 },
            { x: 1400, y: 180, width: 40, height: 15, moving: true, range: 35, speed: 9.5 },
            { x: 1300, y: 120, width: 40, height: 15, moving: true, range: 30, speed: 10 },
            { x: 1200, y: 80, width: 40, height: 15, moving: true, range: 25, speed: 10.5 },
            { x: 1100, y: 60, width: 40, height: 15, moving: true, range: 20, speed: 11 },
            { x: 1000, y: 60, width: 40, height: 15, moving: true, range: 20, speed: 11.5 },
            { x: 900, y: 80, width: 40, height: 15, moving: true, range: 25, speed: 12 },
            { x: 800, y: 120, width: 40, height: 15, moving: true, range: 30, speed: 12.5 },
            { x: 700, y: 180, width: 40, height: 15, moving: true, range: 35, speed: 13 },
            { x: 600, y: 260, width: 40, height: 15, moving: true, range: 40, speed: 13.5 },
            { x: 500, y: 340, width: 40, height: 15, moving: true, range: 45, speed: 14 },
            { x: 400, y: 420, width: 40, height: 15, moving: true, range: 50, speed: 14.5 },
            { x: 300, y: 500, width: 40, height: 15, moving: true, range: 45, speed: 15 },
            { x: 200, y: 580, width: 40, height: 15, moving: true, range: 40, speed: 15.5 },
            { x: 150, y: 680, width: 50, height: 15 },
            { x: 100, y: 780, width: 50, height: 15 },
            { x: 50, y: 880, width: 60, height: 15 },
        ],
        spikes: [
            { x: 850, y: 960, width: 40 }, { x: 750, y: 960, width: 40 },
            { x: 650, y: 960, width: 40 }, { x: 550, y: 960, width: 40 },
            { x: 450, y: 960, width: 40 }, { x: 350, y: 960, width: 40 },
            { x: 800, y: 700, width: 20 }, { x: 1000, y: 500, width: 20 },
            { x: 1300, y: 300, width: 20 }, { x: 900, y: 150, width: 20 },
            { x: 500, y: 350, width: 20 }, { x: 200, y: 550, width: 20 },
        ],
        decorations: [
            { x: 800, y: 500, type: 'gem' }, { x: 1200, y: 200, type: 'star' },
        ],
        goal: { x: 80, y: 820 },
    },
    {
        name: "INSANE: Floating Islands",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 100, height: 40 },
            { x: 150, y: 880, width: 60, height: 18, moving: true, range: 30, speed: 4 },
            { x: 300, y: 800, width: 55, height: 16, moving: true, range: 35, speed: 4.5 },
            { x: 450, y: 720, width: 50, height: 16, moving: true, range: 40, speed: 5 },
            { x: 600, y: 640, width: 50, height: 16, moving: true, range: 45, speed: 5.5 },
            { x: 750, y: 560, width: 45, height: 15, moving: true, range: 50, speed: 6 },
            { x: 900, y: 480, width: 45, height: 15, moving: true, range: 55, speed: 6.5 },
            { x: 1050, y: 400, width: 45, height: 15, moving: true, range: 50, speed: 7 },
            { x: 1200, y: 320, width: 40, height: 15, moving: true, range: 45, speed: 7.5 },
            { x: 1350, y: 240, width: 40, height: 15, moving: true, range: 40, speed: 8 },
            { x: 1500, y: 160, width: 40, height: 15, moving: true, range: 35, speed: 8.5 },
            { x: 1400, y: 80, width: 40, height: 15, moving: true, range: 30, speed: 9 },
            { x: 1250, y: 60, width: 40, height: 15, moving: true, range: 25, speed: 9.5 },
            { x: 1100, y: 60, width: 40, height: 15, moving: true, range: 25, speed: 10 },
            { x: 950, y: 80, width: 40, height: 15, moving: true, range: 30, speed: 10.5 },
            { x: 800, y: 120, width: 40, height: 15, moving: true, range: 35, speed: 11 },
            { x: 650, y: 180, width: 40, height: 15, moving: true, range: 40, speed: 11.5 },
            { x: 500, y: 260, width: 40, height: 15, moving: true, range: 45, speed: 12 },
            { x: 350, y: 360, width: 40, height: 15, moving: true, range: 50, speed: 12.5 },
            { x: 200, y: 480, width: 40, height: 15, moving: true, range: 55, speed: 13 },
            { x: 100, y: 600, width: 50, height: 15 },
            { x: 50, y: 720, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 940, width: 60 }, { x: 250, y: 940, width: 60 },
            { x: 400, y: 940, width: 60 }, { x: 550, y: 940, width: 60 },
            { x: 700, y: 940, width: 60 }, { x: 850, y: 940, width: 60 },
            { x: 1000, y: 940, width: 60 }, { x: 1150, y: 940, width: 60 },
            { x: 300, y: 700, width: 20 }, { x: 600, y: 500, width: 20 },
            { x: 900, y: 300, width: 20 }, { x: 1200, y: 150, width: 20 },
        ],
        decorations: [
            { x: 500, y: 200, type: 'gem' }, { x: 1000, y: 100, type: 'star' },
        ],
        goal: { x: 80, y: 660 },
    },
    {
        name: "INSANE: Thunder Road",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 80, height: 40 },
            { x: 100, y: 900, width: 50, height: 18, moving: true, range: 25, speed: 6 },
            { x: 180, y: 840, width: 45, height: 16, moving: true, range: 30, speed: 6.5 },
            { x: 260, y: 780, width: 45, height: 16, moving: true, range: 35, speed: 7 },
            { x: 340, y: 720, width: 45, height: 16, moving: true, range: 40, speed: 7.5 },
            { x: 420, y: 660, width: 45, height: 16, moving: true, range: 45, speed: 8 },
            { x: 500, y: 600, width: 45, height: 16, moving: true, range: 50, speed: 8.5 },
            { x: 580, y: 540, width: 45, height: 16, moving: true, range: 45, speed: 9 },
            { x: 660, y: 480, width: 45, height: 16, moving: true, range: 40, speed: 9.5 },
            { x: 740, y: 420, width: 45, height: 16, moving: true, range: 35, speed: 10 },
            { x: 820, y: 360, width: 45, height: 16, moving: true, range: 30, speed: 10.5 },
            { x: 900, y: 300, width: 45, height: 16, moving: true, range: 25, speed: 11 },
            { x: 980, y: 240, width: 45, height: 16, moving: true, range: 20, speed: 11.5 },
            { x: 1060, y: 180, width: 45, height: 16, moving: true, range: 15, speed: 12 },
            { x: 1140, y: 120, width: 45, height: 16, moving: true, range: 15, speed: 12.5 },
            { x: 1220, y: 80, width: 45, height: 16, moving: true, range: 20, speed: 13 },
            { x: 1300, y: 60, width: 45, height: 16, moving: true, range: 25, speed: 13.5 },
            { x: 1380, y: 60, width: 45, height: 16, moving: true, range: 30, speed: 14 },
            { x: 1460, y: 80, width: 45, height: 16, moving: true, range: 25, speed: 14.5 },
            { x: 1540, y: 120, width: 60, height: 16 },
        ],
        spikes: [
            { x: 80, y: 940, width: 30 }, { x: 150, y: 940, width: 30 },
            { x: 230, y: 940, width: 30 }, { x: 310, y: 940, width: 30 },
            { x: 390, y: 940, width: 30 }, { x: 470, y: 940, width: 30 },
            { x: 550, y: 940, width: 30 }, { x: 630, y: 940, width: 30 },
            { x: 710, y: 940, width: 30 }, { x: 790, y: 940, width: 30 },
            { x: 100, y: 780, width: 15 }, { x: 340, y: 640, width: 15 },
            { x: 580, y: 480, width: 15 }, { x: 820, y: 300, width: 15 },
        ],
        decorations: [
            { x: 500, y: 150, type: 'gem' }, { x: 1000, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 60 },
    },
    {
        name: "INSANE: Zigzag Chaos",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 80, height: 40 },
            { x: 80, y: 900, width: 50, height: 18, moving: true, range: 30, speed: 5 },
            { x: 150, y: 820, width: 45, height: 16, moving: true, range: 40, speed: 5.5 },
            { x: 220, y: 740, width: 45, height: 16, moving: true, range: 50, speed: 6 },
            { x: 290, y: 660, width: 45, height: 16, moving: true, range: 60, speed: 6.5 },
            { x: 360, y: 580, width: 45, height: 16, moving: true, range: 70, speed: 7 },
            { x: 430, y: 500, width: 45, height: 16, moving: true, range: 60, speed: 7.5 },
            { x: 500, y: 420, width: 45, height: 16, moving: true, range: 50, speed: 8 },
            { x: 570, y: 340, width: 45, height: 16, moving: true, range: 40, speed: 8.5 },
            { x: 640, y: 260, width: 45, height: 16, moving: true, range: 30, speed: 9 },
            { x: 710, y: 180, width: 45, height: 16, moving: true, range: 20, speed: 9.5 },
            { x: 780, y: 120, width: 45, height: 16, moving: true, range: 15, speed: 10 },
            { x: 900, y: 100, width: 45, height: 16, moving: true, range: 20, speed: 10.5 },
            { x: 1020, y: 100, width: 45, height: 16, moving: true, range: 25, speed: 11 },
            { x: 1140, y: 120, width: 45, height: 16, moving: true, range: 30, speed: 11.5 },
            { x: 1260, y: 160, width: 45, height: 16, moving: true, range: 35, speed: 12 },
            { x: 1380, y: 220, width: 45, height: 16, moving: true, range: 40, speed: 12.5 },
            { x: 1500, y: 300, width: 45, height: 16, moving: true, range: 45, speed: 13 },
            { x: 1400, y: 400, width: 45, height: 16, moving: true, range: 50, speed: 13.5 },
            { x: 1300, y: 500, width: 45, height: 16, moving: true, range: 55, speed: 14 },
            { x: 1200, y: 600, width: 45, height: 16, moving: true, range: 50, speed: 14.5 },
            { x: 1100, y: 700, width: 45, height: 16, moving: true, range: 45, speed: 15 },
            { x: 1000, y: 780, width: 50, height: 16 },
            { x: 900, y: 860, width: 50, height: 16 },
        ],
        spikes: [
            { x: 80, y: 940, width: 30 }, { x: 200, y: 940, width: 40 },
            { x: 320, y: 940, width: 40 }, { x: 440, y: 940, width: 40 },
            { x: 560, y: 940, width: 40 }, { x: 680, y: 940, width: 40 },
            { x: 800, y: 940, width: 40 }, { x: 920, y: 940, width: 40 },
            { x: 150, y: 700, width: 20 }, { x: 430, y: 420, width: 20 },
            { x: 710, y: 180, width: 20 }, { x: 1140, y: 80, width: 20 },
        ],
        decorations: [
            { x: 400, y: 200, type: 'gem' }, { x: 900, y: 100, type: 'star' },
        ],
        goal: { x: 930, y: 800 },
    },
    {
        name: "INSANE: Stairway",
        playerStart: { x: 30, y: 950 },
        platforms: [
            { x: 0, y: 980, width: 80, height: 20 },
            { x: 80, y: 920, width: 60, height: 18, moving: true, range: 20, speed: 4 },
            { x: 160, y: 860, width: 55, height: 16, moving: true, range: 25, speed: 4.5 },
            { x: 240, y: 800, width: 50, height: 16, moving: true, range: 30, speed: 5 },
            { x: 320, y: 740, width: 50, height: 16, moving: true, range: 35, speed: 5.5 },
            { x: 400, y: 680, width: 45, height: 15, moving: true, range: 40, speed: 6 },
            { x: 480, y: 620, width: 45, height: 15, moving: true, range: 45, speed: 6.5 },
            { x: 560, y: 560, width: 45, height: 15, moving: true, range: 50, speed: 7 },
            { x: 640, y: 500, width: 40, height: 15, moving: true, range: 45, speed: 7.5 },
            { x: 720, y: 440, width: 40, height: 15, moving: true, range: 40, speed: 8 },
            { x: 800, y: 380, width: 40, height: 15, moving: true, range: 35, speed: 8.5 },
            { x: 880, y: 320, width: 40, height: 15, moving: true, range: 30, speed: 9 },
            { x: 960, y: 260, width: 40, height: 15, moving: true, range: 25, speed: 9.5 },
            { x: 1040, y: 200, width: 40, height: 15, moving: true, range: 20, speed: 10 },
            { x: 1120, y: 140, width: 40, height: 15, moving: true, range: 15, speed: 10.5 },
            { x: 1200, y: 90, width: 40, height: 15, moving: true, range: 15, speed: 11 },
            { x: 1280, y: 60, width: 40, height: 15, moving: true, range: 20, speed: 11.5 },
            { x: 1360, y: 60, width: 40, height: 15, moving: true, range: 25, speed: 12 },
            { x: 1440, y: 80, width: 40, height: 15, moving: true, range: 30, speed: 12.5 },
            { x: 1520, y: 120, width: 80, height: 15 },
        ],
        spikes: [
            { x: 80, y: 960, width: 30 }, { x: 180, y: 960, width: 40 },
            { x: 280, y: 960, width: 40 }, { x: 380, y: 960, width: 40 },
            { x: 480, y: 960, width: 40 }, { x: 580, y: 960, width: 40 },
            { x: 680, y: 960, width: 40 }, { x: 780, y: 960, width: 40 },
            { x: 160, y: 740, width: 15 }, { x: 400, y: 580, width: 15 },
            { x: 640, y: 420, width: 15 }, { x: 880, y: 260, width: 15 },
        ],
        decorations: [
            { x: 500, y: 250, type: 'gem' }, { x: 1000, y: 150, type: 'star' },
        ],
        goal: { x: 1540, y: 60 },
    },
    {
        name: "INSANE: Double Helix",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 100, height: 40 },
            { x: 150, y: 880, width: 50, height: 18, moving: true, range: 30, speed: 5 },
            { x: 300, y: 800, width: 45, height: 16, moving: true, range: 35, speed: 5.5 },
            { x: 450, y: 720, width: 45, height: 16, moving: true, range: 40, speed: 6 },
            { x: 600, y: 640, width: 45, height: 16, moving: true, range: 45, speed: 6.5 },
            { x: 750, y: 560, width: 45, height: 16, moving: true, range: 50, speed: 7 },
            { x: 900, y: 480, width: 45, height: 16, moving: true, range: 55, speed: 7.5 },
            { x: 1050, y: 400, width: 45, height: 16, moving: true, range: 50, speed: 8 },
            { x: 1200, y: 320, width: 45, height: 16, moving: true, range: 45, speed: 8.5 },
            { x: 1350, y: 240, width: 45, height: 16, moving: true, range: 40, speed: 9 },
            { x: 1250, y: 180, width: 40, height: 15, moving: true, range: 35, speed: 9.5 },
            { x: 1150, y: 140, width: 40, height: 15, moving: true, range: 30, speed: 10 },
            { x: 1050, y: 120, width: 40, height: 15, moving: true, range: 25, speed: 10.5 },
            { x: 950, y: 120, width: 40, height: 15, moving: true, range: 25, speed: 11 },
            { x: 850, y: 140, width: 40, height: 15, moving: true, range: 30, speed: 11.5 },
            { x: 750, y: 180, width: 40, height: 15, moving: true, range: 35, speed: 12 },
            { x: 650, y: 240, width: 40, height: 15, moving: true, range: 40, speed: 12.5 },
            { x: 550, y: 320, width: 40, height: 15, moving: true, range: 45, speed: 13 },
            { x: 450, y: 420, width: 40, height: 15, moving: true, range: 50, speed: 13.5 },
            { x: 350, y: 540, width: 40, height: 15, moving: true, range: 55, speed: 14 },
            { x: 250, y: 680, width: 40, height: 15, moving: true, range: 60, speed: 14.5 },
            { x: 150, y: 820, width: 50, height: 15 },
            { x: 50, y: 920, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 940, width: 60 }, { x: 250, y: 940, width: 60 },
            { x: 400, y: 940, width: 60 }, { x: 550, y: 940, width: 60 },
            { x: 700, y: 940, width: 60 }, { x: 850, y: 940, width: 60 },
            { x: 300, y: 700, width: 20 }, { x: 600, y: 500, width: 20 },
            { x: 900, y: 300, width: 20 }, { x: 1200, y: 140, width: 20 },
        ],
        decorations: [
            { x: 700, y: 200, type: 'gem' }, { x: 1200, y: 150, type: 'star' },
        ],
        goal: { x: 80, y: 860 },
    },
    {
        name: "INSANE: The Maze",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 100, height: 40 },
            { x: 150, y: 900, width: 60, height: 20, moving: true, range: 30, speed: 4 },
            { x: 280, y: 840, width: 55, height: 18, moving: true, range: 35, speed: 4.5 },
            { x: 410, y: 780, width: 50, height: 18, moving: true, range: 40, speed: 5 },
            { x: 540, y: 720, width: 50, height: 18, moving: true, range: 45, speed: 5.5 },
            { x: 670, y: 660, width: 50, height: 18, moving: true, range: 50, speed: 6 },
            { x: 800, y: 600, width: 45, height: 16, moving: true, range: 55, speed: 6.5 },
            { x: 930, y: 540, width: 45, height: 16, moving: true, range: 50, speed: 7 },
            { x: 1060, y: 480, width: 45, height: 16, moving: true, range: 45, speed: 7.5 },
            { x: 1190, y: 420, width: 45, height: 16, moving: true, range: 40, speed: 8 },
            { x: 1320, y: 360, width: 45, height: 16, moving: true, range: 35, speed: 8.5 },
            { x: 1450, y: 300, width: 45, height: 16, moving: true, range: 30, speed: 9 },
            { x: 1400, y: 220, width: 40, height: 15, moving: true, range: 25, speed: 9.5 },
            { x: 1300, y: 160, width: 40, height: 15, moving: true, range: 20, speed: 10 },
            { x: 1200, y: 120, width: 40, height: 15, moving: true, range: 20, speed: 10.5 },
            { x: 1100, y: 100, width: 40, height: 15, moving: true, range: 25, speed: 11 },
            { x: 1000, y: 100, width: 40, height: 15, moving: true, range: 30, speed: 11.5 },
            { x: 900, y: 120, width: 40, height: 15, moving: true, range: 35, speed: 12 },
            { x: 800, y: 160, width: 40, height: 15, moving: true, range: 40, speed: 12.5 },
            { x: 700, y: 220, width: 40, height: 15, moving: true, range: 45, speed: 13 },
            { x: 600, y: 300, width: 40, height: 15, moving: true, range: 50, speed: 13.5 },
            { x: 500, y: 400, width: 40, height: 15, moving: true, range: 55, speed: 14 },
            { x: 400, y: 520, width: 40, height: 15, moving: true, range: 60, speed: 14.5 },
            { x: 300, y: 660, width: 40, height: 15, moving: true, range: 65, speed: 15 },
            { x: 200, y: 800, width: 50, height: 15 },
            { x: 100, y: 900, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 940, width: 60 }, { x: 250, y: 940, width: 60 },
            { x: 400, y: 940, width: 60 }, { x: 550, y: 940, width: 60 },
            { x: 700, y: 940, width: 60 }, { x: 850, y: 940, width: 60 },
            { x: 280, y: 740, width: 20 }, { x: 540, y: 600, width: 20 },
            { x: 800, y: 460, width: 20 }, { x: 1060, y: 340, width: 20 },
        ],
        decorations: [
            { x: 600, y: 300, type: 'gem' }, { x: 1200, y: 200, type: 'star' },
        ],
        goal: { x: 130, y: 840 },
    },
    {
        name: "INSANE: Hurricane",
        playerStart: { x: 800, y: 950 },
        platforms: [
            { x: 750, y: 980, width: 100, height: 20 },
            { x: 700, y: 900, width: 50, height: 16, moving: true, range: 30, speed: 6 },
            { x: 800, y: 820, width: 50, height: 16, moving: true, range: 35, speed: 6.5 },
            { x: 900, y: 740, width: 50, height: 16, moving: true, range: 40, speed: 7 },
            { x: 1000, y: 660, width: 45, height: 16, moving: true, range: 45, speed: 7.5 },
            { x: 1100, y: 580, width: 45, height: 16, moving: true, range: 50, speed: 8 },
            { x: 1200, y: 500, width: 45, height: 16, moving: true, range: 55, speed: 8.5 },
            { x: 1300, y: 420, width: 45, height: 16, moving: true, range: 50, speed: 9 },
            { x: 1400, y: 340, width: 40, height: 15, moving: true, range: 45, speed: 9.5 },
            { x: 1500, y: 260, width: 40, height: 15, moving: true, range: 40, speed: 10 },
            { x: 1450, y: 180, width: 40, height: 15, moving: true, range: 35, speed: 10.5 },
            { x: 1350, y: 120, width: 40, height: 15, moving: true, range: 30, speed: 11 },
            { x: 1250, y: 80, width: 40, height: 15, moving: true, range: 25, speed: 11.5 },
            { x: 1150, y: 60, width: 40, height: 15, moving: true, range: 20, speed: 12 },
            { x: 1050, y: 60, width: 40, height: 15, moving: true, range: 20, speed: 12.5 },
            { x: 950, y: 80, width: 40, height: 15, moving: true, range: 25, speed: 13 },
            { x: 850, y: 120, width: 40, height: 15, moving: true, range: 30, speed: 13.5 },
            { x: 750, y: 180, width: 40, height: 15, moving: true, range: 35, speed: 14 },
            { x: 650, y: 260, width: 40, height: 15, moving: true, range: 40, speed: 14.5 },
            { x: 550, y: 360, width: 40, height: 15, moving: true, range: 45, speed: 15 },
            { x: 450, y: 480, width: 40, height: 15, moving: true, range: 50, speed: 15.5 },
            { x: 350, y: 620, width: 40, height: 15, moving: true, range: 55, speed: 16 },
            { x: 250, y: 780, width: 40, height: 15, moving: true, range: 60, speed: 16.5 },
            { x: 150, y: 920, width: 50, height: 15 },
        ],
        spikes: [
            { x: 850, y: 960, width: 40 }, { x: 950, y: 960, width: 40 },
            { x: 1050, y: 960, width: 40 }, { x: 1150, y: 960, width: 40 },
            { x: 800, y: 700, width: 20 }, { x: 1000, y: 500, width: 20 },
            { x: 1300, y: 300, width: 20 }, { x: 1100, y: 100, width: 20 },
        ],
        decorations: [
            { x: 900, y: 400, type: 'gem' }, { x: 1300, y: 200, type: 'star' },
        ],
        goal: { x: 180, y: 860 },
    },
    {
        name: "INSANE: Falling Stars",
        playerStart: { x: 50, y: 100 },
        platforms: [
            { x: 0, y: 160, width: 100, height: 20 },
            { x: 150, y: 220, width: 50, height: 16, moving: true, range: 30, speed: 5 },
            { x: 280, y: 300, width: 45, height: 16, moving: true, range: 35, speed: 5.5 },
            { x: 410, y: 380, width: 45, height: 16, moving: true, range: 40, speed: 6 },
            { x: 540, y: 460, width: 45, height: 16, moving: true, range: 45, speed: 6.5 },
            { x: 670, y: 540, width: 45, height: 16, moving: true, range: 50, speed: 7 },
            { x: 800, y: 620, width: 45, height: 16, moving: true, range: 55, speed: 7.5 },
            { x: 930, y: 700, width: 45, height: 16, moving: true, range: 50, speed: 8 },
            { x: 1060, y: 780, width: 45, height: 16, moving: true, range: 45, speed: 8.5 },
            { x: 1190, y: 860, width: 45, height: 16, moving: true, range: 40, speed: 9 },
            { x: 1320, y: 920, width: 45, height: 16, moving: true, range: 35, speed: 9.5 },
            { x: 1450, y: 960, width: 50, height: 16 },
            { x: 1400, y: 880, width: 40, height: 15, moving: true, range: 30, speed: 10 },
            { x: 1300, y: 800, width: 40, height: 15, moving: true, range: 25, speed: 10.5 },
            { x: 1200, y: 720, width: 40, height: 15, moving: true, range: 20, speed: 11 },
            { x: 1100, y: 640, width: 40, height: 15, moving: true, range: 20, speed: 11.5 },
            { x: 1000, y: 560, width: 40, height: 15, moving: true, range: 25, speed: 12 },
            { x: 900, y: 480, width: 40, height: 15, moving: true, range: 30, speed: 12.5 },
            { x: 800, y: 400, width: 40, height: 15, moving: true, range: 35, speed: 13 },
            { x: 700, y: 320, width: 40, height: 15, moving: true, range: 40, speed: 13.5 },
            { x: 600, y: 240, width: 40, height: 15, moving: true, range: 45, speed: 14 },
            { x: 500, y: 160, width: 40, height: 15, moving: true, range: 50, speed: 14.5 },
            { x: 400, y: 80, width: 40, height: 15, moving: true, range: 55, speed: 15 },
            { x: 300, y: 60, width: 40, height: 15, moving: true, range: 50, speed: 15.5 },
            { x: 200, y: 80, width: 40, height: 15, moving: true, range: 45, speed: 16 },
            { x: 100, y: 120, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 140, width: 30 }, { x: 200, y: 140, width: 40 },
            { x: 300, y: 140, width: 40 }, { x: 400, y: 140, width: 40 },
            { x: 500, y: 140, width: 40 }, { x: 600, y: 140, width: 40 },
            { x: 700, y: 140, width: 40 }, { x: 800, y: 140, width: 40 },
            { x: 280, y: 200, width: 20 }, { x: 540, y: 360, width: 20 },
            { x: 800, y: 520, width: 20 }, { x: 1060, y: 680, width: 20 },
        ],
        decorations: [
            { x: 700, y: 200, type: 'gem' }, { x: 1300, y: 400, type: 'star' },
        ],
        goal: { x: 130, y: 60 },
    },
    {
        name: "INSANE: The Vortex",
        playerStart: { x: 800, y: 500 },
        platforms: [
            { x: 750, y: 540, width: 100, height: 20 },
            { x: 700, y: 460, width: 50, height: 16, moving: true, range: 25, speed: 6 },
            { x: 600, y: 400, width: 45, height: 16, moving: true, range: 30, speed: 6.5 },
            { x: 500, y: 340, width: 45, height: 16, moving: true, range: 35, speed: 7 },
            { x: 400, y: 280, width: 45, height: 16, moving: true, range: 40, speed: 7.5 },
            { x: 300, y: 220, width: 45, height: 16, moving: true, range: 45, speed: 8 },
            { x: 200, y: 160, width: 45, height: 16, moving: true, range: 50, speed: 8.5 },
            { x: 100, y: 120, width: 45, height: 16, moving: true, range: 45, speed: 9 },
            { x: 50, y: 80, width: 45, height: 16, moving: true, range: 40, speed: 9.5 },
            { x: 100, y: 60, width: 45, height: 16, moving: true, range: 35, speed: 10 },
            { x: 200, y: 60, width: 45, height: 16, moving: true, range: 30, speed: 10.5 },
            { x: 300, y: 80, width: 45, height: 16, moving: true, range: 25, speed: 11 },
            { x: 400, y: 120, width: 45, height: 16, moving: true, range: 20, speed: 11.5 },
            { x: 500, y: 180, width: 45, height: 16, moving: true, range: 25, speed: 12 },
            { x: 600, y: 260, width: 45, height: 16, moving: true, range: 30, speed: 12.5 },
            { x: 700, y: 360, width: 45, height: 16, moving: true, range: 35, speed: 13 },
            { x: 800, y: 480, width: 45, height: 16, moving: true, range: 40, speed: 13.5 },
            { x: 900, y: 620, width: 45, height: 16, moving: true, range: 45, speed: 14 },
            { x: 1000, y: 780, width: 45, height: 16, moving: true, range: 50, speed: 14.5 },
            { x: 1100, y: 920, width: 45, height: 16, moving: true, range: 55, speed: 15 },
            { x: 1200, y: 960, width: 50, height: 16 },
            { x: 1300, y: 900, width: 50, height: 16 },
            { x: 1400, y: 820, width: 50, height: 16 },
            { x: 1500, y: 720, width: 50, height: 16 },
        ],
        spikes: [
            { x: 850, y: 520, width: 30 }, { x: 950, y: 520, width: 40 },
            { x: 750, y: 520, width: 40 }, { x: 650, y: 520, width: 40 },
            { x: 200, y: 200, width: 20 }, { x: 400, y: 200, width: 20 },
            { x: 600, y: 400, width: 20 }, { x: 800, y: 600, width: 20 },
        ],
        decorations: [
            { x: 400, y: 300, type: 'gem' }, { x: 800, y: 500, type: 'star' },
        ],
        goal: { x: 1530, y: 660 },
    },
    {
        name: "INSANE: Ring of Fire",
        playerStart: { x: 800, y: 950 },
        platforms: [
            { x: 750, y: 980, width: 100, height: 20 },
            { x: 850, y: 900, width: 60, height: 18, moving: true, range: 40, speed: 5 },
            { x: 950, y: 820, width: 55, height: 16, moving: true, range: 50, speed: 5.5 },
            { x: 1050, y: 740, width: 50, height: 16, moving: true, range: 60, speed: 6 },
            { x: 1150, y: 660, width: 50, height: 16, moving: true, range: 70, speed: 6.5 },
            { x: 1250, y: 580, width: 45, height: 15, moving: true, range: 80, speed: 7 },
            { x: 1350, y: 500, width: 45, height: 15, moving: true, range: 70, speed: 7.5 },
            { x: 1450, y: 420, width: 45, height: 15, moving: true, range: 60, speed: 8 },
            { x: 1400, y: 340, width: 40, height: 15, moving: true, range: 50, speed: 8.5 },
            { x: 1300, y: 280, width: 40, height: 15, moving: true, range: 40, speed: 9 },
            { x: 1200, y: 240, width: 40, height: 15, moving: true, range: 30, speed: 9.5 },
            { x: 1100, y: 220, width: 40, height: 15, moving: true, range: 25, speed: 10 },
            { x: 1000, y: 220, width: 40, height: 15, moving: true, range: 25, speed: 10.5 },
            { x: 900, y: 240, width: 40, height: 15, moving: true, range: 30, speed: 11 },
            { x: 800, y: 280, width: 40, height: 15, moving: true, range: 35, speed: 11.5 },
            { x: 700, y: 340, width: 40, height: 15, moving: true, range: 40, speed: 12 },
            { x: 600, y: 420, width: 40, height: 15, moving: true, range: 45, speed: 12.5 },
            { x: 500, y: 520, width: 40, height: 15, moving: true, range: 50, speed: 13 },
            { x: 400, y: 640, width: 40, height: 15, moving: true, range: 55, speed: 13.5 },
            { x: 300, y: 780, width: 40, height: 15, moving: true, range: 60, speed: 14 },
            { x: 200, y: 900, width: 50, height: 15 },
        ],
        spikes: [
            { x: 850, y: 960, width: 40 }, { x: 950, y: 960, width: 40 },
            { x: 1050, y: 960, width: 40 }, { x: 1150, y: 960, width: 40 },
            { x: 1250, y: 960, width: 40 }, { x: 1350, y: 960, width: 40 },
            { x: 1000, y: 300, width: 20 }, { x: 700, y: 400, width: 20 },
        ],
        decorations: [
            { x: 800, y: 300, type: 'gem' }, { x: 1200, y: 300, type: 'star' },
        ],
        goal: { x: 230, y: 840 },
    },
    {
        name: "INSANE: Infinity Loop",
        playerStart: { x: 50, y: 500 },
        platforms: [
            { x: 0, y: 540, width: 100, height: 20 },
            { x: 150, y: 480, width: 50, height: 16, moving: true, range: 30, speed: 5 },
            { x: 280, y: 420, width: 45, height: 16, moving: true, range: 35, speed: 5.5 },
            { x: 410, y: 360, width: 45, height: 16, moving: true, range: 40, speed: 6 },
            { x: 540, y: 300, width: 45, height: 16, moving: true, range: 45, speed: 6.5 },
            { x: 670, y: 240, width: 45, height: 16, moving: true, range: 50, speed: 7 },
            { x: 800, y: 180, width: 45, height: 16, moving: true, range: 55, speed: 7.5 },
            { x: 930, y: 140, width: 45, height: 16, moving: true, range: 50, speed: 8 },
            { x: 1060, y: 120, width: 45, height: 16, moving: true, range: 45, speed: 8.5 },
            { x: 1190, y: 120, width: 45, height: 16, moving: true, range: 40, speed: 9 },
            { x: 1320, y: 140, width: 45, height: 16, moving: true, range: 35, speed: 9.5 },
            { x: 1450, y: 180, width: 45, height: 16, moving: true, range: 30, speed: 10 },
            { x: 1500, y: 260, width: 40, height: 15, moving: true, range: 25, speed: 10.5 },
            { x: 1450, y: 340, width: 40, height: 15, moving: true, range: 30, speed: 11 },
            { x: 1350, y: 420, width: 40, height: 15, moving: true, range: 35, speed: 11.5 },
            { x: 1250, y: 500, width: 40, height: 15, moving: true, range: 40, speed: 12 },
            { x: 1150, y: 580, width: 40, height: 15, moving: true, range: 45, speed: 12.5 },
            { x: 1050, y: 660, width: 40, height: 15, moving: true, range: 50, speed: 13 },
            { x: 950, y: 740, width: 40, height: 15, moving: true, range: 55, speed: 13.5 },
            { x: 850, y: 820, width: 40, height: 15, moving: true, range: 60, speed: 14 },
            { x: 750, y: 880, width: 40, height: 15, moving: true, range: 55, speed: 14.5 },
            { x: 650, y: 920, width: 40, height: 15, moving: true, range: 50, speed: 15 },
            { x: 550, y: 940, width: 40, height: 15, moving: true, range: 45, speed: 15.5 },
            { x: 450, y: 940, width: 40, height: 15, moving: true, range: 40, speed: 16 },
            { x: 350, y: 920, width: 40, height: 15, moving: true, range: 35, speed: 16.5 },
            { x: 250, y: 880, width: 40, height: 15, moving: true, range: 30, speed: 17 },
            { x: 150, y: 820, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 520, width: 30 }, { x: 200, y: 520, width: 40 },
            { x: 300, y: 520, width: 40 }, { x: 400, y: 520, width: 40 },
            { x: 500, y: 520, width: 40 }, { x: 600, y: 520, width: 40 },
            { x: 700, y: 520, width: 40 }, { x: 800, y: 520, width: 40 },
            { x: 900, y: 520, width: 40 }, { x: 1000, y: 520, width: 40 },
            { x: 800, y: 100, width: 20 }, { x: 1100, y: 200, width: 20 },
            { x: 1300, y: 400, width: 20 }, { x: 900, y: 800, width: 20 },
        ],
        decorations: [
            { x: 800, y: 300, type: 'gem' }, { x: 1300, y: 300, type: 'star' },
        ],
        goal: { x: 180, y: 760 },
    },
    {
        name: "INSANE: Pinball",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 100, height: 40 },
            { x: 150, y: 900, width: 60, height: 20, moving: true, range: 30, speed: 4 },
            { x: 300, y: 820, width: 55, height: 18, moving: true, range: 40, speed: 4.5 },
            { x: 450, y: 740, width: 50, height: 18, moving: true, range: 50, speed: 5 },
            { x: 600, y: 660, width: 50, height: 18, moving: true, range: 60, speed: 5.5 },
            { x: 750, y: 580, width: 45, height: 16, moving: true, range: 70, speed: 6 },
            { x: 900, y: 500, width: 45, height: 16, moving: true, range: 60, speed: 6.5 },
            { x: 1050, y: 420, width: 45, height: 16, moving: true, range: 50, speed: 7 },
            { x: 1200, y: 340, width: 45, height: 16, moving: true, range: 40, speed: 7.5 },
            { x: 1350, y: 260, width: 45, height: 16, moving: true, range: 30, speed: 8 },
            { x: 1450, y: 200, width: 40, height: 15, moving: true, range: 25, speed: 8.5 },
            { x: 1350, y: 160, width: 40, height: 15, moving: true, range: 30, speed: 9 },
            { x: 1250, y: 140, width: 40, height: 15, moving: true, range: 35, speed: 9.5 },
            { x: 1150, y: 140, width: 40, height: 15, moving: true, range: 40, speed: 10 },
            { x: 1050, y: 160, width: 40, height: 15, moving: true, range: 45, speed: 10.5 },
            { x: 950, y: 200, width: 40, height: 15, moving: true, range: 50, speed: 11 },
            { x: 850, y: 260, width: 40, height: 15, moving: true, range: 55, speed: 11.5 },
            { x: 750, y: 340, width: 40, height: 15, moving: true, range: 60, speed: 12 },
            { x: 650, y: 440, width: 40, height: 15, moving: true, range: 65, speed: 12.5 },
            { x: 550, y: 560, width: 40, height: 15, moving: true, range: 70, speed: 13 },
            { x: 450, y: 700, width: 40, height: 15, moving: true, range: 75, speed: 13.5 },
            { x: 350, y: 860, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 940, width: 60 }, { x: 250, y: 940, width: 60 },
            { x: 400, y: 940, width: 60 }, { x: 550, y: 940, width: 60 },
            { x: 700, y: 940, width: 60 }, { x: 850, y: 940, width: 60 },
            { x: 1000, y: 940, width: 60 }, { x: 1150, y: 940, width: 60 },
            { x: 300, y: 720, width: 20 }, { x: 600, y: 480, width: 20 },
            { x: 900, y: 280, width: 20 }, { x: 1200, y: 100, width: 20 },
        ],
        decorations: [
            { x: 700, y: 250, type: 'gem' }, { x: 1200, y: 200, type: 'star' },
        ],
        goal: { x: 380, y: 800 },
    },
    {
        name: "INSANE: Lightning Bolt",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 80, height: 40 },
            { x: 80, y: 880, width: 50, height: 18, moving: true, range: 25, speed: 6 },
            { x: 150, y: 780, width: 45, height: 16, moving: true, range: 35, speed: 6.5 },
            { x: 220, y: 680, width: 45, height: 16, moving: true, range: 45, speed: 7 },
            { x: 290, y: 580, width: 45, height: 16, moving: true, range: 55, speed: 7.5 },
            { x: 360, y: 480, width: 45, height: 16, moving: true, range: 65, speed: 8 },
            { x: 430, y: 380, width: 45, height: 16, moving: true, range: 55, speed: 8.5 },
            { x: 500, y: 280, width: 45, height: 16, moving: true, range: 45, speed: 9 },
            { x: 570, y: 180, width: 45, height: 16, moving: true, range: 35, speed: 9.5 },
            { x: 640, y: 100, width: 45, height: 16, moving: true, range: 25, speed: 10 },
            { x: 760, y: 80, width: 45, height: 16, moving: true, range: 20, speed: 10.5 },
            { x: 880, y: 80, width: 45, height: 16, moving: true, range: 25, speed: 11 },
            { x: 1000, y: 100, width: 45, height: 16, moving: true, range: 30, speed: 11.5 },
            { x: 1120, y: 140, width: 45, height: 16, moving: true, range: 35, speed: 12 },
            { x: 1240, y: 200, width: 45, height: 16, moving: true, range: 40, speed: 12.5 },
            { x: 1360, y: 280, width: 45, height: 16, moving: true, range: 45, speed: 13 },
            { x: 1480, y: 380, width: 45, height: 16, moving: true, range: 50, speed: 13.5 },
            { x: 1500, y: 500, width: 40, height: 15, moving: true, range: 55, speed: 14 },
            { x: 1450, y: 620, width: 40, height: 15, moving: true, range: 60, speed: 14.5 },
            { x: 1400, y: 740, width: 40, height: 15, moving: true, range: 55, speed: 15 },
            { x: 1350, y: 860, width: 40, height: 15, moving: true, range: 50, speed: 15.5 },
            { x: 1300, y: 960, width: 50, height: 15 },
        ],
        spikes: [
            { x: 80, y: 940, width: 30 }, { x: 160, y: 940, width: 40 },
            { x: 240, y: 940, width: 40 }, { x: 320, y: 940, width: 40 },
            { x: 400, y: 940, width: 40 }, { x: 480, y: 940, width: 40 },
            { x: 560, y: 940, width: 40 }, { x: 640, y: 940, width: 40 },
            { x: 150, y: 660, width: 15 }, { x: 360, y: 420, width: 15 },
            { x: 570, y: 180, width: 15 }, { x: 880, y: 40, width: 15 },
            { x: 1240, y: 160, width: 15 }, { x: 1480, y: 340, width: 15 },
        ],
        decorations: [
            { x: 500, y: 200, type: 'gem' }, { x: 1000, y: 150, type: 'star' },
        ],
        goal: { x: 1330, y: 900 },
    },
    {
        name: "INSANE: Snake Eyes",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 100, height: 40 },
            { x: 150, y: 880, width: 50, height: 18, moving: true, range: 25, speed: 5 },
            { x: 280, y: 800, width: 45, height: 16, moving: true, range: 30, speed: 5.5 },
            { x: 410, y: 720, width: 45, height: 16, moving: true, range: 35, speed: 6 },
            { x: 540, y: 640, width: 45, height: 16, moving: true, range: 40, speed: 6.5 },
            { x: 670, y: 560, width: 45, height: 16, moving: true, range: 45, speed: 7 },
            { x: 800, y: 480, width: 45, height: 16, moving: true, range: 50, speed: 7.5 },
            { x: 930, y: 400, width: 45, height: 16, moving: true, range: 55, speed: 8 },
            { x: 1060, y: 320, width: 45, height: 16, moving: true, range: 50, speed: 8.5 },
            { x: 1190, y: 240, width: 45, height: 16, moving: true, range: 45, speed: 9 },
            { x: 1320, y: 160, width: 45, height: 16, moving: true, range: 40, speed: 9.5 },
            { x: 1400, y: 100, width: 40, height: 15, moving: true, range: 35, speed: 10 },
            { x: 1320, y: 80, width: 40, height: 15, moving: true, range: 30, speed: 10.5 },
            { x: 1240, y: 80, width: 40, height: 15, moving: true, range: 25, speed: 11 },
            { x: 1160, y: 100, width: 40, height: 15, moving: true, range: 20, speed: 11.5 },
            { x: 1080, y: 140, width: 40, height: 15, moving: true, range: 25, speed: 12 },
            { x: 1000, y: 200, width: 40, height: 15, moving: true, range: 30, speed: 12.5 },
            { x: 920, y: 280, width: 40, height: 15, moving: true, range: 35, speed: 13 },
            { x: 840, y: 380, width: 40, height: 15, moving: true, range: 40, speed: 13.5 },
            { x: 760, y: 500, width: 40, height: 15, moving: true, range: 45, speed: 14 },
            { x: 680, y: 640, width: 40, height: 15, moving: true, range: 50, speed: 14.5 },
            { x: 600, y: 800, width: 40, height: 15, moving: true, range: 55, speed: 15 },
            { x: 520, y: 920, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 940, width: 60 }, { x: 220, y: 940, width: 60 },
            { x: 340, y: 940, width: 60 }, { x: 460, y: 940, width: 60 },
            { x: 580, y: 940, width: 60 }, { x: 700, y: 940, width: 60 },
            { x: 820, y: 940, width: 60 }, { x: 940, y: 940, width: 60 },
            { x: 280, y: 700, width: 20 }, { x: 540, y: 520, width: 20 },
            { x: 800, y: 360, width: 20 }, { x: 1060, y: 220, width: 20 },
            { x: 1320, y: 120, width: 20 }, { x: 1000, y: 160, width: 20 },
        ],
        decorations: [
            { x: 700, y: 300, type: 'gem' }, { x: 1300, y: 200, type: 'star' },
        ],
        goal: { x: 550, y: 860 },
    },
    {
        name: "INSANE: Asteroid Field",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 80, height: 40 },
            { x: 120, y: 900, width: 55, height: 18, moving: true, range: 30, speed: 5 },
            { x: 240, y: 840, width: 50, height: 16, moving: true, range: 35, speed: 5.5 },
            { x: 360, y: 780, width: 50, height: 16, moving: true, range: 40, speed: 6 },
            { x: 480, y: 720, width: 45, height: 16, moving: true, range: 45, speed: 6.5 },
            { x: 600, y: 660, width: 45, height: 16, moving: true, range: 50, speed: 7 },
            { x: 720, y: 600, width: 45, height: 16, moving: true, range: 55, speed: 7.5 },
            { x: 840, y: 540, width: 45, height: 16, moving: true, range: 50, speed: 8 },
            { x: 960, y: 480, width: 45, height: 16, moving: true, range: 45, speed: 8.5 },
            { x: 1080, y: 420, width: 45, height: 16, moving: true, range: 40, speed: 9 },
            { x: 1200, y: 360, width: 45, height: 16, moving: true, range: 35, speed: 9.5 },
            { x: 1320, y: 300, width: 45, height: 16, moving: true, range: 30, speed: 10 },
            { x: 1440, y: 240, width: 45, height: 16, moving: true, range: 25, speed: 10.5 },
            { x: 1520, y: 180, width: 40, height: 15, moving: true, range: 20, speed: 11 },
            { x: 1480, y: 120, width: 40, height: 15, moving: true, range: 25, speed: 11.5 },
            { x: 1400, y: 80, width: 40, height: 15, moving: true, range: 30, speed: 12 },
            { x: 1320, y: 60, width: 40, height: 15, moving: true, range: 25, speed: 12.5 },
            { x: 1240, y: 60, width: 40, height: 15, moving: true, range: 20, speed: 13 },
            { x: 1160, y: 80, width: 40, height: 15, moving: true, range: 25, speed: 13.5 },
            { x: 1080, y: 120, width: 40, height: 15, moving: true, range: 30, speed: 14 },
            { x: 1000, y: 180, width: 40, height: 15, moving: true, range: 35, speed: 14.5 },
            { x: 920, y: 260, width: 40, height: 15, moving: true, range: 40, speed: 15 },
            { x: 840, y: 360, width: 40, height: 15, moving: true, range: 45, speed: 15.5 },
            { x: 760, y: 480, width: 40, height: 15, moving: true, range: 50, speed: 16 },
            { x: 680, y: 620, width: 40, height: 15, moving: true, range: 55, speed: 16.5 },
            { x: 600, y: 780, width: 40, height: 15, moving: true, range: 60, speed: 17 },
            { x: 520, y: 920, width: 50, height: 15 },
        ],
        spikes: [
            { x: 80, y: 940, width: 30 }, { x: 180, y: 940, width: 40 },
            { x: 280, y: 940, width: 40 }, { x: 380, y: 940, width: 40 },
            { x: 480, y: 940, width: 40 }, { x: 580, y: 940, width: 40 },
            { x: 680, y: 940, width: 40 }, { x: 780, y: 940, width: 40 },
            { x: 240, y: 740, width: 20 }, { x: 480, y: 600, width: 20 },
            { x: 720, y: 460, width: 20 }, { x: 960, y: 340, width: 20 },
            { x: 1200, y: 240, width: 20 }, { x: 1440, y: 160, width: 20 },
            { x: 1200, y: 40, width: 20 }, { x: 900, y: 80, width: 20 },
        ],
        decorations: [
            { x: 800, y: 250, type: 'gem' }, { x: 1400, y: 150, type: 'star' },
        ],
        goal: { x: 550, y: 860 },
    },
    {
        name: "INSANE: The Gauntlet",
        playerStart: { x: 30, y: 950 },
        platforms: [
            { x: 0, y: 980, width: 80, height: 20 },
            { x: 100, y: 920, width: 50, height: 16, moving: true, range: 20, speed: 6 },
            { x: 200, y: 860, width: 45, height: 16, moving: true, range: 25, speed: 6.5 },
            { x: 300, y: 800, width: 45, height: 16, moving: true, range: 30, speed: 7 },
            { x: 400, y: 740, width: 45, height: 16, moving: true, range: 35, speed: 7.5 },
            { x: 500, y: 680, width: 45, height: 16, moving: true, range: 40, speed: 8 },
            { x: 600, y: 620, width: 45, height: 16, moving: true, range: 45, speed: 8.5 },
            { x: 700, y: 560, width: 45, height: 16, moving: true, range: 50, speed: 9 },
            { x: 800, y: 500, width: 45, height: 16, moving: true, range: 45, speed: 9.5 },
            { x: 900, y: 440, width: 45, height: 16, moving: true, range: 40, speed: 10 },
            { x: 1000, y: 380, width: 45, height: 16, moving: true, range: 35, speed: 10.5 },
            { x: 1100, y: 320, width: 45, height: 16, moving: true, range: 30, speed: 11 },
            { x: 1200, y: 260, width: 45, height: 16, moving: true, range: 25, speed: 11.5 },
            { x: 1300, y: 200, width: 45, height: 16, moving: true, range: 20, speed: 12 },
            { x: 1400, y: 140, width: 45, height: 16, moving: true, range: 15, speed: 12.5 },
            { x: 1500, y: 100, width: 50, height: 16, moving: true, range: 15, speed: 13 },
            { x: 1550, y: 160, width: 45, height: 16, moving: true, range: 20, speed: 13.5 },
            { x: 1500, y: 240, width: 45, height: 16, moving: true, range: 25, speed: 14 },
            { x: 1450, y: 340, width: 45, height: 16, moving: true, range: 30, speed: 14.5 },
            { x: 1400, y: 460, width: 45, height: 16, moving: true, range: 35, speed: 15 },
            { x: 1350, y: 600, width: 45, height: 16, moving: true, range: 40, speed: 15.5 },
            { x: 1300, y: 760, width: 45, height: 16, moving: true, range: 45, speed: 16 },
            { x: 1250, y: 900, width: 50, height: 16 },
        ],
        spikes: [
            { x: 80, y: 960, width: 30 }, { x: 160, y: 960, width: 40 },
            { x: 240, y: 960, width: 40 }, { x: 320, y: 960, width: 40 },
            { x: 400, y: 960, width: 40 }, { x: 480, y: 960, width: 40 },
            { x: 560, y: 960, width: 40 }, { x: 640, y: 960, width: 40 },
            { x: 720, y: 960, width: 40 }, { x: 800, y: 960, width: 40 },
            { x: 880, y: 960, width: 40 }, { x: 960, y: 960, width: 40 },
            { x: 1040, y: 960, width: 40 }, { x: 1120, y: 960, width: 40 },
            { x: 1200, y: 960, width: 40 }, { x: 1280, y: 960, width: 40 },
            { x: 200, y: 760, width: 15 }, { x: 500, y: 560, width: 15 },
            { x: 800, y: 360, width: 15 }, { x: 1100, y: 200, width: 15 },
            { x: 1400, y: 80, width: 15 }, { x: 1500, y: 280, width: 15 },
        ],
        decorations: [
            { x: 700, y: 350, type: 'gem' }, { x: 1300, y: 300, type: 'star' },
        ],
        goal: { x: 1280, y: 840 },
    },
    {
        name: "INSANE: Rollercoaster",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 100, height: 40 },
            { x: 150, y: 900, width: 55, height: 18, moving: true, range: 30, speed: 4 },
            { x: 300, y: 820, width: 50, height: 16, moving: true, range: 35, speed: 4.5 },
            { x: 450, y: 740, width: 50, height: 16, moving: true, range: 40, speed: 5 },
            { x: 600, y: 660, width: 45, height: 16, moving: true, range: 45, speed: 5.5 },
            { x: 750, y: 580, width: 45, height: 16, moving: true, range: 50, speed: 6 },
            { x: 900, y: 500, width: 45, height: 16, moving: true, range: 55, speed: 6.5 },
            { x: 1050, y: 420, width: 45, height: 16, moving: true, range: 60, speed: 7 },
            { x: 1200, y: 340, width: 45, height: 16, moving: true, range: 55, speed: 7.5 },
            { x: 1350, y: 260, width: 45, height: 16, moving: true, range: 50, speed: 8 },
            { x: 1450, y: 200, width: 40, height: 15, moving: true, range: 45, speed: 8.5 },
            { x: 1400, y: 160, width: 40, height: 15, moving: true, range: 40, speed: 9 },
            { x: 1350, y: 140, width: 40, height: 15, moving: true, range: 35, speed: 9.5 },
            { x: 1300, y: 140, width: 40, height: 15, moving: true, range: 30, speed: 10 },
            { x: 1250, y: 160, width: 40, height: 15, moving: true, range: 25, speed: 10.5 },
            { x: 1200, y: 200, width: 40, height: 15, moving: true, range: 20, speed: 11 },
            { x: 1150, y: 260, width: 40, height: 15, moving: true, range: 25, speed: 11.5 },
            { x: 1100, y: 340, width: 40, height: 15, moving: true, range: 30, speed: 12 },
            { x: 1050, y: 440, width: 40, height: 15, moving: true, range: 35, speed: 12.5 },
            { x: 1000, y: 560, width: 40, height: 15, moving: true, range: 40, speed: 13 },
            { x: 950, y: 700, width: 40, height: 15, moving: true, range: 45, speed: 13.5 },
            { x: 900, y: 860, width: 50, height: 15 },
        ],
        spikes: [
            { x: 100, y: 940, width: 60 }, { x: 220, y: 940, width: 60 },
            { x: 340, y: 940, width: 60 }, { x: 460, y: 940, width: 60 },
            { x: 580, y: 940, width: 60 }, { x: 700, y: 940, width: 60 },
            { x: 820, y: 940, width: 60 }, { x: 940, y: 940, width: 60 },
            { x: 300, y: 720, width: 20 }, { x: 600, y: 480, width: 20 },
            { x: 900, y: 280, width: 20 }, { x: 1200, y: 120, width: 20 },
        ],
        decorations: [
            { x: 800, y: 250, type: 'gem' }, { x: 1300, y: 200, type: 'star' },
        ],
        goal: { x: 930, y: 800 },
    },
    {
        name: "INSANE: Final Boss",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 80, height: 40 },
            { x: 100, y: 900, width: 50, height: 18, moving: true, range: 25, speed: 6 },
            { x: 200, y: 840, width: 45, height: 16, moving: true, range: 30, speed: 6.5 },
            { x: 300, y: 780, width: 45, height: 16, moving: true, range: 35, speed: 7 },
            { x: 400, y: 720, width: 45, height: 16, moving: true, range: 40, speed: 7.5 },
            { x: 500, y: 660, width: 45, height: 16, moving: true, range: 45, speed: 8 },
            { x: 600, y: 600, width: 45, height: 16, moving: true, range: 50, speed: 8.5 },
            { x: 700, y: 540, width: 45, height: 16, moving: true, range: 55, speed: 9 },
            { x: 800, y: 480, width: 45, height: 16, moving: true, range: 60, speed: 9.5 },
            { x: 900, y: 420, width: 45, height: 16, moving: true, range: 55, speed: 10 },
            { x: 1000, y: 360, width: 45, height: 16, moving: true, range: 50, speed: 10.5 },
            { x: 1100, y: 300, width: 45, height: 16, moving: true, range: 45, speed: 11 },
            { x: 1200, y: 240, width: 45, height: 16, moving: true, range: 40, speed: 11.5 },
            { x: 1300, y: 180, width: 45, height: 16, moving: true, range: 35, speed: 12 },
            { x: 1400, y: 120, width: 45, height: 16, moving: true, range: 30, speed: 12.5 },
            { x: 1500, y: 80, width: 45, height: 16, moving: true, range: 25, speed: 13 },
            { x: 1550, y: 140, width: 45, height: 16, moving: true, range: 30, speed: 13.5 },
            { x: 1500, y: 220, width: 45, height: 16, moving: true, range: 35, speed: 14 },
            { x: 1450, y: 320, width: 45, height: 16, moving: true, range: 40, speed: 14.5 },
            { x: 1400, y: 440, width: 45, height: 16, moving: true, range: 45, speed: 15 },
            { x: 1350, y: 580, width: 45, height: 16, moving: true, range: 50, speed: 15.5 },
            { x: 1300, y: 740, width: 45, height: 16, moving: true, range: 55, speed: 16 },
            { x: 1250, y: 900, width: 50, height: 16 },
        ],
        spikes: [
            { x: 80, y: 940, width: 30 }, { x: 160, y: 940, width: 40 },
            { x: 240, y: 940, width: 40 }, { x: 320, y: 940, width: 40 },
            { x: 400, y: 940, width: 40 }, { x: 480, y: 940, width: 40 },
            { x: 560, y: 940, width: 40 }, { x: 640, y: 940, width: 40 },
            { x: 720, y: 940, width: 40 }, { x: 800, y: 940, width: 40 },
            { x: 880, y: 940, width: 40 }, { x: 960, y: 940, width: 40 },
            { x: 1040, y: 940, width: 40 }, { x: 1120, y: 940, width: 40 },
            { x: 1200, y: 940, width: 40 }, { x: 1280, y: 940, width: 40 },
            { x: 200, y: 740, width: 15 }, { x: 500, y: 540, width: 15 },
            { x: 800, y: 360, width: 15 }, { x: 1100, y: 200, width: 15 },
            { x: 1400, y: 60, width: 15 }, { x: 1500, y: 280, width: 15 },
        ],
        decorations: [
            { x: 800, y: 300, type: 'gem' }, { x: 1400, y: 200, type: 'star' },
        ],
        goal: { x: 1280, y: 840 },
    },
];

const EXTREME_LEVELS = [
    {
        name: "EXTREME: Impossible Start",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 80, y: 900, width: 40, height: 15, moving: true, range: 20, speed: 7 },
            { x: 150, y: 820, width: 35, height: 14, moving: true, range: 25, speed: 7.5 },
            { x: 220, y: 740, width: 35, height: 14, moving: true, range: 30, speed: 8 },
            { x: 290, y: 660, width: 35, height: 14, moving: true, range: 35, speed: 8.5 },
            { x: 360, y: 580, width: 35, height: 14, moving: true, range: 40, speed: 9 },
            { x: 430, y: 500, width: 35, height: 14, moving: true, range: 45, speed: 9.5 },
            { x: 500, y: 420, width: 35, height: 14, moving: true, range: 50, speed: 10 },
            { x: 570, y: 340, width: 35, height: 14, moving: true, range: 45, speed: 10.5 },
            { x: 640, y: 260, width: 35, height: 14, moving: true, range: 40, speed: 11 },
            { x: 710, y: 180, width: 35, height: 14, moving: true, range: 35, speed: 11.5 },
            { x: 780, y: 120, width: 35, height: 14, moving: true, range: 30, speed: 12 },
            { x: 850, y: 80, width: 35, height: 14, moving: true, range: 25, speed: 12.5 },
            { x: 920, y: 60, width: 35, height: 14, moving: true, range: 20, speed: 13 },
            { x: 990, y: 60, width: 35, height: 14, moving: true, range: 20, speed: 13.5 },
            { x: 1060, y: 80, width: 35, height: 14, moving: true, range: 25, speed: 14 },
            { x: 1130, y: 120, width: 35, height: 14, moving: true, range: 30, speed: 14.5 },
            { x: 1200, y: 180, width: 35, height: 14, moving: true, range: 35, speed: 15 },
            { x: 1270, y: 260, width: 35, height: 14, moving: true, range: 40, speed: 15.5 },
            { x: 1340, y: 360, width: 35, height: 14, moving: true, range: 45, speed: 16 },
            { x: 1410, y: 480, width: 35, height: 14, moving: true, range: 50, speed: 16.5 },
            { x: 1480, y: 620, width: 35, height: 14, moving: true, range: 55, speed: 17 },
            { x: 1550, y: 780, width: 50, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 20 }, { x: 120, y: 940, width: 30 },
            { x: 180, y: 940, width: 30 }, { x: 240, y: 940, width: 30 },
            { x: 300, y: 940, width: 30 }, { x: 360, y: 940, width: 30 },
            { x: 420, y: 940, width: 30 }, { x: 480, y: 940, width: 30 },
            { x: 540, y: 940, width: 30 }, { x: 600, y: 940, width: 30 },
            { x: 660, y: 940, width: 30 }, { x: 720, y: 940, width: 30 },
            { x: 780, y: 940, width: 30 }, { x: 840, y: 940, width: 30 },
            { x: 900, y: 940, width: 30 }, { x: 960, y: 940, width: 30 },
            { x: 150, y: 700, width: 15 }, { x: 360, y: 500, width: 15 },
            { x: 570, y: 300, width: 15 }, { x: 780, y: 120, width: 15 },
            { x: 990, y: 20, width: 15 }, { x: 1200, y: 140, width: 15 },
            { x: 1410, y: 440, width: 15 },
        ],
        saws: [
            { x: 200, y: 650, radius: 20, range: 30, speed: 5 },
            { x: 450, y: 350, radius: 25, range: 40, speed: 6 },
            { x: 700, y: 150, radius: 20, range: 35, speed: 7 },
            { x: 1000, y: 50, radius: 25, range: 30, speed: 8 },
            { x: 1300, y: 250, radius: 20, range: 40, speed: 7 },
        ],
        movingSpikes: [
            { x: 300, y: 800, width: 30, height: 30, moveRange: 50, speed: 4 },
            { x: 600, y: 400, width: 30, height: 30, moveRange: 60, speed: 5 },
            { x: 900, y: 200, width: 30, height: 30, moveRange: 40, speed: 6 },
        ],
        swingingAxes: [
            { x: 400, y: 100, length: 80, swingAngle: Math.PI/4, speed: 0.04 },
            { x: 800, y: 150, length: 100, swingAngle: Math.PI/3, speed: 0.035 },
            { x: 1200, y: 200, length: 90, swingAngle: Math.PI/4, speed: 0.045 },
        ],
        lasers: [
            { x: 250, y: 600, width: 80, height: 10, vertical: false, moveRange: 30, moveSpeed: 2 },
            { x: 700, y: 300, width: 80, height: 10, vertical: false, moveRange: 40, moveSpeed: 3 },
            { x: 1100, y: 500, width: 80, height: 10, vertical: false, moveRange: 50, moveSpeed: 4 },
        ],
        crumblingPlatforms: [
            { x: 350, y: 700, width: 40, height: 15, delay: 20 },
            { x: 650, y: 450, width: 40, height: 15, delay: 25 },
            { x: 950, y: 250, width: 40, height: 15, delay: 30 },
        ],
        jumpRings: [
            { x: 500, y: 700, radius: 20 },
            { x: 900, y: 400, radius: 20 },
            { x: 1300, y: 150, radius: 20 },
        ],
        speedRings: [
            { x: 400, y: 500, radius: 22, speedBoost: 1.5 },
            { x: 850, y: 300, radius: 22, speedBoost: 1.8 },
        ],
        coins: [
            { x: 250, y: 550, radius: 12 },
            { x: 550, y: 350, radius: 12 },
            { x: 850, y: 200, radius: 12 },
            { x: 1150, y: 100, radius: 12 },
            { x: 1450, y: 200, radius: 12 },
        ],
        decorations: [
            { x: 500, y: 200, type: 'gem' }, { x: 1000, y: 100, type: 'star' },
        ],
        goal: { x: 1570, y: 720 },
    },
    {
        name: "EXTREME: Death Spiral",
        playerStart: { x: 800, y: 950 },
        platforms: [
            { x: 750, y: 980, width: 100, height: 20 },
            { x: 700, y: 900, width: 40, height: 14, moving: true, range: 25, speed: 7 },
            { x: 800, y: 820, width: 40, height: 14, moving: true, range: 30, speed: 7.5 },
            { x: 900, y: 740, width: 40, height: 14, moving: true, range: 35, speed: 8 },
            { x: 1000, y: 660, width: 35, height: 14, moving: true, range: 40, speed: 8.5 },
            { x: 1100, y: 580, width: 35, height: 14, moving: true, range: 45, speed: 9 },
            { x: 1200, y: 500, width: 35, height: 14, moving: true, range: 50, speed: 9.5 },
            { x: 1300, y: 420, width: 35, height: 14, moving: true, range: 55, speed: 10 },
            { x: 1400, y: 340, width: 35, height: 14, moving: true, range: 50, speed: 10.5 },
            { x: 1500, y: 260, width: 35, height: 14, moving: true, range: 45, speed: 11 },
            { x: 1550, y: 180, width: 35, height: 14, moving: true, range: 40, speed: 11.5 },
            { x: 1500, y: 120, width: 35, height: 14, moving: true, range: 35, speed: 12 },
            { x: 1400, y: 80, width: 35, height: 14, moving: true, range: 30, speed: 12.5 },
            { x: 1300, y: 60, width: 35, height: 14, moving: true, range: 25, speed: 13 },
            { x: 1200, y: 60, width: 35, height: 14, moving: true, range: 25, speed: 13.5 },
            { x: 1100, y: 80, width: 35, height: 14, moving: true, range: 30, speed: 14 },
            { x: 1000, y: 120, width: 35, height: 14, moving: true, range: 35, speed: 14.5 },
            { x: 900, y: 180, width: 35, height: 14, moving: true, range: 40, speed: 15 },
            { x: 800, y: 260, width: 35, height: 14, moving: true, range: 45, speed: 15.5 },
            { x: 700, y: 360, width: 35, height: 14, moving: true, range: 50, speed: 16 },
            { x: 600, y: 480, width: 35, height: 14, moving: true, range: 55, speed: 16.5 },
            { x: 500, y: 620, width: 35, height: 14, moving: true, range: 60, speed: 17 },
            { x: 400, y: 780, width: 40, height: 14, moving: true, range: 65, speed: 17.5 },
            { x: 300, y: 920, width: 50, height: 14 },
        ],
        spikes: [
            { x: 850, y: 960, width: 30 }, { x: 950, y: 960, width: 30 },
            { x: 1050, y: 960, width: 30 }, { x: 1150, y: 960, width: 30 },
            { x: 1250, y: 960, width: 30 }, { x: 1350, y: 960, width: 30 },
            { x: 1450, y: 960, width: 30 }, { x: 1550, y: 960, width: 30 },
            { x: 800, y: 650, width: 20 }, { x: 1000, y: 450, width: 20 },
            { x: 1300, y: 300, width: 20 }, { x: 1100, y: 150, width: 20 },
            { x: 700, y: 300, width: 20 }, { x: 500, y: 550, width: 20 },
        ],
        saws: [
            { x: 900, y: 550, radius: 25, range: 40, speed: 6 },
            { x: 1200, y: 350, radius: 20, range: 35, speed: 7 },
            { x: 900, y: 200, radius: 25, range: 30, speed: 8 },
            { x: 600, y: 400, radius: 20, range: 45, speed: 7 },
        ],
        rotatingSpikes: [
            { x: 1100, y: 250, radius: 20, rotationSpeed: 0.12 },
            { x: 800, y: 450, radius: 25, rotationSpeed: 0.1 },
        ],
        decorations: [
            { x: 900, y: 350, type: 'gem' }, { x: 1300, y: 200, type: 'star' },
        ],
        goal: { x: 330, y: 860 },
    },
    {
        name: "EXTREME: Gauntlet of Doom",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 80, y: 880, width: 40, height: 14, moving: true, range: 20, speed: 8 },
            { x: 150, y: 800, width: 35, height: 14, moving: true, range: 25, speed: 8.5 },
            { x: 220, y: 720, width: 35, height: 14, moving: true, range: 30, speed: 9 },
            { x: 290, y: 640, width: 35, height: 14, moving: true, range: 35, speed: 9.5 },
            { x: 360, y: 560, width: 35, height: 14, moving: true, range: 40, speed: 10 },
            { x: 430, y: 480, width: 35, height: 14, moving: true, range: 45, speed: 10.5 },
            { x: 500, y: 400, width: 35, height: 14, moving: true, range: 50, speed: 11 },
            { x: 570, y: 320, width: 35, height: 14, moving: true, range: 45, speed: 11.5 },
            { x: 640, y: 240, width: 35, height: 14, moving: true, range: 40, speed: 12 },
            { x: 710, y: 160, width: 35, height: 14, moving: true, range: 35, speed: 12.5 },
            { x: 780, y: 100, width: 35, height: 14, moving: true, range: 30, speed: 13 },
            { x: 850, y: 60, width: 35, height: 14, moving: true, range: 25, speed: 13.5 },
            { x: 920, y: 40, width: 35, height: 14, moving: true, range: 20, speed: 14 },
            { x: 1000, y: 40, width: 35, height: 14, moving: true, range: 20, speed: 14.5 },
            { x: 1080, y: 60, width: 35, height: 14, moving: true, range: 25, speed: 15 },
            { x: 1160, y: 100, width: 35, height: 14, moving: true, range: 30, speed: 15.5 },
            { x: 1240, y: 160, width: 35, height: 14, moving: true, range: 35, speed: 16 },
            { x: 1320, y: 240, width: 35, height: 14, moving: true, range: 40, speed: 16.5 },
            { x: 1400, y: 340, width: 35, height: 14, moving: true, range: 45, speed: 17 },
            { x: 1480, y: 460, width: 35, height: 14, moving: true, range: 50, speed: 17.5 },
            { x: 1560, y: 600, width: 40, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 20 }, { x: 120, y: 940, width: 40 },
            { x: 200, y: 940, width: 40 }, { x: 280, y: 940, width: 40 },
            { x: 360, y: 940, width: 40 }, { x: 440, y: 940, width: 40 },
            { x: 520, y: 940, width: 40 }, { x: 600, y: 940, width: 40 },
            { x: 680, y: 940, width: 40 }, { x: 760, y: 940, width: 40 },
            { x: 840, y: 940, width: 40 }, { x: 920, y: 940, width: 40 },
            { x: 1000, y: 940, width: 40 }, { x: 1080, y: 940, width: 40 },
            { x: 1160, y: 940, width: 40 }, { x: 1240, y: 940, width: 40 },
            { x: 1320, y: 940, width: 40 }, { x: 1400, y: 940, width: 40 },
            { x: 1480, y: 940, width: 40 }, { x: 1560, y: 940, width: 40 },
        ],
        saws: [
            { x: 200, y: 600, radius: 20, range: 30, speed: 6 },
            { x: 450, y: 350, radius: 25, range: 35, speed: 7 },
            { x: 700, y: 150, radius: 20, range: 40, speed: 8 },
            { x: 950, y: 50, radius: 25, range: 30, speed: 9 },
            { x: 1200, y: 150, radius: 20, range: 35, speed: 8 },
            { x: 1450, y: 350, radius: 25, range: 40, speed: 9 },
        ],
        rotatingSpikes: [
            { x: 350, y: 500, radius: 20, rotationSpeed: 0.15 },
            { x: 650, y: 250, radius: 25, rotationSpeed: 0.12 },
            { x: 1000, y: 100, radius: 20, rotationSpeed: 0.15 },
            { x: 1350, y: 250, radius: 25, rotationSpeed: 0.12 },
        ],
        coins: [
            { x: 300, y: 400, radius: 12 },
            { x: 600, y: 200, radius: 12 },
            { x: 900, y: 100, radius: 12 },
            { x: 1200, y: 200, radius: 12 },
        ],
        shields: [
            { x: 500, y: 300, radius: 18 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1300, y: 150, type: 'star' },
        ],
        goal: { x: 1580, y: 540 },
    },
    {
        name: "EXTREME: The Impossible Path",
        playerStart: { x: 50, y: 100 },
        platforms: [
            { x: 0, y: 160, width: 100, height: 20 },
            { x: 150, y: 220, width: 40, height: 14, moving: true, range: 25, speed: 6 },
            { x: 280, y: 300, width: 35, height: 14, moving: true, range: 30, speed: 6.5 },
            { x: 410, y: 380, width: 35, height: 14, moving: true, range: 35, speed: 7 },
            { x: 540, y: 460, width: 35, height: 14, moving: true, range: 40, speed: 7.5 },
            { x: 670, y: 540, width: 35, height: 14, moving: true, range: 45, speed: 8 },
            { x: 800, y: 620, width: 35, height: 14, moving: true, range: 50, speed: 8.5 },
            { x: 930, y: 700, width: 35, height: 14, moving: true, range: 55, speed: 9 },
            { x: 1060, y: 780, width: 35, height: 14, moving: true, range: 50, speed: 9.5 },
            { x: 1190, y: 860, width: 35, height: 14, moving: true, range: 45, speed: 10 },
            { x: 1320, y: 920, width: 35, height: 14, moving: true, range: 40, speed: 10.5 },
            { x: 1450, y: 960, width: 50, height: 14 },
            { x: 1400, y: 880, width: 35, height: 14, moving: true, range: 30, speed: 11 },
            { x: 1300, y: 800, width: 35, height: 14, moving: true, range: 25, speed: 11.5 },
            { x: 1200, y: 720, width: 35, height: 14, moving: true, range: 20, speed: 12 },
            { x: 1100, y: 640, width: 35, height: 14, moving: true, range: 20, speed: 12.5 },
            { x: 1000, y: 560, width: 35, height: 14, moving: true, range: 25, speed: 13 },
            { x: 900, y: 480, width: 35, height: 14, moving: true, range: 30, speed: 13.5 },
            { x: 800, y: 400, width: 35, height: 14, moving: true, range: 35, speed: 14 },
            { x: 700, y: 320, width: 35, height: 14, moving: true, range: 40, speed: 14.5 },
            { x: 600, y: 240, width: 35, height: 14, moving: true, range: 45, speed: 15 },
            { x: 500, y: 160, width: 35, height: 14, moving: true, range: 50, speed: 15.5 },
            { x: 400, y: 80, width: 35, height: 14, moving: true, range: 55, speed: 16 },
            { x: 300, y: 60, width: 35, height: 14, moving: true, range: 50, speed: 16.5 },
            { x: 200, y: 80, width: 40, height: 14 },
        ],
        spikes: [
            { x: 100, y: 140, width: 30 }, { x: 200, y: 140, width: 40 },
            { x: 300, y: 140, width: 40 }, { x: 400, y: 140, width: 40 },
            { x: 500, y: 140, width: 40 }, { x: 600, y: 140, width: 40 },
            { x: 700, y: 140, width: 40 }, { x: 800, y: 140, width: 40 },
            { x: 900, y: 140, width: 40 }, { x: 1000, y: 140, width: 40 },
            { x: 1100, y: 140, width: 40 }, { x: 1200, y: 140, width: 40 },
            { x: 1300, y: 140, width: 40 }, { x: 1400, y: 140, width: 40 },
            { x: 1500, y: 140, width: 40 },
        ],
        saws: [
            { x: 300, y: 250, radius: 20, range: 30, speed: 7 },
            { x: 600, y: 450, radius: 25, range: 40, speed: 8 },
            { x: 900, y: 650, radius: 20, range: 35, speed: 9 },
            { x: 1200, y: 850, radius: 25, range: 30, speed: 10 },
            { x: 1000, y: 550, radius: 20, range: 35, speed: 9 },
        ],
        decorations: [
            { x: 700, y: 300, type: 'gem' }, { x: 1200, y: 500, type: 'star' },
        ],
        goal: { x: 230, y: 20 },
    },
    {
        name: "EXTREME: Ultimate Challenge",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 80, y: 900, width: 40, height: 14, moving: true, range: 20, speed: 9 },
            { x: 160, y: 840, width: 35, height: 14, moving: true, range: 25, speed: 9.5 },
            { x: 240, y: 780, width: 35, height: 14, moving: true, range: 30, speed: 10 },
            { x: 320, y: 720, width: 35, height: 14, moving: true, range: 35, speed: 10.5 },
            { x: 400, y: 660, width: 35, height: 14, moving: true, range: 40, speed: 11 },
            { x: 480, y: 600, width: 35, height: 14, moving: true, range: 45, speed: 11.5 },
            { x: 560, y: 540, width: 35, height: 14, moving: true, range: 50, speed: 12 },
            { x: 640, y: 480, width: 35, height: 14, moving: true, range: 55, speed: 12.5 },
            { x: 720, y: 420, width: 35, height: 14, moving: true, range: 50, speed: 13 },
            { x: 800, y: 360, width: 35, height: 14, moving: true, range: 45, speed: 13.5 },
            { x: 880, y: 300, width: 35, height: 14, moving: true, range: 40, speed: 14 },
            { x: 960, y: 240, width: 35, height: 14, moving: true, range: 35, speed: 14.5 },
            { x: 1040, y: 180, width: 35, height: 14, moving: true, range: 30, speed: 15 },
            { x: 1120, y: 120, width: 35, height: 14, moving: true, range: 25, speed: 15.5 },
            { x: 1200, y: 80, width: 35, height: 14, moving: true, range: 20, speed: 16 },
            { x: 1280, y: 60, width: 35, height: 14, moving: true, range: 20, speed: 16.5 },
            { x: 1360, y: 60, width: 35, height: 14, moving: true, range: 25, speed: 17 },
            { x: 1440, y: 80, width: 35, height: 14, moving: true, range: 30, speed: 17.5 },
            { x: 1520, y: 120, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 20 }, { x: 120, y: 940, width: 40 },
            { x: 200, y: 940, width: 40 }, { x: 280, y: 940, width: 40 },
            { x: 360, y: 940, width: 40 }, { x: 440, y: 940, width: 40 },
            { x: 520, y: 940, width: 40 }, { x: 600, y: 940, width: 40 },
            { x: 680, y: 940, width: 40 }, { x: 760, y: 940, width: 40 },
            { x: 840, y: 940, width: 40 }, { x: 920, y: 940, width: 40 },
            { x: 1000, y: 940, width: 40 }, { x: 1080, y: 940, width: 40 },
            { x: 1160, y: 940, width: 40 }, { x: 1240, y: 940, width: 40 },
            { x: 1320, y: 940, width: 40 }, { x: 1400, y: 940, width: 40 },
            { x: 1480, y: 940, width: 40 }, { x: 1560, y: 940, width: 40 },
        ],
        saws: [
            { x: 200, y: 700, radius: 20, range: 25, speed: 8 },
            { x: 450, y: 450, radius: 25, range: 30, speed: 9 },
            { x: 700, y: 250, radius: 20, range: 35, speed: 10 },
            { x: 1000, y: 100, radius: 25, range: 25, speed: 11 },
            { x: 1300, y: 50, radius: 20, range: 30, speed: 12 },
        ],
        rotatingSpikes: [
            { x: 350, y: 600, radius: 20, rotationSpeed: 0.18 },
            { x: 650, y: 400, radius: 25, rotationSpeed: 0.15 },
            { x: 950, y: 200, radius: 20, rotationSpeed: 0.18 },
            { x: 1250, y: 100, radius: 25, rotationSpeed: 0.15 },
        ],
        decorations: [
            { x: 800, y: 200, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1540, y: 60 },
    },
    {
        name: "EXTREME: Chaos Run",
        playerStart: { x: 800, y: 500 },
        platforms: [
            { x: 750, y: 540, width: 100, height: 20 },
            { x: 700, y: 460, width: 40, height: 14, moving: true, range: 20, speed: 8 },
            { x: 600, y: 400, width: 35, height: 14, moving: true, range: 25, speed: 8.5 },
            { x: 500, y: 340, width: 35, height: 14, moving: true, range: 30, speed: 9 },
            { x: 400, y: 280, width: 35, height: 14, moving: true, range: 35, speed: 9.5 },
            { x: 300, y: 220, width: 35, height: 14, moving: true, range: 40, speed: 10 },
            { x: 200, y: 160, width: 35, height: 14, moving: true, range: 45, speed: 10.5 },
            { x: 100, y: 120, width: 35, height: 14, moving: true, range: 40, speed: 11 },
            { x: 50, y: 80, width: 35, height: 14, moving: true, range: 35, speed: 11.5 },
            { x: 100, y: 60, width: 35, height: 14, moving: true, range: 30, speed: 12 },
            { x: 200, y: 60, width: 35, height: 14, moving: true, range: 25, speed: 12.5 },
            { x: 300, y: 80, width: 35, height: 14, moving: true, range: 20, speed: 13 },
            { x: 400, y: 120, width: 35, height: 14, moving: true, range: 25, speed: 13.5 },
            { x: 500, y: 180, width: 35, height: 14, moving: true, range: 30, speed: 14 },
            { x: 600, y: 260, width: 35, height: 14, moving: true, range: 35, speed: 14.5 },
            { x: 700, y: 360, width: 35, height: 14, moving: true, range: 40, speed: 15 },
            { x: 800, y: 480, width: 35, height: 14, moving: true, range: 45, speed: 15.5 },
            { x: 900, y: 620, width: 35, height: 14, moving: true, range: 50, speed: 16 },
            { x: 1000, y: 780, width: 35, height: 14, moving: true, range: 55, speed: 16.5 },
            { x: 1100, y: 920, width: 40, height: 14 },
            { x: 1200, y: 860, width: 35, height: 14, moving: true, range: 40, speed: 17 },
            { x: 1300, y: 780, width: 35, height: 14, moving: true, range: 45, speed: 17.5 },
            { x: 1400, y: 680, width: 35, height: 14, moving: true, range: 50, speed: 18 },
            { x: 1500, y: 560, width: 50, height: 14 },
        ],
        spikes: [
            { x: 850, y: 520, width: 30 }, { x: 950, y: 520, width: 40 },
            { x: 750, y: 520, width: 40 }, { x: 650, y: 520, width: 40 },
            { x: 550, y: 520, width: 40 }, { x: 450, y: 520, width: 40 },
            { x: 350, y: 520, width: 40 }, { x: 250, y: 520, width: 40 },
            { x: 150, y: 520, width: 40 }, { x: 50, y: 520, width: 40 },
        ],
        saws: [
            { x: 400, y: 250, radius: 25, range: 35, speed: 9 },
            { x: 700, y: 400, radius: 20, range: 40, speed: 10 },
            { x: 1000, y: 600, radius: 25, range: 45, speed: 11 },
            { x: 1300, y: 800, radius: 20, range: 35, speed: 12 },
        ],
        decorations: [
            { x: 600, y: 300, type: 'gem' }, { x: 1100, y: 600, type: 'star' },
        ],
        goal: { x: 1530, y: 500 },
    },
    {
        name: "EXTREME: Nightmare Mode",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 70, y: 900, width: 35, height: 14, moving: true, range: 18, speed: 10 },
            { x: 140, y: 840, width: 30, height: 14, moving: true, range: 22, speed: 10.5 },
            { x: 210, y: 780, width: 30, height: 14, moving: true, range: 26, speed: 11 },
            { x: 280, y: 720, width: 30, height: 14, moving: true, range: 30, speed: 11.5 },
            { x: 350, y: 660, width: 30, height: 14, moving: true, range: 34, speed: 12 },
            { x: 420, y: 600, width: 30, height: 14, moving: true, range: 38, speed: 12.5 },
            { x: 490, y: 540, width: 30, height: 14, moving: true, range: 42, speed: 13 },
            { x: 560, y: 480, width: 30, height: 14, moving: true, range: 46, speed: 13.5 },
            { x: 630, y: 420, width: 30, height: 14, moving: true, range: 50, speed: 14 },
            { x: 700, y: 360, width: 30, height: 14, moving: true, range: 46, speed: 14.5 },
            { x: 770, y: 300, width: 30, height: 14, moving: true, range: 42, speed: 15 },
            { x: 840, y: 240, width: 30, height: 14, moving: true, range: 38, speed: 15.5 },
            { x: 910, y: 180, width: 30, height: 14, moving: true, range: 34, speed: 16 },
            { x: 980, y: 120, width: 30, height: 14, moving: true, range: 30, speed: 16.5 },
            { x: 1050, y: 80, width: 30, height: 14, moving: true, range: 26, speed: 17 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 17.5 },
            { x: 1190, y: 60, width: 30, height: 14, moving: true, range: 18, speed: 18 },
            { x: 1260, y: 80, width: 30, height: 14, moving: true, range: 22, speed: 18.5 },
            { x: 1330, y: 120, width: 30, height: 14, moving: true, range: 26, speed: 19 },
            { x: 1400, y: 180, width: 30, height: 14, moving: true, range: 30, speed: 19.5 },
            { x: 1470, y: 260, width: 30, height: 14, moving: true, range: 34, speed: 20 },
            { x: 1540, y: 360, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 15 }, { x: 110, y: 940, width: 30 },
            { x: 160, y: 940, width: 30 }, { x: 210, y: 940, width: 30 },
            { x: 260, y: 940, width: 30 }, { x: 310, y: 940, width: 30 },
            { x: 360, y: 940, width: 30 }, { x: 410, y: 940, width: 30 },
            { x: 460, y: 940, width: 30 }, { x: 510, y: 940, width: 30 },
            { x: 560, y: 940, width: 30 }, { x: 610, y: 940, width: 30 },
            { x: 660, y: 940, width: 30 }, { x: 710, y: 940, width: 30 },
            { x: 760, y: 940, width: 30 }, { x: 810, y: 940, width: 30 },
            { x: 860, y: 940, width: 30 }, { x: 910, y: 940, width: 30 },
            { x: 960, y: 940, width: 30 }, { x: 1010, y: 940, width: 30 },
            { x: 1060, y: 940, width: 30 }, { x: 1110, y: 940, width: 30 },
            { x: 1160, y: 940, width: 30 }, { x: 1210, y: 940, width: 30 },
            { x: 1260, y: 940, width: 30 }, { x: 1310, y: 940, width: 30 },
            { x: 1360, y: 940, width: 30 }, { x: 1410, y: 940, width: 30 },
            { x: 1460, y: 940, width: 30 }, { x: 1510, y: 940, width: 30 },
        ],
        saws: [
            { x: 180, y: 700, radius: 18, range: 25, speed: 10 },
            { x: 420, y: 500, radius: 22, range: 30, speed: 11 },
            { x: 660, y: 300, radius: 18, range: 35, speed: 12 },
            { x: 900, y: 150, radius: 22, range: 25, speed: 13 },
            { x: 1150, y: 80, radius: 18, range: 30, speed: 14 },
            { x: 1400, y: 150, radius: 22, range: 35, speed: 15 },
        ],
        rotatingSpikes: [
            { x: 280, y: 600, radius: 18, rotationSpeed: 0.2 },
            { x: 560, y: 400, radius: 22, rotationSpeed: 0.18 },
            { x: 840, y: 200, radius: 18, rotationSpeed: 0.2 },
            { x: 1120, y: 100, radius: 22, rotationSpeed: 0.18 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 300 },
    },
    {
        name: "EXTREME: Bullet Hell",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 100, height: 40 },
            { x: 150, y: 880, width: 50, height: 16, moving: true, range: 30, speed: 5 },
            { x: 300, y: 800, width: 45, height: 15, moving: true, range: 35, speed: 5.5 },
            { x: 450, y: 720, width: 40, height: 15, moving: true, range: 40, speed: 6 },
            { x: 600, y: 640, width: 40, height: 15, moving: true, range: 45, speed: 6.5 },
            { x: 750, y: 560, width: 35, height: 14, moving: true, range: 50, speed: 7 },
            { x: 900, y: 480, width: 35, height: 14, moving: true, range: 55, speed: 7.5 },
            { x: 1050, y: 400, width: 35, height: 14, moving: true, range: 50, speed: 8 },
            { x: 1200, y: 320, width: 35, height: 14, moving: true, range: 45, speed: 8.5 },
            { x: 1350, y: 240, width: 35, height: 14, moving: true, range: 40, speed: 9 },
            { x: 1450, y: 180, width: 35, height: 14, moving: true, range: 35, speed: 9.5 },
            { x: 1400, y: 140, width: 35, height: 14, moving: true, range: 30, speed: 10 },
            { x: 1300, y: 120, width: 35, height: 14, moving: true, range: 25, speed: 10.5 },
            { x: 1200, y: 120, width: 35, height: 14, moving: true, range: 20, speed: 11 },
            { x: 1100, y: 140, width: 35, height: 14, moving: true, range: 25, speed: 11.5 },
            { x: 1000, y: 180, width: 35, height: 14, moving: true, range: 30, speed: 12 },
            { x: 900, y: 240, width: 35, height: 14, moving: true, range: 35, speed: 12.5 },
            { x: 800, y: 320, width: 35, height: 14, moving: true, range: 40, speed: 13 },
            { x: 700, y: 420, width: 35, height: 14, moving: true, range: 45, speed: 13.5 },
            { x: 600, y: 540, width: 35, height: 14, moving: true, range: 50, speed: 14 },
            { x: 500, y: 680, width: 35, height: 14, moving: true, range: 55, speed: 14.5 },
            { x: 400, y: 840, width: 40, height: 14 },
        ],
        spikes: [
            { x: 100, y: 940, width: 60 }, { x: 250, y: 940, width: 60 },
            { x: 400, y: 940, width: 60 }, { x: 550, y: 940, width: 60 },
            { x: 700, y: 940, width: 60 }, { x: 850, y: 940, width: 60 },
            { x: 1000, y: 940, width: 60 }, { x: 1150, y: 940, width: 60 },
            { x: 1300, y: 940, width: 60 }, { x: 1450, y: 940, width: 60 },
        ],
        saws: [
            { x: 250, y: 750, radius: 25, range: 40, speed: 6 },
            { x: 550, y: 500, radius: 30, range: 50, speed: 7 },
            { x: 900, y: 300, radius: 25, range: 40, speed: 8 },
            { x: 1250, y: 150, radius: 30, range: 35, speed: 9 },
            { x: 800, y: 200, radius: 20, range: 30, speed: 10 },
        ],
        rotatingSpikes: [
            { x: 400, y: 650, radius: 25, rotationSpeed: 0.15 },
            { x: 750, y: 400, radius: 30, rotationSpeed: 0.12 },
            { x: 1100, y: 200, radius: 25, rotationSpeed: 0.15 },
        ],
        decorations: [
            { x: 700, y: 250, type: 'gem' }, { x: 1300, y: 200, type: 'star' },
        ],
        goal: { x: 430, y: 780 },
    },
    {
        name: "EXTREME: The Final Stand",
        playerStart: { x: 30, y: 950 },
        platforms: [
            { x: 0, y: 980, width: 60, height: 20 },
            { x: 80, y: 920, width: 40, height: 14, moving: true, range: 20, speed: 9 },
            { x: 160, y: 860, width: 35, height: 14, moving: true, range: 25, speed: 9.5 },
            { x: 240, y: 800, width: 35, height: 14, moving: true, range: 30, speed: 10 },
            { x: 320, y: 740, width: 35, height: 14, moving: true, range: 35, speed: 10.5 },
            { x: 400, y: 680, width: 35, height: 14, moving: true, range: 40, speed: 11 },
            { x: 480, y: 620, width: 35, height: 14, moving: true, range: 45, speed: 11.5 },
            { x: 560, y: 560, width: 35, height: 14, moving: true, range: 50, speed: 12 },
            { x: 640, y: 500, width: 35, height: 14, moving: true, range: 55, speed: 12.5 },
            { x: 720, y: 440, width: 35, height: 14, moving: true, range: 50, speed: 13 },
            { x: 800, y: 380, width: 35, height: 14, moving: true, range: 45, speed: 13.5 },
            { x: 880, y: 320, width: 35, height: 14, moving: true, range: 40, speed: 14 },
            { x: 960, y: 260, width: 35, height: 14, moving: true, range: 35, speed: 14.5 },
            { x: 1040, y: 200, width: 35, height: 14, moving: true, range: 30, speed: 15 },
            { x: 1120, y: 140, width: 35, height: 14, moving: true, range: 25, speed: 15.5 },
            { x: 1200, y: 90, width: 35, height: 14, moving: true, range: 20, speed: 16 },
            { x: 1280, y: 60, width: 35, height: 14, moving: true, range: 20, speed: 16.5 },
            { x: 1360, y: 60, width: 35, height: 14, moving: true, range: 25, speed: 17 },
            { x: 1440, y: 80, width: 35, height: 14, moving: true, range: 30, speed: 17.5 },
            { x: 1520, y: 120, width: 80, height: 14 },
        ],
        spikes: [
            { x: 60, y: 960, width: 20 }, { x: 120, y: 960, width: 40 },
            { x: 200, y: 960, width: 40 }, { x: 280, y: 960, width: 40 },
            { x: 360, y: 960, width: 40 }, { x: 440, y: 960, width: 40 },
            { x: 520, y: 960, width: 40 }, { x: 600, y: 960, width: 40 },
            { x: 680, y: 960, width: 40 }, { x: 760, y: 960, width: 40 },
            { x: 840, y: 960, width: 40 }, { x: 920, y: 960, width: 40 },
            { x: 1000, y: 960, width: 40 }, { x: 1080, y: 960, width: 40 },
            { x: 1160, y: 960, width: 40 }, { x: 1240, y: 960, width: 40 },
            { x: 1320, y: 960, width: 40 }, { x: 1400, y: 960, width: 40 },
            { x: 1480, y: 960, width: 40 }, { x: 1560, y: 960, width: 40 },
        ],
        saws: [
            { x: 200, y: 750, radius: 20, range: 30, speed: 10 },
            { x: 450, y: 500, radius: 25, range: 35, speed: 11 },
            { x: 700, y: 280, radius: 20, range: 40, speed: 12 },
            { x: 1000, y: 120, radius: 25, range: 30, speed: 13 },
            { x: 1300, y: 80, radius: 20, range: 35, speed: 14 },
        ],
        rotatingSpikes: [
            { x: 350, y: 650, radius: 20, rotationSpeed: 0.18 },
            { x: 650, y: 400, radius: 25, rotationSpeed: 0.15 },
            { x: 950, y: 200, radius: 20, rotationSpeed: 0.18 },
            { x: 1250, y: 100, radius: 25, rotationSpeed: 0.15 },
        ],
        decorations: [
            { x: 800, y: 200, type: 'gem' }, { x: 1300, y: 100, type: 'star' },
        ],
        goal: { x: 1540, y: 60 },
    },
    {
        name: "EXTREME: Electric Storm",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 80, y: 900, width: 35, height: 14, moving: true, range: 20, speed: 9 },
            { x: 150, y: 840, width: 30, height: 14, moving: true, range: 25, speed: 9.5 },
            { x: 220, y: 780, width: 30, height: 14, moving: true, range: 30, speed: 10 },
            { x: 290, y: 720, width: 30, height: 14, moving: true, range: 35, speed: 10.5 },
            { x: 360, y: 660, width: 30, height: 14, moving: true, range: 40, speed: 11 },
            { x: 430, y: 600, width: 30, height: 14, moving: true, range: 45, speed: 11.5 },
            { x: 500, y: 540, width: 30, height: 14, moving: true, range: 50, speed: 12 },
            { x: 570, y: 480, width: 30, height: 14, moving: true, range: 45, speed: 12.5 },
            { x: 640, y: 420, width: 30, height: 14, moving: true, range: 40, speed: 13 },
            { x: 710, y: 360, width: 30, height: 14, moving: true, range: 35, speed: 13.5 },
            { x: 780, y: 300, width: 30, height: 14, moving: true, range: 30, speed: 14 },
            { x: 850, y: 240, width: 30, height: 14, moving: true, range: 25, speed: 14.5 },
            { x: 920, y: 180, width: 30, height: 14, moving: true, range: 20, speed: 15 },
            { x: 1000, y: 140, width: 30, height: 14, moving: true, range: 20, speed: 15.5 },
            { x: 1080, y: 120, width: 30, height: 14, moving: true, range: 25, speed: 16 },
            { x: 1160, y: 120, width: 30, height: 14, moving: true, range: 30, speed: 16.5 },
            { x: 1240, y: 140, width: 30, height: 14, moving: true, range: 35, speed: 17 },
            { x: 1320, y: 180, width: 30, height: 14, moving: true, range: 40, speed: 17.5 },
            { x: 1400, y: 240, width: 30, height: 14, moving: true, range: 45, speed: 18 },
            { x: 1480, y: 320, width: 30, height: 14, moving: true, range: 50, speed: 18.5 },
            { x: 1560, y: 420, width: 40, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 20 }, { x: 120, y: 940, width: 30 },
            { x: 180, y: 940, width: 30 }, { x: 240, y: 940, width: 30 },
            { x: 300, y: 940, width: 30 }, { x: 360, y: 940, width: 30 },
            { x: 420, y: 940, width: 30 }, { x: 480, y: 940, width: 30 },
            { x: 540, y: 940, width: 30 }, { x: 600, y: 940, width: 30 },
            { x: 660, y: 940, width: 30 }, { x: 720, y: 940, width: 30 },
            { x: 780, y: 940, width: 30 }, { x: 840, y: 940, width: 30 },
            { x: 900, y: 940, width: 30 }, { x: 960, y: 940, width: 30 },
        ],
        saws: [
            { x: 180, y: 700, radius: 18, range: 25, speed: 11 },
            { x: 420, y: 480, radius: 22, range: 30, speed: 12 },
            { x: 660, y: 280, radius: 18, range: 35, speed: 13 },
            { x: 900, y: 120, radius: 22, range: 25, speed: 14 },
            { x: 1150, y: 80, radius: 18, range: 30, speed: 15 },
        ],
        rotatingSpikes: [
            { x: 280, y: 600, radius: 18, rotationSpeed: 0.2 },
            { x: 560, y: 400, radius: 22, rotationSpeed: 0.18 },
            { x: 840, y: 200, radius: 18, rotationSpeed: 0.2 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1580, y: 360 },
    },
    {
        name: "EXTREME: Thunder Strike",
        playerStart: { x: 50, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 100, height: 40 },
            { x: 150, y: 880, width: 45, height: 16, moving: true, range: 25, speed: 6 },
            { x: 300, y: 800, width: 40, height: 15, moving: true, range: 30, speed: 6.5 },
            { x: 450, y: 720, width: 35, height: 14, moving: true, range: 35, speed: 7 },
            { x: 600, y: 640, width: 35, height: 14, moving: true, range: 40, speed: 7.5 },
            { x: 750, y: 560, width: 35, height: 14, moving: true, range: 45, speed: 8 },
            { x: 900, y: 480, width: 35, height: 14, moving: true, range: 50, speed: 8.5 },
            { x: 1050, y: 400, width: 35, height: 14, moving: true, range: 45, speed: 9 },
            { x: 1200, y: 320, width: 35, height: 14, moving: true, range: 40, speed: 9.5 },
            { x: 1350, y: 240, width: 35, height: 14, moving: true, range: 35, speed: 10 },
            { x: 1450, y: 180, width: 35, height: 14, moving: true, range: 30, speed: 10.5 },
            { x: 1400, y: 140, width: 35, height: 14, moving: true, range: 25, speed: 11 },
            { x: 1300, y: 120, width: 35, height: 14, moving: true, range: 20, speed: 11.5 },
            { x: 1200, y: 120, width: 35, height: 14, moving: true, range: 20, speed: 12 },
            { x: 1100, y: 140, width: 35, height: 14, moving: true, range: 25, speed: 12.5 },
            { x: 1000, y: 180, width: 35, height: 14, moving: true, range: 30, speed: 13 },
            { x: 900, y: 240, width: 35, height: 14, moving: true, range: 35, speed: 13.5 },
            { x: 800, y: 320, width: 35, height: 14, moving: true, range: 40, speed: 14 },
            { x: 700, y: 420, width: 35, height: 14, moving: true, range: 45, speed: 14.5 },
            { x: 600, y: 540, width: 35, height: 14, moving: true, range: 50, speed: 15 },
            { x: 500, y: 680, width: 35, height: 14, moving: true, range: 55, speed: 15.5 },
            { x: 400, y: 840, width: 40, height: 14 },
        ],
        spikes: [
            { x: 100, y: 940, width: 60 }, { x: 250, y: 940, width: 60 },
            { x: 400, y: 940, width: 60 }, { x: 550, y: 940, width: 60 },
            { x: 700, y: 940, width: 60 }, { x: 850, y: 940, width: 60 },
            { x: 1000, y: 940, width: 60 }, { x: 1150, y: 940, width: 60 },
            { x: 1300, y: 940, width: 60 }, { x: 1450, y: 940, width: 60 },
        ],
        saws: [
            { x: 250, y: 700, radius: 25, range: 40, speed: 7 },
            { x: 550, y: 450, radius: 30, range: 50, speed: 8 },
            { x: 900, y: 250, radius: 25, range: 40, speed: 9 },
            { x: 1250, y: 100, radius: 30, range: 35, speed: 10 },
        ],
        decorations: [
            { x: 700, y: 200, type: 'gem' }, { x: 1300, y: 150, type: 'star' },
        ],
        goal: { x: 430, y: 780 },
    },
    {
        name: "EXTREME: Lightning Flash",
        playerStart: { x: 30, y: 950 },
        platforms: [
            { x: 0, y: 980, width: 60, height: 20 },
            { x: 70, y: 920, width: 35, height: 14, moving: true, range: 18, speed: 10 },
            { x: 140, y: 860, width: 30, height: 14, moving: true, range: 22, speed: 10.5 },
            { x: 210, y: 800, width: 30, height: 14, moving: true, range: 26, speed: 11 },
            { x: 280, y: 740, width: 30, height: 14, moving: true, range: 30, speed: 11.5 },
            { x: 350, y: 680, width: 30, height: 14, moving: true, range: 34, speed: 12 },
            { x: 420, y: 620, width: 30, height: 14, moving: true, range: 38, speed: 12.5 },
            { x: 490, y: 560, width: 30, height: 14, moving: true, range: 42, speed: 13 },
            { x: 560, y: 500, width: 30, height: 14, moving: true, range: 46, speed: 13.5 },
            { x: 630, y: 440, width: 30, height: 14, moving: true, range: 50, speed: 14 },
            { x: 700, y: 380, width: 30, height: 14, moving: true, range: 46, speed: 14.5 },
            { x: 770, y: 320, width: 30, height: 14, moving: true, range: 42, speed: 15 },
            { x: 840, y: 260, width: 30, height: 14, moving: true, range: 38, speed: 15.5 },
            { x: 910, y: 200, width: 30, height: 14, moving: true, range: 34, speed: 16 },
            { x: 980, y: 140, width: 30, height: 14, moving: true, range: 30, speed: 16.5 },
            { x: 1050, y: 90, width: 30, height: 14, moving: true, range: 26, speed: 17 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 17.5 },
            { x: 1190, y: 50, width: 30, height: 14, moving: true, range: 18, speed: 18 },
            { x: 1260, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 18.5 },
            { x: 1330, y: 90, width: 30, height: 14, moving: true, range: 26, speed: 19 },
            { x: 1400, y: 140, width: 30, height: 14, moving: true, range: 30, speed: 19.5 },
            { x: 1470, y: 210, width: 30, height: 14, moving: true, range: 34, speed: 20 },
            { x: 1540, y: 300, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 960, width: 15 }, { x: 110, y: 960, width: 30 },
            { x: 160, y: 960, width: 30 }, { x: 210, y: 960, width: 30 },
            { x: 260, y: 960, width: 30 }, { x: 310, y: 960, width: 30 },
            { x: 360, y: 960, width: 30 }, { x: 410, y: 960, width: 30 },
            { x: 460, y: 960, width: 30 }, { x: 510, y: 960, width: 30 },
            { x: 560, y: 960, width: 30 }, { x: 610, y: 960, width: 30 },
            { x: 660, y: 960, width: 30 }, { x: 710, y: 960, width: 30 },
            { x: 760, y: 960, width: 30 }, { x: 810, y: 960, width: 30 },
            { x: 860, y: 960, width: 30 }, { x: 910, y: 960, width: 30 },
        ],
        saws: [
            { x: 180, y: 750, radius: 18, range: 25, speed: 11 },
            { x: 420, y: 550, radius: 22, range: 30, speed: 12 },
            { x: 660, y: 350, radius: 18, range: 35, speed: 13 },
            { x: 900, y: 180, radius: 22, range: 25, speed: 14 },
            { x: 1150, y: 80, radius: 18, range: 30, speed: 15 },
        ],
        rotatingSpikes: [
            { x: 280, y: 650, radius: 18, rotationSpeed: 0.22 },
            { x: 560, y: 450, radius: 22, rotationSpeed: 0.2 },
            { x: 840, y: 250, radius: 18, rotationSpeed: 0.22 },
            { x: 1120, y: 120, radius: 22, rotationSpeed: 0.2 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 240 },
    },
    {
        name: "EXTREME: Inferno",
        playerStart: { x: 800, y: 950 },
        platforms: [
            { x: 750, y: 980, width: 100, height: 20 },
            { x: 700, y: 900, width: 40, height: 14, moving: true, range: 25, speed: 8 },
            { x: 800, y: 820, width: 40, height: 14, moving: true, range: 30, speed: 8.5 },
            { x: 900, y: 740, width: 40, height: 14, moving: true, range: 35, speed: 9 },
            { x: 1000, y: 660, width: 35, height: 14, moving: true, range: 40, speed: 9.5 },
            { x: 1100, y: 580, width: 35, height: 14, moving: true, range: 45, speed: 10 },
            { x: 1200, y: 500, width: 35, height: 14, moving: true, range: 50, speed: 10.5 },
            { x: 1300, y: 420, width: 35, height: 14, moving: true, range: 45, speed: 11 },
            { x: 1400, y: 340, width: 35, height: 14, moving: true, range: 40, speed: 11.5 },
            { x: 1500, y: 260, width: 35, height: 14, moving: true, range: 35, speed: 12 },
            { x: 1550, y: 180, width: 35, height: 14, moving: true, range: 30, speed: 12.5 },
            { x: 1500, y: 120, width: 35, height: 14, moving: true, range: 25, speed: 13 },
            { x: 1400, y: 80, width: 35, height: 14, moving: true, range: 20, speed: 13.5 },
            { x: 1300, y: 60, width: 35, height: 14, moving: true, range: 20, speed: 14 },
            { x: 1200, y: 60, width: 35, height: 14, moving: true, range: 25, speed: 14.5 },
            { x: 1100, y: 80, width: 35, height: 14, moving: true, range: 30, speed: 15 },
            { x: 1000, y: 120, width: 35, height: 14, moving: true, range: 35, speed: 15.5 },
            { x: 900, y: 180, width: 35, height: 14, moving: true, range: 40, speed: 16 },
            { x: 800, y: 260, width: 35, height: 14, moving: true, range: 45, speed: 16.5 },
            { x: 700, y: 360, width: 35, height: 14, moving: true, range: 50, speed: 17 },
            { x: 600, y: 480, width: 35, height: 14, moving: true, range: 55, speed: 17.5 },
            { x: 500, y: 620, width: 35, height: 14, moving: true, range: 60, speed: 18 },
            { x: 400, y: 780, width: 40, height: 14 },
        ],
        spikes: [
            { x: 850, y: 960, width: 30 }, { x: 950, y: 960, width: 30 },
            { x: 1050, y: 960, width: 30 }, { x: 1150, y: 960, width: 30 },
            { x: 1250, y: 960, width: 30 }, { x: 1350, y: 960, width: 30 },
            { x: 1450, y: 960, width: 30 }, { x: 1550, y: 960, width: 30 },
        ],
        saws: [
            { x: 900, y: 600, radius: 25, range: 40, speed: 9 },
            { x: 1200, y: 400, radius: 20, range: 35, speed: 10 },
            { x: 1000, y: 200, radius: 25, range: 30, speed: 11 },
            { x: 700, y: 350, radius: 20, range: 40, speed: 10 },
        ],
        decorations: [
            { x: 900, y: 300, type: 'gem' }, { x: 1300, y: 200, type: 'star' },
        ],
        goal: { x: 430, y: 720 },
    },
    {
        name: "EXTREME: Firestorm",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 70, y: 900, width: 35, height: 14, moving: true, range: 18, speed: 11 },
            { x: 140, y: 840, width: 30, height: 14, moving: true, range: 22, speed: 11.5 },
            { x: 210, y: 780, width: 30, height: 14, moving: true, range: 26, speed: 12 },
            { x: 280, y: 720, width: 30, height: 14, moving: true, range: 30, speed: 12.5 },
            { x: 350, y: 660, width: 30, height: 14, moving: true, range: 34, speed: 13 },
            { x: 420, y: 600, width: 30, height: 14, moving: true, range: 38, speed: 13.5 },
            { x: 490, y: 540, width: 30, height: 14, moving: true, range: 42, speed: 14 },
            { x: 560, y: 480, width: 30, height: 14, moving: true, range: 46, speed: 14.5 },
            { x: 630, y: 420, width: 30, height: 14, moving: true, range: 50, speed: 15 },
            { x: 700, y: 360, width: 30, height: 14, moving: true, range: 46, speed: 15.5 },
            { x: 770, y: 300, width: 30, height: 14, moving: true, range: 42, speed: 16 },
            { x: 840, y: 240, width: 30, height: 14, moving: true, range: 38, speed: 16.5 },
            { x: 910, y: 180, width: 30, height: 14, moving: true, range: 34, speed: 17 },
            { x: 980, y: 120, width: 30, height: 14, moving: true, range: 30, speed: 17.5 },
            { x: 1050, y: 80, width: 30, height: 14, moving: true, range: 26, speed: 18 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 18.5 },
            { x: 1190, y: 60, width: 30, height: 14, moving: true, range: 18, speed: 19 },
            { x: 1260, y: 80, width: 30, height: 14, moving: true, range: 22, speed: 19.5 },
            { x: 1330, y: 120, width: 30, height: 14, moving: true, range: 26, speed: 20 },
            { x: 1400, y: 180, width: 30, height: 14, moving: true, range: 30, speed: 20.5 },
            { x: 1470, y: 260, width: 30, height: 14, moving: true, range: 34, speed: 21 },
            { x: 1540, y: 360, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 15 }, { x: 110, y: 940, width: 30 },
            { x: 160, y: 940, width: 30 }, { x: 210, y: 940, width: 30 },
            { x: 260, y: 940, width: 30 }, { x: 310, y: 940, width: 30 },
            { x: 360, y: 940, width: 30 }, { x: 410, y: 940, width: 30 },
            { x: 460, y: 940, width: 30 }, { x: 510, y: 940, width: 30 },
            { x: 560, y: 940, width: 30 }, { x: 610, y: 940, width: 30 },
            { x: 660, y: 940, width: 30 }, { x: 710, y: 940, width: 30 },
            { x: 760, y: 940, width: 30 }, { x: 810, y: 940, width: 30 },
        ],
        saws: [
            { x: 180, y: 700, radius: 18, range: 25, speed: 12 },
            { x: 420, y: 500, radius: 22, range: 30, speed: 13 },
            { x: 660, y: 300, radius: 18, range: 35, speed: 14 },
            { x: 900, y: 150, radius: 22, range: 25, speed: 15 },
            { x: 1150, y: 70, radius: 18, range: 30, speed: 16 },
        ],
        rotatingSpikes: [
            { x: 280, y: 600, radius: 18, rotationSpeed: 0.25 },
            { x: 560, y: 400, radius: 22, rotationSpeed: 0.22 },
            { x: 840, y: 200, radius: 18, rotationSpeed: 0.25 },
            { x: 1120, y: 100, radius: 22, rotationSpeed: 0.22 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 300 },
    },
    {
        name: "EXTREME: Apocalypse",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 70, y: 900, width: 35, height: 14, moving: true, range: 18, speed: 12 },
            { x: 140, y: 840, width: 30, height: 14, moving: true, range: 22, speed: 12.5 },
            { x: 210, y: 780, width: 30, height: 14, moving: true, range: 26, speed: 13 },
            { x: 280, y: 720, width: 30, height: 14, moving: true, range: 30, speed: 13.5 },
            { x: 350, y: 660, width: 30, height: 14, moving: true, range: 34, speed: 14 },
            { x: 420, y: 600, width: 30, height: 14, moving: true, range: 38, speed: 14.5 },
            { x: 490, y: 540, width: 30, height: 14, moving: true, range: 42, speed: 15 },
            { x: 560, y: 480, width: 30, height: 14, moving: true, range: 46, speed: 15.5 },
            { x: 630, y: 420, width: 30, height: 14, moving: true, range: 50, speed: 16 },
            { x: 700, y: 360, width: 30, height: 14, moving: true, range: 46, speed: 16.5 },
            { x: 770, y: 300, width: 30, height: 14, moving: true, range: 42, speed: 17 },
            { x: 840, y: 240, width: 30, height: 14, moving: true, range: 38, speed: 17.5 },
            { x: 910, y: 180, width: 30, height: 14, moving: true, range: 34, speed: 18 },
            { x: 980, y: 120, width: 30, height: 14, moving: true, range: 30, speed: 18.5 },
            { x: 1050, y: 80, width: 30, height: 14, moving: true, range: 26, speed: 19 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 19.5 },
            { x: 1190, y: 60, width: 30, height: 14, moving: true, range: 18, speed: 20 },
            { x: 1260, y: 80, width: 30, height: 14, moving: true, range: 22, speed: 20.5 },
            { x: 1330, y: 120, width: 30, height: 14, moving: true, range: 26, speed: 21 },
            { x: 1400, y: 180, width: 30, height: 14, moving: true, range: 30, speed: 21.5 },
            { x: 1470, y: 260, width: 30, height: 14, moving: true, range: 34, speed: 22 },
            { x: 1540, y: 360, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 15 }, { x: 110, y: 940, width: 30 },
            { x: 160, y: 940, width: 30 }, { x: 210, y: 940, width: 30 },
            { x: 260, y: 940, width: 30 }, { x: 310, y: 940, width: 30 },
            { x: 360, y: 940, width: 30 }, { x: 410, y: 940, width: 30 },
            { x: 460, y: 940, width: 30 }, { x: 510, y: 940, width: 30 },
            { x: 560, y: 940, width: 30 }, { x: 610, y: 940, width: 30 },
            { x: 660, y: 940, width: 30 }, { x: 710, y: 940, width: 30 },
            { x: 760, y: 940, width: 30 }, { x: 810, y: 940, width: 30 },
        ],
        saws: [
            { x: 180, y: 700, radius: 18, range: 25, speed: 13 },
            { x: 420, y: 500, radius: 22, range: 30, speed: 14 },
            { x: 660, y: 300, radius: 18, range: 35, speed: 15 },
            { x: 900, y: 150, radius: 22, range: 25, speed: 16 },
            { x: 1150, y: 70, radius: 18, range: 30, speed: 17 },
        ],
        rotatingSpikes: [
            { x: 280, y: 600, radius: 18, rotationSpeed: 0.28 },
            { x: 560, y: 400, radius: 22, rotationSpeed: 0.25 },
            { x: 840, y: 200, radius: 18, rotationSpeed: 0.28 },
            { x: 1120, y: 100, radius: 22, rotationSpeed: 0.25 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 300 },
    },
    {
        name: "EXTREME: Cataclysm",
        playerStart: { x: 50, y: 100 },
        platforms: [
            { x: 0, y: 160, width: 100, height: 20 },
            { x: 150, y: 220, width: 40, height: 14, moving: true, range: 25, speed: 7 },
            { x: 280, y: 300, width: 35, height: 14, moving: true, range: 30, speed: 7.5 },
            { x: 410, y: 380, width: 35, height: 14, moving: true, range: 35, speed: 8 },
            { x: 540, y: 460, width: 35, height: 14, moving: true, range: 40, speed: 8.5 },
            { x: 670, y: 540, width: 35, height: 14, moving: true, range: 45, speed: 9 },
            { x: 800, y: 620, width: 35, height: 14, moving: true, range: 50, speed: 9.5 },
            { x: 930, y: 700, width: 35, height: 14, moving: true, range: 55, speed: 10 },
            { x: 1060, y: 780, width: 35, height: 14, moving: true, range: 50, speed: 10.5 },
            { x: 1190, y: 860, width: 35, height: 14, moving: true, range: 45, speed: 11 },
            { x: 1320, y: 920, width: 35, height: 14, moving: true, range: 40, speed: 11.5 },
            { x: 1450, y: 960, width: 50, height: 14 },
            { x: 1400, y: 880, width: 35, height: 14, moving: true, range: 30, speed: 12 },
            { x: 1300, y: 800, width: 35, height: 14, moving: true, range: 25, speed: 12.5 },
            { x: 1200, y: 720, width: 35, height: 14, moving: true, range: 20, speed: 13 },
            { x: 1100, y: 640, width: 35, height: 14, moving: true, range: 20, speed: 13.5 },
            { x: 1000, y: 560, width: 35, height: 14, moving: true, range: 25, speed: 14 },
            { x: 900, y: 480, width: 35, height: 14, moving: true, range: 30, speed: 14.5 },
            { x: 800, y: 400, width: 35, height: 14, moving: true, range: 35, speed: 15 },
            { x: 700, y: 320, width: 35, height: 14, moving: true, range: 40, speed: 15.5 },
            { x: 600, y: 240, width: 35, height: 14, moving: true, range: 45, speed: 16 },
            { x: 500, y: 160, width: 35, height: 14, moving: true, range: 50, speed: 16.5 },
            { x: 400, y: 80, width: 35, height: 14, moving: true, range: 55, speed: 17 },
            { x: 300, y: 60, width: 35, height: 14, moving: true, range: 50, speed: 17.5 },
            { x: 200, y: 80, width: 40, height: 14 },
        ],
        spikes: [
            { x: 100, y: 140, width: 30 }, { x: 200, y: 140, width: 40 },
            { x: 300, y: 140, width: 40 }, { x: 400, y: 140, width: 40 },
            { x: 500, y: 140, width: 40 }, { x: 600, y: 140, width: 40 },
            { x: 700, y: 140, width: 40 }, { x: 800, y: 140, width: 40 },
            { x: 900, y: 140, width: 40 }, { x: 1000, y: 140, width: 40 },
            { x: 1100, y: 140, width: 40 }, { x: 1200, y: 140, width: 40 },
            { x: 1300, y: 140, width: 40 }, { x: 1400, y: 140, width: 40 },
        ],
        saws: [
            { x: 300, y: 250, radius: 20, range: 30, speed: 8 },
            { x: 600, y: 450, radius: 25, range: 40, speed: 9 },
            { x: 900, y: 650, radius: 20, range: 35, speed: 10 },
            { x: 1200, y: 850, radius: 25, range: 30, speed: 11 },
        ],
        decorations: [
            { x: 700, y: 300, type: 'gem' }, { x: 1200, y: 500, type: 'star' },
        ],
        goal: { x: 230, y: 20 },
    },
    {
        name: "EXTREME: Devastation",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 70, y: 900, width: 35, height: 14, moving: true, range: 18, speed: 13 },
            { x: 140, y: 840, width: 30, height: 14, moving: true, range: 22, speed: 13.5 },
            { x: 210, y: 780, width: 30, height: 14, moving: true, range: 26, speed: 14 },
            { x: 280, y: 720, width: 30, height: 14, moving: true, range: 30, speed: 14.5 },
            { x: 350, y: 660, width: 30, height: 14, moving: true, range: 34, speed: 15 },
            { x: 420, y: 600, width: 30, height: 14, moving: true, range: 38, speed: 15.5 },
            { x: 490, y: 540, width: 30, height: 14, moving: true, range: 42, speed: 16 },
            { x: 560, y: 480, width: 30, height: 14, moving: true, range: 46, speed: 16.5 },
            { x: 630, y: 420, width: 30, height: 14, moving: true, range: 50, speed: 17 },
            { x: 700, y: 360, width: 30, height: 14, moving: true, range: 46, speed: 17.5 },
            { x: 770, y: 300, width: 30, height: 14, moving: true, range: 42, speed: 18 },
            { x: 840, y: 240, width: 30, height: 14, moving: true, range: 38, speed: 18.5 },
            { x: 910, y: 180, width: 30, height: 14, moving: true, range: 34, speed: 19 },
            { x: 980, y: 120, width: 30, height: 14, moving: true, range: 30, speed: 19.5 },
            { x: 1050, y: 80, width: 30, height: 14, moving: true, range: 26, speed: 20 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 20.5 },
            { x: 1190, y: 60, width: 30, height: 14, moving: true, range: 18, speed: 21 },
            { x: 1260, y: 80, width: 30, height: 14, moving: true, range: 22, speed: 21.5 },
            { x: 1330, y: 120, width: 30, height: 14, moving: true, range: 26, speed: 22 },
            { x: 1400, y: 180, width: 30, height: 14, moving: true, range: 30, speed: 22.5 },
            { x: 1470, y: 260, width: 30, height: 14, moving: true, range: 34, speed: 23 },
            { x: 1540, y: 360, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 15 }, { x: 110, y: 940, width: 30 },
            { x: 160, y: 940, width: 30 }, { x: 210, y: 940, width: 30 },
            { x: 260, y: 940, width: 30 }, { x: 310, y: 940, width: 30 },
            { x: 360, y: 940, width: 30 }, { x: 410, y: 940, width: 30 },
            { x: 460, y: 940, width: 30 }, { x: 510, y: 940, width: 30 },
            { x: 560, y: 940, width: 30 }, { x: 610, y: 940, width: 30 },
            { x: 660, y: 940, width: 30 }, { x: 710, y: 940, width: 30 },
        ],
        saws: [
            { x: 180, y: 700, radius: 18, range: 25, speed: 14 },
            { x: 420, y: 500, radius: 22, range: 30, speed: 15 },
            { x: 660, y: 300, radius: 18, range: 35, speed: 16 },
            { x: 900, y: 150, radius: 22, range: 25, speed: 17 },
            { x: 1150, y: 70, radius: 18, range: 30, speed: 18 },
        ],
        rotatingSpikes: [
            { x: 280, y: 600, radius: 18, rotationSpeed: 0.3 },
            { x: 560, y: 400, radius: 22, rotationSpeed: 0.28 },
            { x: 840, y: 200, radius: 18, rotationSpeed: 0.3 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 300 },
    },
    {
        name: "EXTREME: Annihilation",
        playerStart: { x: 30, y: 950 },
        platforms: [
            { x: 0, y: 980, width: 60, height: 20 },
            { x: 70, y: 920, width: 35, height: 14, moving: true, range: 18, speed: 14 },
            { x: 140, y: 860, width: 30, height: 14, moving: true, range: 22, speed: 14.5 },
            { x: 210, y: 800, width: 30, height: 14, moving: true, range: 26, speed: 15 },
            { x: 280, y: 740, width: 30, height: 14, moving: true, range: 30, speed: 15.5 },
            { x: 350, y: 680, width: 30, height: 14, moving: true, range: 34, speed: 16 },
            { x: 420, y: 620, width: 30, height: 14, moving: true, range: 38, speed: 16.5 },
            { x: 490, y: 560, width: 30, height: 14, moving: true, range: 42, speed: 17 },
            { x: 560, y: 500, width: 30, height: 14, moving: true, range: 46, speed: 17.5 },
            { x: 630, y: 440, width: 30, height: 14, moving: true, range: 50, speed: 18 },
            { x: 700, y: 380, width: 30, height: 14, moving: true, range: 46, speed: 18.5 },
            { x: 770, y: 320, width: 30, height: 14, moving: true, range: 42, speed: 19 },
            { x: 840, y: 260, width: 30, height: 14, moving: true, range: 38, speed: 19.5 },
            { x: 910, y: 200, width: 30, height: 14, moving: true, range: 34, speed: 20 },
            { x: 980, y: 140, width: 30, height: 14, moving: true, range: 30, speed: 20.5 },
            { x: 1050, y: 90, width: 30, height: 14, moving: true, range: 26, speed: 21 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 21.5 },
            { x: 1190, y: 50, width: 30, height: 14, moving: true, range: 18, speed: 22 },
            { x: 1260, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 22.5 },
            { x: 1330, y: 90, width: 30, height: 14, moving: true, range: 26, speed: 23 },
            { x: 1400, y: 140, width: 30, height: 14, moving: true, range: 30, speed: 23.5 },
            { x: 1470, y: 210, width: 30, height: 14, moving: true, range: 34, speed: 24 },
            { x: 1540, y: 300, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 960, width: 15 }, { x: 110, y: 960, width: 30 },
            { x: 160, y: 960, width: 30 }, { x: 210, y: 960, width: 30 },
            { x: 260, y: 960, width: 30 }, { x: 310, y: 960, width: 30 },
            { x: 360, y: 960, width: 30 }, { x: 410, y: 960, width: 30 },
            { x: 460, y: 960, width: 30 }, { x: 510, y: 960, width: 30 },
            { x: 560, y: 960, width: 30 }, { x: 610, y: 960, width: 30 },
        ],
        saws: [
            { x: 180, y: 750, radius: 18, range: 25, speed: 15 },
            { x: 420, y: 550, radius: 22, range: 30, speed: 16 },
            { x: 660, y: 350, radius: 18, range: 35, speed: 17 },
            { x: 900, y: 180, radius: 22, range: 25, speed: 18 },
            { x: 1150, y: 80, radius: 18, range: 30, speed: 19 },
        ],
        rotatingSpikes: [
            { x: 280, y: 650, radius: 18, rotationSpeed: 0.32 },
            { x: 560, y: 450, radius: 22, rotationSpeed: 0.3 },
            { x: 840, y: 250, radius: 18, rotationSpeed: 0.32 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 240 },
    },
    {
        name: "EXTREME: The End",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 70, y: 900, width: 35, height: 14, moving: true, range: 18, speed: 15 },
            { x: 140, y: 840, width: 30, height: 14, moving: true, range: 22, speed: 15.5 },
            { x: 210, y: 780, width: 30, height: 14, moving: true, range: 26, speed: 16 },
            { x: 280, y: 720, width: 30, height: 14, moving: true, range: 30, speed: 16.5 },
            { x: 350, y: 660, width: 30, height: 14, moving: true, range: 34, speed: 17 },
            { x: 420, y: 600, width: 30, height: 14, moving: true, range: 38, speed: 17.5 },
            { x: 490, y: 540, width: 30, height: 14, moving: true, range: 42, speed: 18 },
            { x: 560, y: 480, width: 30, height: 14, moving: true, range: 46, speed: 18.5 },
            { x: 630, y: 420, width: 30, height: 14, moving: true, range: 50, speed: 19 },
            { x: 700, y: 360, width: 30, height: 14, moving: true, range: 46, speed: 19.5 },
            { x: 770, y: 300, width: 30, height: 14, moving: true, range: 42, speed: 20 },
            { x: 840, y: 240, width: 30, height: 14, moving: true, range: 38, speed: 20.5 },
            { x: 910, y: 180, width: 30, height: 14, moving: true, range: 34, speed: 21 },
            { x: 980, y: 120, width: 30, height: 14, moving: true, range: 30, speed: 21.5 },
            { x: 1050, y: 80, width: 30, height: 14, moving: true, range: 26, speed: 22 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 22.5 },
            { x: 1190, y: 60, width: 30, height: 14, moving: true, range: 18, speed: 23 },
            { x: 1260, y: 80, width: 30, height: 14, moving: true, range: 22, speed: 23.5 },
            { x: 1330, y: 120, width: 30, height: 14, moving: true, range: 26, speed: 24 },
            { x: 1400, y: 180, width: 30, height: 14, moving: true, range: 30, speed: 24.5 },
            { x: 1470, y: 260, width: 30, height: 14, moving: true, range: 34, speed: 25 },
            { x: 1540, y: 360, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 15 }, { x: 110, y: 940, width: 30 },
            { x: 160, y: 940, width: 30 }, { x: 210, y: 940, width: 30 },
            { x: 260, y: 940, width: 30 }, { x: 310, y: 940, width: 30 },
            { x: 360, y: 940, width: 30 }, { x: 410, y: 940, width: 30 },
            { x: 460, y: 940, width: 30 }, { x: 510, y: 940, width: 30 },
            { x: 560, y: 940, width: 30 }, { x: 610, y: 940, width: 30 },
        ],
        saws: [
            { x: 180, y: 700, radius: 18, range: 25, speed: 16 },
            { x: 420, y: 500, radius: 22, range: 30, speed: 17 },
            { x: 660, y: 300, radius: 18, range: 35, speed: 18 },
            { x: 900, y: 150, radius: 22, range: 25, speed: 19 },
            { x: 1150, y: 70, radius: 18, range: 30, speed: 20 },
        ],
        rotatingSpikes: [
            { x: 280, y: 600, radius: 18, rotationSpeed: 0.35 },
            { x: 560, y: 400, radius: 22, rotationSpeed: 0.32 },
            { x: 840, y: 200, radius: 18, rotationSpeed: 0.35 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 300 },
    },
    {
        name: "EXTREME: Oblivion",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 70, y: 900, width: 35, height: 14, moving: true, range: 18, speed: 16 },
            { x: 140, y: 840, width: 30, height: 14, moving: true, range: 22, speed: 16.5 },
            { x: 210, y: 780, width: 30, height: 14, moving: true, range: 26, speed: 17 },
            { x: 280, y: 720, width: 30, height: 14, moving: true, range: 30, speed: 17.5 },
            { x: 350, y: 660, width: 30, height: 14, moving: true, range: 34, speed: 18 },
            { x: 420, y: 600, width: 30, height: 14, moving: true, range: 38, speed: 18.5 },
            { x: 490, y: 540, width: 30, height: 14, moving: true, range: 42, speed: 19 },
            { x: 560, y: 480, width: 30, height: 14, moving: true, range: 46, speed: 19.5 },
            { x: 630, y: 420, width: 30, height: 14, moving: true, range: 50, speed: 20 },
            { x: 700, y: 360, width: 30, height: 14, moving: true, range: 46, speed: 20.5 },
            { x: 770, y: 300, width: 30, height: 14, moving: true, range: 42, speed: 21 },
            { x: 840, y: 240, width: 30, height: 14, moving: true, range: 38, speed: 21.5 },
            { x: 910, y: 180, width: 30, height: 14, moving: true, range: 34, speed: 22 },
            { x: 980, y: 120, width: 30, height: 14, moving: true, range: 30, speed: 22.5 },
            { x: 1050, y: 80, width: 30, height: 14, moving: true, range: 26, speed: 23 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 23.5 },
            { x: 1190, y: 60, width: 30, height: 14, moving: true, range: 18, speed: 24 },
            { x: 1260, y: 80, width: 30, height: 14, moving: true, range: 22, speed: 24.5 },
            { x: 1330, y: 120, width: 30, height: 14, moving: true, range: 26, speed: 25 },
            { x: 1400, y: 180, width: 30, height: 14, moving: true, range: 30, speed: 25.5 },
            { x: 1470, y: 260, width: 30, height: 14, moving: true, range: 34, speed: 26 },
            { x: 1540, y: 360, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 15 }, { x: 110, y: 940, width: 30 },
            { x: 160, y: 940, width: 30 }, { x: 210, y: 940, width: 30 },
            { x: 260, y: 940, width: 30 }, { x: 310, y: 940, width: 30 },
            { x: 360, y: 940, width: 30 }, { x: 410, y: 940, width: 30 },
        ],
        saws: [
            { x: 180, y: 700, radius: 18, range: 25, speed: 17 },
            { x: 420, y: 500, radius: 22, range: 30, speed: 18 },
            { x: 660, y: 300, radius: 18, range: 35, speed: 19 },
            { x: 900, y: 150, radius: 22, range: 25, speed: 20 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 300 },
    },
    {
        name: "EXTREME: Void",
        playerStart: { x: 800, y: 500 },
        platforms: [
            { x: 750, y: 540, width: 100, height: 20 },
            { x: 700, y: 460, width: 40, height: 14, moving: true, range: 20, speed: 15 },
            { x: 600, y: 400, width: 35, height: 14, moving: true, range: 25, speed: 15.5 },
            { x: 500, y: 340, width: 35, height: 14, moving: true, range: 30, speed: 16 },
            { x: 400, y: 280, width: 35, height: 14, moving: true, range: 35, speed: 16.5 },
            { x: 300, y: 220, width: 35, height: 14, moving: true, range: 40, speed: 17 },
            { x: 200, y: 160, width: 35, height: 14, moving: true, range: 45, speed: 17.5 },
            { x: 100, y: 120, width: 35, height: 14, moving: true, range: 40, speed: 18 },
            { x: 50, y: 80, width: 35, height: 14, moving: true, range: 35, speed: 18.5 },
            { x: 100, y: 60, width: 35, height: 14, moving: true, range: 30, speed: 19 },
            { x: 200, y: 60, width: 35, height: 14, moving: true, range: 25, speed: 19.5 },
            { x: 300, y: 80, width: 35, height: 14, moving: true, range: 20, speed: 20 },
            { x: 400, y: 120, width: 35, height: 14, moving: true, range: 25, speed: 20.5 },
            { x: 500, y: 180, width: 35, height: 14, moving: true, range: 30, speed: 21 },
            { x: 600, y: 260, width: 35, height: 14, moving: true, range: 35, speed: 21.5 },
            { x: 700, y: 360, width: 35, height: 14, moving: true, range: 40, speed: 22 },
            { x: 800, y: 480, width: 35, height: 14, moving: true, range: 45, speed: 22.5 },
            { x: 900, y: 620, width: 35, height: 14, moving: true, range: 50, speed: 23 },
            { x: 1000, y: 780, width: 35, height: 14, moving: true, range: 55, speed: 23.5 },
            { x: 1100, y: 920, width: 40, height: 14 },
            { x: 1200, y: 860, width: 35, height: 14, moving: true, range: 40, speed: 24 },
            { x: 1300, y: 780, width: 35, height: 14, moving: true, range: 45, speed: 24.5 },
            { x: 1400, y: 680, width: 35, height: 14, moving: true, range: 50, speed: 25 },
            { x: 1500, y: 560, width: 50, height: 14 },
        ],
        spikes: [
            { x: 850, y: 520, width: 30 }, { x: 950, y: 520, width: 40 },
            { x: 750, y: 520, width: 40 }, { x: 650, y: 520, width: 40 },
        ],
        saws: [
            { x: 400, y: 250, radius: 25, range: 35, speed: 16 },
            { x: 700, y: 400, radius: 20, range: 40, speed: 17 },
            { x: 1000, y: 600, radius: 25, range: 45, speed: 18 },
            { x: 1300, y: 800, radius: 20, range: 35, speed: 19 },
        ],
        decorations: [
            { x: 600, y: 300, type: 'gem' }, { x: 1100, y: 600, type: 'star' },
        ],
        goal: { x: 1530, y: 500 },
    },
    {
        name: "EXTREME: Quantum",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 70, y: 900, width: 35, height: 14, moving: true, range: 18, speed: 17 },
            { x: 140, y: 840, width: 30, height: 14, moving: true, range: 22, speed: 17.5 },
            { x: 210, y: 780, width: 30, height: 14, moving: true, range: 26, speed: 18 },
            { x: 280, y: 720, width: 30, height: 14, moving: true, range: 30, speed: 18.5 },
            { x: 350, y: 660, width: 30, height: 14, moving: true, range: 34, speed: 19 },
            { x: 420, y: 600, width: 30, height: 14, moving: true, range: 38, speed: 19.5 },
            { x: 490, y: 540, width: 30, height: 14, moving: true, range: 42, speed: 20 },
            { x: 560, y: 480, width: 30, height: 14, moving: true, range: 46, speed: 20.5 },
            { x: 630, y: 420, width: 30, height: 14, moving: true, range: 50, speed: 21 },
            { x: 700, y: 360, width: 30, height: 14, moving: true, range: 46, speed: 21.5 },
            { x: 770, y: 300, width: 30, height: 14, moving: true, range: 42, speed: 22 },
            { x: 840, y: 240, width: 30, height: 14, moving: true, range: 38, speed: 22.5 },
            { x: 910, y: 180, width: 30, height: 14, moving: true, range: 34, speed: 23 },
            { x: 980, y: 120, width: 30, height: 14, moving: true, range: 30, speed: 23.5 },
            { x: 1050, y: 80, width: 30, height: 14, moving: true, range: 26, speed: 24 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 24.5 },
            { x: 1190, y: 60, width: 30, height: 14, moving: true, range: 18, speed: 25 },
            { x: 1260, y: 80, width: 30, height: 14, moving: true, range: 22, speed: 25.5 },
            { x: 1330, y: 120, width: 30, height: 14, moving: true, range: 26, speed: 26 },
            { x: 1400, y: 180, width: 30, height: 14, moving: true, range: 30, speed: 26.5 },
            { x: 1470, y: 260, width: 30, height: 14, moving: true, range: 34, speed: 27 },
            { x: 1540, y: 360, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 15 }, { x: 110, y: 940, width: 30 },
            { x: 160, y: 940, width: 30 }, { x: 210, y: 940, width: 30 },
        ],
        saws: [
            { x: 180, y: 700, radius: 18, range: 25, speed: 18 },
            { x: 420, y: 500, radius: 22, range: 30, speed: 19 },
            { x: 660, y: 300, radius: 18, range: 35, speed: 20 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 300 },
    },
    {
        name: "EXTREME: Singularity",
        playerStart: { x: 30, y: 950 },
        platforms: [
            { x: 0, y: 980, width: 60, height: 20 },
            { x: 70, y: 920, width: 35, height: 14, moving: true, range: 18, speed: 18 },
            { x: 140, y: 860, width: 30, height: 14, moving: true, range: 22, speed: 18.5 },
            { x: 210, y: 800, width: 30, height: 14, moving: true, range: 26, speed: 19 },
            { x: 280, y: 740, width: 30, height: 14, moving: true, range: 30, speed: 19.5 },
            { x: 350, y: 680, width: 30, height: 14, moving: true, range: 34, speed: 20 },
            { x: 420, y: 620, width: 30, height: 14, moving: true, range: 38, speed: 20.5 },
            { x: 490, y: 560, width: 30, height: 14, moving: true, range: 42, speed: 21 },
            { x: 560, y: 500, width: 30, height: 14, moving: true, range: 46, speed: 21.5 },
            { x: 630, y: 440, width: 30, height: 14, moving: true, range: 50, speed: 22 },
            { x: 700, y: 380, width: 30, height: 14, moving: true, range: 46, speed: 22.5 },
            { x: 770, y: 320, width: 30, height: 14, moving: true, range: 42, speed: 23 },
            { x: 840, y: 260, width: 30, height: 14, moving: true, range: 38, speed: 23.5 },
            { x: 910, y: 200, width: 30, height: 14, moving: true, range: 34, speed: 24 },
            { x: 980, y: 140, width: 30, height: 14, moving: true, range: 30, speed: 24.5 },
            { x: 1050, y: 90, width: 30, height: 14, moving: true, range: 26, speed: 25 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 25.5 },
            { x: 1190, y: 50, width: 30, height: 14, moving: true, range: 18, speed: 26 },
            { x: 1260, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 26.5 },
            { x: 1330, y: 90, width: 30, height: 14, moving: true, range: 26, speed: 27 },
            { x: 1400, y: 140, width: 30, height: 14, moving: true, range: 30, speed: 27.5 },
            { x: 1470, y: 210, width: 30, height: 14, moving: true, range: 34, speed: 28 },
            { x: 1540, y: 300, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 960, width: 15 }, { x: 110, y: 960, width: 30 },
        ],
        saws: [
            { x: 180, y: 750, radius: 18, range: 25, speed: 19 },
            { x: 420, y: 550, radius: 22, range: 30, speed: 20 },
            { x: 660, y: 350, radius: 18, range: 35, speed: 21 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 240 },
    },
    {
        name: "EXTREME: Horizon",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 70, y: 900, width: 35, height: 14, moving: true, range: 18, speed: 19 },
            { x: 140, y: 840, width: 30, height: 14, moving: true, range: 22, speed: 19.5 },
            { x: 210, y: 780, width: 30, height: 14, moving: true, range: 26, speed: 20 },
            { x: 280, y: 720, width: 30, height: 14, moving: true, range: 30, speed: 20.5 },
            { x: 350, y: 660, width: 30, height: 14, moving: true, range: 34, speed: 21 },
            { x: 420, y: 600, width: 30, height: 14, moving: true, range: 38, speed: 21.5 },
            { x: 490, y: 540, width: 30, height: 14, moving: true, range: 42, speed: 22 },
            { x: 560, y: 480, width: 30, height: 14, moving: true, range: 46, speed: 22.5 },
            { x: 630, y: 420, width: 30, height: 14, moving: true, range: 50, speed: 23 },
            { x: 700, y: 360, width: 30, height: 14, moving: true, range: 46, speed: 23.5 },
            { x: 770, y: 300, width: 30, height: 14, moving: true, range: 42, speed: 24 },
            { x: 840, y: 240, width: 30, height: 14, moving: true, range: 38, speed: 24.5 },
            { x: 910, y: 180, width: 30, height: 14, moving: true, range: 34, speed: 25 },
            { x: 980, y: 120, width: 30, height: 14, moving: true, range: 30, speed: 25.5 },
            { x: 1050, y: 80, width: 30, height: 14, moving: true, range: 26, speed: 26 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 26.5 },
            { x: 1190, y: 60, width: 30, height: 14, moving: true, range: 18, speed: 27 },
            { x: 1260, y: 80, width: 30, height: 14, moving: true, range: 22, speed: 27.5 },
            { x: 1330, y: 120, width: 30, height: 14, moving: true, range: 26, speed: 28 },
            { x: 1400, y: 180, width: 30, height: 14, moving: true, range: 30, speed: 28.5 },
            { x: 1470, y: 260, width: 30, height: 14, moving: true, range: 34, speed: 29 },
            { x: 1540, y: 360, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 15 }, { x: 110, y: 940, width: 30 },
        ],
        saws: [
            { x: 180, y: 700, radius: 18, range: 25, speed: 20 },
            { x: 420, y: 500, radius: 22, range: 30, speed: 21 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 300 },
    },
    {
        name: "EXTREME: Beyond",
        playerStart: { x: 30, y: 900 },
        platforms: [
            { x: 0, y: 960, width: 60, height: 40 },
            { x: 70, y: 900, width: 35, height: 14, moving: true, range: 18, speed: 20 },
            { x: 140, y: 840, width: 30, height: 14, moving: true, range: 22, speed: 20.5 },
            { x: 210, y: 780, width: 30, height: 14, moving: true, range: 26, speed: 21 },
            { x: 280, y: 720, width: 30, height: 14, moving: true, range: 30, speed: 21.5 },
            { x: 350, y: 660, width: 30, height: 14, moving: true, range: 34, speed: 22 },
            { x: 420, y: 600, width: 30, height: 14, moving: true, range: 38, speed: 22.5 },
            { x: 490, y: 540, width: 30, height: 14, moving: true, range: 42, speed: 23 },
            { x: 560, y: 480, width: 30, height: 14, moving: true, range: 46, speed: 23.5 },
            { x: 630, y: 420, width: 30, height: 14, moving: true, range: 50, speed: 24 },
            { x: 700, y: 360, width: 30, height: 14, moving: true, range: 46, speed: 24.5 },
            { x: 770, y: 300, width: 30, height: 14, moving: true, range: 42, speed: 25 },
            { x: 840, y: 240, width: 30, height: 14, moving: true, range: 38, speed: 25.5 },
            { x: 910, y: 180, width: 30, height: 14, moving: true, range: 34, speed: 26 },
            { x: 980, y: 120, width: 30, height: 14, moving: true, range: 30, speed: 26.5 },
            { x: 1050, y: 80, width: 30, height: 14, moving: true, range: 26, speed: 27 },
            { x: 1120, y: 60, width: 30, height: 14, moving: true, range: 22, speed: 27.5 },
            { x: 1190, y: 60, width: 30, height: 14, moving: true, range: 18, speed: 28 },
            { x: 1260, y: 80, width: 30, height: 14, moving: true, range: 22, speed: 28.5 },
            { x: 1330, y: 120, width: 30, height: 14, moving: true, range: 26, speed: 29 },
            { x: 1400, y: 180, width: 30, height: 14, moving: true, range: 30, speed: 29.5 },
            { x: 1470, y: 260, width: 30, height: 14, moving: true, range: 34, speed: 30 },
            { x: 1540, y: 360, width: 60, height: 14 },
        ],
        spikes: [
            { x: 60, y: 940, width: 15 },
        ],
        saws: [
            { x: 180, y: 700, radius: 18, range: 25, speed: 21 },
        ],
        decorations: [
            { x: 800, y: 150, type: 'gem' }, { x: 1200, y: 100, type: 'star' },
        ],
        goal: { x: 1560, y: 300 },
    },
];

let secretRoomUnlocked = false;
let inSecretRoom = false;

// ============================================
// GAME CLASS
// ============================================
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ui = document.getElementById('ui');
        this.levelDisplay = document.getElementById('levelDisplay');
        this.doubleJumpDisplay = document.getElementById('doubleJumpDisplay');
        this.messageDiv = document.getElementById('message');
        this.lastTime = null;
        
        this.input = new InputHandler();
        this.particles = new ParticleSystem();
        this.levelManager = new LevelManager();
        
        this.player = null;
        this.gameState = 'playing';
        this.message = '';
        this.messageTimer = 0;
        this.paused = false;
        
        this.timeRewind = {
            enabled: true,
            cooldown: 0,
            maxCooldown: 600,
            maxStates: 180,
            states: [],
            rewinding: false,
            rewindProgress: 0
        };
        
        this.portal = {
            enabled: true,
            cooldown: 0,
            maxCooldown: 300,
            active: false,
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            duration: 0,
            maxDuration: 15,
            charge: 0,
            maxCharge: 100
        };
        
        this.init();
    }
    
    init() {
        const startPos = this.levelManager.loadLevel(0);
        this.player = new Player(startPos.x, startPos.y);
        this.updateUI();
        this.gameLoop();
    }
    
    updateUI() {
        let prefix = '';
        if (this.levelManager.isInExtremeMode()) {
            prefix = '[EXTREME] ';
        } else if (this.levelManager.isInInsaneMode()) {
            prefix = '[INSANE] ';
        } else if (this.levelManager.isInHardMode()) {
            prefix = '(Difficulty: HARD) ';
        } else {
            prefix = '(Difficulty: EASY) ';
        }
        let levelText;
        if (this.customLevelName) {
            levelText = `🎮 ${this.customLevelName}`;
        } else {
            levelText = `Level ${this.levelManager.currentLevel + 1}: ${prefix}${this.levelManager.getLevelName()}`;
        }
        this.levelDisplay.textContent = levelText;
        this.doubleJumpDisplay.textContent = this.player.canDoubleJump ? 'Double Jump: Ready' : 'Double Jump: Used';
        
        if (this.input.isMobile && canDash) {
            const dashIndicator = document.getElementById('dashIndicator');
            if (dashIndicator) {
                dashIndicator.classList.add('visible');
                if (dashCooldown <= 0) {
                    dashIndicator.classList.add('ready');
                    dashIndicator.textContent = '⚡';
                } else {
                    dashIndicator.classList.remove('ready');
                    dashIndicator.textContent = Math.ceil(dashCooldown / 1000);
                }
            }
        }
    }
    
    showMessage(text, duration = 2000) {
        this.message = text;
        this.messageDiv.textContent = text;
        this.messageDiv.style.display = 'block';
        this.messageTimer = duration;
    }
    
    hideMessage() {
        this.messageDiv.style.display = 'none';
        this.message = '';
    }
    
    loadCustomLevel(levelData, isTesting = false) {
        this.isTestingCustom = isTesting;
        this.customLevelName = levelData.name || "Custom Level";
        this.paused = false;
        this.levelManager.platforms = levelData.platforms.map(p => new Platform(
            p.x, p.y, p.width, p.height, p.moving || false, p.range || 0, p.speed || 0, p.vertical || false
        ));
        
        this.levelManager.spikes = levelData.spikes.map(s => new Spike(s.x, s.y, s.width));
        
        this.levelManager.goal = new Goal(levelData.goal.x, levelData.goal.y);
        
        this.levelManager.decorations = [];
        if (levelData.decorations) {
            this.levelManager.decorations = levelData.decorations.map(d => {
                const type = DECORATIONS.find(dec => dec.name === d.type) || DECORATIONS[0];
                return new Decoration(d.x, d.y, type);
            });
        }
        
        this.levelManager.speedRings = [];
        if (levelData.speedRings) {
            this.levelManager.speedRings = levelData.speedRings.map(h => 
                new SpeedRing(h.x, h.y, h.radius, h.speedBoost, h.duration));
        }
        
        this.levelManager.jumpRings = [];
        if (levelData.jumpRings) {
            this.levelManager.jumpRings = levelData.jumpRings.map(h => 
                new JumpRing(h.x, h.y, h.radius, h.jumpBoost));
        }
        
        this.levelManager.gravityRings = [];
        if (levelData.gravityRings) {
            this.levelManager.gravityRings = levelData.gravityRings.map(h => 
                new GravityRing(h.x, h.y, h.radius, h.gravityChange));
        }
        
        this.levelManager.invisiblePlatforms = [];
        if (levelData.invisiblePlatforms) {
            this.levelManager.invisiblePlatforms = levelData.invisiblePlatforms.map(p => 
                new InvisiblePlatform(p.x, p.y, p.width, p.height));
        }
        
        this.levelManager.crumblingPlatforms = [];
        if (levelData.crumblingPlatforms) {
            this.levelManager.crumblingPlatforms = levelData.crumblingPlatforms.map(p => 
                new CrumblingPlatform(p.x, p.y, p.width, p.height, p.delay, p.fallSpeed));
        }
        
        this.levelManager.dashPads = [];
        if (levelData.dashPads) {
            this.levelManager.dashPads = levelData.dashPads.map(p => 
                new DashPad(p.x, p.y, p.width, p.height, p.dashForce));
        }
        
        this.levelManager.movingSpikes = [];
        if (levelData.movingSpikes) {
            this.levelManager.movingSpikes = levelData.movingSpikes.map(s => 
                new MovingSpike(s.x, s.y, s.width, s.height, s.speed, s.range));
        }
        
        this.levelManager.swingingAxes = [];
        if (levelData.swingingAxes) {
            this.levelManager.swingingAxes = levelData.swingingAxes.map(a => 
                new SwingingAxe(a.x, a.y, a.length, a.swingSpeed));
        }
        
        this.levelManager.lasers = [];
        if (levelData.lasers) {
            this.levelManager.lasers = levelData.lasers.map(l => 
                new Laser(l.x, l.y, l.width, l.height));
        }
        
        this.levelManager.shields = [];
        if (levelData.shields) {
            this.levelManager.shields = levelData.shields.map(s => 
                new Shield(s.x, s.y, s.radius));
        }
        
        this.levelManager.magnets = [];
        if (levelData.magnets) {
            this.levelManager.magnets = levelData.magnets.map(m => 
                new Magnet(m.x, m.y, m.radius, m.strength));
        }
        
        this.levelManager.coins = [];
        if (levelData.coins) {
            this.levelManager.coins = levelData.coins.map(c => 
                new Coin(c.x, c.y, c.radius));
        }
        
        this.levelManager.keyItems = [];
        if (levelData.keys) {
            this.levelManager.keyItems = levelData.keys.map(k => 
                new Key(k.x, k.y));
        }
        
        this.levelManager.slowMotionZones = [];
        if (levelData.slowMotionZones) {
            this.levelManager.slowMotionZones = levelData.slowMotionZones.map(z => 
                new SlowMotionZone(z.x, z.y, z.width, z.height, z.factor));
        }
        
        this.levelManager.colorCubes = [];
        if (levelData.colorCubes) {
            this.levelManager.colorCubes = levelData.colorCubes.map(c => 
                new ColorCube(c.x, c.y, c.size, c.color));
        }
        
        this.levelManager.hasBoss = false;
        this.levelManager.boss = null;
        
        this.player.reset(levelData.playerStart.x, levelData.playerStart.y);
        this.gameState = 'playing';
        this.levelManager.currentLevel = -1;
        this.showMessage(isTesting ? '🎮 TEST YOUR LEVEL! R=Respawn, E=Edit' : '🎮 CUSTOM LEVEL', 3000);
        this.updateUI();
    }
    
    loadUltimateLevel() {
        this.levelManager.platforms = [];
        this.levelManager.spikes = [];
        this.levelManager.decorations = [];
        
        // Starting ground
        this.levelManager.platforms.push(new Platform(0, 860, 150, 40));
        
        // Section 1 - Moving platforms with spikes
        this.levelManager.platforms.push(new Platform(180, 800, 60, 20, true, 50, 4, false));
        this.levelManager.platforms.push(new Platform(300, 720, 50, 18, true, 60, 4.5, false));
        this.levelManager.platforms.push(new Platform(420, 640, 50, 18, true, 70, 5, true));
        this.levelManager.platforms.push(new Platform(550, 560, 45, 16, true, 60, 5.5, false));
        
        // Spikes below section 1
        this.levelManager.spikes.push(new Spike(150, 840, 80));
        this.levelManager.spikes.push(new Spike(280, 840, 80));
        this.levelManager.spikes.push(new Spike(400, 840, 80));
        this.levelManager.spikes.push(new Spike(520, 840, 80));
        
        // Section 2 - Zigzag with more spikes
        this.levelManager.platforms.push(new Platform(650, 500, 50, 18, true, 50, 6, true));
        this.levelManager.platforms.push(new Platform(780, 440, 45, 16, true, 60, 6.5, false));
        this.levelManager.platforms.push(new Platform(900, 380, 45, 16, true, 70, 7, true));
        this.levelManager.platforms.push(new Platform(1000, 320, 45, 16, true, 60, 7.5, false));
        this.levelManager.platforms.push(new Platform(1100, 260, 45, 16, true, 50, 8, true));
        
        // Spikes section 2
        this.levelManager.spikes.push(new Spike(650, 640, 60));
        this.levelManager.spikes.push(new Spike(780, 560, 60));
        this.levelManager.spikes.push(new Spike(900, 480, 60));
        this.levelManager.spikes.push(new Spike(1050, 420, 60));
        this.levelManager.spikes.push(new Spike(1150, 360, 60));
        
        // Section 3 - Fast vertical platforms
        this.levelManager.platforms.push(new Platform(200, 300, 40, 15, true, 40, 9, true));
        this.levelManager.platforms.push(new Platform(350, 220, 40, 15, true, 50, 9.5, false));
        this.levelManager.platforms.push(new Platform(500, 150, 40, 15, true, 60, 10, true));
        this.levelManager.platforms.push(new Platform(650, 100, 40, 15, true, 50, 10.5, false));
        
        // Spikes section 3
        this.levelManager.spikes.push(new Spike(200, 400, 50));
        this.levelManager.spikes.push(new Spike(350, 320, 50));
        this.levelManager.spikes.push(new Spike(500, 250, 50));
        this.levelManager.spikes.push(new Spike(650, 200, 50));
        
        // Section 4 - Final gauntlet - very fast
        this.levelManager.platforms.push(new Platform(800, 80, 35, 14, true, 25, 11, false));
        this.levelManager.platforms.push(new Platform(950, 60, 35, 14, true, 30, 11.5, false));
        this.levelManager.platforms.push(new Platform(1100, 80, 35, 14, true, 25, 12, false));
        this.levelManager.platforms.push(new Platform(1250, 120, 40, 14, true, 20, 12.5, false));
        
        // Final spike gauntlet
        for (let i = 0; i < 20; i++) {
            this.levelManager.spikes.push(new Spike(i * 70 + 20, 840, 30));
        }
        
        // Goal platform - far right
        this.levelManager.platforms.push(new Platform(1350, 200, 50, 20));
        
        this.levelManager.goal = new Goal(1360, 140);
        this.levelManager.hasBoss = false;
        
        // Add decorations
        this.levelManager.decorations.push(new Decoration(300, 100, DECORATIONS[1])); // gem
        this.levelManager.decorations.push(new Decoration(600, 80, DECORATIONS[2])); // star
        this.levelManager.decorations.push(new Decoration(900, 50, DECORATIONS[3])); // moon
        this.levelManager.decorations.push(new Decoration(1200, 100, DECORATIONS[1])); // gem
        
        this.player.reset(30, 800);
        this.gameState = 'playing';
        this.levelManager.currentLevel = -1;
        this.showMessage('⚡ ULTIMATE DASH LEVEL! 💀', 3000);
        this.updateUI();
    }
    
    startOneLifeChallenge() {
        oneLifeChallenge = true;
        const startPos = this.levelManager.loadLevel(0, false);
        this.player.reset(startPos.x, startPos.y);
        this.gameState = 'playing';
        this.showMessage('💀 ONE LIFE CHALLENGE START! 💀\nDon\'t die!', 3000);
        this.updateUI();
    }
    
    endOneLifeChallenge(won) {
        oneLifeChallenge = false;
        document.getElementById('oneLifeBtn').classList.remove('active');
        if (won) {
            playerGems += 1000;
            if (typeof updateGemDisplay === 'function') updateGemDisplay();
            alert('🎉 CONGRATULATIONS! 💀\n\nYou beat ALL levels with ONE life!\n\n+1000 GEMS REWARD!');
        } else {
            alert('💀 YOU DIED!\n\nThe One Life Challenge is over.\n\nTry again?');
        }
        const startPos = this.levelManager.loadLevel(0, false);
        this.player.reset(startPos.x, startPos.y);
        this.gameState = 'playing';
        this.updateUI();
    }
    
    resetLevel() {
        this.player.reset(this.levelManager.playerStart.x, this.levelManager.playerStart.y);
        
        this.levelManager.speedRings.forEach(r => r.active = true);
        this.levelManager.jumpRings.forEach(r => r.active = true);
        this.levelManager.gravityRings.forEach(r => r.active = true);
        this.levelManager.dashPads.forEach(p => p.active = true);
        this.levelManager.movingSpikes.forEach(s => { s.active = true; s.x = s.startX; s.y = s.startY; });
        this.levelManager.swingingAxes.forEach(a => { a.active = true; a.angle = 0; });
        this.levelManager.lasers.forEach(l => l.active = true);
        this.levelManager.shields.forEach(s => s.active = true);
        this.levelManager.magnets.forEach(m => m.active = true);
        this.levelManager.coins.forEach(c => c.active = true);
        this.levelManager.keyItems.forEach(k => k.active = true);
        this.levelManager.crumblingPlatforms.forEach(p => { p.triggered = false; p.falling = false; p.y = p.originalY; });
        this.levelManager.invisiblePlatforms.forEach(p => p.active = true);
        this.levelManager.slowMotionZones.forEach(z => z.active = true);
        this.levelManager.colorCubes.forEach(c => c.active = true);
        
        this.gameState = 'playing';
    }
    
    nextLevel() {
        if (oneLifeChallenge) {
            if (this.levelManager.currentLevel === 25 && !this.levelManager.isInHardMode()) {
                this.levelManager.loadLevel(0, true, false, false);
                this.showMessage('💀 ONE LIFE: HARD MODE! 💀\n(Difficulty: HARD)', 3000);
            } else if (this.levelManager.isInHardMode() && !this.levelManager.isInInsaneMode() && this.levelManager.currentLevel === 19) {
                this.levelManager.loadLevel(0, true, true, false);
                this.showMessage('💀 ONE LIFE: INSANE MODE! 💀\n[INSANE]', 3000);
            } else if (this.levelManager.isInInsaneMode() && !this.levelManager.isInExtremeMode() && this.levelManager.currentLevel === 23) {
                this.levelManager.loadLevel(0, true, true, true);
                this.showMessage('💀 ONE LIFE: EXTREME MODE! 💀\n[EXTREME]', 3000);
            } else if (this.levelManager.isInExtremeMode() && this.levelManager.currentLevel === 24) {
                this.levelManager.loadLevel(0, false, false, false);
                this.showMessage('🎉 YOU BEAT THE GAME!', 5000);
                this.gameState = 'levelComplete';
                setTimeout(() => this.endOneLifeChallenge(true), 5000);
            } else {
                const nextLevelNum = this.levelManager.nextLevel();
                const startPos = this.levelManager.loadLevel(nextLevelNum, this.levelManager.isHardMode, this.levelManager.isInsaneMode, this.levelManager.isExtremeMode);
                this.player.reset(startPos.x, startPos.y);
            }
        } else {
            // Level picker mode - each difficulty stops at its end and returns to normal
            if (this.levelManager.isInExtremeMode()) {
                // Extreme mode: 25 levels, then return to normal
                if (this.levelManager.currentLevel >= 24) {
                    this.levelManager.loadLevel(0, false, false, false);
                    this.showMessage('🎯 Back to Easy Mode!\n(Levels 1-26)', 3000);
                } else {
                    const nextLevelNum = this.levelManager.nextLevel();
                    const startPos = this.levelManager.loadLevel(nextLevelNum, true, true, true);
                    this.player.reset(startPos.x, startPos.y);
                }
            } else if (this.levelManager.isInInsaneMode()) {
                // Insane mode: 24 levels, then return to normal
                if (this.levelManager.currentLevel >= 23) {
                    this.levelManager.loadLevel(0, false, false, false);
                    this.showMessage('🎯 Back to Easy Mode!\n(Levels 1-26)', 3000);
                } else {
                    const nextLevelNum = this.levelManager.nextLevel();
                    const startPos = this.levelManager.loadLevel(nextLevelNum, true, true, false);
                    this.player.reset(startPos.x, startPos.y);
                }
            } else if (this.levelManager.isInHardMode()) {
                // Hard mode: 20 levels, then return to normal
                if (this.levelManager.currentLevel >= 19) {
                    this.levelManager.loadLevel(0, false, false, false);
                    this.showMessage('🎯 Back to Easy Mode!\n(Levels 1-26)', 3000);
                } else {
                    const nextLevelNum = this.levelManager.nextLevel();
                    const startPos = this.levelManager.loadLevel(nextLevelNum, true, false, false);
                    this.player.reset(startPos.x, startPos.y);
                }
            } else {
                // Normal mode: 26 levels, then go to hard mode
                if (this.levelManager.currentLevel === 25) {
                    this.levelManager.loadLevel(0, true, false, false);
                    hardModeUnlocked = true;
                    this.showMessage('🔓 HARD MODE UNLOCKED!\n(Difficulty: HARD)', 3000);
                } else {
                    const nextLevelNum = this.levelManager.nextLevel();
                    const startPos = this.levelManager.loadLevel(nextLevelNum, false, false, false);
                    this.player.reset(startPos.x, startPos.y);
                }
            }
        }
        this.gameState = 'playing';
        this.updateUI();
    }
    
    pause() {
        this.paused = true;
    }
    
    resume() {
        this.paused = false;
    }
    
    update(deltaTime) {
        if (this.paused) return;
        
        if (this.messageTimer > 0) {
            this.messageTimer -= deltaTime;
            if (this.messageTimer <= 0) {
                this.hideMessage();
            }
        }
        
        const easterEgg = this.input.checkEasterEgg();
        if (easterEgg) {
            if (easterEgg.message.includes('GEMS')) {
                playerGems += 500;
                if (typeof updateGemDisplay === 'function') updateGemDisplay();
            }
            if (easterEgg.message.includes('50')) {
                playerGems += 50;
                if (typeof updateGemDisplay === 'function') updateGemDisplay();
            }
            this.showMessage(easterEgg.message, 2000);
        }
        
        if (this.isTestingCustom && (this.input.isKeyDown('r') || this.input.isKeyDown('R'))) {
            this.resetLevel();
            this.showMessage('🔄 Respawned!', 500);
        }
        
        if (this.isTestingCustom && (this.input.isKeyDown('e') || this.input.isKeyDown('E'))) {
            this.pause();
            if (typeof returnToEditor === 'function') {
                returnToEditor();
            }
            this.showMessage('✏️ Returned to editor!', 500);
        }
        
        if (this.gameState === 'playing') {
            if (this.timeRewind.enabled && this.input.isRewindPressed() && this.timeRewind.cooldown <= 0 && this.timeRewind.states.length > 10) {
                this.timeRewind.rewinding = true;
                this.timeRewind.rewindProgress = 0;
            }
            
            if (this.timeRewind.rewinding) {
                this.timeRewind.rewindProgress++;
                const stateIndex = Math.floor(this.timeRewind.rewindProgress / 3);
                if (this.timeRewind.states.length > stateIndex) {
                    const state = this.timeRewind.states[this.timeRewind.states.length - 1 - stateIndex];
                    if (state) {
                        this.player.x = state.x;
                        this.player.y = state.y;
                        this.player.vx = state.vx;
                        this.player.vy = state.vy;
                        this.player.onGround = state.onGround;
                    }
                }
                
                if (this.timeRewind.rewindProgress >= 30 || this.timeRewind.states.length <= this.timeRewind.rewindProgress / 3) {
                    this.timeRewind.rewinding = false;
                    this.timeRewind.cooldown = this.timeRewind.maxCooldown;
                    this.particles.emit(this.player.x + this.player.width/2, this.player.y + this.player.height/2, '#a855f7', 15);
                    this.showMessage('⏪ TIME REWIND!', 500);
                }
                
                this.particles.emit(this.player.x + this.player.width/2, this.player.y + this.player.height/2, '#a855f7', 3);
            } else {
                if (this.timeRewind.cooldown > 0) {
                    this.timeRewind.cooldown--;
                }
                
                this.timeRewind.states.push({
                    x: this.player.x,
                    y: this.player.y,
                    vx: this.player.vx,
                    vy: this.player.vy,
                    onGround: this.player.onGround
                });
                
                if (this.timeRewind.states.length > this.timeRewind.maxStates) {
                    this.timeRewind.states.shift();
                }
            }
            
            if (this.portal.enabled && this.input.isPortalPressed() && this.portal.cooldown <= 0 && this.portal.charge >= this.portal.maxCharge) {
                this.portal.active = true;
                this.portal.x = this.player.x + this.player.width/2;
                this.portal.y = this.player.y + this.player.height/2;
                this.portal.targetX = this.player.x + (this.player.facingDirection * 250);
                this.portal.targetY = this.player.y - 50;
                this.portal.duration = 0;
                this.portal.charge = 0;
                this.portal.cooldown = this.portal.maxCooldown;
                this.particles.emit(this.portal.x, this.portal.y, '#06b6d4', 20);
                this.showMessage('🔮 PORTAL WARP!', 500);
            }
            
            if (this.portal.active) {
                this.portal.duration++;
                
                if (this.portal.duration === this.portal.maxDuration) {
                    this.player.x = this.portal.targetX - this.player.width/2;
                    this.player.y = this.portal.targetY - this.player.height/2;
                    this.player.vx = this.player.facingDirection * 3;
                    this.player.vy = -5;
                    this.particles.emit(this.portal.targetX, this.portal.targetY, '#22d3ee', 20);
                }
                
                if (this.portal.duration >= this.portal.maxDuration + 10) {
                    this.portal.active = false;
                }
            } else {
                if (this.portal.cooldown > 0) {
                    this.portal.cooldown--;
                }
                if (this.portal.charge < this.portal.maxCharge) {
                    this.portal.charge += 0.5;
                }
            }
            
            this.player.update(deltaTime, this.particles, this.input);
            
            // Debug: show O key status
            const oKey = this.input.keys['o'] || this.input.keys['O'];
            const xKey = this.input.keys['x'] || this.input.keys['X'];
            
            // Wall hang - works anywhere in air (simplified)
            if (oKey && !this.player.wallHanging && !this.player.onGround && !this.player.wallClimbing) {
                this.player.wallHanging = true;
                this.player.wallHangTimer = 0;
                this.player.wallHangSide = 1;
                this.player.vy = 0;
                this.player.vx = 0;
            }
            
            // Wall climb - Tab + G to climb up wall for 0.5 seconds
            const tabKey = this.input.keys['Tab'];
            const gKey = this.input.keys['g'] || this.input.keys['G'];
            
            if (tabKey && gKey && !this.player.wallClimbing && !this.player.onGround && !this.player.wallHanging) {
                this.player.wallClimbing = true;
                this.player.wallClimbTimer = 0;
                this.player.wallClimbDuration = 30;
                this.player.canDoubleJump = true;
                this.particles.emit(this.player.x + this.player.width/2, this.player.y + this.player.height, '#10b981', 8);
            }
            
            // While wall climbing
            if (this.player.wallClimbing) {
                this.player.wallClimbTimer++;
                this.player.vy = -6;
                this.player.vx = 0;
                
                if (this.player.wallClimbTimer >= this.player.wallClimbDuration) {
                    this.player.wallClimbing = false;
                    this.particles.emit(this.player.x + this.player.width/2, this.player.y + this.player.height/2, '#10b981', 10);
                }
            }
            
            // While wall hanging
            if (this.player.wallHanging) {
                this.player.wallHangTimer++;
                this.player.vy = 0;
                this.player.vx = 0;
                
                // Release with X key or after timer
                if (xKey || this.player.wallHangTimer >= this.player.wallHangDuration) {
                    this.player.wallHanging = false;
                    // Launch away from wall horizontally, then upward
                    this.player.vx = this.player.wallHangSide * 18;
                    this.player.vy = -20;
                    this.player.canDoubleJump = true;
                    this.particles.emit(this.player.x + this.player.width/2, this.player.y + this.player.height/2, '#fbbf24', 10);
                }
            }
            
            const result = this.levelManager.update(this.player, deltaTime);
            
            if (result === 'dead') {
                this.particles.emit(this.player.x + this.player.width/2, this.player.y + this.player.height/2, '#e53e3e', 20);
                if (oneLifeChallenge) {
                    this.showMessage('💀 YOU DIED!', 2000);
                    this.gameState = 'dead';
                    setTimeout(() => this.endOneLifeChallenge(false), 2000);
                } else if (this.isTestingCustom) {
                    this.showMessage('💀 Died! Respawning...', 500);
                    setTimeout(() => this.resetLevel(), 300);
                } else {
                    this.showMessage('💀 You died! Try again...', 1000);
                    this.gameState = 'dead';
                    setTimeout(() => this.resetLevel(), 1000);
                }
            } else if (result === 'bossDefeated') {
                this.particles.emit(600, 200, '#f6e05e', 50);
                this.showMessage('🎉 BOSS DEFEATED! +10 GEMS! +50 Coins!', 3000);
                playerGems += 10;
                playerCoins += 50;
                if (typeof updateGemDisplay === 'function') updateGemDisplay();
                if (typeof updateCoinDisplay === 'function') updateCoinDisplay();
                this.gameState = 'levelComplete';
                setTimeout(() => this.nextLevel(), 2000);
            } else if (result === 'win') {
                this.particles.emit(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, GOAL_COLOR, 40);
                
                if (this.isTestingCustom) {
                    this.showMessage('🎉 LEVEL COMPLETE! You can now publish it!', 3000);
                    this.gameState = 'levelComplete';
                    if (typeof window.customLevelBeaten !== 'undefined') {
                        window.customLevelBeaten = true;
                    }
                    setTimeout(() => {
                        if (window.openLevelMakerAfterWin) {
                            window.openLevelMakerAfterWin();
                        }
                    }, 3000);
                } else {
                    const levels = this.levelManager.isInHardMode() ? HARD_LEVELS : LEVELS;
                    const bonusGems = 10;
                    const bonusCoins = this.levelManager.currentLevel * 5 + 10;
                    playerGems += bonusGems;
                    playerCoins += bonusCoins;
                    
                    let coinMessage = '';
                    if (playerCoins >= COIN_TO_GEM_THRESHOLD) {
                        const gemReward = Math.floor(playerCoins / COIN_TO_GEM_THRESHOLD) * COIN_TO_GEM_REWARD;
                        playerCoins = playerCoins % COIN_TO_GEM_THRESHOLD;
                        playerGems += gemReward;
                        coinMessage = ` +${gemReward} Gems (${COIN_TO_GEM_REWARD} Gems for ${COIN_TO_GEM_THRESHOLD} coins!)`;
                    }
                    
                    if (typeof updateGemDisplay === 'function') updateGemDisplay();
                    if (typeof updateCoinDisplay === 'function') updateCoinDisplay();
                    
                    this.showMessage(`Level Complete! +${bonusGems} Gems! +${bonusCoins} Coins!${coinMessage}`, 2000);
                    this.gameState = 'levelComplete';
                    setTimeout(() => this.nextLevel(), 2000);
                }
            }
            
            if (this.player.y > CANVAS_HEIGHT) {
                if (oneLifeChallenge) {
                    this.showMessage('💀 YOU FELL!', 2000);
                    this.gameState = 'dead';
                    setTimeout(() => this.endOneLifeChallenge(false), 2000);
                } else if (this.isTestingCustom) {
                    this.showMessage('💀 Fell! Respawning...', 500);
                    setTimeout(() => this.resetLevel(), 300);
                } else {
                    this.showMessage('Fell off! Try again...', 1000);
                    this.gameState = 'dead';
                    setTimeout(() => this.resetLevel(), 1000);
                }
            }
            
            this.updateUI();
        }
        
        this.particles.update();
    }
    
    draw() {
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        this.ctx.fillStyle = '#2d3748';
        for (let i = 0; i < 20; i++) {
            const x = (i * 100 + Date.now() * 0.01) % (CANVAS_WIDTH + 100) - 50;
            this.ctx.fillRect(x, 0, 2, CANVAS_HEIGHT);
        }
        
        this.ctx.fillStyle = '#3d4a5c';
        for (let i = 0; i < 10; i++) {
            const y = i * 80 + 20;
            this.ctx.fillRect(0, y, CANVAS_WIDTH, 1);
        }
        
        if (this.timeRewind.rewinding) {
            this.ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
            this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            
            this.ctx.save();
            this.ctx.globalAlpha = 0.3;
            for (let i = 0; i < 3; i++) {
                const offset = (Date.now() / 10 + i * 100) % CANVAS_WIDTH;
                this.ctx.strokeStyle = '#a855f7';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(offset, 0);
                this.ctx.lineTo(offset, CANVAS_HEIGHT);
                this.ctx.stroke();
            }
            this.ctx.restore();
        }
        
        if (this.portal.active) {
            this.ctx.save();
            
            const progress = this.portal.duration / this.portal.maxDuration;
            const portalRadius = 30 + progress * 20;
            
            this.ctx.shadowColor = '#06b6d4';
            this.ctx.shadowBlur = 30;
            
            this.ctx.strokeStyle = '#22d3ee';
            this.ctx.lineWidth = 4;
            this.ctx.beginPath();
            this.ctx.arc(this.portal.x, this.portal.y, portalRadius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(this.portal.x, this.portal.y, portalRadius - 5, 0, Math.PI * 2);
            this.ctx.fill();
            
            const targetRadius = 30;
            this.ctx.strokeStyle = '#22d3ee';
            this.ctx.beginPath();
            this.ctx.arc(this.portal.targetX, this.portal.targetY, targetRadius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.setLineDash([5, 10]);
            this.ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
            this.ctx.beginPath();
            this.ctx.moveTo(this.portal.x, this.portal.y);
            this.ctx.lineTo(this.portal.targetX, this.portal.targetY);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
            
            this.ctx.restore();
        }
        
        this.levelManager.draw(this.ctx);
        this.player.draw(this.ctx);
        
        // Wall hang indicator
        if (this.player.wallHanging) {
            this.ctx.save();
            this.ctx.fillStyle = '#fbbf24';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.fillText('🧗 WALL HANG! Press X to release', this.player.x - 30, this.player.y - 20);
            
            // Hang timer bar
            const timerPercent = 1 - (this.player.wallHangTimer / this.player.wallHangDuration);
            this.ctx.fillStyle = '#374151';
            this.ctx.fillRect(this.player.x, this.player.y - 10, this.player.width, 6);
            this.ctx.fillStyle = timerPercent > 0.3 ? '#fbbf24' : '#ef4444';
            this.ctx.fillRect(this.player.x, this.player.y - 10, this.player.width * timerPercent, 6);
            this.ctx.restore();
        }
        
        this.particles.draw(this.ctx);
        
        // Show wall hang hint
        if (!this.player.wallHanging && !this.player.wallClimbing) {
            this.ctx.save();
            this.ctx.fillStyle = '#718096';
            this.ctx.font = '12px Arial';
            this.ctx.fillText('🧗 O: Wall Hang | Tab+G: Climb', 10, CANVAS_HEIGHT - 5);
            this.ctx.restore();
        }
        
        this.ctx.save();
        this.ctx.font = '14px Arial';
        
        const rewindColor = this.timeRewind.cooldown <= 0 ? '#a855f7' : '#6b7280';
        this.ctx.fillStyle = rewindColor;
        this.ctx.fillText('⏪ U+Ctrl: Rewind', 10, CANVAS_HEIGHT - 60);
        
        const rewindBarWidth = 80;
        const rewindProgress = Math.max(0, 1 - this.timeRewind.cooldown / this.timeRewind.maxCooldown);
        this.ctx.fillStyle = '#374151';
        this.ctx.fillRect(10, CANVAS_HEIGHT - 45, rewindBarWidth, 8);
        this.ctx.fillStyle = rewindColor;
        this.ctx.fillRect(10, CANVAS_HEIGHT - 45, rewindBarWidth * rewindProgress, 8);
        
        const portalColor = this.portal.charge >= this.portal.maxCharge ? '#06b6d4' : '#6b7280';
        this.ctx.fillStyle = portalColor;
        this.ctx.fillText('🔮 P+Shift: Portal', 10, CANVAS_HEIGHT - 30);
        
        const portalBarWidth = 80;
        const portalProgress = this.portal.charge / this.portal.maxCharge;
        this.ctx.fillStyle = '#374151';
        this.ctx.fillRect(10, CANVAS_HEIGHT - 15, portalBarWidth, 8);
        this.ctx.fillStyle = portalColor;
        this.ctx.fillRect(10, CANVAS_HEIGHT - 15, portalBarWidth * portalProgress, 8);
        
        this.ctx.restore();
    }
    
    gameLoop() {
        const now = Date.now();
        let deltaTime = 16;
        if (this.lastTime) {
            deltaTime = now - this.lastTime;
            // Cap delta time to prevent huge jumps
            if (deltaTime > 50) deltaTime = 50;
            if (deltaTime < 8) deltaTime = 8;
        }
        this.lastTime = now;
        
        this.update(deltaTime);
        if (!this.paused) {
            this.draw();
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// ============================================
// INITIALIZE GAME
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    try {
        window.game = new Game();
    } catch(e) {
        console.error('Game initialization error:', e);
        alert('Error loading game: ' + e.message);
    }
});
