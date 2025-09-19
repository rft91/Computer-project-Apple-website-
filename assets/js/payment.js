// Base prices (RM)
const basePrices = {
  "iPhone 17": 3999,
  "iPhone 17 Plus": 4999,
  "iPhone 17 Pro": 5499,
  "iPhone 17 Pro Max": 5999
};

// Storage add-ons
const storagePrices = {
  "256": 0,
  "512": 500,
  "1024": 1000,
  "2048": 2000
};

const modelSelect = document.getElementById("model");
const storageSelect = document.getElementById("storage");
const totalPriceEl = document.getElementById("totalPrice");
const paymentSelect = document.getElementById("payment");
const paymentDetails = document.getElementById("paymentDetails");

// Update total price
function updatePrice() {
  const model = modelSelect.value;
  const storage = storageSelect.value;

  if (model && storage) {
    const total = basePrices[model] + storagePrices[storage];
    totalPriceEl.textContent = `Total: RM${total}`;
  } else {
    totalPriceEl.textContent = "Total: RM0";
  }
}

// Show dynamic payment fields
function updatePaymentFields() {
  const method = paymentSelect.value;
  paymentDetails.innerHTML = "";

  if (method === "Card") {
    paymentDetails.innerHTML = `
      <label for="cardnumber">Card Number:</label>
      <input type="text" id="cardnumber" name="cardnumber" maxlength="16" placeholder="1234 5678 9012 3456" required>

      <label for="expiry">Expiry Date:</label>
      <input type="month" id="expiry" name="expiry" required>

      <label for="cvv">CVV:</label>
      <input type="password" id="cvv" name="cvv" maxlength="3" placeholder="123" required>
    `;
  } else if (method === "FPX") {
    paymentDetails.innerHTML = `
      <label for="bank">Select Bank:</label>
      <select id="bank" name="bank" required>
        <option value="">-- Choose Bank --</option>
        <option value="Maybank">Maybank</option>
        <option value="CIMB">CIMB</option>
        <option value="RHB">RHB</option>
        <option value="Public Bank">Public Bank</option>
      </select>

      <label for="account number">Account Number:</label>
      <input type="text" id="account number" name="account number" maxlength="12" placeholder="123125678922" required>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="***************" required>
    `;
  } else if (method === "E-Wallet") {
    paymentDetails.innerHTML = `
      <label for="ewallet">Choose E-Wallet:</label>
      <select id="ewallet" name="ewallet" required>
        <option value="">-- Choose Wallet --</option>
        <option value="TNG">Touch 'n Go</option>
        <option value="GrabPay">GrabPay</option>
        <option value="Boost">Boost</option>
      </select>
      <label for="phone">Please transfer to this phone number: +6019-773 8980</label>
    `;
  }
}

// Event listeners
modelSelect.addEventListener("change", updatePrice);
storageSelect.addEventListener("change", updatePrice);
paymentSelect.addEventListener("change", updatePaymentFields);
