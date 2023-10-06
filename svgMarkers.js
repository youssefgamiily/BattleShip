const markers = {
    targetDamaged: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <!-- Water Animation -->
    <rect x="0" y="20" width="40" height="20" fill="#0099cc">
      <animate attributeName="y" from="20" to="22" dur="1s" repeatCount="indefinite" />
    </rect>
  
    <!-- Sailboat Body -->
    <g transform="rotate(-15, 20, 20)">
      <path d="M8 20 L20 10 L32 20 Z" fill="#8B4513" stroke="#000" stroke-width="1" />
      <path d="M16 10 L16 18 Q16 20, 18 20 T20 18 L20 10 Z" fill="#8B4513" stroke="#000" stroke-width="1" />
  
      <!-- Sail -->
      <path d="M18 10 Q18 5, 20 10 T22 10" fill="#fff" stroke="#000" stroke-width="1" />
    </g>
  
    <!-- Waves Animation -->
    <path d="M0 24 Q5 25, 10 24 T20 25 T30 24 T40 25" fill="#0099cc">
      <animate attributeName="d" from="M0 24 Q5 25, 10 24 T20 25 T30 24 T40 25"
        to="M0 24 Q5 26, 10 24 T20 26 T30 24 T40 26"
        dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
  
  `,
    tagetSunk: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <!-- Bomb Body -->
    <circle cx="20" cy="20" r="12" fill="#333" stroke="#000" stroke-width="1" />
    <!-- Fuse -->
    <line x1="20" y1="8" x2="20" y2="14" stroke="#000" stroke-width="1" />
    <!-- Smoke -->
    <circle cx="18" cy="8" r="4" fill="#ccc">
      <animate attributeName="r" from="4" to="10" dur="1s" begin="0s" repeatCount="indefinite" />
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite" />
    </circle>
    <circle cx="22" cy="9" r="5" fill="#ccc">
      <animate attributeName="r" from="5" to="15" dur="1s" begin="0s" repeatCount="indefinite" />
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite" />
    </circle>
  </svg>  
`,
targetMissed: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
<circle cx="25" cy="25" r="20" fill="#00aaff" />
<circle cx="30" cy="30" r="15" fill="#0099cc" />
<circle cx="35" cy="35" r="10" fill="#0088dd" />
</svg>
`
}

export {markers}