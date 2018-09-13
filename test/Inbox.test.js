const assert = require('assert');
const ganache = require('ganache-cli');
const Web3  = require('web3'); //class of web3 we have to make a instance of it 
const {interface , bytecode} = require('../compile');
// interface is abi
const web3 = new Web3(ganache.provider());
// in future we repace ganche.provider() with the network that we are work on 


//let car;
let accounts;
beforeEach(async ()=>{
    // get accounts from ganche list acccounts 
    // web3.eth.getAccounts().then(fetchedAccounts => {
    //     console.log(fetchedAccounts);
    // });
    accounts = await web3.eth.getAccounts();
    // select one account to use 
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode,arguments:['Hi there !']})
    .send({from: accounts[0],gas:'1000000'});
    // contract
    // inbox.setProvider(provider);
});

describe("first test case",() => {

    it("first test",()=>{
        //car = new Car();
        assert.ok(inbox.options.address);
        //assert.equal(car.park(),"stopped");
    });

    it('default message value check ', async () =>{
        let message = await inbox.methods.message().call();
        assert.equal(message,'Hi there !');
    });

    it('checking setMessage action', async ()=>{
       await inbox.methods.setMessage('Hello Nirdesh').send({from: accounts[0]});
       let message = await inbox.methods.message().call();
       assert.equal(message,'Hello Nirdesh');
    });

});