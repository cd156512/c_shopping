import { ref, computed } from 'vue'
import { defineStore} from 'pinia'
export const userStore = defineStore('user',()=>{
	const name = ref('LiLei');
	function updateUinfo (val){
		name.value = val;
	}
	return{ name, updateUinfo}
})
export default{
	userStore
}
 
