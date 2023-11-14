<script setup>
    // fetch announcements 
    const {data: items} = await useFetch('http://localhost:4000/announcement/getAnnouncement', {
        transform: (_item) => _item.data,
    });
</script>

<template>

    <div class="main-container">
        <header>
            <span>Announcements</span>
        </header>
        <main>
            <div class="card" v-for="i in items">
                <section class="card__header">
                    <span>{{ i.title }}</span>
                    <i> - {{ i.created_at }}</i>
                </section>
                <section class="card__body">
                    <p>{{ i.description }}</p>
                </section>
                <section class="card__footer">
                    <i class="bi bi-chat-dots-fill"><span>Comments</span></i>
                </section>
            </div>
        </main>
    </div>

</template>

