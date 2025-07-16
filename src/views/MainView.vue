<template>
    <main
        id="main"
        class="container"
    >
        <ContactView />
    </main>
</template>

<script>
import ContactView from '@/views/ContactView.vue';

export default {
    name: 'MainView',
    components: {
        ContactView,
    },
}
</script>
