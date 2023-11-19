<template>

    <div class="absolute top-0 left-0 h-full w-full bg-slate-500 p-4">
        <span>{{ text.name }}</span>
    </div>

</template>

<script>
    export default{
        props: ['text']
    };
</script>