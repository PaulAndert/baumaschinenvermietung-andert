

server.js wird über pm2 ausgeführt
Status: pm2 status
Logs: pm2 logs andert-mail

Starten:
pm2 start server.js --name andert-mail
pm2 save
pm2 startup
