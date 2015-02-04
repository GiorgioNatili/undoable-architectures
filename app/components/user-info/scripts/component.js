window.IframesArchitecture = Ember.Application.create({
  LOG_TRANSITIONS: true
});

IframesArchitecture.LocalStorage = Ember.Object.extend({
  setUpEventListener: function() {
      window.addEventListener('storage', function(e) {
            this.notifyPropertyChange(e.key);
          }.bind(this), false);
    }.on('init'),
  
  unknownProperty: function(key) {
      return localStorage[key];
    },

  setUnknownProperty: function(key, value) {
      if(Ember.isNone(value)) {
            delete localStorage[key];
          } else {
                localStorage[key] = value;
              }
      this.notifyPropertyChange(key);
      return value;
    },

  clear: function() {
      this.beginPropertyChanges();
      for (var i=0, l=localStorage.length; i<l; i++){
            this.set(localStorage.key(i));
          }
      localStorage.clear();
      this.endPropertyChanges();
    }
});


IframesArchitecture.UserDetailsComponent = Ember.Component.extend({

  // currentUser: Ember.computed.alias('storage.currentUser'),
  currentUser: null,
  createLocalStorage: function() {
    var callback = this._handleStorageEvent.bind(this);
    $(window).on('storage', callback);

    this.set('storage', IframesArchitecture.LocalStorage.create());
  }.on('init'),

  _handleStorageEvent: function(event) {
    var storageEvent = event.originalEvent;

    var storageKey = storageEvent.key;
    var user;

    if(storageKey === 'currentUser'){

      user = JSON.parse(storageEvent.newValue);
      this.set('currentUser', user);

    }
  }

});


