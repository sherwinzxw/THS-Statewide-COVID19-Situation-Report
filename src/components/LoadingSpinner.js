import * as React from 'react'

const LoadingSpinner = props => {
  return <svg 
    style={{
      margin: 'auto',
      background: '#fff', 
      display: 'block', 
      width: '200', 
      height: '200', 
    }} 
    viewBox="0 0 100 100" 
    preserveAspectRatio="xMidYMid"
  >
    <circle cx="75" cy="50" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.9166666666666666s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.9166666666666666s"></animate>
    </circle><circle cx="71.65063509461098" cy="62.5" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.8333333333333334s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.8333333333333334s"></animate>
    </circle><circle cx="62.5" cy="71.65063509461096" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.75s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.75s"></animate>
    </circle><circle cx="50" cy="75" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.6666666666666666s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.6666666666666666s"></animate>
    </circle><circle cx="37.50000000000001" cy="71.65063509461098" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.5833333333333334s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.5833333333333334s"></animate>
    </circle><circle cx="28.34936490538903" cy="62.5" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.5s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.5s"></animate>
    </circle><circle cx="25" cy="50" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.4166666666666667s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.4166666666666667s"></animate>
    </circle><circle cx="28.34936490538903" cy="37.50000000000001" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.3333333333333333s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.3333333333333333s"></animate>
    </circle><circle cx="37.499999999999986" cy="28.349364905389038" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.25s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.25s"></animate>
    </circle><circle cx="49.99999999999999" cy="25" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.16666666666666666s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.16666666666666666s"></animate>
    </circle><circle cx="62.5" cy="28.349364905389034" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.08333333333333333s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.08333333333333333s"></animate>
    </circle><circle cx="71.65063509461096" cy="37.499999999999986" fill="#ffffff" r="5">
      <animate attributeName="r" values="3;3;5;3;3" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="0s"></animate>
      <animate attributeName="fill" values="#ffffff;#ffffff;#a9b706;#ffffff;#ffffff" repeatCount="indefinite" times="0;0.1;0.2;0.3;1" dur="1s" begin="0s"></animate>
    </circle>
  </svg>
}

export default LoadingSpinner