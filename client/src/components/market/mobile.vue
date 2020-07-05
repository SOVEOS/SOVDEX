<template>
    <div class="content">
        <div class="content-header"></div>
        <div class="content-body">
            <chart :symbol="symbol" />
        </div>
        <div class="content-footer">
            <markets />
            <createOrder :symbol="symbol" />
        </div>
    </div>
</template>

<script>
    import chart from './chart'
    import markets from './modules/markets'

    import createOrder from './modules/createOrder'

    export default {
        props: ['symbol'],
        components: {
            chart,
            markets,

            createOrder,
        }
    }
</script>