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
        :classes="['auth']"
        :noSpan="true"
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
  </div>
  <div class="projects">
    <Project
      v-for="(button, index) in this.getButtons"
      :key="index"
      :title="`Button ${index + 1}`"
      :classes="['auth']"
      :noSpan="true"
    >
      <input
        class="darktextbox"
        :value="button.label"
        @input="this.button"
        :data-index="index"
        placeholder="Button Text"
        data-key="label"
      />
      <input
        class="darktextbox"
        :value="button.url"
        @input="this.button"
        :data-index="index"
        placeholder="Button URL"
        data-key="url"
      />
      <button
        class="button"
        @click="this.removeButton"
        title="Delete this button"
        :data-index="index"
        >Delete this button</button
      >
    </Project>
    <button
      class="button manage-buttons-btn"
      @click="this.addButton"
      v-if="this.getButtons.length < 2"
      title="Add a button"
      >Add Button</button
    >
  </div>
  <div class="projects" v-if="this.user ? this.user.id !== undefined : false">
    <Project
      :classes="['float']"
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
  <Modal
    title="App Settings"
    :buttons="[
      {
        title: 'Close this menu',
        text: 'Close',
        action: this.hideSettingsModal
      }
    ]"
    :cancelable="true"
    :show="false"
    ref="settingsModal"
  >
    <p class="modal-desc">Wow cool app settings! (Everything Autosaves)</p>
    <form @submit.prevent="this.settings" ref="settingsForm">
      <p class="label">Application ID</p>
      <input
        class="darktextbox"
        type="text"
        placeholder="Application ID"
        title="The Application ID of your Rich Presence"
        name="appID"
        :value="this.getAppID"
        @input="this.appID"
      />
      <br />
      <button class="button" @click="this.openWikiPage"
        >Learn how to make your own application</button
      >
      <label class="container">
        <input
          type="checkbox"
          name="autostart"
          :checked="this.appSettings.autostart"
          @change="this.setAppSettings"
        />
        <span class="checkmark"></span
        ><a style="color: #00000000;font-size: 22px;">__</a> Automaticlly start
        at startup?
      </label>
      <label class="container">
        <input
          type="checkbox"
          name="showonstart"
          :checked="this.appSettings.showonstart"
          @change="this.setAppSettings"
        />
        <span class="checkmark"></span
        ><a style="color: #00000000;font-size: 22px;">__</a> Show this window on
        startup?
      </label>
    </form>
  </Modal>
  <Footer>
    <button class="button" @click="this.showSettingsModal">Settings</button>
  </Footer>
</template>

