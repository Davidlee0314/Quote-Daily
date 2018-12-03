<template>
	<div class="welcome">
		<div class = "time">{{time}}</div>
		<p>Inspiration for today:</p>
		<p class="quote">" {{quoteNow}}"</p>
		<button @click="changeStatus"><p>start</p></button>
	</div>
</template>

<script>
	import {Bus} from "../../main"

	export default{
		data: function(){
			return{
				quotes: [],
				quoteNow: "Explore some quotes!!!",
				d: new Date(),
                time: "",
                interval: undefined
			}
		},
		created(){
			this.d = new Date()

			Bus.$on("renewQuote", list =>{
				this.quotes = list
			})

			setInterval(function(){
                this.d = new Date()
            }.bind(this), 1000)            
		},
		props: ["changeStatus"],
        watch: {
            d: function () {
                var minutes = this.d.getMinutes().toString().length == 1 ? "0" + this.d.getMinutes() : this.d.getMinutes(),
                    hours = this.d.getHours().toString().length == 1 ? "0" + this.d.getHours() : this.d.getHours(),
                    seconds = this.d.getSeconds().toString().length == 1 ? "0" + this.d.getSeconds() : this.d.getSeconds(),
                    ampm = this.d.getHours() >= 12 ? 'PM' : 'AM',
                    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
                    //days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+
                this.time = months[this.d.getMonth()]+' '+ this.d.getDate() + " - " + hours + ' : ' + minutes + " : " + seconds + " " + ampm 
            },
            "quotes.length": function(){
            	if(this.quotes.length > 0 && !this.interval){

            		this.quoteNow = this.quotes[0]

					this.interval = setInterval(function(){
						this.quotes = this.quotes.slice(1, this.quotes.length)
						this.quoteNow = this.quotes[0]
						Bus.$emit("renewQuote", this.quotes)
	            	}.bind(this), 86400000)

            	}else if(this.quotes.length > 0 && this.interval){

            	}else if(this.quotes.length === 0){

        			this.quoteNow = "Explore some quotes!!!"
            		
            		if(this.interval){
            			clearInterval(this.interval)
            			this.interval = undefined
            		}
            	}
            }
        }
	}
</script>

<style lang="sass" scoped>
	.welcome
		margin: 0px
		top: 70px 
		background-color: rgba(white, 0.3)
		background-size: cover
		background-size: 100% 100%
		width: 100%
		height: 60% 
		padding: 10px 0px 
		.time
	        display: inline-block
	        position: absolute
	        left: 50%
	        transform: translateX(-50%)
	        top: -23%
	        color: rgba(black, 0.2)
	        font-size: 40px 
		p
			font-weight: bold
			font-family: "Maven pro"
			color: white
			text-align: center
			font-size: 25px 
			letter-spacing: 1px 
		.quote
			font-style: italic
			text-align: center
			font-size: 35px 
			margin-top: 40px 

		button
			margin-top: 80px 
			position: absolute
			left: 50%
			top: 50%
			transform: translate(-50%, -50%)
			padding: 0px 50px 
			background-color: rgba(#f4f4f4, 1)
			border: none
			border-radius: 10px 
			cursor: pointer 
			p
				position: relative
				color: #AEE5D8
				font-weight: bold
				font-size: 30px
				font-family: "Maven Pro"
				height: 0px
				bottom: 20px 
			&:focus
				outline: none
			&:hover
				background-color: rgba(#ffffff, 1)
				transform: translate(-50% ,-52%)
			&:active
				transform: translate(-50%, -48%)
</style>