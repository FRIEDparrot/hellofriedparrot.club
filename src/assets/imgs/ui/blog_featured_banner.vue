<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="213.64 207.115 55.376 54.189"
  >
    <polygon
      :fill="color"
      :stroke="strokeColor"
      style="stroke-width: 0px"
      points="218.5780029296875 207.33599853515625 268.7090148925781 258.385986328125 268.6 233.4 243.60000610351562 207.3000030517578"
    />
    <path
      :fill="color"
      :stroke="strokeColor"
      style="stroke-width: 0.5px"
      d="M 218.558 207.668 L 214.495 210.824 L 221.653 210.841 L 218.558 207.668 Z"
    />
    <polygon
      :fill="color"
      :stroke="strokeColor"
      style="
        stroke-width: 0.5px;
        transform-box: fill-box;
        transform-origin: 50% 50%;
      "
      points="267.116 256.311 263.907 259.484 269.559 259.501"
      transform="matrix(0, 1, -1, 0, 0, 0)"
    />
    <line
      :fill="color"
      :stroke="strokeColor"
      style="stroke-width: 0.5px"
      x1="221.571"
      y1="210.752"
      x2="265.214"
      y2="255.18"
    />
    <line
      :fill="color"
      :stroke="strokeColor"
      style="stroke-width: 0.5px"
      x1="243.85"
      y1="207.279"
      x2="268.541"
      y2="233.454"
    />
    <line
      :fill="color"
      :stroke="strokeColor"
      style="
        stroke-width: 0.5px;
        transform-box: fill-box;
        transform-origin: 50% 50%;
      "
      x1="268.612"
      y1="258.342"
      x2="268.619"
      y2="233.456"
      transform="matrix(-1, 0, 0, -1, 0.00003, 0.000001)"
    />
    <line
      :fill="color"
      :stroke="strokeColor"
      style="stroke-width: 0.5px; transform-origin: 231.311px 207.484px"
      x1="231.22"
      y1="194.797"
      x2="231.432"
      y2="220.171"
      transform="matrix(0, 1, -1, 0, 0.000002, 0.000012)"
    />
  </svg>
</template>

<script>
export default {
  name: 'BlogFeaturedBanner',
  props: {
    color: {
      type: String,
      default: 'yellow',
    },
    strokeColor: {
      type: String,
      default: 'lightgray',
    },
  },
};
</script>
