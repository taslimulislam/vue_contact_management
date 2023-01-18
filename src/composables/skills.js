import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router";

axios.defaults.baseURL = "http://192.168.0.104:8000/api/";

export default function useSkills(){

   const skills = ref([]);
   const skill = ref([]);
   const errors = ref([]);
   const router = useRouter;

   const getSkills = async () => {

      const response = await axios.get("products");
      skills.value = response.data; 
   };

   const getSkill = async (id) => {

      const response = await axios.get("products/" + id);
      skill.value = response.data.data;
   };

   const storeSkill = async (data) => {

      try {
         await axios.post("products", data);
         await router.push({name:"ContactManager"});
         
      } catch (error) {
         if (error.response.status===422) {
            errors.value = error.response.data.errors
         }
         
      }
   };

   const updateSkill = async (id) =>{
      try {
         await axios.put("products/" + id, skill.value);
         await router.push({name:"ContactManager"});
      } catch (error) {
         if (error.response.status===422) {
            errors.value = error.response.data.errors
         }
         
      }
   }

   const destroySkill = async (id) => {
      if (!window.confirm("Are you sure ?")) {
         return; 
      }
      await axios.delete("products/" + id);
      await getSkills();
   }

   
   return {
      skill,
      skills,
      getSkill,
      getSkills,
      storeSkill,
      updateSkill,
      destroySkill,
      errors

   };
}
