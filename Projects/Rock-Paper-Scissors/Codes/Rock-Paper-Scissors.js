// Reset score on page refresh
localStorage.removeItem("score");

const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  CPUResult = document.querySelector(".CPU_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

console.log(gameContainer, userResult, CPUResult, result, optionImages);

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
localStorage.setItem("score", JSON.stringify(score));

function updateScoreElement() {
  document.querySelector(
    ".scoreBoard"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
updateScoreElement();

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();
  result.textContent = "Let's Play!!";
  userResult.src = CPUResult.src = "images/rock.png";
  optionImages.forEach((image) => {
    image.classList.remove("active");
  });
}
document.querySelector(".Reset").addEventListener("click", resetScore);

optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = CPUResult.src = "images/rock.png"; //set default image src to rock image.

    result.textContent = "wait..."; //reset the result text.

    optionImages.forEach((image2, index2) => {
      index !== index2 && image2.classList.remove("active"); //Remove active class from other images , make only one option active.
    });

    gameContainer.classList.add("start"); //add active class to the game container to show the result section.

    //set a timeout to show the CPU result after 2 seconds
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      let imageSrc = e.target.querySelector("img").src; //now image src will save in imageSrc variable.

      userResult.src = imageSrc; //set user result image src to the clicked image src.

      let randomNumber = Math.floor(Math.random() * 3); //generate a random number from 0 to 2.

      let CPUImages = [
        "images/rock.png",
        "images/paper.png",
        "images/scissors.png",
      ]; //array of CPU images.

      CPUResult.src = CPUImages[randomNumber]; //get the CPU image src based on the random number.

      let CPUValue = ["R", "P", "S"][randomNumber]; //get the CPU value based on the random number.

      let userValue = ["R", "P", "S"][index]; //get user value to the clicked option (based on index)

      let outComes = {
        RR: "Draw",
        RP: "CPU",
        RS: "User",
        PR: "User",
        PP: "Draw",
        PS: "CPU",
        SR: "CPU",
        SP: "User",
        SS: "Draw",
      }; //creat an object with all possible outcomes.

      let outComeValue = outComes[userValue + CPUValue]; //get the outcome value based on user and CPU values.

      // Update score based on outcome
      if (outComeValue === "User") {
        score.wins += 1;
      } else if (outComeValue === "CPU") {
        score.losses += 1;
      } else if (outComeValue === "Draw") {
        score.ties += 1;
      }
      localStorage.setItem("score", JSON.stringify(score));
      updateScoreElement();

      result.textContent =
        userValue === CPUValue ? "Match Draw!" : `${outComeValue} won!!`; //set the result text based on the outcome value.
    }, 2000); //set the timeout to 2 seconds.
  });
});
