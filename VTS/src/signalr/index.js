/* eslint-disable */
let proxy
import store from '../store'
(function ($, window, undefined) {

  let signalR = $.signalR;

  function makeProxyCallback (hub, callback) {
    return function () {
      // Call the client hub method
      callback.apply(hub, $.makeArray(arguments));
    };
  }

  function registerHubProxies (instance, shouldSubscribe) {
    let key, hub, memberKey, memberValue, subscriptionMethod;

    for (key in instance) {
      if (instance.hasOwnProperty(key)) {
        hub = instance[key];

        if (!(hub.hubName)) {
          // Not a client hub
          continue;
        }

        if (shouldSubscribe) {
          // We want to subscribe to the hub events
          subscriptionMethod = hub.on;
        } else {
          // We want to unsubscribe from the hub events
          subscriptionMethod = hub.off;
        }

        // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
        for (memberKey in hub.client) {
          if (hub.client.hasOwnProperty(memberKey)) {
            memberValue = hub.client[memberKey];

            if (!$.isFunction(memberValue)) {
              // Not a client hub function
              continue;
            }

            subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
          }
        }
      }
    }
  }

  $.hubConnection.prototype.createHubProxies = function () {
    const proxies = {};
    this.starting(function () {
      // Register the hub proxies as subscribed
      // (instance, shouldSubscribe)
      registerHubProxies(proxies, true);

      this._registerSubscribedHubs();
    }).disconnected(function () {
      // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
      // (instance, shouldSubscribe)0
      registerHubProxies(proxies, false);
    });

    proxies['BlockShareHub'] = this.createHubProxy('BlockShareHub');

    proxy = proxies['BlockShareHub'];
  };

  signalR.hub = $.hubConnection("/vts", {useDefaultPath: true});
  $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));

proxy.on('MarketBroadcast', res => {
  store.commit('getCurrentPrice', res)
})
proxy.on('OrderCallBack', res => {
  res.forEach(({o, d, r}) => {
    if (d === 'CANCEL' && r === 'OK') {
      return store.dispatch('withDrowOrderSuccess', o)
    }
  })
  store.commit('OrderCallBack', res)
  store.dispatch('GetBalance')
})
proxy.on('SystemSell', vol => {
  store.commit('SystemSell', vol)
})
proxy.on('NewBuy', item => {
  store.commit('NewBuy', item)
})
proxy.on('NewSell', item => {
  store.commit('NewSell', item)
})
proxy.on('')

export default proxy
