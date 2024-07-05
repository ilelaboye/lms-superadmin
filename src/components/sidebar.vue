<template>
  <!-- [ Sidebar Menu ] start -->
  <nav class="pc-sidebar">
    <div class="navbar-wrapper">
      <div class="m-header">
        <div class="b-brand d-flex justify-content-start align-items-center">
          <img
            src="@/assets/images/logo.png"
            class="img-fluid logo-lg me-4"
            alt="logo"
            style="width: 40px; height: 40px"
          />
          <h5>ADMIN</h5>
        </div>
      </div>
      <div class="navbar-content">
        <div class="card pc-user-card">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <img
                  src="@/assets/images/user/avatar-1.jpg"
                  alt="user-image"
                  class="user-avtar wid-45 rounded-circle"
                />
              </div>
              <div class="flex-grow-1 ms-3 me-2">
                <!-- <h6 class="mb-0">Daniel Balogun</h6> -->
                <small>Administrator</small>
              </div>
            </div>
          </div>
        </div>

        <ul class="pc-navbar">
          <li class="pc-item pc-hasmenu">
            <a href="/dashboard" class="pc-link">
              <span class="pc-micon">
                <i class="ti ti-layout-grid pc-icon"></i>
              </span>
              <span class="pc-mtext">Dashboard</span>
            </a>
          </li>
          <li class="pc-item pc-hasmenu">
            <a href="/students" class="pc-link">
              <span class="pc-micon">
                <i class="ti ti-user pc-icon"></i>
              </span>
              <span class="pc-mtext">Students</span>
            </a>
          </li>

          <li class="pc-item">
            <a href="/teachers" class="pc-link">
              <span
                class="pc-micon icon-svg-secondary"
                style="border-radius: 5px"
              >
                <i class="ti ti-car pc-icon"></i>
              </span>
              <span class="pc-mtext">Teachers</span>
            </a>
          </li>
          <li class="pc-item">
            <a href="/chats" class="pc-link">
              <span
                class="pc-micon icon-svg-secondary"
                style="border-radius: 5px"
              >
                <i class="ti ti-car pc-icon"></i>
              </span>
              <span class="pc-mtext">Chat</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- [ Sidebar Menu ] end -->
</template>

<script lang="ts">
  export default {
    name: "Sidebar",
  };
</script>