<script lang="ts">
  import { mapGetters, mapMutations, MutationMethod } from 'vuex';
  import { Vue, Options } from 'vue-class-component';
  import Project from '@/components/Project.vue';
  import Footer from '@/components/Footer.vue';
  import Modal from '@/components/Modal.vue';
  import { IPCPresence } from '../types';
  import { remote, shell, ipcRenderer } from 'electron';
  import App from '@/App.vue';
  const eWindow = remote.getCurrentWindow();

  let presence: number,
    timeout: ReturnType<typeof setTimeout> | null,
    alertTimeout: ReturnType<typeof setTimeout> | null;

  @Options({
    components: {
      Project,
      Footer,
      Modal
    },
    computed: {
      ...mapGetters({
        getAppID: 'appID',
        getTimestamps: 'timestamps',
        getLargeImage: 'largeImage',
        getSmallImage: 'smallImage',
        getDetails: 'details',
        getButtons: 'buttons'
      })
    },
    methods: {
      ...mapMutations({
        setAppID: 'appID',
        setTimestamps: 'timestamps',
        setLargeImage: 'largeImage',
        setSmallImage: 'smallImage',
        setDetails: 'details',
        setButtons: 'buttons'
      })
    }
  })
  export default class Home extends Vue {
    getAppID!: string;
    getTimestamps!: any;
    getLargeImage!: any;
    getSmallImage!: any;
    getDetails!: any;
    getButtons!: any;
    setAppID!: MutationMethod;
    setTimestamps!: MutationMethod;
    setLargeImage!: MutationMethod;
    setSmallImage!: MutationMethod;
    setDetails!: MutationMethod;
    setButtons!: MutationMethod;
    user: any;
    assets: any;
    appSettings!: any;
    $refs!: {
      largeIcon: any;
      smallIcon: any;
      settingsModal: any;
    };
    $parent!: any;
    async mounted() {
      let assetsRes = await fetch(
        `https://discord.com/api/oauth2/applications/${this.getAppID}/assets`
      );
      this.assets = await assetsRes.json();
      ipcRenderer.send('getSettings');
      ipcRenderer.once('getSettings', (a, json) => {
        this.appSettings = json;
      });
      window.addEventListener('keydown', this.openDiscord, false);
      ipcRenderer.on('presence', (e, pres: IPCPresence) => {
        switch (pres.type) {
          case 0:
            console.log('what');
            break;
          case 1:
            console.log('Successfully connected to presence handler.');
            this.user = pres.payload;
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
      window.addEventListener(
        'beforeunload',
        () => {
          if (typeof timeout === 'number') clearInterval(timeout);
          timeout = null;
          ipcRenderer.sendTo(presence, 'presence', <IPCPresence>{
            type: 3
          });
          window.removeEventListener('keydown', this.openDiscord, false);
        },
        false
      );
      this.handshake();
      window.addEventListener('contextmenu', e => {
        e.preventDefault();
        ipcRenderer.send('ctx-mnu');
      });
      ipcRenderer.on('ctx-mnu-itm', (e, btn) => {
        switch (btn) {
          case 'sneaky-menu':
            eWindow.webContents.openDevTools();
            break;
          case 'settings-menu':
            this.showSettingsModal();
            break;
          case 'help':
            shell.openExternal('https://alekeagle.com/d');
        }
      });
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
      }, 1e4);
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
    addButton() {
      this.setButtons([
        ...this.getButtons,
        { label: 'Text Here', url: 'https://example.com/' }
      ]);
    }
    button(e: InputEvent) {
      let tmp = [...this.getButtons];
      switch ((<HTMLInputElement>e.target).getAttribute('data-key')) {
        case 'label':
          tmp[
            parseInt(
              (<HTMLInputElement>e.target).getAttribute('data-index') as string
            )
          ].label = (<HTMLInputElement>e.target).value;
          this.setButtons(tmp);
          break;
        case 'url':
          tmp[
            parseInt(
              (<HTMLInputElement>e.target).getAttribute('data-index') as string
            )
          ].url = (<HTMLInputElement>e.target).value;
          this.setButtons(tmp);
      }
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
    removeButton(e: Event) {
      let tmp = [...this.getButtons];
      tmp = tmp.filter(
        (b, i, a) =>
          i !==
          parseInt(
            (<HTMLButtonElement>e.target).getAttribute('data-index') as string
          )
      );
      this.setButtons(tmp);
    }
    hideSettingsModal() {
      this.$refs.settingsModal.hideModal();
    }
    showSettingsModal() {
      this.$refs.settingsModal.showModal();
    }
    appID(e: Event) {
      this.setAppID((<HTMLInputElement>e.target).value);
      if (alertTimeout !== null) {
        clearTimeout(alertTimeout);
        alertTimeout = null;
      }
      alertTimeout = setTimeout(async () => {
        if ((<HTMLInputElement>e.target).value !== '') {
          this.$parent.$parent.temporaryToast(
            'Restarting presence service with new app ID..',
            5000
          );
          ipcRenderer.sendTo(presence, 'presence', <IPCPresence>{
            type: 4
          });
          let assetsRes = await fetch(
            `https://discord.com/api/oauth2/applications/${this.getAppID}/assets`
          );
          this.assets = await assetsRes.json();
          this.setLargeImage({ key: null, text: '' });
          this.setSmallImage({ key: null, text: '' });
        } else {
          this.$parent.$parent.temporaryToast(
            'Please provide an app ID!',
            5000
          );
          if (!eWindow.isFocused()) eWindow.focus();
        }
        alertTimeout = null;
      }, 2000);
    }
    setAppSettings(e: Event) {
      ipcRenderer.send(
        'setSettings',
        (<HTMLInputElement>e.target).name,
        (<HTMLInputElement>e.target).type === 'checkbox'
          ? (<HTMLInputElement>e.target).checked
          : (<HTMLInputElement>e.target).value
      );
      ipcRenderer.once('setSettings', (e, json) => {
        this.appSettings = json;
      });
    }
    openWikiPage() {
      shell.openExternal(
        'https://github.com/AlekEagle/discord-rpc/wiki/Creating-an-application-for-Discord-RPC'
      );
    }
  }
</script>

<style>
  .manage-buttons-btn {
    justify-self: center;
  }
  p.label {
    font-size: 23px;
    margin-bottom: 5px;
  }
  p.modal-desc {
    font-size: 18px;
    margin-top: 7px;
    color: #c9c9c9;
  }
  label.container {
    margin-top: 9px;
  }
</style>
