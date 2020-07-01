<template>
    <div class="flex-centered height100" v-else>
        <div class="container grid-xs">
            <div class="section">
                <div class="section-item section-item-filled">
                    <ol>
                        <li :class="{disabled: isConnected}" :style="isConnected ? 'text-decoration: line-through;'  : 'text-decoration: none;'">Login in <a class="text-primary" href="https://www.tokenpocket.pro/">Token Pocket</a> DApp</li>
                        <li>Press button <button @click="$bus.$emit('signin')" class="btn btn-primary btn-sm ml05" :disabled="!isConnected">Sign in</button></li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            isConnected(){
                return this.$store.getters.isConnected
            }
        },
    }
</script>