let funName;
export default {
    install: Vue => {
        Vue.directive("inputEnter", {
            bind: function(el, binding) {
                let fn = binding.value,
                    isJson = "json" in binding.modifiers
                el.addEventListener("keydown", function funName(e) {
                    if (e.keyCode === 13 && typeof fn === 'function') {
                        let arg = binding.arg;
                        isJson ? fn(arg) : fn.apply(Vue, arg.split(","))
                    }
                }, true)
            },
            unbind: function(el) {
                el.removeEventListener("keydown", funName)
            }
        })
    }
}