const rpc = require('discord-rpc');
const os = require('os');

const clientId = '109536230xxxxxxxxxx';

const client = new rpc.Client({ transport: 'ipc' });

client.on('ready', () => {
  console.log('Discord RPC ready');

  // Update the RPC presence initially
  updateRpcPresence();

  // Update the RPC presence and CPU usage every 10 seconds
  setInterval(() => {
    updateRpcPresence();
  }, 5000);
});

function updateRpcPresence() {
  const cpuUsage = getCpuUsage();
  const details = `CPU usage: ${cpuUsage}%`;

  client.request('SET_ACTIVITY', {
    pid: process.pid,
    activity: {
      details,
      assets: {
        large_image: 'https://i.imgur.com/22OtlGO.png',
        large_text: 'Edith Nguyen',
        small_image:
          'https://media1.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif?cid=ecf05e47fc32i0v9jj7py1k3s8unxv7t1oyt8dov3zfaeld5&rid=giphy.gif&ct=g',
        small_text: 'Loading',
      },
      buttons: [
        { label: 'My Website', url: 'https://nedsion.xyz/' },
        { label: 'Telegram', url: 'https://t.me/nedsion/' },
      ],
      timestamps: { start: 1681226207.3423717 },
    },
  });
}

function getCpuUsage() {
  const cpus = os.cpus();

  // Get the total time and idle time for all cores
  let totalTime = 0;
  let idleTime = 0;

  for (const cpu of cpus) {
    for (const type in cpu.times) {
      totalTime += cpu.times[type];
      if (type === 'idle') {
        idleTime += cpu.times[type];
      }
    }
  }

  // Calculate the delta time
  const deltaTime = {
    idle: idleTime - previousTotalIdleTime,
    total: totalTime - previousTotalTime,
  };

  previousTotalIdleTime = idleTime;
  previousTotalTime = totalTime;

  // Calculate the CPU usage percentage
  const percentage = (1 - deltaTime.idle / deltaTime.total) * 100;

  return percentage.toFixed(2);
}

let previousTotalIdleTime = 0;
let previousTotalTime = 0;

client.login({ clientId }).catch(console.error);
