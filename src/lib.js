let stateIndex = 0;
let HISTORY = [];
let activeState;
let activeHistoryItem=false;
let index = 1;

function back(flag){
    if (history.state == 'B-1' || history.state == 'B-2' || history.state == 'B-3' || history.state == 'B-4'){
        activeState = HISTORY.length>0 ? 'back' : 'backAll'+flag;
        history.back();
    }
}

window.addEventListener('popstate', function(event){
    let his, r;
    
    if (activeHistoryItem){
        r = activeHistoryItem;
        
        activeHistoryItem = null;
        return afterCancel(r);
    }

    if (activeState=='backAll' || activeState=='backAll1'){
        if (event.state == 'B-1' || event.state == 'B-2' || event.state == 'B-3' || event.state == 'B-4'){
            history.back();
        }else{
            if (activeState == 'backAll1'){
                activeState = 'backAll';
                history.back();
            }else{
                activeState = null;
            }
        }
        return;
    }

    if (activeState=='back'){
        if (history.state == 'B-1' || history.state == 'B-3'){
            return;
        }
    }

    // voltando
    if ( (activeState == 'B-2' && event.state == 'B-1') || (activeState == 'B-4' && event.state == 'B-3')){
        if (HISTORY.length>0){
            his = HISTORY[HISTORY.length-1]; // HISTORY.pop();
            
            if (his.callback){
                // cancela evento voltar
                activeHistoryItem = his; //faz com que chame afterCancel();
                history.go(1);
                return;
            }
        } else {
            return back(1);
        }
    } else if (event.state == 'B-1' || event.state == 'B-3'){
        //  frente;
        history.back();
    }
    
    activeState = event.state;
});

function afterCancel(his){
    // chama a função back registrada
    let r = his.callback();

    if (r!==false){
        HISTORY.remove(his);
    }else{
        pushState(his.id);
    }
}

function pushState(id){
    history.pushState('B-' + index, id, '');
    history.pushState('B-' + (index+1), id, '');
    activeState = 'B-' + (index + 1);

    index = index==1 ? 3 : 1;
}

back();

const BrowserBackButton = {
    on(id, callback) {
        if (arguments.length==1){
            callback = id;
            id = stateIndex++;
        }
        
        pushState(id);
    
        HISTORY.push({
            callback: callback,
            id: id
        });
    },

    off(id) {
        let i;
        let callback = typeof(id)!='function' ? null : id;
        
        if (!callback){
            for (i = 0; i < HISTORY.length; i++){
                if (HISTORY[i].id == id){
                    callback = HISTORY[i].callback;
                    break;
                }
            }
        }

        if (callback) {
            for (i = 0; i < HISTORY.length; i++){
                if (HISTORY[i].callback===callback){                    
                    HISTORY.splice(i, 1);
                    break;
                }
            }
        }
    }
};

export default BrowserBackButton;
