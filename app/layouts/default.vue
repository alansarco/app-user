<template>
    <NuxtHead>
      <title>Barangay App</title>
    </NuxtHead>
    <div class="h-screen w-screen md:px-40 p-4 grid custom-grid bg-blue-50">

        <header class="bg-blue-500 p-4 flex-row flex items-center shadow">
            <span class="flex-grow font-bold text-indigo-50">Barangay Name</span>
            <ul class="flex flex-row items-center flex-grow space-x-6">
                <li class="transition-all duration-300 hover:transform hover:scale-125"><NuxtLink to="/profile" class="text-3xl text-indigo-50"><i class="bi bi-person-fill"></i></NuxtLink></li>
                <li class="transition-all duration-300 hover:transform hover:scale-125"><NuxtLink to="/cart" class="text-3xl text-indigo-50"><i class="bi bi-cart-fill"></i></NuxtLink></li>
                <li class="transition-all duration-300 hover:transform hover:scale-125"><NuxtLink to="/home" class="text-3xl text-indigo-50"><i class="bi bi-house-door-fill"></i></NuxtLink></li>
            </ul>
            <span class="font-light text-indigo-50"><NuxtLink to="/profile" class="text-indigo-50">Username</NuxtLink></span>
        </header>

        <main class="bg-white my-3 shadow p-4 flex flex-col relative">
            <div v-show="show" class="absolute max-h-full top-0 left-0 bg-blue-300">
                Loading...
            </div>

            <slot /> <!-- this is literally the pages -->
        </main>

        <footer class="bg-blue-600"></footer>

    </div>
    
</template>

<script setup>
    const nuxtApp = useNuxtApp();
    const show = ref(false);

    addRouteMiddleware('global-loader', () => {
        show.value = true
    }, {
        global: true
    })

    nuxtApp.hook('page:finish', () => { show.value = false; })
</script>