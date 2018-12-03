<template>
	<div class="progress">
		<p>Quotes Saved</p>
		<div class="outbar">
			<div class="inbar"></div>
			<span>{{this.quotes.length}} / 30</span>
		</div>
	</div>
</template>

<script>
	import {Bus} from "../../main"

	export default{
		data: ()=>{
			return{
				quotes: []
			}
		},
		created(){
			Bus.$on("renewQuote", list =>{
				this.quotes = list
			})
		},
		activated(){
			document.querySelector(".inbar").style.width = `${this.quotes.length / 30 * 97.5}%`
		},
		watch: {
			quotes: function(){
				if(document.querySelector(".inbar")){
					document.querySelector(".inbar").style.width = `${this.quotes.length / 30 * 97.5}%`
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
	*
		position: relative
		// border: solid 1px black

	p
		top: -10px 
		font-size: 25px 
		font-family: "Maven Pro"
		color: rgba(black, 0.5)
		display: inline-block

	.outbar 
		display: inline-block
		left: 20px 
		width: 80%
		background-color: white
		border-radius: 50px 
		height: 30px

		.inbar
			transition-duration: 0.5s
			left: 1.25%
			top: 50%
			transform: translateY(-50%)
			background-color: #AEE5D8
			border-radius: 50px 
			width: 0%
			height: 18px 
		span
			position: absolute
			color: rgba(black, 0.5)
			font-family: "Maven Pro"
			font-size: 15px 
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
	.progress
		position: absolute
		height: 70px 
		width: 80%
		top: 5%
		left: 15%
		// background-color: rgba(white,0.7)
</style>