declare module "*.vue" {
	import { DefineComponent } from "vue"
	const component: DefineComponent<{}, {}, any>
	$route: Route;
	export default component
}
