<template>
    <svg style="height: 10px; width: 100%; margin-top: 1rem;">
        <rect id='rect1' x="0" y="0" width="9%" height="10" :fill='color' style="border-radius: 5px 0 0 5px;" />
        <rect id='rect2' x="10%" y="0" width="9%" height="10" :fill='color' />
        <rect id='rect3' x="20%" y="0" width="9%" height="10" :fill='color' />
        <rect id='rect4' x="30%" y="0" width="9%" height="10" :fill='color' />
        <rect id='rect5' x="40%" y="0" width="9%" height="10" :fill='color' />
        <rect id='rect6' x="50%" y="0" width="9%" height="10" :fill='color' />
        <rect id='rect7' x="60%" y="0" width="9%" height="10" :fill='color' />
        <rect id='rect8' x="70%" y="0" width="9%" height="10" :fill='color' />
        <rect id='rect9' x="80%" y="0" width="9%" height="10" :fill='color' />
        <rect id='rect10' x="90%" y="0" width="9%" height="10" :fill='color' />
    </svg>
</template>

<script>
    export default {
        props: ['isAuto'],
        data: () => ({
            color: 'rgba(255,255,255,.1)',
            count: 0
        }),
        mounted() {
            this.$bus.$on('tick', () => {
                if (this.isAuto) this.tick()
            })
        },
        methods: {
            tick() {
                this.count += 1
                this.count = (this.count <= 11) ? this.count : 1

                if (this.count <= 10) {
                    document.getElementById('rect' + this.count).setAttribute('fill', "#fff")
                }

                if (this.count >= 2) {
                    document.getElementById('rect' + (this.count - 1)).setAttribute('fill', this.color)

                }
            }
        }
    }
</script>