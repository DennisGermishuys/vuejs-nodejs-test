<template>
    <div class="usertable">
        <h2>Users</h2>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in users" :key="item.email">
                  <td>{{ item.firstName }}</td>
                  <td>{{ item.lastName }}</td>
                  <td>{{ item.email }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Users extends Vue {

  @Prop([]) users;
}
</script>