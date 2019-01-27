<template>
  <div class="bg-wrapper">
    <canvas id="testCanvas"></canvas>
    <canvas v-show="isShow === 1" id="canvas1"></canvas>
    <canvas v-show="isShow === 2" id="canvas2"></canvas>
    <canvas v-show="isShow === 3" id="canvas3"></canvas>
    <audio ref="bgm" src="../../assets/audio/FireworksSoundEffect.mp3" autoplay loop></audio>
  </div>
</template>
<script>
import particleInit from "./particle.js";
import Proton from "proton-js";
export default {
  data() {
    return {
      isShow: 1
    };
  },
  mounted() {
    var canvas;
    var context;
    var proton;
    var renderer;
    var emitter;
    main();
    var canvas1 = document.getElementById("canvas1");
    var canvas2 = document.getElementById("canvas2");
    var canvas3 = document.getElementById("canvas3");
    particleInit(canvas1, "新年快乐");
    particleInit(canvas2, "幸福安康");
    particleInit(canvas3, "平安顺遂");

    setInterval(() => {
      if (this.isShow > 2) {
        this.isShow = 1;
      }
      setTimeout(() => {
        this.isShow++;
      }, 4000);
    }, 8000);

    document.addEventListener("touchstart", e => {
      this.$refs["bgm"].play();
    });
    document.addEventListener("mousemove", e => {
      this.$refs["bgm"].play();
    });

    function main() {
      canvas = document.getElementById("testCanvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context = canvas.getContext("2d");
      createProton();
      tick();
    }

    function createProton() {
      proton = new Proton();
      emitter = new Proton.Emitter();
      emitter.rate = new Proton.Rate(new Proton.Span(1, 3), 1);

      emitter.addInitialize(new Proton.Mass(1));
      emitter.addInitialize(new Proton.Radius(2, 4));
      emitter.addInitialize(
        new Proton.P(
          new Proton.LineZone(
            10,
            canvas.height,
            canvas.width - 10,
            canvas.height
          )
        )
      );
      emitter.addInitialize(new Proton.Life(1, 1.5));
      emitter.addInitialize(
        new Proton.V(
          new Proton.Span(4, 6),
          new Proton.Span(0, 0, true),
          "polar"
        )
      );

      emitter.addBehaviour(new Proton.Gravity(1));
      emitter.addBehaviour(new Proton.Color("#ff0000", "random"));
      emitter.emit();
      proton.addEmitter(emitter);

      renderer = new Proton.CanvasRenderer(canvas);
      renderer.onProtonUpdate = function() {
        let _canvas = document.createElement("canvas");
        _canvas.width = canvas.width;
        _canvas.height = canvas.height;
        _canvas.getContext("2d").drawImage(canvas, 0, 0);
        canvas.width = canvas.width;
        canvas.getContext("2d").globalAlpha = 0.9;
        canvas.getContext("2d").drawImage(_canvas, 0, 0);
        canvas.getContext("2d").globalAlpha = 1;
        // context.fillStyle = "rgba(255, 255, 255, 0.01)";
        // context.fillRect(0, 0, canvas.width, canvas.height);
      };
      proton.addRenderer(renderer);
      ////NOTICE :you can only use two emitters do this effect.In this demo I use more emitters want to test the emtter's life
      proton.addEventListener(Proton.PARTICLE_DEAD, function(particle) {
        if (Math.random() < 0.7) createFirstEmitter(particle);
        else createSecendEmitter(particle);
      });
    }

    function createFirstEmitter(particle) {
      var subemitter = new Proton.Emitter();
      subemitter.rate = new Proton.Rate(new Proton.Span(250, 300), 1);
      subemitter.addInitialize(new Proton.Mass(1));
      subemitter.addInitialize(new Proton.Radius(1, 2));
      subemitter.addInitialize(new Proton.Life(1, 3));
      subemitter.addInitialize(
        new Proton.V(new Proton.Span(2, 4), new Proton.Span(0, 360), "polar")
      );

      subemitter.addBehaviour(new Proton.RandomDrift(10, 10, 0.05));
      subemitter.addBehaviour(new Proton.Alpha(1, 0));
      subemitter.addBehaviour(new Proton.Gravity(3));
      var color =
        Math.random() > 0.3 ? Proton.MathUtils.randomColor() : "random";
      subemitter.addBehaviour(new Proton.Color(color));

      subemitter.p.x = particle.p.x;
      subemitter.p.y = particle.p.y;
      subemitter.emit("once", true);
      proton.addEmitter(subemitter);
    }

    function createSecendEmitter(particle) {
      var subemitter = new Proton.Emitter();
      subemitter.rate = new Proton.Rate(new Proton.Span(100, 120), 1);

      subemitter.addInitialize(new Proton.Mass(1));
      subemitter.addInitialize(new Proton.Radius(4, 8));
      subemitter.addInitialize(new Proton.Life(1, 2));
      subemitter.addInitialize(
        new Proton.V([1, 2], new Proton.Span(0, 360), "polar")
      );

      subemitter.addBehaviour(new Proton.Alpha(1, 0));
      subemitter.addBehaviour(new Proton.Scale(1, 0.1));
      subemitter.addBehaviour(new Proton.Gravity(1));
      var color = Proton.MathUtils.randomColor();
      subemitter.addBehaviour(new Proton.Color(color));

      subemitter.p.x = particle.p.x;
      subemitter.p.y = particle.p.y;
      subemitter.emit("once", true);
      proton.addEmitter(subemitter);
    }

    function tick() {
      requestAnimationFrame(tick);
      proton.update();
    }
  }
};
</script>
<style>
#canvas1,
#canvas2,
#canvas3 {
  position: absolute;
  z-index: 1;
  top: 10%;
  left: 0;
  right: 0;
  margin: auto;
}

.bg-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #c13341;
  background-image: url("../../assets/img/bg.jpg");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  position: relative;
}
</style>
