<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 mrgnbtm">
        <h2>Fill out the form, and choose an option</h2>
        <form>
          <div class="row">
            <div class="form-group col-md-6 mrgnbtm">
              <label htmlFor="exampleInputEmail1">First Name</label>
              <input type="text" class="form-control" v-model="firstName" name="firstname" id="firstname" aria-describedby="emailHelp" placeholder="First Name" required/>
            </div>
            <div class="form-group col-md-6 mrgnbtm">
              <label htmlFor="exampleInputPassword1">Last Name</label>
              <input type="text" class="form-control" v-model="lastName" name="lastname" id="lastname" placeholder="Last Name" required/>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12 mrgnbtm">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="text" class="form-control" v-model="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" required/>
            </div>
          </div>
          <button type="button" @click='userLogin()' class="btn btn-danger my-4 ">Login</button>
          <button type="button" @click='adminLogin()' class="btn btn-danger my-4 mx-4">Login As admin</button>
          <button type="button" @click='createUser()' class="btn btn-danger my-4">Create An Account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Login extends Vue {

  @Prop([]) users;

  data() {
    return {
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  adminLogin() {

    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    }
      this.$emit('adminLogin', payload)

    this.clearForm();
  }

  userLogin() {

    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    }
      this.$emit('userLogin', payload)

    this.clearForm();
  }

  createUser() {
    console.log(this.firstName)
    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    }
    this.$emit('createUser', payload)
    this.clearForm();
  }

  clearForm() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
  }
}
</script>