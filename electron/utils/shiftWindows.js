// Utility to shift both overlay windows as a locked group, never growing or overlapping
// This function ensures the windows never grow in width, never overlap, and always stay fully on screen.
function shiftWindows(direction, mainWin, responseWin) {
  if (!mainWin || !responseWin) return;
  if (!mainWin.isVisible() && !responseWin.isVisible()) return;
  const shiftAmount = 50;

  // Get current positions and sizes
  const [mainX, mainY] = mainWin.getPosition();
  const [respX, respY] = responseWin.getPosition();
  const mainWidth = mainWin.getBounds().width;
  const respWidth = responseWin.getBounds().width;
  let delta = direction === 'left' ? -shiftAmount : shiftAmount;

  // Always keep the windows in their current relative order
  let leftWin, rightWin, leftX, rightX, leftWidth, rightWidth;
  if (mainX <= respX) {
    leftWin = mainWin; leftX = mainX; leftWidth = mainWidth;
    rightWin = responseWin; rightX = respX; rightWidth = respWidth;
  } else {
    leftWin = responseWin; leftX = respX; leftWidth = respWidth;
    rightWin = mainWin; rightX = mainX; rightWidth = mainWidth;
  }

  // Get screen bounds
  const { width: screenWidth } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  // Calculate group width as the distance from left edge of leftWin to right edge of rightWin
  const groupWidth = (rightX + rightWidth) - leftX;

  // Only move if both windows will remain fully visible after the move
  const nextMainLeft = mainX + delta;
  const nextMainRight = mainX + mainWidth + delta;
  const nextRespLeft = respX + delta;
  const nextRespRight = respX + respWidth + delta;
  // If either window would go off screen, clamp delta so the group stops flush with the edge
  if (delta < 0) { // moving left
    const minLeft = Math.min(nextMainLeft, nextRespLeft);
    if (minLeft < 0) {
      delta -= minLeft; // so the leftmost window stops at 0
    }
  } else if (delta > 0) { // moving right
    const maxRight = Math.max(nextMainRight, nextRespRight);
    if (maxRight > screenWidth) {
      delta -= (maxRight - screenWidth); // so the rightmost window stops at screen edge
    }
  }
  // After clamping, check again: if movement is now zero, do nothing
  if (delta === 0) return;
  // Move both windows by the same delta, always preserving their width and spacing
  mainWin.setPosition(mainX + delta, mainY);
  responseWin.setPosition(respX + delta, respY);
}
module.exports = { shiftWindows };
