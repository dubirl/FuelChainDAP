# FuelChainDAP

Please ensure the following dependencies are installed prior recreating setup
1. GIT 
2. Node js
3. Ganache
4. Truffle
5. MetaMask 

DEV Environment Background. 

Fuelchain POC was developed and tested on clean install of Windows 10 Professional built from an image OS Install CD using VMWare Player.
Please ensure Windows version is @ least 10.0.17134.471
Summarised steps to replicate Fuelchain DAPP enviromment  

Check all the the above pre requsites are in stalled 

Pull down the files using one of the following 2 options

1. Copy the zip file down and extract into a folder on the root of C:\

2. USE the following GIT command

`git clone https://github.com/dubirl/FuelChainDAP.git`

The will pull the contents into a folder called FuelchainDap under the users\profilename\ 


Please note: Make sure there are not *.json files in the fuelchaindap\build\contracts prior to initialising FuelChain DAPP 

Start up Ganache and ensure that is it running.
From a dos prompt navigate to the \fuelchainDap folder and run the following commands
Truffle.cmd compile
Truffle.cmd migrate
Both command should return logs to indicate the smart contracts compiled and migrated to Ganache
Your Transction Count in Ganache should be 4

Get the mnenonic seed phrase from Ganache (12 words) and copy it to a text file
Open Google Chrome and locate the metamask icon - look for the option import seed from phrase
Copy and paste the mnenoic phrase and set a new password (NOTE PASSWORD for this)
If MetaMask status is Main Network change to custom and enter CUSTOM URL  http://127.0.0.1:7545
Ensure that the private network appears and check that the ID of the account within metamask matches account
0 in Ganache. 

From the command prompt in the \fuelchainDap folder run the following command
npm run dev

The website will initialise.
A MetaMask window will appear and prompt for permission to connect to the FuelChain POC - click connect
MetaMask is now synced with the webpage.
You can interact with the contract by selecing an order and clicking the "confirm order"
MetaMask will appear to confirm the transaction - click confirm and the tranasction will be sent to the smart contract address.
You will tell if the transaction has been sucessful as the count in Ganache will have increased by one. 
