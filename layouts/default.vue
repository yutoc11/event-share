<template lang="pug">
  .event-share
    header.bg-color
      .center-text
        p Googleログイン

    section
      nuxt/

    footer.bg-color
      .center-text
        p ©2019 event-share.
</template>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.bg-color{
  background-color: #EEE8DD;
}

.center-text{
  text-align: center;
}

header{
  height: 48px;
  line-height: 48px;
}

footer{
  padding: 40px 0;
  background-color: rgba(255,255,255,0);
}
</style>
