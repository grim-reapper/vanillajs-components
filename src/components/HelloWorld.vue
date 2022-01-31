<script setup>
import '../assets/styles.css'
import confirm from "../dialog/confirm";
import overlay from "../overlay/overlay";
import toast from "../toast/toast";
const showToast = () => {
  toast('success',  'You have made it', 'Success!', false)
  // toast('error',  'Something went wrong', 'Error!')
  // toast('info',  'New updates available', 'Info!')
  // toast('warning',  'You are running out of memory', 'Warning!')
}
const con = () => {
  confirm({title: 'Are you sure', message: 'This is test message', confirmText: 'Confirm', cancelText: 'cancel', vibrate: true, playSound: true})
}
const overlay = () => {
  overlay('#gw-overlay2')
}
</script>

<template>
  <button @click="con">show toast</button>
  <button @click="showToast">show toast</button>
<button @click="overlay">Click</button>
    <div class="gw-overlay-box" data-gw-overlay="overlay-box"></div>
    <div class="gw-overlay-wrapper" id="gw-overlay2" style="display: none">
      <div class="gw-overlay-inner">
        <div class="gw-close-circle-icon gw-close-icon" data-gw-close="gw-close"></div>
        <div class="gw-overlay-content">
          <h1>Modal title</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cumque in incidunt ipsum, odit officiis saepe ullam? Expedita, neque, ratione. Commodi magnam pariatur quisquam quos sunt suscipit tempora ut velit. </p>
        </div>
      </div>
    </div>
</template>

<style>

















</style>
