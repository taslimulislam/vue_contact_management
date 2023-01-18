

<template>
  <div class="container">
  <div class="row">
    <div class="col">
      <p class="h3 text-success fw-bold">Contact Manageer
        <router-link to="/contacts/add" class="btn btn-success btn-sm">
          <i class="fa fa-plus-circle"></i>
          New
        </router-link>
      </p>
      <p class="fst-italic">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, maiores nam. Quod vero libero animi odit corrupti dolore blanditiis accusamus magnam quasi, velit quos repudiandae quisquam sequi asperiores eligendi obcaecati.</p>
      <form action="">
        <div class="row">
        <div class="col-md-6">
          <div class="row">
            <div class="col">
              <input type="text"  class="form-control" placeholder="Search New">
            </div>
            <div class="col">
              <input type="submit" class="btn btn-outline-dark">
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  </div>
  </div>
  <!-- spinner -->
  <div v-if="loading">
    <div class="container">
      <div class="row">
        <div class="col">
          <spinner/>
        </div>
      </div>
    </div>
  </div>
  <!-- Error -->
  <div v-if="!loading && errorMessage">
    <div class="container">
      <div class="row">
        <div class="col">
          <p class="h5 text-danger fw-bold">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-3" v-if="contacts.length > 0">
  <!-- <div class="container mt-3"> -->
    <div class="row">
      <div class="col-md-6" v-for="contact in contacts" :key="contact.id">
        <div class="card my-2 list-group-item-success">
          <div class="card-body">
            <div class="row align-item-center">
              
              <div class="col-sm-11">
                
                <ul  class="list-group">
                  <li class="list-group-item">Name : <span class="fw-bold">{{ contact.name }}</span></li>
                  <li class="list-group-item">Details : <span class="fw-bold">{{ contact.detail }}</span></li>
                  <li class="list-group-item">date : <span class="fw-bold">{{ contact.created_at }}</span></li>
                </ul>
              </div>
              <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                <router-link :to="`/contacts/view/${contact.id}`" class="btn btn-warning mb-1">
                  <i class="fa fa-eye"></i>
                </router-link>
                <router-link :to="`/contacts/edit/${contact.id}`" class="btn btn-primary  mb-1">
                  <i class="fa fa-pen"></i>
                </router-link>
                <button class="button btn btn-danger  my-1" @click="contentDelete(contact.id)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {ContactService} from "../services/ContactService.js";
import Spinner from '../components/Spinner.vue';

export default {
  name: 'ContactManager', 
  components: { Spinner },
  data: function() {
    return {
      loading:false,
      contacts: [],
      errorMessage:null

    }
  },
  created: async function (){

    try {
      this.loading = true;
      let response = await ContactService.getAllContacts();
      this.contacts = response.data.data;
      this.loading = false;
    } catch (error) {
      this.errorMessage = error;
      this.loading = false;
    }

  },
  methods: {
    contentDelete : async function(contactId){
    try {
      if (!window.confirm("Are you sure ?")) {
         return; 
      }
      this.loading = true;
      let response = await ContactService.DeleteContact(contactId);
      if (response) {
        let response = await ContactService.getAllContacts();
        this.contacts = response.data.data;
        this.loading = false;
      } 
    } catch (error) {
      this.errorMessage = error;
      this.loading = false;
    }
  }
  }
  // created() {
  //   this.fetchTasks();
  // },
  // methods: {
  //   fetchTasks() {
  //     axios.get("http://192.168.0.104:8000/api/products").then(response => {
  //       this.tasks = response.data.data;
  //       console.log(response.data);
  //     })
  //   }
  // }
}
</script>