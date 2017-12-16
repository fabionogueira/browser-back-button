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
    on(callback) {
        if (callback) {
            stateIndex++;
            history.pushState({fn:stateIndex}, `state-${stateIndex}`, "");
            callbacks[stateIndex] = callback;
            
            stateIndex++;
            history.pushState('null', `state-${stateIndex}`, "");
        }
    },

    off(callback) {
        let i;
        
        if (callback) {
            for (i in callbacks){
                if (callbacks[i]===callback){
                    return delete(callbacks[i]);
                }
            }
        }
    }
};
