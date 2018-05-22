const secrets = {
  'dbuser': 'mongodb://steady6by:cent225@ds147459.mlab.com:47459/dbuser',
};

module.exports = {
  requestSecret: function(s) {
    return secrets[s];
  },
};
