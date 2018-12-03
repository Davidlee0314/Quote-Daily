<template>
	<div class="appuse">
		<button @click="changeStatus"><p>Back</p></button>
		<appProgress></appProgress>
		<appSearch></appSearch>
		<appList></appList>
	</div>
</template>

<script>
	import Progress from "./Progress.vue"
	import Search from "./Search.vue"
	import List from "./List.vue"

	export default{
		props: ["changeStatus"],
		components: {
			"appProgress": Progress,
			"appSearch": Search,
			"appList": List,
		}
	}
</script>

<style lang="sass" scoped>
	.appuse
		height: 88.5%
		width: 100%
		background-color: rgba(white, 0.5)
		button
			position: relative
			top: 30px
			left: 30px  
			padding: 0px 30px 
			background-color: rgba(#f4f4f4, 1)
			border: none
			border-radius: 10px 
			cursor: pointer 
			p
				position: relative
				color: #AEE5D8
				font-weight: bold
				font-size: 20px
				font-family: "Maven Pro"
				height: 0px
				bottom: 12px 
			&:focus
				outline: none
			&:hover
				background-color: rgba(#ffffff, 1)
				transform: translateY(-2%)
			&:active
				transform: translateY(2%)
</style>