const accessTokenKey = 'accessToken';
const refreshTokenKey = 'refreshToken';
const broadcastChannelAuthKey = 'auth';

const enum BroadcastEvents {
  Logout = 'logout'
}

const broadcastChannel = new BroadcastChannel(broadcastChannelAuthKey);
broadcastChannel.addEventListener('message', (event: any) => {
  const { type } = event.data;
  switch (type) {
    case BroadcastEvents.Logout:
      handleLogout();
      break;
  }
});

const postBroadCastMessage = (event: BroadcastEvents): void => {
  broadcastChannel.postMessage({ type: event.toString() });
};

const auth = {
  accessToken: () => localStorage.getItem(accessTokenKey),
  refreshToken: () => localStorage.getItem(refreshTokenKey),
  saveAccessToken: (token: string) => {
    localStorage.setItem(accessTokenKey, token);
  },
  saveRefreshToken: (token: string) => {
    localStorage.setItem(refreshTokenKey, token);
  },
  logout: () => {
    localStorage.clear();
    postBroadCastMessage(BroadcastEvents.Logout);
    // the object that sends the message cannot listen to the event so we need to handle logout for the
    // context that is sending the message for others eventListener 'message' will handle.
    // https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel
    handleLogout();
  }
};

const handleLogout = (): void => {
  window.location.href = window.location.origin;
};

export default auth;
