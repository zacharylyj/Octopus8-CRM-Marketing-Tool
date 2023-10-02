let prevTotalAmount = 0;
let months_divided = 36;

document.getElementById("monthsDivided").textContent = months_divided;

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(
    ".blank-card-left, .blank-card-right, .blank-card-left-large, .blank-card-left-nogrant, .blank-card-right-nogrant"
  );
  const selectedCountEl = document.getElementById("selectedCount");
  const totalAmountEl = document.getElementById("totalAmount");

  cards.forEach((card) => {
    card.addEventListener("click", function (event) {
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
        const tickMark = this.querySelector(".tick-mark");

        if (
          this.classList.contains("blank-card-left-nogrant") ||
          this.classList.contains("blank-card-right-nogrant")
        ) {
          this.classList.toggle("selected-nogrant");

          if (this.classList.contains("selected-nogrant")) {
            tickMark.style.display = "block";
          } else {
            tickMark.style.display = "none";
          }
        } else {
          this.classList.toggle("selected");

          if (this.classList.contains("selected")) {
            tickMark.style.display = "block";
          } else {
            tickMark.style.display = "none";
          }
        }

        const quantityControl = this.querySelector(".quantity-control");
        if (quantityControl) {
          if (
            this.classList.contains("selected") ||
            this.classList.contains("selected-nogrant")
          ) {
            quantityControl.style.display = "flex";
          } else {
            quantityControl.style.display = "none";
          }
        }
      }

      updateFooter();
    });
  });

  function updateFooter() {
    let selectedCards = document.querySelectorAll(
      ".selected, .selected-nogrant"
    );
    let totalCount = selectedCards.length;
    let totalAmount = 0;
    let totalGrantAmount = 0;

    // Loop over each selected card to accumulate the total amount and grant amount
    selectedCards.forEach((card) => {
      let quantity = card.querySelector(".quantity-control")
        ? parseInt(
            card.querySelector(".quantity-control .quantity").textContent,
            10
          )
        : 1;
      totalAmount += parseFloat(card.getAttribute("data-amount")) * quantity;
      totalGrantAmount +=
        parseFloat(card.getAttribute("grant-amount") || 0) * quantity;
    });

    // Calculate the change in total amount
    const changeAmount = totalAmount - prevTotalAmount;
    prevTotalAmount = totalAmount;

    // Update the DOM elements with new calculated values
    document.getElementById("selectedCount").textContent = totalCount;
    document.getElementById("totalAmount").textContent = (
      totalAmount / months_divided
    ).toFixed(2);
    document.getElementById("totalGrantAmount").textContent =
      totalGrantAmount.toFixed(2);
    document.getElementById("totalDataAmount").textContent = (
      totalAmount - totalGrantAmount
    ).toFixed(2);

    // Handle the "ghost amount" display
    const ghostAmountEl = document.getElementById("ghostAmount");
    ghostAmountEl.textContent = `${changeAmount >= 0 ? "+" : ""}${(
      changeAmount / months_divided
    ).toFixed(2)}`;
    ghostAmountEl.style.color = changeAmount >= 0 ? "green" : "red";
    ghostAmountEl.style.position = "absolute";
    ghostAmountEl.style.bottom = changeAmount < 0 ? "0" : "auto";
    ghostAmountEl.style.top = changeAmount >= 0 ? "0" : "auto";

    // Show and then hide the ghost amount after a short delay
    ghostAmountEl.classList.add("show");
    setTimeout(() => {
      ghostAmountEl.classList.remove("show");
    }, 800);
  }

  updateFooter();
});
