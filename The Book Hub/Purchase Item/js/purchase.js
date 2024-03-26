document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get form data
    var quantity = document.getElementById('quantity').value;
    var address = document.getElementById('address').value;

    // Perform purchase processing (e.g., update bank accounts, purchase/sale histories)
    // For demonstration purposes, let's assume the purchase is successful
    var purchaseStatus = "Purchase successful! Thank you for shopping with us.";

    // Display purchase status message
    document.getElementById('purchaseStatus').innerText = purchaseStatus;
});
