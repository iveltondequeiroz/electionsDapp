pragma solidity ^0.4.2;

contract Election {
  // model a candidate
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  // store accounts that voted
  mapping(address => bool) public voters;
  // store candidates
  // fetch candidate
  mapping(uint => Candidate) public candidates;
  // store candidates count
  uint public candidatesCount;

  // constructor
  function Election() public {
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");
  }

  function addCandidate(string _name) private {
    candidatesCount++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }

  function vote(uint _candidateId) public {
    // check never voted before
    require(!voters[msg.sender]);
    // check valid candidate 
    require(_candidateId > 0 && _candidateId <= candidatesCount);
    // record voter
    voters[msg.sender] = true;
    // update candidate vote count
    candidates[_candidateId].voteCount++;

  }
}