import axios from "axios";

export class ContactService{
   static serverURL = "http://192.168.0.104:8000/api";

   static getAllContacts(){
      let dataURL = `${this.serverURL}/products`;
      return axios.get(dataURL);
   }

   static getContact(contactId){
      let dataURL = `${this.serverURL}/products/${contactId}`;
      return axios.get(dataURL);
   }

   static CreateContact(contact){
      let dataURL = `${this.serverURL}/products/`;
      return axios.post(dataURL,contact);
   }

   static UpdateContact(contact, contactId){
      let dataURL = `${this.serverURL}/products/${contactId}`;
      return axios.put(dataURL,contact);
   }

   static DeleteContact(contactId){
      let dataURL = `${this.serverURL}/products/${contactId}`;
      return axios.delete(dataURL);
   }

   static getAllGroups(){
      let dataURL = `${this.serverURL}/groups/`;
      return axios.get(dataURL);
   }

   static GetGroup(contact){
      let groupId = contact.groupId;
      let dataURL = `${this.serverURL}/groups/${groupId}`;
      return axios.get(dataURL);
   }
}