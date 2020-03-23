<template>
  <div>
    <div id="player"></div>
  </div>
</template>
<script>
import Player from "xgplayer";
export default {
  data() {
    return {
      player: null
    };
  },
  mounted() {
    this.player = new Player({
      id: "player",
      volume: 0.3,
      url: "http://h5player.bytedance.com/video/mp4/xgplayer-demo-720p.mp4",
      poster:
        "//s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
      playsinline: true,
      fluid: true,
      autoplay: true,
      autoplayMuted: true,
      closeVideoClick: false
    });
  }
};
</script>
<style scoped>
#player {
  width: 100%;
  height: 300px;
}
</style>
