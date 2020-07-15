const timeout = Math.floor(Math.random() * 11) * 1000;
setTimeout(() => postMessage('success!'), timeout);
