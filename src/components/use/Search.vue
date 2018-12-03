<template>
	<div class="search">
		
		<p>Enter a quote you like: </p>

		<input 
		v-model="quote" 
		class="searchInput" 
		@focus="isShow = !isShow" 
		@focusout="isShow = !isShow" 
		type="text"
		v-on:keyup.13 = "AddQuote">
		<transition name = "move" v-on:after-enter = "show">
			<div v-if="isShow" class="line"></div>
		</transition>

		<button @click = "AddQuote"><span>Enter</span></button>
	</div>
</template>
	
<script>
	import {Bus} from "../../main"

	export default{
		data: ()=>{
			return {
				quote: "",
				quotes: [],
				isShow: false
			}
		},
		created(){
			Bus.$on("renewQuote", list =>{
				this.quotes = list
			})
		},
		methods:{
			show(){
				document.querySelector(".line").style.width = "87%"
			},
			AddQuote(){
				document.querySelector(".searchInput").value = ""

				
				if(this.quotes.length < 30 && this.quote !== ""){
					this.quotes.push(this.quote)
				}else if(this.quotes.length >= 30){
					alert("The storage is full!")
				}else if(this.quote === ""){
					alert("Please enter something!")
				}
				this.quote = ""

				Bus.$emit("renewQuote", this.quotes)
			}
		}
	}
</script>

<style lang="sass" scoped>
	*
		position: relative
		// border: solid 1px black

	p
		top: 10px 
		left: 30px 
		font-size: 15px 
		font-family: "Maven Pro"
		color: rgba(black, 0.5)

	.search
		left: 50px 
		top: 120px
		height: 205px 
		width: 30%	
		// background-color: white

		.searchInput
			top: 50% 
			left: 50%
			transform: translate(-50% ,-50%)
			height: 50px 
			padding: 20px 50px 
			font-family: "Maven Pro"
			font-size: 20px 
			border: none
			background-color: transparent
			border-bottom: solid 1px rgba(black, 0.1)
			color: rgba(black, 0.9)
			padding-bottom: 0px
			padding-left: 5px 
			&:focus
				outline: none
				// border-bottom: solid 2px #75DBCD
		.line
			border-radius: 50px 
			position: absolute
			left: 7%
			top: 27.5%
			width: 0%
			height: 2px 
			background-color: #6dcec1
			animation-fill-mode: forwards
			// animation: move 0.5s 1

	button
		position: relative
		top: -10px
		left: 250px  
		padding: 8px 16px 
		background-color: rgba(#f4f4f4, 1)
		border: none
		border-radius: 10px 
		cursor: pointer 
		span
			position: relative
			color: #AEE5D8
			font-weight: bold
			font-size: 20px
			font-family: "Maven Pro"
		&:focus
			outline: none
		&:hover
			background-color: rgba(#ffffff, 1)
			transform: translateY(-2%)
		&:active
			transform: translateY(2%)

	.move-enter-active
		animation: move 0.5s 
	.move-leave-active
		animation: move 0.5s reverse
	@keyframes move
		0%
			width: 0%
		100%
			width: 87%

</style>