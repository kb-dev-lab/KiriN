class BasicDrawer {
  getControls() {
    return [];
  }

  draw() {
    throw new Error("No draw() implemented");
  }

  init() {
    throw new Error("No init() implemented");
  }
}

const Drawers = [];
