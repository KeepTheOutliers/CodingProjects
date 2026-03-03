/* ============================================
   France & Spain 2026 — Shared Navigation + Utils
   ============================================ */
(function() {
  'use strict';

  // --- Inject site-wide navigation bar ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var tabs = [
    { href: 'index.html',          label: 'Overview' },
    { href: 'paris.html',          label: 'Paris' },
    { href: 'saint-emilion.html',  label: 'Saint-\u00c9milion' },
    { href: 'lescun.html',         label: 'Lescun' },
    { href: 'san-sebastian.html',  label: 'San Sebasti\u00e1n' },
    { href: 'travel-days.html',    label: 'Travel Days' },
    { href: 'packing.html',        label: 'Packing & Planning' }
  ];

  var navHTML = '<nav class="site-nav"><div class="site-nav-inner">';
  navHTML += '<span class="nav-title">France &amp; Spain 2026</span>';
  tabs.forEach(function(tab) {
    var active = (currentPage === tab.href) ? ' active' : '';
    navHTML += '<a href="' + tab.href + '" class="' + active + '">' + tab.label + '</a>';
  });
  navHTML += '</div></nav>';

  // Insert at top of body
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // --- Collapsible time-blocks (shared across all pages) ---
  document.querySelectorAll('.timeline .time-block').forEach(function(block) {
    var timeLabel = block.querySelector('.time-label');
    if (!timeLabel) return;

    var sumHTML = '';
    var bodyHTML = '';
    var title = '';

    Array.from(block.childNodes).forEach(function(node) {
      if (node.nodeType === 3) { sumHTML += node.textContent; return; }
      if (!node.tagName) return;
      var tag = node.tagName.toLowerCase();
      if (tag === 'span') {
        sumHTML += node.outerHTML + ' ';
      } else {
        if (!title && (tag === 'p' || tag === 'ul')) {
          if (block.dataset.title) {
            title = block.dataset.title;
          } else {
            var strong = node.querySelector && node.querySelector('strong');
            if (strong) {
              title = strong.textContent.replace(/\.\s*$/, '');
            } else {
              var txt = node.textContent.trim();
              if (txt.length > 50) txt = txt.substring(0, 47) + '\u2026';
              title = txt;
            }
          }
        }
        bodyHTML += node.outerHTML;
      }
    });

    if (!bodyHTML.trim()) return;

    if (title) {
      sumHTML += ' <span style="font-weight:600;color:var(--warm);font-size:0.92em;">' + title + '</span>';
    }

    var details = document.createElement('details');
    details.className = block.className;
    details.innerHTML = '<summary>' + sumHTML.trim() + '</summary><div class="tb-body">' + bodyHTML + '</div>';
    block.parentNode.replaceChild(details, block);
  });
})();
