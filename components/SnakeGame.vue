<template>
    <div id="console">

      <!-- bolts -->
      <img id="corner" src="/icons/console/bolt-up-left.svg" alt="" class="absolute top-2 left-2 opacity-70">
      <img id="corner"  src="/icons/console/bolt-up-right.svg" alt="" class="absolute top-2 right-2 opacity-70">
      <img id="corner"  src="/icons/console/bolt-down-left.svg" alt="" class="absolute bottom-2 left-2 opacity-70">
      <img id="corner"  src="/icons/console/bolt-down-right.svg" alt="" class="absolute bottom-2 right-2 opacity-70">

      <!-- Game Screen -->
      <div id="game-screen-wrapper">
        <canvas ref="canvas" id="game-canvas"></canvas>

        <button v-if="showStart" id="start-button" class="font-fira_retina" @click="startGame">iniciar-juego</button>

        <div v-if="showGameOver" id="game-over">
          <span class="font-fira_retina text-greenfy bg-bluefy-dark h-12 flex items-center justify-center">FIN DEL JUEGO!</span>
          <button class="font-fira_retina text-menu-text text-sm flex items-center justify-center w-full py-6 hover:text-white" @click="startAgain">reiniciar</button>
        </div>

        <div v-if="showCongrats" id="congrats">
          <span class="font-fira_retina text-greenfy bg-bluefy-dark h-12 flex items-center justify-center">BIEN HECHO!</span>
          <button class="font-fira_retina text-menu-text text-sm flex items-center justify-center w-full py-6 hover:text-white" @click="startAgain">jugar-de-nuevo</button>
        </div>
      </div>

      <div id="console-menu" class="h-full flex flex-col items-end justify-between">

        <div>

        <div id="instructions" class="font-fira_retina text-sm text-white">
          <p>// usa las flechas</p>
          <p>// del teclado para jugar</p>

          <div id="buttons" class="w-full flex flex-col items-center gap-1 pt-5">

              <button id="console-button" class="button-up" @click="move('up')">
                <img src="/icons/console/arrow-button.svg" alt="move up">
              </button>

              <div class="grid grid-cols-3 gap-1">
                <button id="console-button" class="button-left" @click="move('left')">
                  <img src="/icons/console/arrow-button.svg" alt="move left" class="-rotate-90">
                </button>

                <button id="console-button" class="button-down" @click="move('down')">
                  <img src="/icons/console/arrow-button.svg" alt="move down" class="rotate-180">
                </button>

                <button id="console-button" class="button-right" @click="move('right')">
                  <img src="/icons/console/arrow-button.svg" alt="move right" class="rotate-90">
                </button>
            </div>

          </div>
        </div>

        <!-- score board -->
        <div id="score-board" class="w-full flex flex-col pl-5">
          <p class="font-fira_retina text-white pt-5">// comida restante</p>

          <div id="score" class="grid grid-cols-5 gap-5 justify-items-center pt-5 w-fit">
            <div v-for="i in 10" :key="i" class="food" :style="{ opacity: i <= score ? 1 : 0.3 }"></div>
          </div>
        </div>
      </div>
        <!-- skip -->
        <NuxtLink id="skip-btn" to="/about-me" class="font-fira_retina flex hover:bg-white/20">
          saltar
        </NuxtLink>

      </div>
    </div>

  </template>

  <script>
  const COLS = 24;
  const ROWS = 40;
  const GAME_SPEED = 120;

  const INITIAL_SNAKE = [
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
  ];

  export default {
    data() {
      return {
        score: 0,
        gameInterval: null,
        gameStarted: false,
        gameOver: false,
        showStart: true,
        showGameOver: false,
        showCongrats: false,
        food: { x: 10, y: 15 },
        snake: JSON.parse(JSON.stringify(INITIAL_SNAKE)),
        direction: "up",
        nextDirection: "up",
        cellSize: 10,
      };
    },
    methods: {
      startGame() {
        this.showStart = false;
        this.gameStarted = true;
        this.gameOver = false;
        this.gameInterval = setInterval(this.tick, GAME_SPEED);
      },
      startAgain() {
        clearInterval(this.gameInterval);
        this.gameInterval = null;
        this.gameStarted = false;
        this.gameOver = false;
        this.showGameOver = false;
        this.showCongrats = false;
        this.showStart = true;
        this.score = 0;
        this.snake = JSON.parse(JSON.stringify(INITIAL_SNAKE));
        this.direction = "up";
        this.nextDirection = "up";
        this.food = { x: 10, y: 15 };
        this.render();
      },
      generateNewFood() {
        let newFood;
        do {
          newFood = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS)
          };
        } while (this.snake.some(s => s.x === newFood.x && s.y === newFood.y));
        return newFood;
      },
      tick() {
        // Aplicar la dirección pendiente
        this.direction = this.nextDirection;

        const head = this.snake[0];
        let newX = head.x;
        let newY = head.y;

        switch (this.direction) {
          case "up": newY--; break;
          case "down": newY++; break;
          case "left": newX--; break;
          case "right": newX++; break;
        }

        // Colisión con paredes o consigo misma
        if (
          newX < 0 || newX >= COLS ||
          newY < 0 || newY >= ROWS ||
          this.snake.some(s => s.x === newX && s.y === newY)
        ) {
          clearInterval(this.gameInterval);
          this.gameInterval = null;
          this.gameStarted = false;
          this.gameOver = true;
          this.showGameOver = true;
          this.render();
          return;
        }

        this.snake.unshift({ x: newX, y: newY });

        // Comió comida
        if (newX === this.food.x && newY === this.food.y) {
          this.score++;
          if (this.score >= 10) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
            this.gameStarted = false;
            this.gameOver = true;
            this.showCongrats = true;
          } else {
            this.food = this.generateNewFood();
          }
        } else {
          this.snake.pop();
        }

        this.render();
      },
      render() {
        const canvas = this.$refs.canvas;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const cs = this.cellSize;

        canvas.width = COLS * cs;
        canvas.height = ROWS * cs;

        // Fondo
        ctx.fillStyle = "rgba(1, 22, 39, 0.84)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Comida
        if (this.food.x !== null) {
          ctx.fillStyle = "#43D9AD";
          ctx.shadowColor = "#43D9AD";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(
            this.food.x * cs + cs / 2,
            this.food.y * cs + cs / 2,
            cs / 2, 0, Math.PI * 2
          );
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Serpiente
        for (let i = 0; i < this.snake.length; i++) {
          const seg = this.snake[i];
          const opacity = 1 - (i / this.snake.length) * 0.7;
          ctx.fillStyle = `rgba(67, 217, 173, ${opacity})`;

          if (i === 0) {
            // Cabeza con bordes redondeados
            const r = cs * 0.4;
            this.roundRect(ctx, seg.x * cs, seg.y * cs, cs, cs, r);
          } else {
            ctx.fillRect(seg.x * cs, seg.y * cs, cs, cs);
          }
        }
      },
      roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.fill();
      },
      move(dir) {
        if (!this.gameStarted) return;
        const opposites = { up: "down", down: "up", left: "right", right: "left" };
        if (this.direction !== opposites[dir]) {
          this.nextDirection = dir;
        }
      },
      updateCellSize() {
        this.cellSize = window.innerWidth > 1536 ? 10 : 8;
        this.render();
      }
    },
    mounted() {
      this.updateCellSize();

      this._keyHandler = (event) => {
        const keyMap = { 37: "left", 38: "up", 39: "right", 40: "down" };
        const dir = keyMap[event.keyCode];

        if (dir && this.gameStarted) {
          event.preventDefault();
          this.move(dir);
        } else if (event.keyCode === 32) {
          event.preventDefault();
          if (this.gameOver) {
            this.startAgain();
          } else if (!this.gameStarted) {
            this.startGame();
          }
        }
      };
      document.addEventListener("keydown", this._keyHandler);

      this._resizeHandler = () => this.updateCellSize();
      window.addEventListener("resize", this._resizeHandler);

      this.render();
    },
    beforeUnmount() {
      clearInterval(this.gameInterval);
      document.removeEventListener("keydown", this._keyHandler);
      window.removeEventListener("resize", this._resizeHandler);
    }
  };
  </script>

  <style>
  #console {
      width: 530px;
      height: 475px;
      border: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(to bottom, rgba(35, 123, 109, 1), rgba(67, 217, 173, 0.13));
      border-radius: 10px;
      padding: 30px;
      position: relative;
  }

  #game-screen-wrapper {
      width: 240px;
      height: 400px;
      border-radius: 10px;
      background-color: rgba(1, 22, 39, 0.84);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 10px #00000071;
      position: relative;
      overflow: hidden;
  }

  #game-canvas {
      border-radius: 10px;
  }

  #start-button {
    padding-inline: 16px;
    padding-block: 8px;
    border-radius: 10px;
    border: 1px solid black;
    background-color: #FEA55F;
    color: black;
    cursor: pointer;
    position: absolute;
    font-size: 0.875rem;
    line-height: 1.25rem;
    z-index: 10;
  }

  #start-button:hover {
    background-color: rgb(255, 178, 119);
  }

  #console-menu{
    height: 400px;
  }

  #console-button {
    background-color: #010C15;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 30px;
  }

  #console-button:hover {
    background-color: #010c15d8;
    box-shadow: #43D9AD 0 0 10px;
  }

  #instructions {
    background-color: rgba(1, 20, 35, 0.19);
    border-radius: 7px;
    padding: 10px;
  }

  .food {
    background-color: #43D9AD;
    border-radius: 50%;
    box-shadow: 0 0 10px #43D9AD;
    width: 8px;
    height: 8px;
  }

  #game-over, #congrats {
    position: absolute;
    color: #43D9AD;
    z-index: 10;
  }

  #game-over span, #congrats span {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  #corner {
    width: 24px;
    height: 24px;
  }

  #skip-btn{
    font-size: 14px;
    color: white;
    padding-inline: 16px;
    padding-block: 8px;
    border: 2px solid white;
    border-radius: 0.5rem;
  }


  @media (min-width: 1024px) and (max-width: 1536px) {
    #game-screen-wrapper {
      width: 192px;
      height: 320px;
    }

    #console {
      width: 420px;
      height: 370px;
      padding: 24px;
    }

    #start-button {
      padding-inline: 12px;
      padding-block: 6px;
      border-radius: 8px;
      font-size: 0.75rem;
      line-height: 1rem;
    }

    #console-menu{
      height: 320px;
    }

    #instructions {
      font-size: 12px;
    }

    #console-button {
      width: 40px;
      height: 25px;
      border-radius: 6px;
    }

    #score-board {
      font-size: 12px;
    }

    .food {
      width: 6px;
      height: 6px;
    }

    #game-over span, #congrats span {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    #corner {
      width: 20px;
      height: 20px;
    }

    #skip-btn{
      font-size: 12px;
      padding-inline: 12px;
      padding-block: 6px;
      border: 2px solid white;
      border-radius: 0.5rem;
    }
  }
  </style>
