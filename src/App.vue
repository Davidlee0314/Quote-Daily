<template>
    <div class="head">
        <h1>Quote Daily</h1>
        
        <keep-alive>
            <appWelcome v-if="show" :changeStatus="changeStatus"></appWelcome>
            <appUse v-else :changeStatus="changeStatus"></appUse>
        </keep-alive>
    </div>

</template>

<script>
    import Welcome from "./components/welcome/Welcome.vue"
    import Appuse from "./components/use/Appuse.vue"
    import {Bus} from "./main"

    export default{
        data: function(){
            return{
                show: true,
            }
        },
        components: {
            "appWelcome": Welcome,
            "appUse": Appuse
        },
        methods: {
            changeStatus(){
                this.show === true ? this.show = false : this.show = true
            }
        }
    }

</script>

<style lang="sass">
    *
        box-sizing: border-box
        user-select: none
    body, html
        width: 100%
        height: 100%
        margin: 0px 
        padding: 0px 
        background-image: linear-gradient(-130deg, #AEE5D8, #75DBCD)
        background-size: auto 100%
</style>

<style lang="sass" scoped>
    *
        // border: solid 1px black
        position: relative

    .head
        width: 100%
        height: 500px

        h1
            margin-top: 10px 
            margin-bottom: 15px 
            left: 50%
            transform: translateX(-50%)
            font-size: 50px 
            letter-spacing: 2px 
            font-family: "Maven Pro"
            color: white
            display: inline-block

</style>
