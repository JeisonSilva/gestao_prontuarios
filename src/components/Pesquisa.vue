<template>
  <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="form-group">
        <input v-model="pesquisa" type="text" class="form-control" placeholder="pesquise por um nome">
        <br>
        <button class="btn btn-success">PESQUISAR</button>
    </div>

    <div class="list-group">
        <div v-for="prontuario in prontuarios" v-bind:key="prontuario.re" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{prontuario.nome}}</h5>
            <small>
                <button class="btn btn-primary" v-on:click="favoritar(prontuario.re)">
                    <i  v-if="prontuario.favoritado" class="fa fa-star"></i>
                    <i  v-else class="fa fa-star-o"></i>
                </button>
            </small>
            </div>
            <small>Re. {{prontuario.re}}</small>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            pesquisa: '',
            prontuarios: [
                {
                    re: 1,
                    nome: 'Jeison O. da Silva',
                    favoritado: false
                }
            ]
        }
    },
    methods:{
        favoritar:function (re) {
            let prontuario = this.prontuarios.find(x=>x.re === re)
            if(prontuario != null || prontuario != undefined){
                prontuario.favoritado = !prontuario.favoritado 
                this.prontuarios.pop(x=>x.re === re)
                this.prontuarios.push(prontuario)
            }
        }
    }    
}
</script>

<style>

</style>