<script setup>
import steps from "../steps/steps";
import {onMounted} from "vue";
steps({container: '.gw-progress-tracker', step: '.gw-progress-step', activeClass: 'active', completedClass: 'completed'})
document.addEventListener('before.step.change', function(e) {
  console.log(e.detail.tabID)
})
</script>

<template>
  <ul id="progressbar" class="progressbar gw-progress-tracker">
    <li class="completed gw-progress-step">Step 1</li>
    <li class="active gw-progress-step">Step 2</li>
    <li class="gw-progress-step">Step 3</li>
    <li class="gw-progress-step">Step 4</li>
  </ul>
</template>

<style>
body {counter-reset: step;}
#progressbar li {
  list-style-type: none;
  width: 20%;
  float: left;
  position: relative;
  text-align: center;
}
#progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 60px;
  height: 60px;
  line-height: 60px;
  display: block;
  border-radius: 50%;
  margin: 0 auto 10px auto;
  border: 4px solid #ddd;
  text-align: center;
  background-color: white;
  z-index: 99;
  position: relative;
}

/*progressbar connectors*/
#progressbar li:after {
  content: '';
  width: 100%;
  height: 4px;
  background-color: #ddd;
  position: absolute;
  left: -50%;
  top: 30px;
  z-index: 1; /*put it behind the numbers*/
}
#progressbar li:first-child:after {
  /*connector not needed before the first step*/
  content: none;
}
#progressbar li.completed {
  color: green;
}
#progressbar li.active {
  color: red;
}

#progressbar li.error {
  color: red;
}
/*marking active/completed steps green*/
/*The number of the step and the connector before it = green*/
#progressbar li.completed:before{
  border-color: green;
}

#progressbar li.active:before{
  border-color: red;
}

#progressbar li.completed + li:after {
  background-color: green;
}

.modal-large{width: 80%}
.callout.boxcount {
  border-color: #0097bc;
  background: #eee;
}
.disbaled-div {
  pointer-events:none;
}
</style>
