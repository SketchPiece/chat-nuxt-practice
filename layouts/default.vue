<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer" mobile-breakpoint="650">
      <v-list subheader>
        <v-subheader>Room user list</v-subheader>

        <v-list-item v-for="u in users" :key="u.id" @click.prevent>
          <v-list-item-content>
            <v-list-item-title>{{ u.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id == user.id ? 'primary' : 'grey'">
              mdi-message
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title :style="{ marginLeft: '10px' }"
        >Chat room {{ user.room }}</v-toolbar-title
      >
    </v-app-bar>
    <v-main>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    drawer: true
  }),
  computed: mapState(["user", "users"]),
  methods: {
    ...mapMutations(["CLEAR_DATA"]),
    exit() {
      this.$socket.emit("USER_LEFT", this.user.id, () => {
        this.$router.push("/?message=leftChat");
        this.CLEAR_DATA();
      });
    }
  }
};
</script>
