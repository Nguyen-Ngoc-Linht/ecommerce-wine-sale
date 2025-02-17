<template>
  <div v-if="isVisible" class="popup-container">
    <div class="popup-content">
      <h3>Notifications</h3>
      <ul>
        <li v-for="(notification, index) in notifications" :key="index">
          {{ notification.message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notifications: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isVisible: false // Controls visibility of the popup
    };
  },
  methods: {
    show() {
      this.isVisible = true; // Show the popup
    },
    hide() {
      this.isVisible = false; // Hide the popup
    }
  }
};
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 20%;
  right: 20%;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.popup-content {
  max-height: 300px;
  overflow-y: auto;
}

.popup-content ul {
  list-style-type: none;
  padding: 0;
}

.popup-content li {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}
</style>
