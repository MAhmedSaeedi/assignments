import { useEffect, useState,useMemo } from 'react'
import Web3 from 'web3'
import Table from './components/Table'
const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"admin","type":"address"}],"name":"AdminSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"actor","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BridgeLiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"actor","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BridgeLiquidityRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"targetNetwork","type":"uint256"},{"indexed":false,"internalType":"address","name":"targetToken","type":"address"},{"indexed":false,"internalType":"address","name":"targetAddrdess","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BridgeSwap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"signer","type":"address"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"TransferBySignature","type":"event"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"addLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_signer","type":"address"}],"name":"addSigner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"targetToken","type":"address"}],"name":"allowTarget","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"allowedTargets","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"chainId","type":"uint256"}],"name":"disallowTarget","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeDistributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"fees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"liquidityAdder","type":"address"}],"name":"liquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"removeLiquidityIfPossible","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_signer","type":"address"}],"name":"removeSigner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"fee10000","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeDistributor","type":"address"}],"name":"setFeeDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"signers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"targetNetwork","type":"uint256"},{"internalType":"address","name":"targetToken","type":"address"}],"name":"swap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"targetNetwork","type":"uint256"},{"internalType":"address","name":"targetToken","type":"address"},{"internalType":"address","name":"targetAddress","type":"address"}],"name":"swapToAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"usedHashes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"payee","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32","name":"salt","type":"bytes32"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"withdrawSigned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"payee","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32","name":"salt","type":"bytes32"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"withdrawSignedVerify","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
const web3 = new Web3("https://rinkeby.infura.io/v3/d838709e9ef64930917c2ec51a366249")
const contract = new web3.eth.Contract(contractAbi,"0x89262B7bd8244b01fbce9e1610bF1D9F5D97C877")

;



function App() {
  const [data, setData] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: "Events from Bridge Swap",
        columns: [
          {
            Header:'Transaction Hash',
            accessor:'transactionHash'
          },
          {
              Header:'From',
              accessor:'from'
          },
          {
              Header:'To',
              accessor:'targetAddrdess'
          },
          {
              Header:'Amount',
              accessor:'amount'
          },
          {
            Header:'Token',
            accessor:'token'
          }
        ]
      }
    ],
    []
  )
  const columnsTwo = useMemo(
    () => [
      {
        Header: "Events from Transfer By Signature",
        columns: [
          {
            Header:'Transaction Hash',
            accessor:'transactionHash'
          },
          {
              Header:'From',
              accessor:'signer'
          },
          {
              Header:'To',
              accessor:'receiver'
          },
          {
              Header:'Amount',
              accessor:'amount'
          },
          {
              Header:'Token',
              accessor:'token'
          },
          {
            Header:'Gas Fee',
            accessor:'fee'
          }
        ]
      }
    ],
    []
  )


  useEffect(() => {
      (async()=>{
        await getSwapEvents()
      await getTransferBySignature()
      })()
  },[])

  async function getTransferBySignature(){
    let transferArray = await contract.getPastEvents('TransferBySignature', {
      fromBlock: 0,
      toBlock: 'latest'
    })
    .then(function(events){
        return events 
    });
    
    let result = transferArray.map(({ returnValues }) => returnValues)
    let hash = transferArray.map(({ transactionHash }) => transactionHash)
    

    for(const [index,element] of result.entries()) {
      element.transactionHash = hash[index];
      element.amount = web3.utils.fromWei(element.amount)
      element.fee = web3.utils.fromWei(element.fee)
    }

    setDataTwo(result)

    
  }
  async function getSwapEvents(){
    
    let swapAarray = await contract.getPastEvents('BridgeSwap', {
      fromBlock: 0,
      toBlock: 'latest'
    })
    .then(function(events){
        return events 
    });  
    let result = swapAarray.map(({ returnValues }) => returnValues)
    let hash = swapAarray.map(({ transactionHash }) => transactionHash)

    

    for(const [index,element] of result.entries()) {
      element.transactionHash = hash[index];
      element.amount = web3.utils.fromWei(element.amount)
    }

    setData(result)
}


  return (
    <div className="App">
    <Table columns={columns} data={data} />
    <Table columns={columnsTwo} data={dataTwo} />
  </div>
  );
}

export default App;
