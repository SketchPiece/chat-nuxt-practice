<template>
  <div>
    <div v-if="name === 'system'" class="system">
      <p class="text-xs-center">{{ text }}</p>
      <hr />
    </div>
    <div v-else class="wrap">
      <div class="msg" :class="{ owner }">
        <small
          ><strong>{{ name }}</strong></small
        >
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.system {
  margin-top: 1rem;
  p {
    margin-bottom: 1rem;
    text-align: center;
  }
}

.wrap {
  display: flex;
  flex-direction: column;
}

.msg {
  padding: 1rem;
  width: 60%;
  margin: 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background: #1976d2;
  position: relative;
  margin-bottom: 1rem;

  p {
    margin-bottom: 0;
  }
}

.owner {
  background: #fff;
  color: #000;
  align-self: flex-end;
}
</style>
