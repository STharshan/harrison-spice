export const openOrderMenu = () => {
  // Load script once
  if (!document.getElementById("glf-script")) {
    const script = document.createElement("script");
    script.src = "https://www.fbgcdn.com/embedder/js/ewm2.js";
    script.async = true;
    script.defer = true;
    script.id = "glf-script";
    document.body.appendChild(script);

    script.onload = () => {
      const btn = document.querySelector(".glf-button");
      if (btn) btn.click();
    };
  } else {
    const btn = document.querySelector(".glf-button");
    if (btn) btn.click();
  }
};