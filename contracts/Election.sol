pragma solidity ^0.4.2;

contract Election {
  // store candidate name
  // read candidate
  string public candidate;
  // constructor
  function Election() public {
    candidate = "Candidate 1";
  }
}