<template>
  <div class="hello">
    <Header v-if="isAdmin" />
    <h2 v-if="weather.length">{{weather}}</h2>
    <Login @adminLogin="adminLogin($event)" @createUser="userCreate($event)" @userLogin="userLogin($event)" v-if="!isAdmin"/>
    <div class="container mrgnbtm" v-if="isAdmin" >
      <div class="row">
        <div class="col-md-8">
<!--          <Login @adminLogin="adminLogin($event)" />-->
<!--          <Login @userLogin="userLogin($event)" />-->
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
import { Vue, Component, Prop } from 'vue-property-decorator'
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
      numberOfUsers: 0
    }
  }

  isAdmin = false
  location = false

  weather = []


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
      // console.log(response);
      this.getAllUsers();
      this.weatherData()
    });
  }

  userLogin(data) {
    const userService = new UserService();
    // console.log('data:::', data)
    userService.userLogin(data).then(response => {

      this.getAllUsers();
    });
    // this.isAdmin = true
  }


  findLocation() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  showPosition(position) {
    let response =
        {lat : position?.coords?.latitude, long: position?.coords?.longitude}

    this.location = {lat: response.lat, long: response.long}

    console.log(this.location.lat)
    console.log(response)
    return response
  }
  weatherData() {
    const userService = new UserService()

    // navigator.geolocation.getCurrentPosition((position) => {
    //   return {lat : position.coords.latitude, long: position.coords.longitude};
    //  });
    userService.getWeatherData(this.location).then(response => {
      console.log(response)
      this.weather = response.weather.description
    })
  }

  adminLogin(data) {
    const userService = new UserService();
    console.log('data:::', data)
    userService.adminLogin(data).then(response => {
      console.log(response);
      if(response) {
        this.isAdmin = true
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