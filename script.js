document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(
    ".blank-card-left, .blank-card-right"
  );
  const selectedCountEl = document.getElementById("selectedCount");
  const totalAmountEl = document.getElementById("totalAmount");

  cards.forEach((card) => {
    card.addEventListener("click", function (event) {
      // Check if we clicked on the - or + inside quantity-control
      if (
        event.target.classList.contains("decrease") ||
        event.target.classList.contains("increase")
      ) {
        const quantityEl = event.target
          .closest(".quantity-control")
          .querySelector(".quantity");
        let quantity = parseInt(quantityEl.textContent, 10);

        if (event.target.classList.contains("decrease") && quantity > 1) {
          quantity--;
        } else if (event.target.classList.contains("increase")) {
          quantity++;
        }

        quantityEl.textContent = quantity;
      } else {
        // Toggle the selected class
        this.classList.toggle("selected");

        // Toggle the display of quantity-control
        const quantityControl = this.querySelector(".quantity-control");
        if (quantityControl) {
          if (this.classList.contains("selected")) {
            quantityControl.style.display = "flex";
          } else {
            quantityControl.style.display = "none";
          }
        }
      }

      // Update the footer
      updateFooter();
    });
  });

  function updateFooter() {
    let selectedCards = document.querySelectorAll(".selected");
    let totalCount = selectedCards.length;
    let totalAmount = 0;

    selectedCards.forEach((card) => {
      // Get the amount and quantity
      let amount = parseFloat(card.getAttribute("data-amount"));
      let quantity = 1; // Default quantity

      // Check if there's a quantity control in the card
      const quantityControl = card.querySelector(".quantity-control .quantity");
      if (quantityControl) {
        quantity = parseInt(quantityControl.textContent, 10);
      }

      totalAmount += amount * quantity; // Multiply amount by quantity
    });

    selectedCountEl.textContent = totalCount;
    totalAmountEl.textContent = totalAmount.toFixed(2);
  }

  // Initial update
  updateFooter();
});
