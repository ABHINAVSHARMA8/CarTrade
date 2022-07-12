const { assert } = require('chai');
//const { CardColumns } = require('react-bootstrap');
//const { Item } = require('react-bootstrap/lib/Breadcrumb');
const { default: Web3 } = require('web3');

const CarTrade = artifacts.require("CarTrade");


require('chai')
  .use(require('chai-as-promised'))
  .should()

console.log("Hello")

const a1 =  '0x3498d25a0Ad9c2717Ea1a18cBb742b60E27A7AD2'
const a2= '0x162CB5457Ce879834acBC1Df703eE54d0A19659E'
const a3 = '0xc009d1e00Bf1cE6032F744008aC238A2341a2E56'


function tokens(n){

    return web3.utils.toWei(n,'ether')
}

contract('CarTrade',([deployer,investor])=>{

    let carTrade,totalCars

    before(async()=>{

        
        carTrade = await CarTrade.new("Car","Abhinav",1,1,1)
       
   })


   describe('CarTrade Deployment',async()=>{

        it('Name',async()=>{

            const name  = await carTrade.getName()

            assert.equal(name," A Car Marketplace")
        })
   })

   describe('Check price',async()=>{

        it('Check (1,2,3)',async()=>{

            const price  = await carTrade.get_price(1,2,3);

            assert.equal(price,6);
        })
   })

   describe('Register as a manufacturer',async()=>{

    let result,makeCar,c

    before(async()=>{

        
        result  = await carTrade.register_as_manufacturer({from:a1})
        makeCar = await carTrade.makeCar(1,2,3,{ from: a1, value: /*web3.utils.toWei('6', 'ether')*/ 6})
        //1 car
        
    })

    it('Register',async()=>{

        
          const event1  = result.logs[0].args
         assert.equal(event1.manufacturer,a1)

        //    const event2  = makeCar.logs[0].args
        //   // console.log(event2)

        //   assert.equal(event2.owner,a1)
        //   assert.equal(event2.carId,1)
    })

   


    it('Make Car ',async()=>{

        
        
        const balance = await web3.eth.getBalance('0x3498d25a0Ad9c2717Ea1a18cBb742b60E27A7AD2')

        console.log(balance)



    })
   

    it('Post Car',async()=>{

        const postCar = await carTrade.postCar(1,2,{from:a1})

        

        await carTrade.postCar(1,2,{from:a2}).should.be.rejected

        const event  =postCar.logs[0].args
        assert.equal(event.owner,a1)
        assert.equal(event.carId,1)
    })

    it('Buy Car',async()=>{

        await carTrade.buy(1,{from:a1,value:6 /*web3.utils.toWei('6', 'ether')*/}).should.be.rejected
        await carTrade.buy(2,{from:a2,value:6 /*web3.utils.toWei('6', 'ether')*/}).should.be.rejected
        await carTrade.buy(1,{from:a3,value:7 /*web3.utils.toWei('6', 'ether')*/}).should.be.rejected
       
    })

   })



   describe('Buy Car 2',async()=>{

        let result,makeCar,c

        before(async()=>{

           makeCar = await carTrade.makeCar(1,1,1,{ from: a1, value:3/* web3.utils.toWei('6', 'ether')*/})
            //2 cars
            await carTrade.postCar(2,4,{from:a1})
           
            //  const event = makeCar.logs[0].args
            //  console.log("make car "+event)
            // assert.equal(event.owner,a1)
            // assert.equal(event.carId,2)

            

        })

        it('Buy Car (2)))',async()=>{

         
            let buyCar = await carTrade.buy(2,{from:a2,value: 4 })

            
            //  const event6  = buyCar.logs[0].args
            // console.log("buyCar "+event6)
            //  assert.equal(event6.from,a1)
            //  assert.equal(event6.to,a2)
            //  assert(event6.carId,2)
        })
    })

    describe('Check Depreciation',async()=>{

        let makeCar

        before(async()=>{

            await carTrade.makeCar(1,1,1,{from:a1,value:3})
            //3 cars
            await carTrade.postCar(3,2,{from:a1})

        
        })

        it('Depreciate',async()=>{

            await carTrade.buy(3,{from:a2,value : 2})

            await carTrade.postCar(3,0,{from:a2}).should.be.rejected
        })
    })
    

})
