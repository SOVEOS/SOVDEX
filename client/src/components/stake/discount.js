export default {
    data: () => ({
        feeDiscount: 0
    }),
    computed: {
        discount() {
            let discount = 0

            if (this.feeDiscount < 5) discount = 0
            else if (this.feeDiscount <= 10) discount = 5;
            else if (this.feeDiscount < 15) discount = 10;
            else if (this.feeDiscount < 20) discount = 15
            else if (this.feeDiscount < 25) discount = 20
            else if (this.feeDiscount < 30) discount = 25
            else if (this.feeDiscount < 35) discount = 30
            else if (this.feeDiscount < 40) discount = 35
            else if (this.feeDiscount < 45) discount = 40
            else if (this.feeDiscount < 50) discount = 45
            else if (this.feeDiscount < 55) discount - 50
            else if (this.feeDiscount < 60) discount = 55
            else if (this.feeDiscount < 65) discount = 60
            else if (this.feeDiscount < 70) discount = 65
            else if (this.feeDiscount < 75) discount = 70
            else if (this.feeDiscount >= 80) discount = 75

            return discount
        }
    },
    mounted() {
        // this.getFeeDiscount()
    },
    watch: {
        scatter(val) {
            if (val) this.getFeeDiscount()
        },
    },
    methods: {
        async getFeeDiscount() {
            const svxSupply = await this.eos.getTableRows({
                "json": "true", "code": "svxmintofeos", "scope": "SVX", "table": "stat"
            }).then((res) => parseFloat(res.rows[0].supply))

            const svxPower = await this.eos.getTableRows({
                "json": "true", "code": "svxmintofeos", "scope": this.scatter.name, "table": "accounts"
            }).then((res) => parseFloat(res.rows[0].svxpower))

            if (svxSupply && svxPower) {
                this.feeDiscount = (svxPower / svxSupply) * 10000
            }
        }
    }
}