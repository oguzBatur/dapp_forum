import forumJson from './src/artifacts/contracts/Forum.sol/Forum.json';
import { IContractDetails } from './types/interfaces';
export const ForumContract: IContractDetails = {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    json: forumJson,
    abi: [
        "function createPost(string memory _title, string memory _description) external",
        "function getPost(uint _postId) external view returns (Post memory)" ,
        "function getAllComments(uint _postId) external view returns (uint[] memory)",
        "function getComment(uint _commentId) external view returns (Comment memory)",
        "function getPostCount() external view returns (uint256)",
        "function commentOnPost(uint _postId, string memory _comment) external"
    ]

};

