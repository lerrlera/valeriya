
if (modal && modalImg && captionText) {

  // Get the modal
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const captionText = document.getElementById("caption");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.textContent = img.closest(".gallery-item").querySelector(".caption")?.textContent || "";
    });
  });

  // Close modal
  modal.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
  });
}

