import axios from 'axios';

export default{
    state: {
        earningStatsData: Object,
        tripStatsData: Object
    },
    getters: {
        STATS_EARNING_DATA: state=> {
            return state.earningStatsData;
        },
        STATS_TRIPS_DATA: state => {
            return state.tripStatsData;
        }
    },
    mutations: {
        SET_EARNING_DATA: (state,obj)=> {
            state.earningStatsData=obj;
        },
        SET_TRIPS_DATA: (state,obj)=> {
            state.tripStatsData=obj;
        }
    },
    actions: {
        GET_EARNING_DATA: async ({commit},payload) => {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                  'Authorization': 'Bearer '+localStorage.getItem('token')
                  }
                }
                let {data} = await axios.post('earningStatistics',payload,config)
                let statsData=data.map(data=>{
                            return{
                                car:data.car,
                                cost:data.cost
                            } 
                })
                //commit("SET_EARNING_DATA",JSON.parse(JSON.stringify(statsData)));
                commit("SET_EARNING_DATA",statsData);
        },
        GET_TRIPS_DATA: async ({commit},payload) => {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                  'Authorization': 'Bearer '+localStorage.getItem('token')
                  }
                }
                let {data} = await axios.post('tripStatistics',payload,config)
                let tripsData=data.map(data=>{
                            return{
                                car:data.car_id,
                                quantity:data.quantity
                            } 
                })
                //commit("SET_EARNING_DATA",JSON.parse(JSON.stringify(statsData)));
                commit("SET_TRIPS_DATA",tripsData);
        },

     }
        
};