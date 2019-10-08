<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <div class="row">
        <div class="col-sm-12 col-md-10 col-sx-10">
            <div class="form-group">
                <input v-model="pesquisa" type="text" class="form-control" placeholder="digite sua pesquisa (RE ou NOME)">
                
            </div>
        </div>

        <div class="col-sm-12 col-md-2 col sx-2">
            <button class="btn btn-success" v-on:click="pesquisar(pesquisa)">PESQUISAR</button>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-10 col-sx-10">
            <div class="list-group">
                <div v-for="prontuario in prontuarios" v-bind:key="prontuario.id" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{prontuario.nome}}</h5>
                <small>
                    <button class="btn btn-primary" v-on:click="favoritar(prontuario.re, pesquisa)">
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

Vue.use(VueToast,{
  position: 'top'
});

export default {
    data: function () {
        return {
            pesquisa: '',
            prontuarios:[],
            url_base:'http://localhost:3000'
        }
    },
    methods:{
        favoritar:function (re, textoPesquisa) {              
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
        pesquisar: function (nome) {
            let vm = this

            axios.get(`${this.url_base}/prontuarios?q=${nome}`)
                .then(function (response){
                    vm.prontuarios = response.data
                })            
        },
        ativarFavorito: function (prontuario) {
            axios.patch(`${this.url_base}/prontuarios/${prontuario.re}`,{
                    favoritado: true
                })
                .then(function (response) {
                    this.pesquisar(textoPesquisa)
                })
                .catch(function (error) {
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
        registrarFavorito: function (prontuario) {
            axios.post(`${this.url_base}/favoritos`, prontuario)
                .then(function (reponse) {
                    Vue.$toast.success('Prontuário favoritado')
                })
                .catch(function (error) {
                    Vue.$toast.error('Falha ao tentar favoritar')
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