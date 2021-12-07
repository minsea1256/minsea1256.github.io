export default {
    namespaced: true,
    state: {
        toasts: []      
    },
    mutations: {      

        // toast 추가 해준다.
        ADD_TOAST (state, payload) {
            state.toasts.push(payload);
        },
        // toast 삭제 해준다.
        REMOVE_TOAST (state) {
            state.toasts.shift();
        }

    },
    actions: {
        triggerToast ( { commit },  payload) {
            
            commit('ADD_TOAST', { 
                id: Date.now(),
                message:payload.message, 
                type: payload.type
            });

            setTimeout(() => {
                commit("REMOVE_TOAST");
            }, 5000);
            
        }
    },
    getters: {
        toastMessageAdd (state) {
            return state.toastMessage + "!!!"
        }
    }
}