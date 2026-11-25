const THREE_SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js';
const THREE_SCRIPT_SELECTOR = 'script[data-shared-three-engine]';

export function loadThree() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(new Error('Three.js requires a browser environment.'));
  }
  if (window.THREE?.REVISION === '160') return Promise.resolve(window.THREE);

  return new Promise((resolve, reject) => {
    let script = document.querySelector(THREE_SCRIPT_SELECTOR);
    const finish = () => {
      if (window.THREE?.REVISION === '160') resolve(window.THREE);
      else reject(new Error('The shared Three.js engine could not be initialised.'));
    };
    const fail = () => reject(new Error('The shared Three.js engine could not be loaded.'));

    if (!script) {
      script = document.createElement('script');
      script.src = THREE_SCRIPT_URL;
      script.async = true;
      script.dataset.sharedThreeEngine = 'true';
      script.addEventListener('load', () => {
        script.dataset.loaded = 'true';
        finish();
      }, { once: true });
      script.addEventListener('error', fail, { once: true });
      document.head.appendChild(script);
      return;
    }

    if (script.dataset.loaded === 'true') {
      finish();
      return;
    }
    script.addEventListener('load', finish, { once: true });
    script.addEventListener('error', fail, { once: true });
  });
}
