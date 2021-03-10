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
  let client: DiscordRPC.Client | null = null;

  let mainWindow: number = -1,
    presenceInterval: ReturnType<typeof setTimeout> | null = null;

  export default class PresenceHandler extends Vue {
    $store!: any;
    mounted() {
      this.preparePresence();
      ipcRenderer.on('presence', (e, pres: IPCPresence) => {
        switch (pres.type) {
          case 0:
            console.log('begin handshake.');
            mainWindow = e.senderId;
            ipcRenderer.sendTo(mainWindow, 'presence', <IPCPresence>{
              type: 1,
              payload: (client as DiscordRPC.Client).user
            });
            break;
          case 1:
            console.log('what');
            break;
          case 2:
            console.log('what');
            break;
          case 3:
            ipcRenderer.sendTo(mainWindow, 'presence', <IPCPresence>{
              type: 3
            });
            mainWindow = -1;
            console.log('Main window disconnected.');
            break;
          case 4:
            this.preparePresence();

            ipcRenderer.sendTo(mainWindow, 'presence', <IPCPresence>{
              type: 4
            });
        }
      });
    }
    preparePresence() {
      console.log('Preparing rich Presence..');
      if (client !== null) client.destroy();
      if (presenceInterval !== null) {
        clearInterval(presenceInterval as ReturnType<typeof setTimeout>);
        presenceInterval = null;
      }
      client = new DiscordRPC.Client({ transport: 'ipc' });
      client.on('ready', this.startPresenceInterval);

      client.login({ clientId: this.$store.getters.appID }).catch(err => {
        console.error(err);
        setTimeout(this.preparePresence, 2000);
      });
    }
    startPresenceInterval() {
      let waitingForPresence = false;
      if (presenceInterval !== null) return;
      let presenceReturned = () => {
        console.log('Presence successfully sent');
        waitingForPresence = false;
        this.sendStatus();
      };
      (client as DiscordRPC.Client)
        .setActivity(this.getPresence())
        .then(presenceReturned);
      waitingForPresence = true;
      presenceInterval = setInterval(() => {
        if (waitingForPresence) {
          console.log(
            'Still waiting for the previous setActivity function to return, assuming connection hung.'
          );
          clearInterval(presenceInterval as ReturnType<typeof setTimeout>);
          presenceInterval = null;
          this.preparePresence();
          return;
        }
        (client as DiscordRPC.Client)
          .setActivity(this.getPresence())
          .then(presenceReturned)
          .catch(err => {
            console.error(err);
            console.log(
              'setActivity had an error, assuming client connection lost, resetting connection.'
            );
            clearInterval(presenceInterval as ReturnType<typeof setTimeout>);
            presenceInterval = null;
            this.preparePresence();
          });
        waitingForPresence = true;
      }, 5e3);
    }
    sendStatus() {
      if (mainWindow === -1) return;
      console.log('sending status');
      ipcRenderer.sendTo(mainWindow, 'presence', <IPCPresence>{
        type: 2,
        payload: (client as DiscordRPC.Client).user
      });
    }
    beforeUnmount() {
      ipcRenderer.sendTo(mainWindow, 'presence', <IPCPresence>{
        type: 3
      });
      mainWindow = -1;
    }
    getPresence() {
      let finalPresence = { ...this.$store.getters.presence };
      if (finalPresence.buttons && finalPresence.buttons.length < 1)
        delete finalPresence.buttons;
      delete finalPresence.applicationID;
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
