<template>
  <div id="title-bar">
    <img id="title-img" src="../assets/logo.png" />
    <div id="title"><slot>Discord RPC</slot></div>
    <div id="title-bar-btns">
      <button
        id="close-btn"
        class="control-button"
        title="Close"
        @click="closeWindow"
        ><img src="../assets/close.png" alt="Close"
      /></button>
      <button
        id="max-btn"
        class="control-button"
        ref="max"
        @click="toggleMaximize"
        title="Maximize"
        ><img
          ref="maximg"
          src="../assets/maximize.png"
          alt="Maximize / Restore Down"
      /></button>
      <button
        id="min-btn"
        class="control-button"
        title="Minimize"
        @click="minimizeWindow"
        ><img src="../assets/minimize.png" alt="Minimize"
      /></button>
    </div>
  </div>
  <div class="title-bar"></div>
</template>
<script lang="ts">
  import { Vue } from 'vue-class-component';
  import { remote } from 'electron';
  const window = remote.getCurrentWindow();

  export default class Header extends Vue {
    $refs!: {
      maximg: HTMLImageElement;
      max: HTMLButtonElement;
    };
    changeMaxBtn() {
      this.$refs.maximg.src = window.isMaximized()
        ? require('../assets/unmaximize.png')
        : require('../assets/maximize.png');
      this.$refs.maximg.alt = window.isMaximized()
        ? 'Restore Down'
        : 'Maximize';
      this.$refs.max.title = window.isMaximized() ? 'Restore Down' : 'Maximize';
    }
    toggleMaximize() {
      if (!window.maximizable) return;
      window.isMaximized() ? window.unmaximize() : window.maximize();
    }
    minimizeWindow() {
      window.minimize();
    }
    closeWindow() {
      window.close();
    }
    mounted() {
      this.changeMaxBtn();
      window.on('minimize', this.changeMaxBtn);
      window.on('resize', this.changeMaxBtn);
      window.on('resized', this.changeMaxBtn);
      window.on('unmaximize', this.changeMaxBtn);
      window.on('maximize', this.changeMaxBtn);
      window.on('restore', this.changeMaxBtn);
    }
    beforeUnmount() {
      window.off('minimize', this.changeMaxBtn);
      window.off('resize', this.changeMaxBtn);
      window.off('resized', this.changeMaxBtn);
      window.off('unmaximize', this.changeMaxBtn);
      window.off('maximize', this.changeMaxBtn);
      window.off('restore', this.changeMaxBtn);
    }
  }
</script>

<style>
  .subtitle {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: 25px;
    margin-right: 25px;
    white-space: pre;
  }

  #title-bar {
    -webkit-app-region: drag;
    user-select: none;
    -webkit-user-select: none;
    height: 35px;
    padding: none;
    margin: 0px;
    background-color: #141414;
    border-bottom-width: 0.5px;
    border-bottom-color: #c2c2c2d8;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 3;
    box-shadow: 0px -5px 20px 20px #141414;
  }

  .title-bar {
    height: 50px;
    background-color: #00000000;
    position: relative;
    top: 0px;
    width: 100%;
  }

  #title-img {
    position: fixed;
    top: 5px;
    left: 5px;
    z-index: 4;
    width: 25px;
    height: 25px;
  }

  #title {
    position: fixed;
    top: 4px;
    left: 39px;
    font-weight: 400;
    font-size: 20px;
    z-index: 4;
  }

  #title-bar-btns {
    -webkit-app-region: no-drag;
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 4;
  }

  .control-button {
    background-color: transparent;
    width: 50px;
    height: 35px;
    color: #c2c2c2d8;
    border-bottom: none;
    border-top: none;
    border-left: none;
    border-right: none;
    padding: 0px;
    margin: 0px;
    float: right;
    line-height: 0px;
    transition: 0.5s;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }

  .control-button img {
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }

  #max-btn:hover {
    background-color: #444444c2;
  }

  #min-btn:hover {
    background-color: #444444c2;
  }

  #close-btn:hover {
    background-color: #960000c2;
  }

  .control-button:focus {
    outline: none;
  }
</style>
