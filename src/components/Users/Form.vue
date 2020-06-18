<template>
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
    <md-card>
      <md-card-content>
        <form class="md-layout" @submit.prevent="handleSubmit">
            <div class="md-layout-item md-small-size-100 md-size-25">
              <md-field>
                <label>Name</label>
                <md-input name="name" v-model="form.name" required autocomplete="off" type="text" />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-field>
                <label>Email</label>
                <md-input name="email" v-model="form.email" required autocomplete="off" type="email" />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-30">
              <md-field>
                <label>Phone</label>
                <md-input name="phone" v-model="form.phone" autocomplete="off" required type="number" />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-15">
              <md-button class="md-simple md-primary md-bordered" type="submit" :disabled="isDisabled">
                <md-progress-spinner
                  v-if="isDisabled"
                  :md-diameter="15"
                  :md-stroke="3" md-mode="indeterminate" />
                <span v-else>
                  <md-icon v-show="btnTxt==='Add'">add</md-icon>
                  {{btnTxt}} User
                </span>
              </md-button>
              <a v-show="btnTxt==='Update'" class="md-close-bar" @click="closeUpdate">×</a>
            </div>
        </form>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'user-form',
  props: {
    editId: {
      type: String,
      default: ""
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      type: ["info", "success", "warning", "danger"],
      form: {
        name: '',
        email: '',
        phone: ''
      },
    }
  },
  watch:{
    editId(val){
      if(val){
        const user = this.$store.state.users.find(users => users._id === val);
        this.form = {
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      }else{
        this.resetForm();
      }
    }
  },
  computed:{
    btnTxt(){
      return this.editId ? "Update" : "Add" ;
    }
  },
  methods: {
    resetForm(){
      this.form = {
        name: '',
        email: '',
        phone: ''
      };
    },
    handleSubmit(){
      let payload = this.form;
      this.$emit('submit',payload);
      this.resetForm();
      this.closeUpdate();
    },
    closeUpdate(){
      this.$emit('close-update',true);
    },
  },
}
</script>