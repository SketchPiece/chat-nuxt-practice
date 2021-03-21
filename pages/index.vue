<template>
  <v-layout column justify-center align-center> </v-layout>
</template>

<script>
export default {
  sockets: {
    connect() {
      console.log("Client IO connected");
    }
  }
};
</script>
