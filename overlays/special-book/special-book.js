const bookmark = document.getElementById("bookmark");
const specialBookOverlay = document.getElementById("special-book-overlay");
const specialBookClose = document.getElementById("specialBookClose");

const specialBookContent = document.getElementById("specialBookContent");


if (specialBookContent) {
  specialBookContent.innerHTML = `
    <!-- LEFT PAGE -->
    <div class="special-page left">
      <div class="page-top">
        <span class="page-title"><i>what i found</i></span>
      </div>

      <div class="chapter-block">
        
        <div class="chapter-number">17</div>
        <div class="chapter-label">Chapter</div>
      </div>

      <div class="page-footer">∞</div>
    </div>

    <!-- RIGHT PAGE -->
    <div class="special-page right">
      <div class="page-top">
        <span class="page-title"><i>what i found</i></span>
      </div>

      <div class="page-body">
        You you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you  
        you you you you you you you you you you you you you you you you you you you you you you you you 
        you you you you you you you you you you you you you you you you you you you you you you you you 
        you you you you you you you you you you you you you you you you you you you you you you you you 
        you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you
        you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you  
        you you you you you you you you you you you you you you you you you you you you you you you you 
        you you you you you you you you you you you you you you you you you you you you you you you you 
        you you you you you you you you you you you you you you you you you you you you you you you you 
        you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you you 
        <br><br> </div>
        <div class="you-ending"><i>and You</i>....</div>

      <div class="page-footer">∞</div>
    </div>
  `;
}



if (bookmark && specialBookOverlay) {
  bookmark.addEventListener("click", () => {
    specialBookOverlay.classList.add("visible");
  });
}

if (specialBookClose) {
  specialBookClose.addEventListener("click", () => {
    specialBookOverlay.classList.remove("visible");
  });
}

const specialDialogue = document.getElementById("specialDialogue");

if (bookmark && specialBookOverlay && specialDialogue) {
 bookmark.addEventListener("click", () => {
  specialBookOverlay.classList.add("visible");

  specialDialogue.classList.remove("visible");
  void specialDialogue.offsetWidth; // force reflow

  setTimeout(() => {
    specialDialogue.classList.add("visible");
  }, 1000);
});
}

