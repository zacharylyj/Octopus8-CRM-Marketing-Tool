const cards = document.querySelectorAll(".card");
let currentIndex = 0;

setInterval(() => {
  // Calculate the degrees to rotate
  const baseDegree = 360 / cards.length;

  cards.forEach((card) => {
    const currentDegree = parseInt(card.getAttribute("data-degree"));
    const newDegree = (currentDegree + baseDegree) % 360;
    card.setAttribute("data-degree", newDegree);

    const rotation = `rotateY(${newDegree}deg) translateZ(300px)`; // Adjust translateZ for spacing between cards
    card.style.transform = rotation;
  });

  currentIndex = (currentIndex + 1) % cards.length;
}, 2000); // Adjust the time for spinning speed
