function openWhenOverlay() { 
  const root = document.getElementById("overlay-root");

  const container = document.createElement("div");
  container.className = "openwhen-overlay";

  container.innerHTML = `
    <div class="openwhen-wrapper">
      <button class="openwhen-close">×</button>
      <h1 class="openwhen-title">Open when...</h1>
      <div class="letters-grid"></div>
    </div>
  `;

  root.appendChild(container);

  const grid = container.querySelector(".letters-grid");

  const letters = [
    {
      title: "..you want to<br> relive our <br>first date",
      content: "My baby,<br>I’ll always remember that day. Not just the waffles, but the time slowed down. I’ll always remember that one hour that we spent together. All of it — the warmth of your hand, holding you close, kissing your face… then your lips… it felt so unreal, like I was drunk on us…<br>I love you!!"
    },
    {
      title: "..you're thinking<br>of me",
      content: "My love,<br> If I’m on your mind, smile — because I’m thinking of you too. I think about you all the time. Keep me in your thoughts, baby, and I’ll always be near.<br>You’re my favorite thought, my favorite daydream…<br>I love youuu!"
    },
    {
      title: "..you miss<br>me",
      content: "My love,<br>If this distance makes you feel sad, close your eyes and imagine me kissing your forehead, your cheeks, your lips, your whole face… telling you- I love you.<br>No matter how far we are, my heart beats for you.<br>I love you sooooo much!"
    },
    {
      title: "..you're happy",
      content: "My love,<br>Seeing you happy lights up my world. Smile till your(my) chubbycheeks hurt, laugh loud, and never hold back.<br>I love seeing you shine brighter than anything else.<br>I love you!"
    },
    {
      title: "..I'm out with<br>my friends",
      content: "My love,<br> If you’re reading this, then I’m probably out, pretending to be listening to my friends, but I wish I was with you. They are cool… but you’re cooler.<br>You’re hot too… very hot…<br>Just know that every breath I take, every laugh, every thought includes you…<br>I love youuuu!"
    },
    {
      title: "..you're<br>overthinking",
      content: "My love,<br> When your mind races, little things feel bigger than they are. Breathe, my love. I’m here, you’re not alone. Trust us, trust me, and remember — no matter what your thoughts are saying, my heart is yours.<br>I love youuu!!"
    },
    {
      title: "..you're sad",
      content: "My love,<br> You’re never alone. If I could be there, I’d wipe those tears away. I hate to see tears in your eyes.<br>Even in sadness, you’re my happiest thought.<br>I love you!"
    },
    {
      title: "..you're upset",
      content: "My love,<br> I hate when life weighs upon you. Take a pause, breathe, and let go of what you can’t control.<br>My love, lean on me. You don’t need to carry everything alone. I’ll always help you, shoulder to shoulder, your shadow.<br>I love you!"
    },
    {
      title: "..you've had a<br>bad dream",
      content: "My love,<br> Bad dreams fade away, but I’m real and I’m here. Everything’s okayyy, I love you. No one can hurt you, trust me.<br>You are safe with me.<br>I love you so soo sooo soooo much!"
    },
    {
      title: "..you have to tell<br>me something",
      content: "My love,<br> Whatever it is, don’t hesitate. You can always speak your feelings with me. I’ll listen, I’ll understand, and I’ll never judge. Big or small, your words matter to me.<br>So tell me, I’m here, listening to your heart…<br>I love you!!"
    },
    {
      title: "..you feel like we're<br>drifting apart",
      content: "My love,<br> If you ever feel the distance growing between us, know this: I’ll fight for us, always. I cannot lose you. I won’t let go.<br>Please never doubt my love for you…<br>I love you so so much!"
    },
    {
      title: "..you I don't<br>answer",
      content: "My love,<br> I am sorry I am not available right now. Remember that whatever situation I’m in, you’re the only thing on my mind. I miss you so much, it feels like dying not being able to kiss you, to hold you.<br>Sorry to leave you waiting… I’ll be back ASAP.<br>I love youuu!"
    },
    {
      title: "..you're mad<br>at me",
      content: "My love,<br> I know your heart feels heavy & your mind is storming. Please don’t forget — I never want to hurt you.<br>Anger is a moment, but our love is forever. Breathe, my love… calm down baby.<br>I’ll wait with open arms, ready to hold you until the storm passes.<br>I love you!"
    },
    {
      title: "..I'm mad at<br>you",
      content: "My love,<br> If I’m angry, know that it never changes how much I love you. This is a passing moment, but you’re my forever.<br>Even if I’m angry, I’ll always listen to you. I promise I’ll always come back softer, and loving you more.<br>I love you!!!"
    },
    {
      title: "..we have a<br>fight",
      content: "My love,<br> No matter what the argument is, it won’t change us. My love for you will be the same. Even when fighting, I promise to listen, to learn, and to love you more and harder after every argument.<br> Nothing is bigger than us.<br>I love you!"
    },
    {
      title: "..you need help<br>falling asleep",
      content: "My baby,<br> Lay down, close your eyes, and imagine me lying beside you. Feel my hand in yours, my voice saying “goodnini palkuuu, I love you.”<br>Doze off knowing that you are safe with me. Sweet dreams baby, I’ll be there in your thoughts until we meet again…<br>I love you!"
    },
    {
      title: "..you need to feel<br>loved",
      content: "Palak >_< (my babyyyyy)<br> Here’s a reminder: you are my heart, my forever, my love, my pretty little baby, my sweetheart. My love is yours — I’m yours, freely and forever.<br>If you ever doubt, read this and know: I choose you, every day, in every single way.<br>I love you with every part of my being!!!"
    },
  ];

  letters.forEach((item, i) => {
    const letter = document.createElement("div");
    letter.className = "letter";

    letter.innerHTML = `<span class="letter-title">${item.title}</span>`;

    letter.style.animationDelay = `${i * 0.05}s`;

    letter.addEventListener("click", () => {
      openLetterOverlay(item.content);
    });

    grid.appendChild(letter);
  });

  container.querySelector(".openwhen-close").onclick = () => {
    container.remove();
  };
}


/* =========================
   OPEN LETTER FUNCTION
========================= */
function openLetterOverlay(content) {
  const root = document.getElementById("overlay-root");

  const overlay = document.createElement("div");
  overlay.className = "letter-open-overlay";

  overlay.innerHTML = `
    <div class="letter-paper">
      <button class="letter-close">×</button>
      <div class="letter-content" id="letter-text"></div>
    </div>
  `;

  root.appendChild(overlay);

  const textEl = overlay.querySelector("#letter-text");
  typeWriter(textEl, content, 15);

  overlay.querySelector(".letter-close").onclick = () => {
    overlay.remove();
  };
}

function typeWriter(element, html, speed = 10) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < html.length) {

      // handle <br> properly
      if (html.substring(i, i + 4) === "<br>") {
        element.innerHTML += "<br>";
        i += 4;
      } else {
        element.innerHTML += html.charAt(i);
        i++;
      }

      setTimeout(type, speed);
    }
  }

  type();
}
