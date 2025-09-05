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
  // Move both windows as a locked group, preserving spacing and size
  // Find leftmost and rightmost edges of the group
  const groupLeft = Math.min(mainX, respX);
  const groupRight = Math.max(mainX + mainWidth, respX + respWidth);
  // Clamp delta so the group never goes off screen
  let minDelta = -Infinity, maxDelta = Infinity;
  // Left edge cannot go past 0
  minDelta = -groupLeft;
  // Right edge cannot go past screenWidth
  maxDelta = screenWidth - groupRight;
  // Clamp delta
  if (delta < minDelta) delta = minDelta;
  if (delta > maxDelta) delta = maxDelta;
  if (delta === 0) return;
  // Move both windows by the same delta, always preserving their width and spacing
  // Always use original width/height to prevent any stretching
  const origMainWidth = mainWin._originalWidth || mainWidth;
  const origMainHeight = mainWin._originalHeight || mainWin.getBounds().height;
  const origRespWidth = responseWin._originalWidth || respWidth;
  const origRespHeight = responseWin._originalHeight || responseWin.getBounds().height;
  mainWin.setBounds({
    x: mainX + delta,
    y: mainY,
    width: origMainWidth,
    height: origMainHeight
  });
  responseWin.setBounds({
    x: respX + delta,
    y: respY,
    width: origRespWidth,
    height: origRespHeight
  });
}
module.exports = { shiftWindows };
