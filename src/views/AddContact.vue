<template>
   <div class="container">
    <div class="row">
      <div class="col">
        <p class="h3 text-success">Add Contact</p>
      </div>
    </div>
   </div>
   <div class="container">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="submitCreate()">
          <div class="md-2">
            <input type="text" v-model="contact.name" placeholder="Name" class="form-control">
          </div>
          <div class="md-2">
            <input type="text" v-model="contact.detail" placeholder="Details" class="form-control">
          </div>
          
           <div class="md-2">
            <select v-model="contact.groups" class="form-control" v-if="groups.length > 0">
              <option value="">select group</option>
              <option :value="group.id" v-for="group of groups" :key="group.id">{{group.name}}</option>
            </select> 
          </div>
          <div class="md-2">
            <input type="submit" value="Create" class="btn btn-success">
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img src="data:image/png;base64,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" class="contact-image">
      </div>
    </div>
   </div>
</template>

<script>

import {ContactService} from "../services/ContactService.js";
// import Spinner from '../components/Spinner.vue';

export default {
  name: 'AddContact',
  // components: { Spinner },
  data: function () {
    return {
      contact: {
        name : '',
        detail : '',
       
      },
      groups : []

    }
  },
  // created : async function (){
  //   try {
  //     let response = await ContactService.getAllGroups();
  //     this.groups = response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  methods : {
    submitCreate : async function(){
    try {
      let response = await ContactService.CreateContact(this.contact);
      if (response) {
        return this.$router.push('/');
      } else {
        return this.$router.push('contacts/add')
      }
    } catch (error) {
      console.log(error);
    }
  }
  }
}
</script>