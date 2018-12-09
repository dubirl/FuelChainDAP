App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../orders.json', function(data) {
      var ordRow = $('#orderRow');
      var ordTemplate = $('#orderTemplate');

      for (i = 0; i < data.length; i ++) {
        ordTemplate.find('.panel-title').text(data[i].name);
        ordTemplate.find('img').attr('src', data[i].picture);
        ordTemplate.find('.order-quantity').text(data[i].fuel);
        ordTemplate.find('.trailer').text(data[i].reg);
        ordTemplate.find('.location').text(data[i].location);
        ordTemplate.find('.btn-order').attr('data-id', data[i].id);

        ordRow.append(ordTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(OrderArtifact) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      //var OrderArtifact = data;
      App.contracts.Order = TruffleContract(OrderArtifact);
    
      // Set the provider for our contract
      App.contracts.Order.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markOrdered();
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-order', App.handleOrder);
  },

  markOrdered: function(orderers, account) {
    var adoptionInstance;

App.contracts.Order.deployed().then(function(instance) {
  adoptionInstance = instance;

  return adoptionInstance.getAdopters.call();
}).then(function(orderers) {
  for (i = 0; i < orderers.length; i++) {
    if (orderers[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-order').eq(i).find('button').text('Success').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});
  },

  handleOrder: function(event) {
    event.preventDefault();

    var orderID = parseInt($(event.target).data('id'));

    var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Order.deployed().then(function(instance) {
    adoptionInstance = instance;

    // Execute adopt as a transaction by sending account
    return adoptionInstance.adopt(orderID, {from: account});
  }).then(function(result) {
    return App.markOrdered();
  }).catch(function(err) {
    console.log(err.message);
  });
});
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
