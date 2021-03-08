<template>
  <div class="projects" v-if="this.assets !== null">
    <Project
      title="Large Icon"
      :classes="['auth']"
      :icon="
        this.getLargeImage.key !== null
          ? `https://cdn.discordapp.com/app-assets/${this.getAppID}/${
              this.assets.filter(a => a.name === this.getLargeImage.key)[0].id
            }.png`
          : '/none.png'
      "
      ref="largeIcon"
      :noSpan="true"
    >
      <select
        :value="
          this.getLargeImage.key === null ? 'None' : this.getLargeImage.key
        "
        @change="this.largeImage"
      >
        <option name="null">None</option>
        <option
          v-for="(asset, index) in this.assets"
          :key="index"
          :data-asset-id="asset.id"
          :data-asset-type="asset.type"
          :id="asset.name"
          :name="asset.name"
          >{{ asset.name }}</option
        >
      </select>
      <input
        class="darktextbox"
        type="text"
        placeholder="Hover Text"
        :value="this.getLargeImage.text"
        style="margin-bottom: 10px;"
        @input="this.largeImage"
        :disabled="this.getLargeImage.key === null"
        title="Minimum Length of 2 characters!"
        minlength="2"
      />
    </Project>
    <Project
      title="Small Icon"
      :classes="['auth']"
      :icon="
        this.getSmallImage.key !== null
          ? `https://cdn.discordapp.com/app-assets/${this.getAppID}/${
              this.assets.filter(a => a.name === this.getSmallImage.key)[0].id
            }.png`
          : '/none.png'
      "
      ref="smallIcon"
      :noSpan="true"
    >
      <select
        :value="
          this.getSmallImage.key === null ? 'None' : this.getSmallImage.key
        "
        @change="this.smallImage"
        :disabled="this.getLargeImage.key === null"
      >
        <option name="null">None</option>
        <option
          v-for="(asset, index) in this.assets"
          :key="index"
          :data-asset-id="asset.id"
          :data-asset-type="asset.type"
          :id="asset.name"
          :name="asset.name"
          >{{ asset.name }}</option
        >
      </select>
      <input
        class="darktextbox"
        type="text"
        placeholder="Hover Text"
        :value="this.getSmallImage.text"
        style="margin-bottom: 10px;"
        @input="this.smallImage"
        :disabled="this.getSmallImage.key === null"
        title="Minimum Length of 2 characters!"
        minlength="2"
      />
    </Project>
  </div>
  <div v-else class="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="projects">
    <Project :classes="['auth']" title="Text Lines" :noSpan="true">
      <input
        id="detail"
        class="darktextbox"
        type="text"
        placeholder="First Text Line"
        :value="this.getDetails.details"
        @input="this.details"
        title="Minimum Length of 2 characters!"
        minlength="2"
      />
      <input
        id="state"
        class="darktextbox"
        type="text"
        placeholder="First Text Line"
        :value="this.getDetails.state"
        @input="this.details"
        title="Minimum Length of 2 characters!"
        minlength="2"
      />
    </Project>
    <Project :classes="['auth']" title="Timestamps" :noSpan="true">
      <Datepicker />
    </Project>
  </div>
  <div class="projects" v-if="this.user ? this.user.id !== undefined : false">
    <Project
      title="Current User"
      :icon="
        `https://cdn.discordapp.com/avatars/${this.user.id}/${this.user.avatar}.png`
      "
      >{{ this.user.username }}#{{ this.user.discriminator }} ({{
        this.user.id
      }})</Project
    >
  </div>
  <div v-else class="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <Footer />
</template>

