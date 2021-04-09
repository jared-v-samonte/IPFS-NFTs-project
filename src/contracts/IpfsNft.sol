pragma solidity ^0.8.3;
//pragma solidity ^0.8.3;
import "./ERC721/ERC721.sol";


contract IpfsNft is ERC721 
{  

   struct Photo
   {
      string hash;
      string title;
      uint256 tokenId;
   }

   uint index = 0;
   mapping(uint => Photo) _photoStructs;
   mapping(string => bool) _hashExists;
   mapping(string => bool) _titleExists;
   mapping(string => uint) _idToHash;

   constructor() ERC721("IpfsNft", "IPFSNFT") public { }

   function getHash(uint input) public returns(string memory)
   {
      return  _photoStructs[input].hash;
   }

   function getTitle(uint input) public returns(string memory)
   {
      return  _photoStructs[input].title;
   }

   function getTokenId(string memory input) public returns(uint256)
   {
      return  _idToHash[input];
   }

   
   function mint(string memory photoHash, string memory photoTitle) public 
   {
      //how many suppplies
      index++;

      //hash and title must have not been used again
      require(!_hashExists[photoHash]);
      require(!_titleExists[photoTitle]);

      //assigns variables
      _photoStructs[index].hash = photoHash;
      _photoStructs[index].title = photoTitle;
      _photoStructs[index].tokenId = index;


      _idToHash[photoHash] = index;
      _mint(msg.sender, index);

      //hash and title cannot be used again
      _hashExists[photoHash] = true;
      _titleExists[photoTitle] = true;
   }
}
