var page = {
    template: '<ul class="history" >' +
    '<li :class="{ban:current===1}" @click="decrease" ><a href="javascript:void(0)">Page Up</a></li>' +
    '<li v-for="index in pages" @click="goto(index)" :class="{active:current == index}" :key="index">' +
    '<a href="javascript:void(0)" >{{index}}</a>' +
    '</li>' +
    '<li :class="{ban:current===allpage}" @click="increase"><a href="javascript:void(0)" >Page Down</a></li>' +
    '</ul>',
    props: {
        current: {
            type: Number
        },
        allpage: {
            type: Number
        },
        showpage: {
            type: Number
        }
    },
    computed: {
        pages: function () {
            var pag = [];
            if (this.current < this.showpage) { 
                var i = Math.min(this.showpage, this.allpage);
                while (i) {
                    pag.unshift(i--);
                }
            } else { 
                var middle = this.current - Math.floor(this.showpage / 2),
                    i = this.showpage;
                if (middle > (this.allpage - this.showpage)) {
                    middle = (this.allpage - this.showpage) + 1
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag
        }
    },
    methods: {
        increase: function () {
            if (this.current < this.allpage) {
                this.$emit('next');
            }
        },
        decrease: function () {
            if (this.current > 1) {
                this.$emit('prev');
            }
        },
        goto: function (index) {
            if (this.current === index) return;
            this.$emit('goto', index);
        }
    }
};  