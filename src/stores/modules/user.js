import axios from 'axios'
export default{
    state: {
        token: null
    },
    getters: {},
    mutations: {
        logout: (state) =>
        {
            state.token=null;
        },
        login: (state,token) =>{
            state.token=token;
            localStorage.setItem('token',token);
        }
       
    },
    actions: {
        LOGIN: ({commit},payload) => {
            return new Promise((resolve, reject) => {
                axios.post('/authenticate', payload)
                .then(({data,status}) => {
                    if(status === 200){
                        commit('login',data.token);
                        resolve(true);
                    }
                })
                .catch(error=> {
                    reject(error);
                })
            });   
        },
        LOGOUT: ({commit}) => {
            return new Promise((resolve,reject) => {
                localStorage.removeItem('token');
                commit('logout');
                console.log("poszedl commit")
                resolve(true);
            })
        }
        

    }
}