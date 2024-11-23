const { createClient } = require('bedrock-protocol');

const client = createClient({
  host: 'be.prownetwork.net',
  port: 19132,
  username: 'SkyWatcher788'
});

client.on('join', () => {
  console.log('SkyWatcher sudah masuk ke server Bedrock dan siap AFK!');

  setInterval(() => {
    console.log('SkyWatcher melompat untuk tetap AFK');
  }, 15000);
});

client.on('close', () => {
  console.log('SkyWatcher terputus dari server. Mencoba koneksi ulang...');
  reconnect();
});

// reconnect
function reconnect() {
  setTimeout(() => {
    client = createClient({
      host: 'be.prownetwork.net',
      port: 19132,
      username: 'SkyWatcher788'
    });

    // Event setelah reconnect
    client.on('join', () => {
      console.log('SkyWatcher berhasil reconnect ke server Bedrock!');
    });

    client.on('close', () => {
      console.log('SkyWatcher terputus lagi. Mencoba reconnect ulang...');
      reconnect();
    });

    client.on('error', (err) => {
      console.error('Error setelah reconnect: ', err);
    });
  }, 5000);
}

client.on('error', (err) => {
  console.error('Error: ', err);
});