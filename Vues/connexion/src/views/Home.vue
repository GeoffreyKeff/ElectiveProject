<template>
  <div class="container">
    <div class="justify-center">
      <h3>{{content}}</h3>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'HomePage',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getUsers().then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
    );
  }
};
</script>