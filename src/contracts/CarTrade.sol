pragma solidity ^0.8.15;

 

/*

    1. Seller can add cars as nfts
    2. Buyers can buy cars
    3. User(seller,buyer) can sell their owned cars to another user
    4. Set minting cost of a car(based on it's features,aplly some maths) to ensure a seller cannnot mint unlimited cars
    5. For point 4, transfer that ether to contract
    6. Login system via react
    7. Car owner can also choose not put a car on sale

*/

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract CarTrade is ERC721URIStorage{



    
    struct Car{

        uint id; //token id

        //address payable owner;
        bool onSale;

        uint mileage;
        uint engine;
        uint fuel;


        uint  price;

        

    }

    
    string private contractName ;
    uint onewei = 1 wei;
    uint depr_mileage;
    uint depr_engine;
    uint depr_fuel;
    uint totalCars=0;
    mapping(uint=> bool) nft;
    mapping(uint => Car) cars;
    mapping(address => bool) manufacturers;
    

    modifier onlyManufacturer {
      require(manufacturers[msg.sender]==true,'Not a manufacturer');
      _;
   }

   modifier validNFT(uint id){

    require(nft[id]==true,'NFT not valid');
    _;
   }
   
    
   event makeCarEvent(

    address owner,
    uint carId
    );

    event registerEvent(

        address manufacturer
    );

    event buyEvent(

        address from,
        address to,
        uint carId
    );

    event postCarEvent(

        address owner,
        uint carId
    );


   constructor(
    string memory _name, 
    string memory _symbol,
    uint _depr_mileage,
    uint _depr_engine,
    uint _depr_fuel
    ) ERC721(_name,_symbol){

        contractName = " A Car Marketplace";

        depr_mileage=_depr_mileage;
        depr_engine = _depr_engine;
        depr_fuel = _depr_fuel;
   }

   function getName() public view returns(string memory) {

        return contractName;

   }

 



    function get_price(uint mileage,
    uint engine,
    uint fuel
    ) public view returns(uint){

        uint price =  mileage + engine + fuel;

        return price*onewei;


    }


    function depreciate_car(uint id) validNFT(id) private   {

        
        Car storage  c = cars[id];

        c.mileage -= depr_mileage;
        c.engine -= depr_engine;
        c.fuel -= depr_fuel;

        if(c.mileage <=0 || c.engine <=0 || c.fuel <=0){

            

            nft[id]=false;

            

        }

        

    }

    function register_as_manufacturer() public{

        require(manufacturers[msg.sender]==false,'Already a manufacturer');

       manufacturers[msg.sender]=true;

        

        emit registerEvent(msg.sender);

    }
                                                                                        
   
    
    function makeCar(uint mileage,uint engine,uint fuel)  payable onlyManufacturer
        public
        
    {   
       
        
        uint price = get_price(mileage,engine,fuel);


        require(msg.value == price,'Insufficent Funds ');
        require(mileage>0);
        require(engine>0);
        require(engine>0);

         Car memory c = Car(++totalCars
         ,false
         ,mileage
         ,engine
         ,fuel
         ,price
         );

        
        cars[totalCars]=c;
        _mint(msg.sender, totalCars);
        nft[totalCars]=true;

        emit makeCarEvent(ownerOf(totalCars),c.id);
         
        
        
    }

   
    function buy(uint id) validNFT(id) payable public{

        
        Car storage c = cars[id];

        

        require(msg.sender!=ownerOf(id),'Already owner of this car');

        require(msg.value ==c.price,'Insufficnet funds to buy');

        require(c.onSale==true,'Car not on sale');

        address payable prev_owner = payable(ownerOf(id));

        prev_owner.transfer(msg.value); //money sent

        

        //transfer nft

        _transfer(prev_owner,msg.sender,c.id);

        

        c.onSale = false;

        

        depreciate_car(c.id);

        
        if(nft[id]==true)
        c.price = get_price(c.mileage,c.engine,c.fuel);

        emit buyEvent(prev_owner,msg.sender,c.id);


    }

    function postCar(uint id,uint price) validNFT(id)  public {

        
        Car storage c = cars[id];

        require(msg.sender == ownerOf(id),'Only Owner can post their car');
        require(c.onSale==false,'Car Already on Sale');
      
        c.onSale = true;
        c.price  = price*onewei;
    

        emit postCarEvent(msg.sender,c.id);

    }

    

}