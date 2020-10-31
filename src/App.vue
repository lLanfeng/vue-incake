<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
(function () {
  function w() {
    var r = document.documentElement;
    var a = r.getBoundingClientRect().width;
    if (a < 320) {
      a = 320;
    }
    var rem = a / 7.5;
    r.style.fontSize = rem + "px";
  }
  w();
  var t;
  window.addEventListener(
    "resize",
    function () {
      clearTimeout(t);
      t = setTimeout(w, 300);
    },
    false
  );
})();
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body{
  font-size: 14px;
  width: 100%;
  height: 100%;
  overflow-x:hidden
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
a:active{
  color: #fff;
}
</style>
