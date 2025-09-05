// Utility functions for use across the Electron app

// Returns true if the given window exists and is visible
function isWindowVisible(win) {
  return win && win.isVisible();
}

// Export all utility functions here
module.exports = {
  isWindowVisible,
};
