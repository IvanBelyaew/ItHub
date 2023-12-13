const fs = require('fs');
const WebSocket = require('ws');

const keywords = {
    'sport': ['https://ru.pinterest.com/pin/442900944615489858/visual-search/?x=16&y=16&w=460&h=718', 
            'https://ru.pinterest.com/pin/753790056400523972/visual-search/?x=16&y=16&w=532&h=758', 
            'https://ru.pinterest.com/pin/403283341614868220/visual-search/?x=16&y=21&w=414&h=575.063829787234&cropSource=6'],
    'music': ['https://ru.pinterest.com/pin/30540103718228356/visual-search/?x=16&y=16&w=414&h=625.0902394106814&cropSource=6', 
            'https://ru.pinterest.com/pin/18295942227993561/visual-search/?x=16&y=16&w=414&h=759.5709219858156', 
            'https://ru.pinterest.com/pin/362047257528454214/visual-search/?x=16&y=16&w=381&h=684&cropSource=6'],
    'auto': ['https://ru.pinterest.com/pin/730920214538316240/visual-search/?x=16&y=16&w=412&h=637&cropSource=6', 
            'https://ru.pinterest.com/pin/288582288634816848/visual-search/?x=16&y=16&w=414&h=274.031914893617', 
            'https://ru.pinterest.com/pin/907264287433542682/visual-search/?x=16&y=16&w=414&h=525.5'],    
  // Другие ключевые слова с соответствующими URL
};

let MAX_CONCURRENT_THREADS = 1; 
fs.readFile('config.txt', 'utf8', function(err, data) {
  if (!err) {
    MAX_CONCURRENT_THREADS = Number(data);
    console.log('MAX_CONCURRENT_THREADS set to', MAX_CONCURRENT_THREADS);
  } else {
    console.error('Failed to read config.txt:', err);
  }
}); 

const server = new WebSocket.Server({ port: 5050 });

server.on('connection', (socket) => {
  console.log('Client connected');
  let threadCount = 0; 

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    const urls = keywords[message];
    if (threadCount < MAX_CONCURRENT_THREADS) {
      threadCount++;

      if (urls) {
        socket.send(JSON.stringify(urls));
      } else {
        socket.send(JSON.stringify(new String('empty')));
      }

      console.log('Started stream');
    } else {
      console.log('Maximum concurrent streams reached');
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log("Server started on port 5050");