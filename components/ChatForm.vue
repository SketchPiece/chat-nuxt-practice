<template>
  <v-flex xs12>
    <v-text-field
      label="Enter message"
      outlined
      v-model="text"
      @keydown.enter="send"
    />
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    text: ""
  }),
  methods: {
    send() {
      this.$socket.emit(
        "CREATE_MESSAGE",
        {
          text: this.text,
          id: this.$store.state.user.id
        },
        data => {
          if (typeof data === "string") {
            console.error(data);
          }
          this.text = "";
        }
      );
    }
  }
};
</script>
