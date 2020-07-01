<template>
    <div>
        <div class="section-title">Rent</div>
        <div class="form-group">
            <input type="number" min="0" class="form-input" v-model="quantity">
            <label>SOV quantity</label>
        </div>
        <div class="columns">
            <div class="column col-4">
                <button class="btn btn-primary btn-sm btn-block" @click="submit('Rent CPU')"
                    :disabled="$v.quantity.$invalid">Rent CPU</button>
            </div>
            <div class="column col-4">
                <button class="btn btn-primary btn-sm btn-block" @click="submit('Rent NET')"
                    :disabled="$v.quantity.$invalid">Rent NET</button>
            </div>
            <div class="column col-4">
                <button class="btn btn-primary btn-sm btn-block" @click="submit('Buy RAM')"
                    :disabled="$v.quantity.$invalid">Rent RAM</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { required, between } from "vuelidate/lib/validators"

    export default {
        data: () => ({
            quantity: 0
        }),
        computed: mapState({
            eos: state => state.blockchain.eos,
            scatter: state => state.blockchain.scatter,
        }),
        validations() {
            return {
                quantity: {
                    required,
                    between: between(1, 7770000),
                },
            }
        },
        methods: {
            submit(operation) {
                if (confirm(`${operation} with ${this.quantity} SOV?`))
                    this.eos.transaction({
                        actions: [{
                            account: 'sovmintofeos',
                            name: 'transfer',
                            authorization: [{
                                actor: this.scatter.name,
                                permission: "active"
                            }],
                            data: {
                                "from": this.scatter.name,
                                "to": 'sovresources',
                                "quantity": this.$options.filters.eosAmountFormat(this.quantity, 'SOV'),
                                "memo": operation
                            }

                        }]
                    }).then(() => {
                        this.$notice.success(operation)
                    }).catch(error => {
                        console.error(`[rent | ${operation}]`, error)
                        this.$notice.error(`Rent "${operation}" error`)
                    })
            },
        }
    }
</script>