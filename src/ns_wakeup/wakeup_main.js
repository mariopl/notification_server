/**
 * PUSH Notification server V 0.3
 * (c) Telefonica Digital, 2012 - All rights reserved
 * Fernando Rodríguez Sela <frsela@tid.es>
 * Guillermo Lopez Leal <gll@tid.es>
 */

var config = require('../config.js').NS_WakeUp,
    log = require("../common/logger.js");

function NS_WakeUp_main() {
  this.servers = [];
}

NS_WakeUp_main.prototype = {
  start: function() {
    var server = require('./wakeup_server.js').server;

    // Start servers
    for(var a in config.interfaces) {
      this.servers[a] = new server(config.interfaces[a].ip, config.interfaces[a].port);
      this.servers[a].init();
    }

    log.info("NS_WakeUp server initialized");
  },

  stop: function(callback) {
    log.info("NS_WakeUp server stopped");
    (this.servers).forEach(function(server) {
      server.stop(callback);
    });
  }
};

exports.NS_WakeUp_main = NS_WakeUp_main;