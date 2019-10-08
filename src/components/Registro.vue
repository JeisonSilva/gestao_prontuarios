<template>
  <div>    
      <div class="card">
        <div class="card-body">
          <div class="card-title">Registro de Prontuários</div>

          <div class="form-group">
            <input v-model="prontuario.re" type="number" id="txt-re" class="form-control" placeholder="re">
          </div>
          <div class="form-group">
            <input v-model="prontuario.nome" type="text" id="txt-nome" class="form-control" placeholder="nome">
          </div>

          <button v-on:click="registrar()" class="btn btn-success">REGISTRAR</button>
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
  data:function () {
    return {
      prontuario:{
        re: 0,
        nome: ''
      },
      url_base:'http://localhost:3000/prontuarios/'
    }
  },
  methods:{
    registrar:function () {
      var vm = this

      if(this.validarDadosProntuario(this.prontuario)){
        axios.post(this.url_base, {
          re: this.prontuario.re, 
          nome: this.prontuario.nome.toUpperCase(),
          favoritado: false})
          .then(function (response) {
            Vue.$toast.success(`${vm.prontuario.nome} foi registrado com sucesso`)
            vm.prontuario.nome =''
            vm.prontuario.re = 0
          })
          .catch (function (err) {
            Vue.$toast.error(`Não foi possível registrar ${vm.nome}`)
          })
      }

      
    },
    validarDadosProntuario:function (prontuario){
      if(prontuario.re === 0){        
        Vue.$toast.error("Preencher o RE")
        return false
      }

      if(prontuario.nome === ''){        
        Vue.$toast.error("Preencher o Nome")
        return false
      }

      return true
    }
  }
}
</script>

<style>
.card{
  width: 50%;
  float: left;
  margin: 5% 0% 0% 25%
}

#txt-re{
  width: 20%
}
</style>