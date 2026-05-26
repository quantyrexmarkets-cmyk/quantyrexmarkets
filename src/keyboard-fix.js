// Set --vh CSS variable for true viewport height on mobile
// FIXED: Ignores keyboard show/hide events to prevent input focus loss

let baseHeight = window.innerHeight;

const setVh = () => {
  const currentHeight = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;

  // Only update if change is large (rotation/window resize)
  // Ignore small changes (keyboard show/hide ~150-400px)
  const diff = Math.abs(currentHeight - baseHeight);

  // If diff > 500px = real resize (rotation, browser UI change)
  // If diff < 500px = likely keyboard, ignore it
  if (diff > 500 || baseHeight === 0) {
    baseHeight = currentHeight;
    document.documentElement.style.setProperty('--vh', `${currentHeight}px`);
  }
};

// Set initial value
document.documentElement.style.setProperty('--vh', `${baseHeight}px`);

// Only listen to actual window resize, NOT visualViewport
// visualViewport.resize fires for keyboard = causes focus loss
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', () => {
  baseHeight = 0; // force update on rotation
  setTimeout(setVh, 100);
});
