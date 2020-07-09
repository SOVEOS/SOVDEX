export default {
    data: () => ({
        polling: null,
    }),
    computed: {
        isConnected() {
            return this.$store.state.blockchain.isConnected
        },
    },
    mounted() {
        // auto check connection to DApp
        this.polling = setInterval(() => {
            if (!this.isConnected) this.init()
        }, 5000)
    },
    beforeDestroy() {
        if (this.polling) clearInterval(this.polling)
    },
}