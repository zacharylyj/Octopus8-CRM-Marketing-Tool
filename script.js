const config = {
  "Add User Account": {
    "grant-amount": 0,
    "grant-text": "",
    "image-link": "",
    "price-amount": 10,
    "price-amount-text": "$10",
    "quantity-display": "True",
  },
  "Zoho Analytics(Base)": {
    "grant-amount": 8000,
    "grant-text": "Grant Avaliable: $8000",
    "image-link": "",
    "price-amount": "tb",
    "price-amount-text": "",
    "quantity-display": "False",
  },
  "Zoho Analytics(Add Graph)": {
    "grant-amount": 0,
    "grant-text": "",
    "image-link": "",
    "price-amount": 480,
    "price-amount-text": "$480",
    "quantity-display": "True",
  },
  "Don API": {
    "grant-amount": 11000,
    "grant-text": "Grant Avaliable: $11000",
    "image-link": "",
    "price-amount": "tb",
    "price-amount-text": "",
    "quantity-display": "False",
  },
  "SingPass(Login)": {
    "grant-amount": 7000,
    "grant-text": "Grant Avaliable: $7000",
    "image-link": "",
    "price-amount": "tb",
    "price-amount-text": "",
    "quantity-display": "False",
  },
  "SingPass(my info)": {
    "grant-amount": 7000,
    "grant-text": "Grant Avaliable: $7000",
    "image-link": "",
    "price-amount": "tb",
    "price-amount-text": "",
    "quantity-display": "False",
  },
  NinjaForm: {
    "grant-amount": 8000,
    "grant-text": "Grant Avaliable: $8000",
    "image-link": "",
    "price-amount": "tb",
    "price-amount-text": "",
    "quantity-display": "False",
  },
  SMS: {
    "grant-amount": 0,
    "grant-text": "",
    "image-link": "",
    "price-amount": 4800,
    "price-amount-text": "$4800",
    "quantity-display": "False",
  },
  "New Product": {
    //name of the product
    "grant-amount": 0, //backend value
    "grant-text": "Grant: 10", //displayed grant
    "image-link": "", //image background
    "price-amount": "tb", //tb will give text box option if not put a value without ""
    "price-amount-text": "", //displayed amount text
    "quantity-display": "False", //multiper products like (add user)
  },
};

const months_divided = 36;
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".right");

  let cardIdCounter = 1;

  for (const key in config) {
    const cardData = config[key];

    const card = document.createElement("div");
    card.classList.add(
      cardData["grant-amount"] == 0
        ? "blank-card-right-nogrant"
        : "blank-card-right"
    );
    card.setAttribute("data-card-id", "right" + cardIdCounter);
    card.setAttribute("data-amount", cardData["price-amount"]);
    card.setAttribute("grant-amount", cardData["grant-amount"]);

    // Add tick mark
    const tickMark = document.createElement("div");
    tickMark.classList.add("tick-mark");
    tickMark.textContent = "✔";
    card.appendChild(tickMark);

    // Add top-left-text
    const topLeftText = document.createElement("div");
    topLeftText.classList.add("top-left-text");
    topLeftText.textContent = key;
    card.appendChild(topLeftText);

    // Add top-right-text if grant-text is not empty
    if (cardData["grant-text"]) {
      const topRightText = document.createElement("div");
      topRightText.classList.add("top-right-text");
      topRightText.textContent = cardData["grant-text"];
      card.appendChild(topRightText);
    }

    // Add center-image
    const centerImage = document.createElement("div");
    centerImage.classList.add("center-image");
    const img = document.createElement("img");
    img.setAttribute("src", cardData["image-link"]);
    img.setAttribute("alt", "Center Image");
    centerImage.appendChild(img);
    card.appendChild(centerImage);

    // Add bottom-right-text
    const bottomRightText = document.createElement("div");
    bottomRightText.classList.add("bottom-right-text");
    if (cardData["price-amount"] == "tb") {
      const inputField = document.createElement("input");
      card.setAttribute("data-amount", 0);
      inputField.setAttribute("type", "number");
      inputField.setAttribute("inputmode", "numeric");
      inputField.setAttribute("min", "0");
      inputField.setAttribute("value", "0");
      inputField.classList.add("price-input");
      bottomRightText.appendChild(inputField);
      card.appendChild(bottomRightText);
      // Prevent toggle select when clicking on input field
      inputField.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      // Attach event listener to update data-amount
      inputField.addEventListener("input", function () {
        card.setAttribute("data-amount", this.value);
        updateFooter();
      });
    } else {
      bottomRightText.textContent = cardData["price-amount-text"];
      card.appendChild(bottomRightText);
    }

    // Add quantity-control if quantity-display is "True"
    if (cardData["quantity-display"] === "True") {
      const quantityControl = document.createElement("div");
      quantityControl.classList.add("quantity-control");

      const decrease = document.createElement("span");
      decrease.classList.add("decrease");
      decrease.textContent = "-";
      quantityControl.appendChild(decrease);

      const quantity = document.createElement("span");
      quantity.classList.add("quantity");
      quantity.textContent = "1";
      quantityControl.appendChild(quantity);

      const increase = document.createElement("span");
      increase.classList.add("increase");
      increase.textContent = "+";
      quantityControl.appendChild(increase);

      card.appendChild(quantityControl);
    }
    container.appendChild(card);
    cardIdCounter++;
  }

  let prevTotalAmount = 0;

  document.getElementById("monthsDivided").textContent = months_divided;

  const cards = document.querySelectorAll(
    ".blank-card-left, .blank-card-right, .blank-card-left-large, .blank-card-left-nogrant, .blank-card-right-nogrant"
  );
  cards.forEach((card) => {
    card.addEventListener("click", function (event) {
      console.log("Card clicked!"); //debug
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
    console.log("Footer Updated!"); //debug
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

      const cardGrantAmount = parseFloat(
        card.getAttribute("grant-amount") || 0
      );
      console.log(card.getAttribute("data-amount"));
      const cardPriceAmount = parseFloat(card.getAttribute("data-amount") || 0);
      const amountToUse = Math.min(cardGrantAmount, cardPriceAmount);

      totalGrantAmount += amountToUse * quantity;
    });

    // Calculate the change in total amount
    const changeAmount = totalAmount - prevTotalAmount;
    prevTotalAmount = totalAmount;

    // Update the DOM elements with new calculated values
    document.getElementById("selectedCount").textContent = totalCount;
    document.getElementById("totalAmount").textContent = (
      (totalAmount - totalGrantAmount) /
      months_divided
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
