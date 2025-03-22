<template>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="55.82 51.674 386.672 314.323">
  <path ref ="path1" :style=" {fill: color1}" d="M 60 60 L 250 178.5 L 440 60 L 360 60 L 250 127.5 L 140 60 L 60 60 Z"/>
  <path ref ="path2" :style=" {fill: color2}" d="M 60 150 L 250 268.5 L 440 150 L 360 150 L 250 217.5 L 140 150 L 60 150 Z"/>
  <path ref ="path3" :style=" {fill: color3}" d="M 60 240 L 250 358.5 L 440 240 L 360 240 L 250 307.5 L 140 240 L 60 240 Z"/>
</svg>
</template>

<script>
export default {
  name: 'DownArrow',
  props: {
    color1: {
      type: String,
        default: '#000000'
      },
    color2: {
      type: String,
      default: 'rgb(100, 100, 100)'
      },
    color3: {
      type: String,
      default: 'rgb(206, 201, 201)'
      }
  }
}
  
</script>