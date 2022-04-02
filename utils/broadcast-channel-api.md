# Broadcast Channel API

Está API permite la comunicación entre ventanas, tabs, frames y/o iframes del mismo origen. 
Un ejemplo de uso podría ser un cierre de sesión. Si el usuario tiene la aplicación abierta en varias pestañas, al cerrar sesión lo hará en todas las pestañas. 

```js
const logoutChannel = new BroadcastChannel('logoutChannel');

logoutChannel.addEventListener('message', (event) => {
  logout()
});

function sendLogoutMessage() {
  logoutChannel.postMessage('logout');
}

logoutChannel.removeEventListener('message', listener);
```