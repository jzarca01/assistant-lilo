const LILO = require('lilo');

class AssistantLilo {
  constructor({
    semaine,
    weekend
  }) {
    this.semaine = semaine
    this.weekend = weekend

    LILO.discover(liloInstance => {
      console.log("LILO Discovered.");
      this.instance = liloInstance
      liloInstance.on('disconnect', function () {
        console.log('Disconnection.');
        process.exit(1);
      });
      liloInstance.connectAndSetup(function () {
        console.log('LILO Connected')
      });
    })
  }

  init(plugins) {
    this.plugins = plugins
    if (!this.semaine || !this.weekend) {
      return Promise.reject("[assistant-deliveroo] Erreur : vous devez configurer ce plugin !")
    }
    return Promise.resolve(this)
  }

  action(commande) {
    switch (commande) {
      case 'on':
        return this.instance.writeLightState('03')
      case 'off':
        return this.instance.writeLightState('00')
      case 'weekend':
        return this.instance.writeTimeState(this.weekend)
      case 'semaine':
        return this.instance.writeTimeState(this.semaine)
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