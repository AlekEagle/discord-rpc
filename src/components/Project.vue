<template>
  <div v-if="sharedState.to" :class="getClasses()">
    <img
      v-if="sharedState.icon"
      class="project_icon"
      :src="sharedState.icon"
      loading="lazy"
    />
    <div class="project_title" v-text="sharedState.title" />
    <div class="project_description"><slot /></div>
    <router-link v-if="!sharedState.disabled" :to="sharedState.to">
      <span class="project_link" />
    </router-link>
    <span v-else class="project_link disabled" />
  </div>
  <div v-else-if="sharedState.action" :class="getClasses()">
    <img
      v-if="sharedState.icon"
      class="project_icon"
      :src="sharedState.icon"
      loading="lazy"
    />
    <div class="project_title" v-text="sharedState.title" />
    <div class="project_description"><slot /></div>
    <span
      v-if="!sharedState.disabled"
      class="project_link"
      @click="handleClick"
    />
    <span v-else class="project_link disabled" />
  </div>
  <div v-else :class="getClasses()">
    <img
      v-if="sharedState.icon"
      class="project_icon"
      :src="sharedState.icon"
      loading="lazy"
    />
    <div class="project_title" v-text="sharedState.title" />
    <div class="project_description"><slot /></div>
    <span
      v-if="!sharedState.disabled && !sharedState.noSpan"
      class="project_link"
    />
    <span v-else-if="!sharedState.noSpan" class="project_link disabled" />
  </div>
</template>
<script lang="ts">
  import { Vue } from 'vue-class-component';

  export default class Project extends Vue {
    action: any;
    sharedState: any;
    title: any;
    icon: any;
    classes: any;
    disabled: any;
    to: any;
    noSpan: any;
    data() {
      return {
        privateState: {},
        sharedState: {
          title: '',
          icon: '',
          classes: [],
          disabled: false,
          to: '',
          action: function() {},
          noSpan: false
        }
      };
    }
    handleClick() {
      this.action(this);
    }
    getClasses() {
      return `project${
        this.sharedState.disabled ? ' disabled' : ''
      } ${this.sharedState.classes.join(' ')}`;
    }

    update(params: any) {
      this.$data = { ...this.$data, ...params };
    }

    mounted() {
      this.sharedState.title = this.$attrs.title;
      this.sharedState.icon = this.$attrs.icon;
      this.sharedState.classes =
        this.$attrs.classes || this.sharedState.classes;
      this.sharedState.disabled = this.$attrs.disabled;
      this.sharedState.to = this.$attrs.to;
      this.sharedState.action = this.$attrs.action;
      this.sharedState.noSpan = !!this.$attrs.noSpan;
    }
  }
</script>
<style>
  .project {
    font-size: 16px;
    margin: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    background: #1d1d1d;
    border-radius: 10px;
    border: 1px solid #1d1d1d;
    float: left;
    transition: 0.3s;
    outline: none;
    align-self: stretch;
    position: relative;
  }

  .project * {
    transition: 0.3s;
  }

  .project_link {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    cursor: pointer;

    z-index: 1;

    /* fixes overlap error in IE7/8, 
       make sure you have an empty gif */
    background-image: url('/img/empty.gif');
  }

  .project_icon {
    height: 64px;
    float: left;
    margin: 15px;
    max-width: 64px;
    max-height: 64px;
  }

  .project_title {
    font-size: 1.2em;
    text-align: left;
    margin-bottom: 10px;
    margin-top: 15px;
  }

  .project_description {
    font-size: 0.9em;
    color: #9c9c9c;
    text-align: left;
    overflow-x: hidden;
    word-wrap: break-word;
  }

  .error_text {
    color: #ec1a1a;
  }

  .uploadfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .uploadfile + label {
    font-size: 25px;
    font-weight: 700;
    color: white;
    background-color: #161616;
    display: block;
    border-radius: 10px;
    padding: 50px;
    margin: 10px;
    cursor: pointer;
    overflow-x: hidden;
    overflow-wrap: break-word;
    max-width: inherit;
  }

  .uploadfile + label:hover {
    background-color: #1f1f1f;
  }

  @media screen and (max-width: 589px) {
    .project {
      width: calc((100% - (32px * 1)) / 1);
    }
  }

  @media screen and (min-width: 590px) and (max-width: 1152px) {
    .project {
      width: calc((100% - (32px * 2)) / 2);
    }
  }

  @media screen and (min-width: 1153px) and (max-width: 1366px) {
    .project {
      width: calc((100% - (32px * 3)) / 3);
    }
  }

  @media screen and (min-width: 1367px) and (max-width: 1699px) {
    .project {
      width: calc((100% - (32px * 4)) / 4);
    }
  }

  @media screen and (min-width: 1700px) and (max-width: 2099px) {
    .project {
      width: calc((100% - (32px * 5)) / 5);
    }
  }

  @media screen and (min-width: 2100px) {
    .project {
      width: calc((100% - (32px * 6)) / 6);
    }
  }

  .auth .project_title {
    margin-left: 7px;
  }

  .auth .project_description {
    text-align: center;
  }

  .auth .project_description select {
    width: 95%;
    margin: 5px 0px;
  }

  .auth .project_description .darktextbox {
    width: 95%;
    margin: 5px 0px;
  }

  .project.auth {
    padding-right: 0;
  }

  .project.float:hover:not(.disabled) {
    background: #202020;
    box-shadow: 13px 13px 5px #141414b0;
    border: 1px solid #505050;
    transform: translate(-7px, -7px);
  }

  .project.sink:hover:not(.disabled) {
    box-shadow: inset 13px 13px 5px #141414b0;
    border: 1px solid #505050;
  }

  .project.sink:hover:not(.disabled) * {
    transform: translate(7px, 7px);
  }

  .project.float:focus:not(.disabled) {
    background: #252525;
    box-shadow: 13px 13px 5px #141414b0;
    border: 1px solid #505050;
  }

  .project.project.sink:focus:not(.disabled) * {
    transform: translate(7px, 7px);
  }

  .project.sink:focus:not(.disabled) {
    box-shadow: inset 13px 13px 5px #141414b0;
    border: 1px solid #505050;
  }

  .project_link.disabled {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: not-allowed;
    background: #00000099;
    border-radius: 10px;
    border: 1px solid #1d1d1d;

    z-index: 2;

    /* fixes overlap error in IE7/8, 
         make sure you have an empty gif */
    background-image: url('/img/empty.gif');
  }
</style>
