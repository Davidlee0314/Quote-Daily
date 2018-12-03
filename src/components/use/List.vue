<template>
	<div>
		
		<ul class="list">
			<div v-show="overflowLeft" class="circle left" @click="previous"><i class="fas fa-caret-left"></i></div>
			<li 
			class="listItem" 
			v-for = "(quote,index) in tempQuotes" 
			:id ="index" 
			@click="DeleteQuote"
			@mouseover="checkFull"
			@mouseleave="hideFull">
				<p class="truncated">{{quote}}</p>
				<span>X</span>
				<p class="full">{{quote}}</p>
			</li>
			<div v-show="overflowRight" class="circle right" @click="next"><i class="fas fa-caret-right"></i></div>
		</ul>
		
	</div>
</template>

<script>
	import {Bus} from "../../main"	

	export default{
		data: ()=>{
			return{
				quotes: [],
				tempQuotes: [],
				page: 1,
				overflowLeft: false,
				overflowRight: false
			}
		},
		created(){
			Bus.$on("renewQuote", list =>{
				this.quotes = list
				this.renderList
			})
		},
		updated(){
			var text = document.querySelectorAll(".truncated")
			
			if(text){
				for (var i = 0; i < text.length; i++) {
					$clamp(text[i], {clamp: 3})
				}
			}
		},
		computed: {
			renderList: function(){
				if(this.quotes.length > this.page*9){
					this.tempQuotes = this.quotes.slice(this.page*9 - 9, this.page*9)
					this.overflowRight = true
					if(this.page != 1){
						this.overflowLeft = true
					}else{
						this.overflowLeft = false
					}
				}else{
					if(this.quotes.length == 0){
						this.tempQuotes = []
					}else if(this.quotes.length == this.page*9 - 9 && this.quotes.length != 0){
						this.page -= 1
					}
					this.tempQuotes = this.quotes.slice(this.page*9 - 9, this.quotes.length)


					if(this.page == 1){
						this.overflowLeft = false
						this.overflowRight = false
					}else{
						this.overflowLeft = true
						this.overflowRight = false
					}
				}
			}
		},
		methods: {
			DeleteQuote(event){
				const el = event.target.closest(".listItem")
				const index = this.quotes.indexOf(this.tempQuotes[el.id])
				this.quotes.splice(index, 1)

				Bus.$emit("renewQuote", this.quotes)

				this.renderList
			},
			previous(){
				this.page -= 1
				this.renderList
			},
			next(){
				this.page += 1
				this.renderList
			},
			checkFull(event){
				const el = event.target.closest(".truncated")
				
				if(el.textContent.length > 55){
					el.parentNode.style.zIndex = 3
					el.parentNode.childNodes[2].style.display="block"
				}else{
					el.parentNode.style.zIndex = 0
					el.parentNode.childNodes[2].style.display="none"
				}
			},
			hideFull(event){
				const el = event.target.childNodes[2]
				event.target.style.zIndex = 0
				el.style.display="none"
			}
		}
	}
</script>
	
<style lang="sass" scoped>
	*
		position: relatvie
		//border: solid 1px  black 
		// display: inline-block
	.circle
		position: absolute
		height: 200px 
		width: 200px 
		border-radius: 100%
		background-color: rgba(white, 0.5)
		cursor: pointer
		&:hover
			background-color: rgba(white, 0.9)
			// transform: scale(1.001)
			i
				color: #AEE5D8
	.left
		left: -140px 
		bottom: 80px

	.right
		right: -140px
		bottom: 80px

	.fa-caret-left
		position: absolute
		font-size: 50px 
		left: 155px 
		top: 75px
		color: rgba(black, 0.2)
	.fa-caret-right
		position: absolute
		font-size: 50px 
		right: 155px 
		top: 75px
		color: rgba(black, 0.2)
	.list
		overflow: hidden
		border-radius: 10px 
		background-color: rgba(white, 0.5)
		position: absolute
		left: 35%
		top: 18%
		height: 330px 
		width: 60%
		display: flex
		flex-wrap: wrap
		justify-content: flex-start
		align-content: flex-start
		padding: 10px 60px
		.listItem
			vertical-align: middle
			position: relative
			border-radius: 10px 
			margin: 5px 
			list-style: none
			height: 92px 
			width: 31%
			background-color: rgba(white, 0.5)
			cursor: pointer
			padding: 0px 10px
			.truncated
				position: relative
				font-family: "Maven Pro"
				color: rgba(black, 0.9)
				width: 100%
				height: 64%
				display: block
				word-break: break-word
				z-index: 1
			.full
				font-size: 13px
				padding: 5px
				position: relative
				word-break: break-word
				width: 120%
				height: auto
				top: -50px 
				right: -50px
				background-color: white
				border: 3px solid rgba(black,0.05)
				border-radius: 5px 
				display: none
				transition: 0.5s
				z-index: 2
			span
				font-size: 40px
				font-family: 微軟正黑體
				font-weight: 900
				color: rgba(red, 0.1)
				position: absolute
				left: 42%
				top: 15px
				display: none
				z-index: 0
			&:hover
				transform: translateY(-2%)
				background-color: rgba(red, 0.1)
				span
					display: block
				
			&:active
				transform: translateY(2%)				
			
</style>