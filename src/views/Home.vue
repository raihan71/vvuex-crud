<template>
  <div>
    <div class="home">
      <img alt="Vue logo" width="100" height="100" src="../assets/logo.png">
      <h3>{{message}}</h3>
    </div>
    <user-form
      :editId=editId
      :isDisabled=isDisabled
      @submit="handleSubmit"
      @close-update="closeUpdate" />
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-progress-bar v-if="isLoading" md-mode="query" />
      <user-table v-else
        :columns=headers
        :items=users
        @edit="handleEditUser"
        @delete="handleDeleteUser"
        table-header-color="green"
      />
    </div>
  </div>
</template>

<script>
import { UserTable, UserForm } from '@/components'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data(){
    return {
      message: "Welcome to VueCrud",
      isLoading: false,
      headers: ['name','email','phone'],
      type: ["info", "success", "warning", "danger"],
      editId: '',
      isDisabled: false
    }
  },
  components: {
    UserTable,
    UserForm
  },
  methods: {
    closeUpdate(val){
      if(val) this.editId = "";
    },
    handleEditUser(user){
      this.editId = user._id;
    },
    handleSubmit(val){
      const payload = val;
      if(!this.editId){
        this.handleAddUser(payload);
      }else{
        payload._id = this.editId;
        this.handleUpdateUser({...payload});
      }
    },
    handleAddUser(user){
      this.isDisabled = true;
      this.$store.dispatch('createUser', user).then((resp) => {
        if(resp){
          this.isDisabled = false;
          this.notifyVue('top','right',`${user.name} successfully added`,this.type[1]);
        }else{
          this.isDisabled = false;
          this.notifyVue('top','right',`${user.name} not successfully added`,this.type[3]);
        }
      });
    },
    handleUpdateUser(user){
      this.isDisabled = true;
      this.$store.dispatch('updateUser', user).then((resp) => {
        if(resp){
          this.isDisabled = false;
          this.notifyVue('top','right',`${user.name} successfully updated`,this.type[1]);
        }else{
          this.isDisabled = false;
          this.notifyVue('top','right',`${user.name} not successfully updated`,this.type[3]);
        }
      });
    },
    handleDeleteUser(user){
      this.isLoading = true;
      this.$store.dispatch('deleteUser', user).then((resp) => {
        if(resp){
          this.isLoading = false;
          this.notifyVue('top','right',`${user.name} successfully deleted`,this.type[1]);
        }else{
          this.isLoading = false;
          this.notifyVue('top','right',`${user.name} not successfully deleted`,this.type[3]);
        }
      });
    },
    notifyVue(verticalAlign, horizontalAlign,message,type) {
      this.$notify({
        message: `${message}`,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: type
      });
    },
    getUsers(){
      this.isLoading = true;
      this.$store.dispatch('getUsers').then((resp) => {
        resp ? this.isLoading = false : this.isLoading = true;
      });
    }
  },
  mounted(){
    this.getUsers();
  },
  computed: mapState([
    'users'
  ])
}
</script>
