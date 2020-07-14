<template>
    <div class="container container-padding grid-md">
        <div class="columns">
            <div class="column col-6 col-sm-12">
                <balance />
                <dashboard />
            </div>
            <div class="column col-6 col-sm-12">
                <tinterface />
            </div>
        </div>
    </div>
</template>
<script>
    import tinterface from './modules/interface'

    export default {
        components: {
            tinterface,
        }
    }
</script>