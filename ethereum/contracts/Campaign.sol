pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender); // returns an address
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    // Does not create an instance of a request
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount; // Count of approvals
        mapping(address => bool) approvals; // People who have approved this
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function getBalance() public view returns (uint) {
        address myAddress = this;
        return myAddress.balance;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        // create instance of struct "Request"
        // Created via memory over storage
        // Only have to initialize value types
        // No need to initialize mapping types (mapping)
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]); // requiring he is an approver
        require(!request.approvals[msg.sender]); // Check if approver has already approved.

        request.approvals[msg.sender] = true; // Add approver as voted.
        request.approvalCount++; // increase the count;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2)); // Greater than 50% must approve before release
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address
    ) {
        return (
          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}
