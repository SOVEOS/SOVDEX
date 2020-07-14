<template>
    <div>
        <button class="btn btn-sm" :class="[interval == i ? 'btn-primary' : 'btn-link' ]" v-for="i in intervals"
            @click="interval = i">{{i}}</button>
    </div>
</template>


<script>
    export default {
        props: {
            value: {
                type: String,
                default: '4h'
            }
        },
        data: () => ({
            intervals: ['15m', '1h', '4h', '1d']
        }),
        computed: {
            interval: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('input', val)
                }
            }
        }
    }
</script>