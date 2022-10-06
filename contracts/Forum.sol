// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

contract Forum {
    // Declaring needed types for the forum
    struct Comment {
        uint256 id; // Unique id of the comment
        string comment; // Content of the comment.
        uint256 creationTime; // Creation tine on the blockchain.
        address author;
    }
    struct Post {
        uint256 id; // Unique id of the post.
        string title;
        string description;
        int votes;
        uint256 creationTime; // Creation time on the blockchain.
        address author;
    }

    uint public postCount = 0; // Total amount of posts
    uint public commentCount = 0; // Total Amount of Comments.
    mapping(uint => Post) public posts; // Map postcount to post
    mapping(uint => Comment) public comments; // Map commentcount to comment
    mapping(uint => uint[]) postIdComments; // Attach comment ids to posts with mapping.

    function createPost(string memory _title, string memory _description)
        external
    {
        // Title can't be empty.
        require(bytes(_title).length > 0);
        // Description can't be empty aswell. May change it in the future.
        require(bytes(_description).length > 0);
        posts[postCount] = Post(
            postCount,
            _title,
            _description,
            0,
            block.timestamp,
            msg.sender
        ); // Create a new post.
        postCount++; // After creating the post, increment postCount.
    }

    function commentOnPost(uint _postId, string memory _comment) external {
        require(_postId < postCount && _postId >= 0); // Be sure that postid exists and makes sense.
        require(bytes(_comment).length > 0); // Be sure that comment is not empty.

        // Create the comment first.
        comments[commentCount] = Comment(
            commentCount,
            _comment,
            block.timestamp,
            msg.sender
        );
        postIdComments[_postId].push(commentCount);
        commentCount++;
    }

    // Fetch a singular comment.
    function getComment(uint _commentId)
        external
        view
        returns (Comment memory)
    {
        return comments[_commentId];
    }

    // Get all the comments of a post.
    function getAllComments(uint _postId)
        external
        view
        returns (uint[] memory)
    {
        require(_postId < postCount && _postId >= 0); // ensure that postId makes sense here aswell.
        return postIdComments[_postId];
    }

    // Fetch a singular post.
    function getPost(uint _postId) external view returns (Post memory) {
        return posts[_postId];
    }
    

    // Get post count. use this to fetch posts.
    function getPostCount() external view returns(uint256) {
        return postCount;
    }
}
