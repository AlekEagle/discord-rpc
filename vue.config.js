module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        icon: './src/assets/logo_large.png',
        appId: 'com.alekeagle.rich-presence',
        win: {
          target: [
            {
              target: 'nsis',
              arch: ['x64']
            }
          ]
        },
        linux: {
          category: 'Utilities',
          maintainer: 'rpc@alekeagle.com',
          target: [
            {
              target: 'appimage',
              arch: ['x64']
            },
            {
              target: 'deb',
              arch: ['x64']
            },
            {
              target: 'rpm',
              arch: ['x64']
            },
            {
              target: 'pacman',
              arch: ['x64']
            }
          ]
        },
        mac: {
          target: [
            {
              target: 'pkg'
            }
          ]
        }
      }
    }
  }
};
