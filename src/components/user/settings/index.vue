<template>
    <modal :name="'settings'" :_class="'modal-sm'" :event="'settings'">
        <div slot="body">
            <rent class="mb" />
            <host />
        </div>
    </modal>
</template>

<script>
    import rent from './rent.vue'
    import host from './host.vue'

    export default {
        components: {
            rent,
            host,
        }
    }
</script>