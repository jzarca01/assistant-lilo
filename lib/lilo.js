const LILO = require('LILO').LILO;

class AssistantLilo {
  constructor() {
    LILO.discover(liloInstance => {
      console.log("LILO Discovered.");
      liloInstance.on('disconnect', function () {
        console.log('Disconnection.');
        process.exit(1);
      });
      liloInstance.connectAndSetup();
      this.instance = liloInstance
    })
  }

  init(plugins) {
    this.plugins = plugins
    return Promise.resolve(this)
  }

  action(commande) {
    switch (commande) {
      case 'on':
        return this.instance.writeLightState('03')
      case 'off':
        return this.instance.writeLightState('00')
      case 'weekend':
        return this.instance.writeTimeState(['12', '00', '23', '59'])
      case 'semaine':
        return this.instance.writeTimeState(['08', '00', '22', '00'])
    }
  }
}

exports.init = (configuration, plugins) => {
  return new AssistantLilo(configuration).init(plugins)
    .then(resource => {
      console.log('[assistant-lilo] Plugin chargé et prêt.')
      return resource
    })
}