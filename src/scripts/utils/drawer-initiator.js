const DrawerInitiator = {
  init({ drawertoogle, drawernavigation, content }) {
    drawertoogle.addEventListener("click", (event) => {
      this._toggleDrawer(event, drawernavigation, drawertoogle);
    });

    content.addEventListener("click", (event) => {
      this._closeDrawer(event, drawernavigation, drawertoogle);
    });
  },

  _toggleDrawer(event, drawernavigation, drawertoogle) {
    event.stopPropagation();
    drawernavigation.classList.toggle("open");
    drawertoogle.classList.toggle("open");
  },

  _closeDrawer(event, drawernavigation, drawertoogle) {
    event.stopPropagation();
    drawernavigation.classList.remove("open");
    drawertoogle.classList.remove("open");
  },
};

export default DrawerInitiator;
