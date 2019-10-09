<template>
<div>
  <div class="row">
    <div class="col-sm-12 col-md-10 col-sx-10">
      <div class="list-group">
        <div v-for="prontuario in prontuarios" v-bind:key="prontuario.id" class="list-group-item list-group-item-action">
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
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
import 'font-awesome/css/font-awesome.css'

Vue.use(VueToast,{
  position: 'top'
});

export default {
  data: function () {
        return {
            prontuarios:[],
            url_base:'http://localhost:3000'
        }
  },
  created(){
    let vm = this;
    axios.get(`${this.url_base}/favoritos`)
        .then(function (response) {
          vm.prontuarios = response.data
        })
        .catch(function (err) {
        })  
  },
  methods: {
    favoritar:function (re) {              
            this.prontuarios.forEach(element =>{
                if(element.re === re){
                    element.favoritado = !element.favoritado

                    if(element.favoritado){
                        this.ativarFavorito(element)
                        this.registrarFavorito(element)
                    }else{                        
                        this.desativarFavorito(element)
                        this.removerFavorito(element)
                    }
                }
            })
    },
    desativarFavorito: function (prontuario) {
            axios.patch(`${this.url_base}/prontuarios/${prontuario.re}`,{
                    favoritado: false
                })
                .then(function (response) {
                    this.pesquisar(textoPesquisa)
                })
                .catch(function (error) {
                })
    },
    removerFavorito: function (prontuario) {
            axios.delete(`${this.url_base}/favoritos/${prontuario.id}`)
            .then(function (reponse) {
                    Vue.$toast.success('Prontuário excluído dos favoritos')
                })
                .catch(function (error) {
                    Vue.$toast.error('Falha ao tentar excluir dos favoritos')
                })
    }
  }
}
</script>

<style>

</style>