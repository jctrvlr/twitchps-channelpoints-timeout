const TwitchPS = require('twitchps');
const tmi = require('tmi.js');

// I have changed tokens and id's in order to keep privacy
// Get auth token and channel id
// Get channel ID either through authentication request or here - 
// Get token following this documentation - https://dev.twitch.tv/docs/authentication
const channelToken = 'djah34k28fnkna9dajf213h';
const channelId = '12345';
const channelName = 'hamsti';

// Set TMI client options
// Get TMI oauth token here to put in password - https://twitchapps.com/tmi/
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: 'hamsti',
    password: 'oauth:x3i3v3nfay3vddd0i34mdr9cfvjxek'
  }
});
client.connect();
// Initial topics are required
let init_topics = [{topic: `channel-points-channel-v1.${channelId}`, token: channelToken}];
// Optional reconnect, debug options (Defaults: reconnect: true, debug: false)
var ps = new TwitchPS({init_topics: init_topics, reconnect: true, debug: true});

ps.on('channel-points', (data) => {
  console.log(data);
  // Use data here
  // Check if title (or i'd recommend you figure out id for reward use that instead of title)
  // if (data.reward.title === 'Ban user')
  if (data.reward.id === '87b628ae-c5c6-48ab-b0c0-30acb0fd481b') {
    console.log('test inside ban');
    // data.user_input is the user to be banned that they put
    // data.channel_id is the channel to be banned from
    // data.redemption.user.display_name is the person who is doing the banning
    // Then use tmi.js to ban the user
    // or i'd recommend using timeout instead of ban
    /*
    // ban parameters are ('channel where ban is taking place', 'user to ban', 'comment will be seen in chat')
    client.ban('hamsti', data.user_input, `${data.redemption.user.display_name} has decided to ban ${data.user_input}. /SMH`)
      .then((data) => {
        // Returns confirmation that user was banned
        // data returns [channel, username, reason]
      }).catch((err) => {
        // Rejected on already_banned, bad_ban_admin, bad_ban_broadcaster, 
        // bad_ban_global_mod, bad_ban_self, bad_ban_staff, no_permission, 
        // usage_ban or request timed out
      });
    */
   // timeout parameters are ('channel where ban is taking place', 'user to ban', 'timeout length in seconds', 'comment will be seen in chat')
    client.timeout(channelName, data.user_input, 300, `${data.redemption.user.display_name} has decided to ban ${data.user_input}. /SMH`)
      .then((data) => {
        // Returns confirmation that user was banned
        // data returns [channel, username, reason]
      }).catch((err) => {
        // Rejected on already_banned, bad_ban_admin, bad_ban_broadcaster, 
        // bad_ban_global_mod, bad_ban_self, bad_ban_staff, no_permission, 
        // usage_ban or request timed out
      });
  }
});
