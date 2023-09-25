const markers = {
    targetDamaged: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <!-- Water Animation -->
    <rect x="0" y="100" width="200" height="100" fill="#0099cc">
      <animate attributeName="y" from="100" to="105" dur="1s" repeatCount="indefinite" />
    </rect>
  
    <!-- Sailboat Body -->
    <g transform="rotate(-15, 100, 100)">
      <path d="M40 100 L100 50 L160 100 Z" fill="#8B4513" stroke="#000" stroke-width="2" />
      <path d="M80 50 L80 90 Q80 100, 90 100 T100 90 L100 50 Z" fill="#8B4513" stroke="#000" stroke-width="2" />
  
      <!-- Sail -->
      <path d="M90 50 Q90 20, 100 50 T110 50" fill="#fff" stroke="#000" stroke-width="2" />
    </g>
  
    <!-- Waves Animation -->
    <path d="M0 120 Q20 125, 40 120 T80 125 T120 120 T160 125 T200 120" fill="#0099cc">
      <animate attributeName="d" from="M0 120 Q20 125, 40 120 T80 125 T120 120 T160 125 T200 120"
        to="M0 120 Q20 130, 40 120 T80 130 T120 120 T160 130 T200 120"
        dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
  `,
    tagetSunk: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <!-- Bomb Body -->
    <circle cx="50" cy="50" r="30" fill="#333" stroke="#000" stroke-width="2" />
    <!-- Fuse -->
    <line x1="50" y1="20" x2="50" y2="35" stroke="#000" stroke-width="2" />
    <!-- Smoke -->
    <circle cx="45" cy="20" r="8" fill="#ccc">
      <animate attributeName="r" from="8" to="20" dur="1s" begin="0s" repeatCount="indefinite" />
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite" />
    </circle>
    <circle cx="55" cy="22" r="10" fill="#ccc">
      <animate attributeName="r" from="10" to="30" dur="1s" begin="0s" repeatCount="indefinite" />
      <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite" />
    </circle>
  </svg>
  `,
  targetMissed: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <line x1="10" y1="10" x2="30" y2="30" stroke="#FF0000" stroke-width="3" />
  <line x1="10" y1="30" x2="30" y2="10" stroke="#FF0000" stroke-width="3" />
</svg>
`
}

export {markers}