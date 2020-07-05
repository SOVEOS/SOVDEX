<template>
    <div>
        <div class="section-title mb0">Host</div>
        <div class="form-group form-action">
            <input class="form-input" v-model="host">
            <span class="material-icons link action" @click="$store.commit('setHost', host)">cached</span>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            host: ''
        }),
        mounted() {
            this.host = this.$store.state.blockchain.host
        },
    }
</script>