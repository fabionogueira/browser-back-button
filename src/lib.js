let stateIndex = 0;
let callbacks = {};

window.addEventListener('popstate', function(event){
    let fn;

    if (event.state && event.state.fn) {
        fn = callbacks[event.state.fn];

        delete(callbacks[event.state.fn]);

        if (fn) {
            fn();
            history.back();
        }
    }
});

export default {
    on(id, callback) {
        function register(){
            stateIndex++;
            history.pushState({fn:callback==id ? stateIndex : id}, `state-${stateIndex}`, "");
            callbacks[callback==id ? stateIndex : id] = callback;
            
            stateIndex++;
            history.pushState('null', `state-${stateIndex}`, "");
        }

        if (arguments.length==1){
            callback = id;
        }

        if (callback) {
            setTimeout(()=>{
                register();
            }, 10);
        }

    },

    off(id) {
        let i;
        let callback = typeof(id)=='string' ? callbacks[id] : id;
        
        if (callback) {
            for (i in callbacks){
                if (callbacks[i]===callback){
                    // retorna os dois pushState
                    history.back();
                    history.back();
                    
                    return delete(callbacks[i]);
                }
            }
        }
    }
};
