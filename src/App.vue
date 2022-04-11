<template>
  <main>
    <div div="content-box-group-container"> </div>
  </main>
</template>

<script lang="ts" setup>
  import ContentBox from './components/ContentBox.vue';
</script>

<style>
  @font-face {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(@/assets/fonts/Ubuntu/Ubuntu-Light.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(@/assets/fonts/Ubuntu/Ubuntu-LightItalic.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(@/assets/fonts/Ubuntu/Ubuntu-Regular.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(@/assets/fonts/Ubuntu/Ubuntu-Italic.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(@/assets/fonts/Ubuntu/Ubuntu-Medium.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url(@/assets/fonts/Ubuntu/Ubuntu-MediumItalic.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(@/assets/fonts/Ubuntu/Ubuntu-Bold.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(@/assets/fonts/Ubuntu/Ubuntu-BoldItalic.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-Thin.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 100;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-ThinItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-Light.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 200;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-LightItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-Light.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-LightItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-Regular.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-Italic.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-Medium.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-MediumItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-SemiBold.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-SemiBoldItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-Bold.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-BoldItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-ExtraBold.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 800;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-ExtraBoldItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-Black.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    src: url(@/assets/fonts/Montserrat/Montserrat-BlackItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-ExtraLight.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: italic;
    font-weight: 200;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-ExtraLightItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-Light.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-LightItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-Regular.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-Italic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-Medium.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-MediumItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-SemiBold.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-SemiBoldItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-Bold.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-BoldItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-ExtraBold.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: italic;
    font-weight: 800;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-ExtraBoldItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-Black.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/static/SourceCodePro-BlackItalic.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 100 200 300 400 500 600 700 800 900;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/SourceCodePro-VariableFont_wght.ttf)
      format('truetype');
  }

  @font-face {
    font-family: 'Source Code Pro';
    font-style: italic;
    font-weight: 100 200 300 400 500 600 700 800 900;
    font-display: swap;
    src: url(@/assets/fonts/SourceCodePro/SourceCodePro-Italic-VariableFont_wght.ttf)
      format('truetype');
  }

  body {
    margin: 0;
    margin-bottom: 15px;
    overflow-y: overlay;
    overflow-x: hidden;
    background-color: #212121;
    color: #fff;
  }

  html {
    scroll-behavior: smooth;
  }

  h1 {
    font-size: 1.65em;
    font-weight: 700;
  }

  h2 {
    font-size: 1.35em;
    font-weight: 600;
  }

  .content > h1,
  .content > h1 + h2 {
    margin-left: 30px;
    margin-right: 30px;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: 'Montserrat', 'Franklin Gothic Medium', 'Arial Narrow', Arial,
      sans-serif;
  }

  li {
    list-style: none;
  }

  .header {
    display: flex;
    width: calc(100vw - (10px * 2));
    justify-content: space-between;
    margin: 10px 10px 0;
    align-items: center;
  }

  .nav-links {
    margin-right: 15px;
    float: right;
  }

  .hamburger {
    display: none;
  }

  .nav-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    padding: 0;
    margin: 0;
  }

  .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out,
      background-color 0.25s;
    background-color: #fff;
  }

  .nav-item {
    user-select: none;
  }

  a {
    text-decoration: none;
    color: #00ccff;
    transition: background-color 0.25s, color 0.25s;
  }

  main h2 {
    margin-left: 5px;
    margin-right: 5px;
  }

  .nav-item {
    user-select: none;
  }

  .nav-item a {
    height: fit-content;
    font-family: 'Montserrat', 'Franklin Gothic Medium', 'Arial Narrow', Arial,
      sans-serif;
    margin: 0 5px;
    font-size: 19px;
    font-weight: 600;
    color: #fff;
    border-bottom: transparent solid 4px;
    transition: border 0.25s, color 0.25s;
  }

  .nav-item a.router-link-active {
    border-bottom: #ffffff solid 4px;
  }

  .nav-item a:hover:not(.router-link-active) {
    border-bottom: #019ac0 solid 4px;
  }

  code {
    padding: 2px;
    background-color: #161616;
    border-radius: 4px;
  }

  h5,
  h6,
  p {
    font-size: 18px;
    font-weight: 400;
    color: #fff;
    font-family: 'Ubuntu', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    user-select: none;
  }

  .nav-logo p {
    height: fit-content;
    margin: 0 0 0 10px;
    padding: 0;
    font-family: 'Montserrat', 'Franklin Gothic Medium', 'Arial Narrow', Arial,
      sans-serif;
    font-weight: 700;
    font-size: 28px;
    color: #fff;
  }

  .nav-logo img {
    height: 50px;
    border-radius: 50%;
    box-shadow: 4px 4px 4px #000000;
  }

  main {
    text-align: center;
  }

  @media only screen and (max-width: 840px) {
    .nav-menu {
      padding: 10px 0;
      position: fixed;
      left: -100%;
      top: 5rem;
      flex-direction: column;
      background-color: #212121bf;
      margin: 0 30px;
      width: calc(100% - (30px * 2));
      border-radius: 10px;
      text-align: center;
      transition: left 0.4s, background-color 0.25s, border 0.4s;
      box-shadow: 10px 10px 10px #00000099;
      backdrop-filter: blur(5px);
      z-index: 10;
      border: 2px solid #fff;
    }

    .nav-menu.active {
      left: 0;
    }

    .hamburger {
      display: block;
      cursor: pointer;
      margin-right: 10px;
    }

    .hamburger.active .bar:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }

    .nav-item {
      padding: 2px 0;
    }

    .nav-item a {
      font-size: 33px;
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c2c2c2;
  }

  button {
    padding: 10px;
    border-radius: 10px;
    font-size: 18px;
    margin: 5px 0;
    font-family: 'Montserrat', 'Franklin Gothic Medium', 'Arial Narrow', Arial,
      sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: border 0.25s, background-color 0.25s, color 0.25s;
    user-select: none;
    background-color: #272727;
    color: #fff;
    border: 1px solid #000000;
  }

  button:disabled {
    cursor: not-allowed;
    background-color: #141414;
    color: #8e8e8e;
  }

  .quick-action-buttons-container {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 40%;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 781px) {
    .quick-action-buttons-container {
      width: 90%;
    }
  }

  button:hover:not(:disabled) {
    background-color: #202020;
  }

  button:focus {
    outline: none;
  }

  img.hero-img {
    border-radius: 50%;
    width: 160px;
    margin: 20px 0;
    box-shadow: 0px 15px 20px #000000;
  }
</style>
