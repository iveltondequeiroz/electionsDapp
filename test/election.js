var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts){
  it("init with 2 candidates", function(){
    return Election.deployed().then(function(instance){
      return instance.candidatesCount();
    }).then(function(count){
      assert.equal(count,2);
    });
  });

  it("init candidates with correct values", function(){
    return Election.deployed().then(function(instance){
      electionInstance = instance;
      return electionInstance.candidates(1);
    }).then(function(candidate){
      assert.equal(candidate[0],1,"contains correct id");
      assert.equal(candidate[1],"Candidate 1", "contains correct name");
      assert.equal(candidate[2],0, "contains correct votes count");
    });  
  });

  it("cast a vote", function(){
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 1;
      return electionInstance.vote(candidateId, {from: accounts[0]});
    }).then(function(receipt){
      return electionInstance.voters(accounts[0]);
    }).then(function(voted){
      assert(voted, "the voter was marked as voted");
      return electionInstance.candidates(candidateId);
    }).then(function(candidate){
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "increments the candidate's vote count");
    })
  });  
});