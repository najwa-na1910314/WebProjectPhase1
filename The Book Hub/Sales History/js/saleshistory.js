// Function to load available items
function loadAvailableItems() {
    // Fetch items from JSON and populate the .available-items div
  }
  
  // Function to load sales history
  function loadSalesHistory() {
    // Fetch sales history from JSON and populate the .sales-history div
  }
  
  // Function to open the item details modal
  function openItemDetails(itemId) {
    // Fetch item details based on itemId and display in the modal
    document.getElementById("itemDetailsModal").style.display = "block";
  }
  
  // Function to close the item details modal
  function closeItemDetails() {
    document.getElementById("itemDetailsModal").style.display = "none";
  }
  
  // Call the load functions when the page loads
  window.onload = function() {
    loadAvailableItems();
    loadSalesHistory();
  }
  