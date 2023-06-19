import "@fortawesome/fontawesome-svg-core/styles.css";


export const onClientEntry = () => {
    setTimeout(() => {
      if (document.getElementById("loader-wrapper")) {
        document.getElementById("loader-wrapper").style.display = "flex";
      }
    }, 0);
  };
  
  export const onInitialClientRender = () => {
    setTimeout(() => {
      if (document.getElementById("loader-wrapper")) {
        document.getElementById("loader-wrapper").style.display = "flex";
      }
    }, 0);
  };
  
  export const onRouteUpdate = () => {
    setTimeout(() => {
      if (document.getElementById("loader-wrapper")) {
        document.getElementById("loader-wrapper").style.display = "none";
      }
    }, 3500);
  };
  