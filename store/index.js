export const state = () => ({
  list: []
});

export const actions = {
  SOCKET_NEW_MESSAGE(ctx, data) {
    console.log("Message received", data);
  }
};
