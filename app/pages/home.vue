

<template>

    <div class="flex flex-col flex-grow relative">

        <commentCardVue :text="user" v-show="show"/>
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
                    <i class="bi bi-chat-left-text-fill flex flex-row items-center not-italic text-blue-400" @click="handleClick"><span class="ml-2 cursor-pointer hover:text-green-400">Comments</span></i>
                </footer>
            </div>
        </main>
    </div>

</template>


<script setup> 
    //fetch announcements 
    const {data: items} = await useFetch('http://localhost:4000/announcement/getAnnouncement', {
        transform: (_item) => _item.data,
    });
    
    let show = true;
   const handleClick = () => {
      // Check if the clicked element is a div inside the v-for loop
      console.log('clicked');
    }
</script>

