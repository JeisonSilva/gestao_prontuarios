<template>
  <div>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link to="/pesquisa" class="nav-link">Pesquisa</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/registro" class="nav-link">Registro</router-link>
      </li>
      <li class="nav-item">        
        <router-link to="/favorito" class="nav-link">Favorito</router-link>
      </li>
    </ul>

  
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
