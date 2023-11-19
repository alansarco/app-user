<script setup>
    //fetch announcements 
    const {data: items} = await useFetch('http://localhost:4000/announcement/getAnnouncement', {
        transform: (_item) => _item.data,
    });
</script>

<template>

    <div class="flex flex-col flex-grow relative">

        
        <header class="font-bold flex-grow-0 flex justify-center items-center">
            <span>Announcements</span>
        </header>
        
        <main class="flex-grow mt-4 h-0 flex flex-col overflow-scroll items-center">
            <div class="bg-indigo-50 p-4 md:w-9/12 w-full shadow mb-4" v-for="item in items">
                <header class="flex flex-col">
                    <span class="text-2xl font-bold">{{item.title}}</span>
                    <i class="not-italic text-gray-500">{{ item.created_by }}</i>
                </header>
                <p class="mb-4">{{ item.description }}</p>
                <footer class="border-t-blue-400 border-solid border rounded-none py-2">
                    <i class="bi bi-chat-left-text-fill flex flex-row items-center not-italic text-blue-400"><span class="ml-2 cursor-pointer hover:text-green-400">Comments</span></i>
                </footer>
            </div>
        </main>
    </div>

</template>

