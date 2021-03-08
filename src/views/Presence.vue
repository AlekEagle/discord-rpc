<template>
  <p>
    lol
  </p>
</template>

<script lang="ts">
  import DiscordRPC from 'discord-rpc';
  import { ipcRenderer } from 'electron';
  import { Vue } from 'vue-class-component';
  import { IPCPresence } from '../types';
  let client: DiscordRPC.Client;

  let mainWindow: number,
    restPeriod: number,
    interval: ReturnType<typeof setTimeout> | null;

  export default class PresenceHandler extends Vue {
    $store!: any;
    mounted() {
      client = new DiscordRPC.Client({ transport: 'ipc' });
      ipcRenderer.on('presence', (e, pres: IPCPresence) => {
        switch (pres.type) {
          case 0:
            console.log('begin handshake.');
            mainWindow = e.senderId;
            restPeriod = pres.payload ? pres.payload['restPeriod'] : 5000;
            ipcRenderer.sendTo(mainWindow, 'presence', <IPCPresence>{
              type: 1,
              payload: { restPeriod, user: client.user }
            });
            interval = setTimeout(this.sendStatus, restPeriod);
            break;
          case 1:
            console.log('what');
            break;
          case 2:
            console.log('what');
            break;
          case 3:
            console.log('Received disconnect event, stopping interval.');
            if (typeof interval === 'number') clearTimeout(interval);
            interval = null;
            ipcRenderer.sendTo(mainWindow, 'presence', <IPCPresence>{
              type: 3
            });
            mainWindow = -1;
            break;
          case 4:
            if (typeof interval === 'number') clearTimeout(interval);
            interval = null;
            client.destroy();
            client = new DiscordRPC.Client({ transport: 'ipc' });
            client.on('ready', () => {
              client.setActivity(this.getPresence());
              setInterval(() => {
                if (client.user !== null)
                  client.setActivity(this.getPresence());
                else
                  client.login({
                    clientId: this.$store.getters.appID
                  });
              }, 15e3);
            });

            client
              .login({
                clientId: this.$store.getters.appID
              })
              .catch(err => console.error(err));

            ipcRenderer.sendTo(mainWindow, 'presence', <IPCPresence>{
              type: 4
            });
        }
      });

      client.on('ready', () => {
        client.setActivity(this.getPresence());
        setInterval(() => {
          if (client.user !== null) client.setActivity(this.getPresence());
          else
            client.login({
              clientId: this.$store.getters.appID
            });
        }, 15e3);
      });

      client
        .login({
          clientId: this.$store.getters.appID
        })
        .catch(err => console.error(err));
    }
    sendStatus() {
      console.log('sending status');
      ipcRenderer.sendTo(mainWindow, 'presence', <IPCPresence>{
        type: 2,
        payload: client.user
      });
      interval = setTimeout(this.sendStatus, restPeriod);
    }
    beforeUnmount() {
      if (typeof interval === 'number') clearTimeout(interval);
      interval = null;
      ipcRenderer.sendTo(mainWindow, 'presence', <IPCPresence>{
        type: 3
      });
      mainWindow = -1;
    }
    getPresence() {
      let finalPresence = { ...this.$store.getters.presence };
      if (finalPresence.buttons && finalPresence.buttons.length < 1)
        delete finalPresence.buttons;
      if (!finalPresence.largeImageKey) {
        delete finalPresence.largeImageKey;
        delete finalPresence.largeImageText;
      }
      if (!finalPresence.startTimestamp) {
        delete finalPresence.startTimestamp;
        delete finalPresence.endTimestamp;
      }

      if (!finalPresence.endTimestamp) {
        delete finalPresence.endTimestamp;
      }

      if (!finalPresence.smallImageKey) {
        delete finalPresence.smallImageKey;
        delete finalPresence.smallImageText;
      }
      return finalPresence;
    }
  }
</script>
