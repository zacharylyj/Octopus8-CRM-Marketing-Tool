let prevTotalAmount = 0;

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(
    ".blank-card-left, .blank-card-right"
  );
  const selectedCountEl = document.getElementById("selectedCount");
  const totalAmountEl = document.getElementById("totalAmount");

  cards.forEach((card) => {
    card.addEventListener("click", function (event) {
      // Checking if clicked on the - or + inside class:quantity-control
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
      // Update the footer each time change
      updateFooter();
    });
  });

  function updateFooter() {
    let selectedCards = document.querySelectorAll(".selected");
    let totalCount = selectedCards.length;
    let totalAmount = 0;

    selectedCards.forEach((card) => {
      let quantity = card.querySelector(".quantity-control")
        ? parseInt(
            card.querySelector(".quantity-control .quantity").textContent
          )
        : 1;
      totalAmount += parseFloat(card.getAttribute("data-amount")) * quantity;
    });

    // Calculate the change in amount
    const changeAmount = totalAmount - prevTotalAmount;
    prevTotalAmount = totalAmount;

    selectedCountEl.textContent = totalCount;
    totalAmountEl.textContent = totalAmount.toFixed(2);

    // Ghost Amount Display Logic
    const ghostAmountEl = document.getElementById("ghostAmount");
    ghostAmountEl.textContent = `${
      changeAmount >= 0 ? "+" : ""
    }${changeAmount.toFixed(2)}`;
    ghostAmountEl.style.color = changeAmount >= 0 ? "green" : "red";
    ghostAmountEl.style.position = "absolute";
    ghostAmountEl.style.bottom = changeAmount < 0 ? "0" : "auto";
    ghostAmountEl.style.top = changeAmount >= 0 ? "0" : "auto";

    ghostAmountEl.classList.add("show");

    setTimeout(() => {
      ghostAmountEl.classList.remove("show");
    }, 800); // timer for ghost
  }

  // Initial update
  updateFooter();
});
