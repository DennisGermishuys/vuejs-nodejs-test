<template>
  <div class="hello">
    <Header v-if="isAdmin" />
    <h3 class="text-muted mx-5 px-2 mt-4" v-if="loginError">User does not exist, please create an account</h3>
    <h2 v-if="typeof weather === 'string' && !isAdmin" >Your weather should be: {{weather}}</h2>
    <Login @adminLogin="adminLogin($event)" @createUser="userCreate($event)" @userLogin="userLogin($event)" v-if="!isAdmin && typeof weather !== 'string'"/>
    <div class="container mrgnbtm" v-if="isAdmin" >
      <div class="row">
        <div class="col-md-8">
          <CreateUser @createUser="userCreate($event)" @adminLogin="adminLogin($event)" :isAdmin="isAdmin" />
        </div>
        <div class="col-md-4">
          <DisplayBoard :numberOfUsers="numberOfUsers" @getAllUsers="getAllUsers()" />
        </div>
      </div>
    </div>
    <div class="row mrgnbtm">
      <Users v-if="users && users.length > 0 && isAdmin" :users="users" />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import Header from './Header.vue'
import CreateUser from './CreateUser.vue'
import DisplayBoard from './DisplayBoard.vue'
import Users from './Users.vue'
import { UserService} from '@/services/user.service'
import Login from "@/components/Login.vue";

@Component({
  components: {
    Login,
    Header,
    CreateUser,
    DisplayBoard,
    Users
  }
})
export default class Home extends Vue {

  data() {
    return {
      users: [],
      numberOfUsers: 0,
      loginError: false,
      isAdmin: false,
      location: false,
      weather: []
    }
  }

  getAllUsers() {
    const userService = new UserService();
    userService.getAllUsers().then(response => {
      this.users = response
      this.numberOfUsers = response.length
    })
  }

  userCreate(data) {
    const userService = new UserService();
    userService.createUser(data).then(response => {
      this.getAllUsers();
      this.weatherData()
    });
  }

  userLogin(data) {
    const userService = new UserService();
    userService.userLogin(data).then(response => {
      if (response && !response.error) {
        this.loginError = false
        this.getAllUsers();
        this.weatherData();
      } else {
        this.loginError = true;
      }
    });

  }


  findLocation() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  showPosition(position) {
    let response =
        {lat : position?.coords?.latitude, long: position?.coords?.longitude}

    this.location = {lat: response.lat, long: response.long}

    console.log(response)
    return response
  }
  weatherData() {
    const userService = new UserService()
    userService.getWeatherData(this.location).then(response => {
      this.weather = response.weather[0].description
    })
  }

  adminLogin(data) {
    const userService = new UserService();
    userService.adminLogin(data).then(response => {
      if(response) {
        this.isAdmin = true;
        this.loginError = false;
      }
      this.getAllUsers();
    });
  }

  mounted () {
    this.getAllUsers();
    this.findLocation();
  }
}
</script>