<script lang="ts">
  import { mapGetters, mapMutations, MutationMethod } from 'vuex';
  import { Vue, Options } from 'vue-class-component';
  import Project from '@/components/Project.vue';
  import Footer from '@/components/Footer.vue';
  import { IPCPresence } from '../types';
  import { remote, shell, ipcRenderer } from 'electron';
  import App from '@/App.vue';
  const eWindow = remote.getCurrentWindow();

  let presence: number,
    restPeriod: number,
    timeout: ReturnType<typeof setTimeout> | null,
    alertTimeout: ReturnType<typeof setTimeout> | null;

  @Options({
    components: {
      Project,
      Footer
    },
    computed: {
      ...mapGetters({
        getAppID: 'appID',
        getTimestamps: 'timestamps',
        getLargeImage: 'largeImage',
        getSmallImage: 'smallImage',
        getDetails: 'details'
      })
    },
    methods: {
      ...mapMutations({
        setAppID: 'appID',
        setTimestamps: 'timestamps',
        setLargeImage: 'largeImage',
        setSmallImage: 'smallImage',
        setDetails: 'details'
      })
    }
  })
  export default class Home extends Vue {
    getAppID!: string;
    getTimestamps!: any;
    getLargeImage!: any;
    getSmallImage!: any;
    getDetails!: any;
    setAppID!: MutationMethod;
    setTimestamps!: MutationMethod;
    setLargeImage!: MutationMethod;
    setSmallImage!: MutationMethod;
    setDetails!: MutationMethod;
    user: any;
    assets: any;
    $refs!: {
      largeIcon: any;
      smallIcon: any;
    };
    $parent!: any;
    async mounted() {
      let assetsRes = await fetch(
        `https://discord.com/api/oauth2/applications/${this.getAppID}/assets`
      );
      this.assets = await assetsRes.json();
      window.addEventListener('keydown', this.openDiscord, false);
      ipcRenderer.on('presence', (e, pres: IPCPresence) => {
        switch (pres.type) {
          case 0:
            console.log('what');
            break;
          case 1:
            console.log('Successfully connected to presence handler.');
            restPeriod = pres.payload ? pres.payload['restPeriod'] + 500 : 5500;
            this.user = pres.payload.user;
            this.createTimeout();
            break;
          case 2:
            this.resetTimeout();
            this.user = pres.payload;
            break;
          case 3:
            console.log('Presence handler cleanly disconnected.');
            if (typeof timeout === 'number') clearInterval(timeout);
            timeout = null;
            break;
          case 4:
            console.log('Successfully reloaded presence with new clientID.');
            break;
        }
      });
      this.handshake();
    }

    openDiscord(e: KeyboardEvent) {
      if (e.code === 'F1') {
        e.preventDefault();
        shell.openExternal('https://alekeagle.com/d');
      }
    }

    createTimeout() {
      if (typeof timeout === 'number') return;
      timeout = setTimeout(() => {
        console.log(
          "Presence handler didn't respond in time, assuming it disconnected uncleanly."
        );
        timeout = null;
        ipcRenderer.sendTo(presence, 'presence', <IPCPresence>{
          type: 3
        });
        presence = -1;
        setTimeout(this.handshake, 200);
      }, restPeriod);
    }

    handshake() {
      ipcRenderer.send('handshake', 'presence');
      ipcRenderer.once('handshake', (e, id) => {
        if (id === null) {
          (<App>this.$parent).permanentToast(
            "I couldn't connect to the rich presence handler, try restarting the app, if the issue persists, contact AlekEagle."
          );
          setTimeout(this.handshake, 5000);
        } else presence = id;
        ipcRenderer.sendTo(presence, 'presence', <IPCPresence>{
          type: 0
        });
      });
    }

    resetTimeout() {
      if (typeof timeout === 'number') clearInterval(timeout);
      timeout = null;
      this.createTimeout();
    }

    data() {
      return {
        user: {},
        assets: null
      };
    }

    beforeUnmount() {
      if (typeof timeout === 'number') clearInterval(timeout);
      timeout = null;
      ipcRenderer.sendTo(presence, 'presence', <IPCPresence>{
        type: 3
      });
      window.removeEventListener('keydown', this.openDiscord, false);
    }

    largeImage(e: Event) {
      switch (e.type) {
        case 'input':
          this.setLargeImage({
            text: (<HTMLInputElement>e.target).value,
            key: this.getLargeImage.key
          });
          if (alertTimeout !== null) {
            clearTimeout(alertTimeout);
            alertTimeout = null;
          }
          alertTimeout = setTimeout(() => {
            if ((<HTMLInputElement>e.target).value.length < 2) {
              this.$parent.$parent.temporaryToast(
                "You need a minimum of 2 characters for all text inputs! Your status won't be applied until you fix this.",
                5000
              );
              if (!eWindow.isFocused()) eWindow.focus();
            }
            alertTimeout = null;
          }, 2000);
          break;
        case 'change':
          this.setLargeImage({
            text: this.getLargeImage.text,
            key:
              (<HTMLSelectElement>e.target).value === 'None'
                ? null
                : (<HTMLSelectElement>e.target).value
          });
          if (this.getLargeImage.key === null) {
            this.setSmallImage();
            this.$refs.smallIcon.sharedState.icon =
              this.getSmallImage.key !== null
                ? `https://cdn.discordapp.com/app-assets/${this.getAppID}/${
                    this.assets.filter(
                      (a: any) => a.name === this.getSmallImage.key
                    )[0].id
                  }.png`
                : '/none.png';
            this.$refs.largeIcon.sharedState.icon =
              this.getLargeImage.key !== null
                ? `https://cdn.discordapp.com/app-assets/${this.getAppID}/${
                    this.assets.filter(
                      (a: any) => a.name === this.getLargeImage.key
                    )[0].id
                  }.png`
                : '/none.png';
          }
          this.$refs.largeIcon.sharedState.icon =
            this.getLargeImage.key !== null
              ? `https://cdn.discordapp.com/app-assets/${this.getAppID}/${
                  this.assets.filter(
                    (a: any) => a.name === this.getLargeImage.key
                  )[0].id
                }.png`
              : '/none.png';
      }
    }
    smallImage(e: Event) {
      switch (e.type) {
        case 'input':
          this.setSmallImage({
            text: (<HTMLInputElement>e.target).value,
            key: this.getSmallImage.key
          });
          if (alertTimeout !== null) {
            clearTimeout(alertTimeout);
            alertTimeout = null;
          }
          alertTimeout = setTimeout(() => {
            if ((<HTMLInputElement>e.target).value.length < 2) {
              this.$parent.$parent.temporaryToast(
                "You need a minimum of 2 characters for all text inputs! Your status won't be applied until you fix this.",
                5000
              );
              if (!eWindow.isFocused()) eWindow.focus();
            }
            alertTimeout = null;
          }, 2000);
          break;
        case 'change':
          this.setSmallImage({
            text: this.getSmallImage.text,
            key:
              (<HTMLSelectElement>e.target).value === 'None'
                ? null
                : (<HTMLSelectElement>e.target).value
          });
          this.$refs.smallIcon.sharedState.icon =
            this.getSmallImage.key !== null
              ? `https://cdn.discordapp.com/app-assets/${this.getAppID}/${
                  this.assets.filter(
                    (a: any) => a.name === this.getSmallImage.key
                  )[0].id
                }.png`
              : '/none.png';
      }
    }
    details(e: InputEvent) {
      switch ((<HTMLInputElement>e.target).id) {
        case 'detail':
          this.setDetails({
            details: (<HTMLInputElement>e.target).value,
            state: this.getDetails.state
          });
          if (alertTimeout !== null) {
            clearTimeout(alertTimeout);
            alertTimeout = null;
          }
          alertTimeout = setTimeout(() => {
            if ((<HTMLInputElement>e.target).value.length < 2) {
              this.$parent.$parent.temporaryToast(
                "You need a minimum of 2 characters for all text inputs! Your status won't be applied until you fix this.",
                5000
              );
              if (!eWindow.isFocused()) eWindow.focus();
            }
            alertTimeout = null;
          }, 2000);
          break;
        case 'state':
          this.setDetails({
            details: this.getDetails.details,
            state: (<HTMLInputElement>e.target).value
          });
          if (alertTimeout !== null) {
            clearTimeout(alertTimeout);
            alertTimeout = null;
          }
          alertTimeout = setTimeout(() => {
            if ((<HTMLInputElement>e.target).value.length < 2) {
              this.$parent.$parent.temporaryToast(
                "You need a minimum of 2 characters for all text inputs! Your status won't be applied until you fix this.",
                5000
              );
              if (!eWindow.isFocused()) eWindow.focus();
            }
            alertTimeout = null;
          }, 2000);
      }
    }
  }
</script>

<style>
  .v3dp__datepicker {
    height: 250px;
  }
</style>
