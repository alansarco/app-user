<template>
    <NuxtHead>
      <title>Barangay App</title>
    </NuxtHead>
    <div class="body-container">

        <header class="navbar">
            <span>Barangay Name</span>
            <ul>
                <li><NuxtLink to="/profile"><i class="bi bi-person-fill"></i></NuxtLink></li>
                <li><NuxtLink to="/cart"><i class="bi bi-cart-fill"></i></NuxtLink></li>
                <li><NuxtLink to="/home"><i class="bi bi-house-door-fill"></i></NuxtLink></li>
            </ul>
        </header>

        <main class="main">
            <slot /> <!-- this is literally the pages -->
        </main>

        <footer></footer>

    </div>
    
</template>

<script setup>

</script>