<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 215 250"
    :style="{ stroke: color, fill: color }"
  >
    <path style="transform-box: fill-box; transform-origin: 50% 50%;" d="M 0.014 0.012 L 90.01 0.401 L 215.014 124.987 L 90.038 250.001 L 0.042 250.012 L 125.021 124.997 L 0.014 0.012 Z" transform="matrix(1, 0.000113, -0.000113, 1, 0, 0)"/>
  </svg>
</template>

<!--set the exported color--->
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#000000' //default color is black
    }
  }
}
</script>