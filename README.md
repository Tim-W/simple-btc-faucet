On the remote server:
1. Find out the public IP of this server and set it correctly in the app: `http://public-ip:3000?id={id}` 
2. `export PATH=$PATH:~/bitcoin-0.17.1/bin`
3. `bitcoind -regtest -daemon`
4. In simple-btc-faucet: `npm i` and start in background: `npm run start`
